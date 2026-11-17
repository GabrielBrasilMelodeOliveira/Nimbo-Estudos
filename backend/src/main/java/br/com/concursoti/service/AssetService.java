package br.com.concursoti.service;

import br.com.concursoti.model.*;
import br.com.concursoti.repo.*;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.List;
import java.util.zip.ZipInputStream;
import javax.imageio.ImageIO;

@Service
public class AssetService {
  private final StoredAssetRepository repo;
  private final AssetBlobRepository blobs;
  private final Path legacyRoot;
  public AssetService(StoredAssetRepository repo,AssetBlobRepository blobs,@Value("${trilhamon.storage-dir:./uploads}") String folder){
    this.repo=repo;this.blobs=blobs;this.legacyRoot=Path.of(folder).toAbsolutePath().normalize();
  }
  public StoredAsset get(String id){return repo.findById(id).orElseThrow(()->new IllegalArgumentException("Arquivo não encontrado: "+id));}
  public String type(String id){return get(id).mediaType;}
  public boolean isImage(String id){return type(id).startsWith("image/");}
  public void ensureImage(String id){if(id!=null&&!isImage(id))throw new IllegalArgumentException("Envie uma imagem PNG, JPG ou WEBP.");}
  public void ensureDocument(String id){if(id!=null&&!Set.of("application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document","image/png","image/jpeg","image/webp").contains(type(id)))throw new IllegalArgumentException("Arquivo inválido para material.");}
  /** Importa os arquivos existentes na versão 2.0 para BYTEA sem apagar os originais. */
  @EventListener(ApplicationReadyEvent.class)
  public void migrateLegacy(){
    if(!Files.isDirectory(legacyRoot))return;
    int count=0;
    for(StoredAsset asset:repo.findAll()){
      if(blobs.existsById(asset.id))continue;
      Path file=legacyRoot.resolve(asset.id).normalize();
      if(!file.startsWith(legacyRoot)||!Files.isRegularFile(file))continue;
      try{
        byte[] bytes=Files.readAllBytes(file);
        if(bytes.length>20*1024*1024)continue;
        blobs.save(new AssetBlob(asset.id,bytes));count++;
      }catch(Exception e){System.err.println("TrilhaMon: não foi possível migrar arquivo "+asset.id+": "+e.getMessage());}
    }
    if(count>0)System.out.println("TrilhaMon: "+count+" arquivos legados importados para o PostgreSQL.");
  }
  public byte[] bytes(String id){
    return blobs.findById(id).map(b->b.content).orElseGet(()->{
      // Durante a primeira atualização, permite acessar um upload ainda não migrado.
      get(id);Path legacy=legacyRoot.resolve(id).normalize();
      if(!legacy.startsWith(legacyRoot)||!Files.isRegularFile(legacy))throw new IllegalArgumentException("Arquivo antigo não encontrado no armazenamento. Restaure o volume uploads_data e reinicie a API.");
      try{byte[] content=Files.readAllBytes(legacy);blobs.save(new AssetBlob(id,content));return content;}
      catch(IOException e){throw new IllegalArgumentException("Falha ao recuperar o arquivo antigo.");}
    });
  }
  @Transactional
  public StoredAsset save(MultipartFile file){
    if(file==null||file.isEmpty())throw new IllegalArgumentException("Selecione um arquivo para enviar.");
    if(file.getSize()>20L*1024*1024)throw new IllegalArgumentException("Limite de 20 MB por arquivo.");
    String name=Optional.ofNullable(file.getOriginalFilename()).orElse("arquivo").replace('\\','/');
    name=name.substring(name.lastIndexOf('/')+1).replaceAll("[\\p{Cntrl}]","");
    if(name.isBlank())name="arquivo";
    if(name.length()>240)name=name.substring(name.length()-240);
    String ext=name.contains(".")?name.substring(name.lastIndexOf('.')+1).toLowerCase(Locale.ROOT):"";
    String mime=switch(ext){
      case "pdf"->"application/pdf";
      case "docx"->"application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      case "png"->"image/png";
      case "jpg","jpeg"->"image/jpeg";
      case "webp"->"image/webp";
      default->throw new IllegalArgumentException("Formatos aceitos: PDF, DOCX, PNG, JPG ou WEBP.");
    };
    try{
      byte[] content=file.getBytes();validate(content,mime);
      String id=UUID.randomUUID().toString();StoredAsset asset=new StoredAsset();
      asset.id=id;asset.originalName=name;asset.mediaType=mime;asset.sizeBytes=(long)content.length;asset.createdAt=LocalDateTime.now();
      repo.save(asset);blobs.save(new AssetBlob(id,content));return asset;
    }catch(IOException e){throw new IllegalArgumentException("Falha ao salvar o arquivo no banco de dados.");}
  }
  @Transactional
  public StoredAsset version(String previous,byte[] content){
    StoredAsset old=get(previous);if(content.length>20L*1024*1024)throw new IllegalArgumentException("Documento editado excede 20 MB.");
    validate(content,old.mediaType);
    StoredAsset asset=new StoredAsset();asset.id=UUID.randomUUID().toString();asset.originalName=old.originalName;
    asset.mediaType=old.mediaType;asset.sizeBytes=(long)content.length;asset.createdAt=LocalDateTime.now();
    repo.save(asset);blobs.save(new AssetBlob(asset.id,content));return asset;
  }
  private void validate(byte[] bytes,String mime){
    if(bytes.length<12)throw new IllegalArgumentException("Arquivo vazio ou inválido.");
    try{
      if(mime.equals("application/pdf")){
        if(bytes[0]!='%'||bytes[1]!='P'||bytes[2]!='D'||bytes[3]!='F'||bytes[4]!='-')throw new IllegalArgumentException("PDF inválido.");
        try(PDDocument document=Loader.loadPDF(bytes)){if(document.getNumberOfPages()<1)throw new IllegalArgumentException("PDF sem páginas.");}
      }else if(mime.contains("wordprocessingml")){
        if(bytes[0]!='P'||bytes[1]!='K')throw new IllegalArgumentException("DOCX inválido.");
        boolean document=false,types=false;
        try(ZipInputStream zip=new ZipInputStream(new ByteArrayInputStream(bytes))){java.util.zip.ZipEntry entry;
          while((entry=zip.getNextEntry())!=null){if(entry.getName().equals("word/document.xml"))document=true;if(entry.getName().equals("[Content_Types].xml"))types=true;}
        }
        if(!document||!types)throw new IllegalArgumentException("DOCX inválido.");
        try(XWPFDocument doc=new XWPFDocument(new ByteArrayInputStream(bytes))){doc.getBodyElements();}
      }else if(mime.startsWith("image/")){
        if(mime.equals("image/webp")){
          if(bytes[0]!='R'||bytes[1]!='I'||bytes[2]!='F'||bytes[3]!='F'||bytes[8]!='W'||bytes[9]!='E'||bytes[10]!='B'||bytes[11]!='P')throw new IllegalArgumentException("WEBP inválido.");
        }else{
          if(mime.equals("image/png")&&!((bytes[0]&255)==137&&bytes[1]==80&&bytes[2]==78&&bytes[3]==71))throw new IllegalArgumentException("PNG inválido.");
          if(mime.equals("image/jpeg")&&!((bytes[0]&255)==255&&(bytes[1]&255)==216))throw new IllegalArgumentException("JPG inválido.");
          BufferedImage image=ImageIO.read(new ByteArrayInputStream(bytes));
          if(image==null||(long)image.getWidth()*image.getHeight()>40_000_000L)throw new IllegalArgumentException("Imagem inválida ou grande demais.");
        }
      }
    }catch(IOException e){throw new IllegalArgumentException("Arquivo danificado, protegido por senha ou não reconhecido.");}
  }
  public String docxText(String id){
    if(!type(id).contains("wordprocessingml"))throw new IllegalArgumentException("Editor de texto disponível para DOCX.");
    try(XWPFDocument doc=new XWPFDocument(new ByteArrayInputStream(bytes(id)))){
      StringBuilder result=new StringBuilder();
      for(IBodyElement part:doc.getBodyElements()){
        if(part instanceof XWPFParagraph para)result.append(para.getText()).append('\n');
        if(part instanceof XWPFTable table)for(XWPFTableRow row:table.getRows())result.append(row.getTableCells().stream().map(XWPFTableCell::getText).reduce((a,b)->a+" | "+b).orElse("")).append('\n');
      }
      if(result.length()>250000)throw new IllegalArgumentException("DOCX excede 250 mil caracteres.");
      return result.toString().stripTrailing();
    }catch(IOException e){throw new IllegalArgumentException("Não foi possível abrir o DOCX.");}
  }
  public byte[] docxFromText(String text){
    if(text==null||text.length()>250000)throw new IllegalArgumentException("Limite de 250 mil caracteres.");
    try(XWPFDocument doc=new XWPFDocument();ByteArrayOutputStream out=new ByteArrayOutputStream()){
      text=text.replaceAll("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F]","");
      for(String line:text.split("\\R",-1)){
        XWPFParagraph paragraph=doc.createParagraph();paragraph.setSpacingAfter(140);XWPFRun run=paragraph.createRun();
        run.setFontFamily("Arial");run.setFontSize(11);run.setText(line);
      }
      doc.write(out);return out.toByteArray();
    }catch(IOException e){throw new IllegalArgumentException("Não foi possível criar o DOCX.");}
  }
  public byte[] preview(String id){
    String mime=type(id);byte[] content=bytes(id);
    if(mime.startsWith("image/"))return content;
    try{
      if(mime.equals("application/pdf")){
        try(PDDocument doc=Loader.loadPDF(content);ByteArrayOutputStream out=new ByteArrayOutputStream()){
          BufferedImage image=new PDFRenderer(doc).renderImageWithDPI(0,65);
          ImageIO.write(scale(image,360,470),"png",out);return out.toByteArray();
        }
      }
      if(mime.contains("wordprocessingml")){
        BufferedImage image=new BufferedImage(360,470,BufferedImage.TYPE_INT_RGB);Graphics2D g=image.createGraphics();
        g.setColor(new Color(250,251,248));g.fillRect(0,0,360,470);g.setColor(Color.WHITE);g.fillRoundRect(21,18,318,436,14,14);
        g.setColor(new Color(56,95,77));g.setFont(new Font("SansSerif",Font.BOLD,15));g.drawString("DOCX · "+get(id).originalName.substring(0,Math.min(19,get(id).originalName.length())),35,56);
        g.setFont(new Font("SansSerif",Font.PLAIN,12));String remaining=docxText(id).replaceAll("\\s+"," ").strip();int y=94;
        while(!remaining.isEmpty()&&y<425){int max=Math.min(remaining.length(),46);int cut=remaining.lastIndexOf(' ',max);if(cut<12)cut=max;g.drawString(remaining.substring(0,cut),35,y);remaining=remaining.substring(cut).stripLeading();y+=18;}
        g.dispose();ByteArrayOutputStream out=new ByteArrayOutputStream();ImageIO.write(image,"png",out);return out.toByteArray();
      }
      throw new IllegalArgumentException("Não existe prévia para este formato.");
    }catch(IOException e){throw new IllegalArgumentException("Falha ao gerar a prévia.");}
  }
  private BufferedImage scale(BufferedImage image,int maxWidth,int maxHeight){
    double ratio=Math.min((double)maxWidth/image.getWidth(),(double)maxHeight/image.getHeight());
    BufferedImage result=new BufferedImage(Math.max(1,(int)(image.getWidth()*ratio)),Math.max(1,(int)(image.getHeight()*ratio)),BufferedImage.TYPE_INT_RGB);
    Graphics2D g=result.createGraphics();g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,RenderingHints.VALUE_INTERPOLATION_BILINEAR);g.drawImage(image,0,0,result.getWidth(),result.getHeight(),null);g.dispose();return result;
  }
}

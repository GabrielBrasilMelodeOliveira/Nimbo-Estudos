package br.com.concursoti.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.util.*;

@Service
public class DocumentService {
  private final AssetService assets;
  public DocumentService(AssetService assets){this.assets=assets;}
  // Grava uma anotação no PDF original como página adicional, mantendo as páginas originais intactas.
  public byte[] appendPdfNotes(String assetId,String content){
    if(!"application/pdf".equals(assets.type(assetId)))throw new IllegalArgumentException("O arquivo não é um PDF.");
    if(content==null||content.isBlank()||content.length()>12000)throw new IllegalArgumentException("Escreva uma anotação de até 12 mil caracteres.");
    try(PDDocument document=Loader.loadPDF(assets.bytes(assetId));ByteArrayOutputStream out=new ByteArrayOutputStream()){
      var font=new PDType1Font(Standard14Fonts.FontName.HELVETICA);
      String[] paragraphs=content.replace("\r","").split("\n",-1);
      PDPage page=null;PDPageContentStream stream=null;float y=0;
      for(int pi=-1;pi<paragraphs.length;pi++) {
        String paragraph=pi<0?"ANOTACOES DE ESTUDO  -  NIMBO":paragraphs[pi];
        List<String> lines=wrap(clean(paragraph),pi<0?68:88);
        for(String line:lines){
          if(stream==null || y<68){
            if(stream!=null)stream.close();
            page=new PDPage(PDRectangle.A4);document.addPage(page);
            stream=new PDPageContentStream(document,page);y=PDRectangle.A4.getHeight()-64;
          }
          stream.beginText();stream.setFont(font,pi<0?15:11);stream.newLineAtOffset(52,y);stream.showText(line);stream.endText();y-=pi<0?32:18;
        }
        y-=pi<0?5:11;
      }
      if(stream!=null)stream.close();document.save(out);return out.toByteArray();
    }catch(IOException e){throw new IllegalArgumentException("Não foi possível gravar as anotações no PDF.");}
  }
  private String clean(String s){
    // A fonte embutida standard-14 cobre texto latino básico; demais glifos são substituídos.
    String normalized=Normalizer.normalize(s,Normalizer.Form.NFKD).replaceAll("\\p{M}","");
    return normalized.replaceAll("[^\\x20-\\x7E]","?");
  }
  private List<String> wrap(String value,int max){
    List<String> lines=new ArrayList<>();String text=value.strip();
    if(text.isEmpty()){lines.add(" ");return lines;}
    while(text.length()>max){int split=text.lastIndexOf(' ',max);if(split<max/3)split=max;lines.add(text.substring(0,split));text=text.substring(split).stripLeading();}
    if(!text.isEmpty())lines.add(text);return lines;
  }
}

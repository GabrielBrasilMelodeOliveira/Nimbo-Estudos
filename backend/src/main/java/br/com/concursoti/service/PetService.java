package br.com.concursoti.service;
import br.com.concursoti.model.*;
import br.com.concursoti.repo.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class PetService {
  private final PetCompanionRepository companions;
  private final PetRepository legacy;
  private static final List<String> SPECIES=List.of("nori","luma","favo","brisa","mimo","foli","fira","tuca","duna","noa","iris");
  private static final List<String> OLD_SPECIES=List.of("bulbasaur","charmander","squirtle","pikachu","pidgey","abra","gastly","dratini","chikorita","cyndaquil","totodile");
  public PetService(PetCompanionRepository companions,PetRepository legacy){this.companions=companions;this.legacy=legacy;}
  /** Preserva XP, energia e coleção existente ao migrar do tema antigo para Nimbo. */
  private void migrate(){
    if(companions.count()==0){
      legacy.findById(1L).ifPresent(old->{
        PetCompanion copy=new PetCompanion();copy.species=old.species;copy.xp=old.xp;copy.energy=old.energy;
        copy.lastActivity=old.lastActivity;copy.lastDecay=old.lastDecay;copy.active=true;companions.save(copy);
      });
    }
    List<PetCompanion> all=companions.findAll();
    Set<String> used=new HashSet<>();
    for(PetCompanion p:all)if(SPECIES.contains(p.species))used.add(p.species);
    for(PetCompanion p:all){
      if(SPECIES.contains(p.species))continue;
      int oldIndex=OLD_SPECIES.indexOf(p.species);
      String desired=oldIndex>=0?SPECIES.get(oldIndex):SPECIES.get(0);
      if(used.contains(desired))desired=SPECIES.stream().filter(s->!used.contains(s)).findFirst().orElse(null);
      if(desired!=null){p.species=desired;companions.save(p);used.add(desired);}
    }
  }
  private PetCompanion active(){return companions.findFirstByActiveTrue().orElseGet(()->companions.findAll().stream().findFirst().orElse(null));}
  @Transactional public Map<String,Object> current(){
    migrate();PetCompanion p=active();if(p==null)return null;
    decay(p);return decorated(p);
  }
  private Map<String,Object> decorated(PetCompanion p){
    Map<String,Object> view=new LinkedHashMap<>(view(p));List<PetCompanion> all=companions.findAll();
    all.sort(Comparator.comparing(a->a.id));
    view.put("collection",all.stream().map(this::view).toList());
    long mature=all.stream().filter(a->a.xp>=1200).count();
    boolean credit=mature>=all.size(); // Cada Nimbo na fase máxima libera outra variação.
    view.put("canAdopt",credit&&all.size()<SPECIES.size());
    view.put("availableSpecies",SPECIES.stream().filter(s->all.stream().noneMatch(a->a.species.equals(s))).toList());
    view.put("totalCompanions",all.size());view.put("collectionComplete",all.size()==SPECIES.size());
    return view;
  }
  @Transactional public Map<String,Object> choose(String species){
    if(species==null||!SPECIES.contains(species.toLowerCase(Locale.ROOT)))throw new IllegalArgumentException("Escolha um companheiro disponível.");
    migrate();species=species.toLowerCase(Locale.ROOT);
    if(companions.findBySpecies(species).isPresent())throw new IllegalArgumentException("Este companheiro já está na coleção.");
    List<PetCompanion> all=companions.findAll();
    if(!all.isEmpty()&&all.stream().filter(a->a.xp>=1200).count()<all.size())throw new IllegalArgumentException("Evolua seu companheiro até o nível 13 para desbloquear outra variação de Nimbo.");
    for(PetCompanion member:all){member.active=false;companions.save(member);}
    PetCompanion p=new PetCompanion();p.species=species;p.active=true;companions.save(p);return decorated(p);
  }
  @Transactional public Map<String,Object> activate(Long id){
    migrate();PetCompanion chosen=companions.findById(id).orElseThrow(()->new IllegalArgumentException("Companheiro não encontrado na coleção."));
    for(PetCompanion other:companions.findAll()){other.active=other.id.equals(id);companions.save(other);}
    decay(chosen);return decorated(chosen);
  }
  private void decay(PetCompanion p){
    LocalDate today=LocalDate.now();if(p.lastDecay==null)p.lastDecay=today;
    long passed=Math.max(0,ChronoUnit.DAYS.between(p.lastDecay,today));
    if(passed>0){
      long inactive=Math.max(0,ChronoUnit.DAYS.between(p.lastActivity,today)-1);
      p.energy=(int)Math.max(0,p.energy-Math.min(inactive,passed)*8);p.lastDecay=today;companions.save(p);
    }
  }

  @Transactional public Map<String,Object> interact(String type){
    migrate();PetCompanion p=active();
    if(p==null)throw new IllegalArgumentException("Escolha primeiro um companheiro.");
    if(type==null)throw new IllegalArgumentException("Escolha uma interação.");
    String action=type.toUpperCase(Locale.ROOT);
    if(!Set.of("PET","TALK","PLAY","REST").contains(action))throw new IllegalArgumentException("Interação inválida.");
    LocalDateTime now=LocalDateTime.now();
    if(p.lastInteraction!=null&&Duration.between(p.lastInteraction,now).toSeconds()<15)
      throw new IllegalArgumentException("Nimbo precisa de alguns segundos antes da próxima interação.");
    decay(p);
    switch(action){
      case "PET" -> p.bond=Math.min(100,(p.bond==null?20:p.bond)+1);
      case "TALK" -> p.bond=Math.min(100,(p.bond==null?20:p.bond)+2);
      case "PLAY" -> {
        if(p.energy<4)throw new IllegalArgumentException("Seu companheiro precisa descansar antes de brincar.");
        p.energy=Math.max(0,p.energy-4);
        p.bond=Math.min(100,(p.bond==null?20:p.bond)+3);
      }
      case "REST" -> {
        if(p.lastRest!=null&&Duration.between(p.lastRest,now).toHours()<4)
          throw new IllegalArgumentException("Seu companheiro descansou recentemente. Volte depois.");
        p.energy=Math.min(100,p.energy+10);p.lastRest=now;
      }
    }
    p.lastInteraction=now;
    p.lastActivity=LocalDate.now();
    companions.save(p);
    return decorated(p);
  }

  @Transactional public void progress(int xpGain,int energyGain){
    migrate();PetCompanion p=active();if(p==null)return;
    decay(p);p.xp=Math.max(0,p.xp+xpGain);p.energy=Math.max(0,Math.min(100,p.energy+energyGain));
    p.lastActivity=LocalDate.now();p.lastDecay=LocalDate.now();companions.save(p);
  }
  private Map<String,Object> view(PetCompanion p){
    int stage=p.xp>=1200?3:p.xp>=400?2:1;
    int start=stage==3?1200:stage==2?400:0;
    int next=stage==3?1200:stage==2?1200:400;
    Map<String,Object> out=new LinkedHashMap<>();
    out.put("id",p.id);out.put("species",p.species);out.put("xp",p.xp);out.put("energy",p.energy);
    out.put("stage",stage);out.put("level",1+p.xp/100);
    out.put("xpWithinStage",stage==3?0:p.xp-start);out.put("xpToNextStage",stage==3?0:next-start);
    out.put("bond",p.bond==null?20:p.bond);out.put("lastInteraction",p.lastInteraction);out.put("lastRest",p.lastRest);
    out.put("lastActivity",p.lastActivity);out.put("active",p.active);out.put("obtainedAt",p.obtainedAt);
    return out;
  }
}

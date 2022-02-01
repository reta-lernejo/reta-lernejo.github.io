---
layout: page
title: Ekvilibraj Arboj
---

  <!-- servi mankantajn funkciojn depende de uzata retumilo -->
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <!-- subteno por matematikaj kaj kemiaj formuloj -->
  <script id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js">
  </script>
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>

## Prezento de Algoritmoj por tiu Datumstrukturo
{:.no_toc}

* Enhavo
{:toc}

## Kelkaj Nocioj

Por la administrado de grandaj datumamasoj ofte oportunas uzi arbajn strukturojn. 
Aparte oni uzas ilin por indeksoj de datumbazaj tabeloj.


*Arbo* estas datumstrukturo difinebla iteracie jene: 

1. Malplena strukturo estas *arbo*. 
2. Nodo kun finia nombro de diversaj alligitaj arboj, nomataj *subarboj*, estas *arbo*. 

### Ekzemplo de arba strukturo

<div class="mermaid">
  graph TD;
    r(R) --> n1(n1) & n2(f2) & n3(n3);
	n1 --> n11(n1.1) & n12(f1.2);
	n11 --> n111(f1.1.1) & n112(f1.1.2) & n113(f1.1.3);
	n3 --> n31([n3.1]) & n32(f3.2);
	n31 --> n311(f3.1.1) & n312(f3.1.2);
</div>

La plej supra nodo (R) desegnita per cirkleto estas la *radiko* de la arbo. 
Ĝi havas tri rektajn *postantojn* - la plej supraj nodoj de ĝiaj subarboj. 
La nodo liganta siajn rektajn postantojn estas ties *antaŭanto*. 
La nodoj nehavantaj postantojn estas nomataj *finelementoj* aŭ *"folioj"* de la arbo. 

La *altecon* de la arbo oni difinas tiamaniere: La radiko havas la ŝtupon *nul*, 
ties rektaj postantoj la ŝtupon *unu*, ties rektaj postantoj la ŝtupon *du* ktp. 
La plej granda ŝtupo de enarba nodo tiam nomiĝas *alteco* de la arbo: 
Nia ekzemplo posedas la altecon *tri*. 

La *grado* de nodo estas la nombro de ties postantoj kaj la grado de la arbo 
do estas la plej granda ekzistanta nodgrado. 
Nia ekzemplo montras *trigradan* arbon. 

La *vojlongo* de nodo estas la nombro de la eĝoj kiuj konektas la nodon kun la radiko. 
Se la postantoj de ĉiu nodo estas ordigitaj laŭ certa sistemo, tiam oni parolas pri 
ordigita arbo. La kodon, laŭ kiu oni ordigas, oni nomas *ŝlosilo*.

## La Problemo

Se oni serĉas en *ordigita vico* de objektoj iun elementon, tiam oni komparas 
la ŝlosilon de la serĉata kun tiu de la meza vic-elemento. Laŭ la rezulto, 
ĉu unu estas pli aŭ malpli granda ol la alia, oni poste komparas kun la mezelemento 
de la dekstra aŭ maldekstra duonvico ktp. ĝis estas trovita la serĉata elemento.

Tia serĉprocedo estas tre rapida. Sed ĉiam, kiam oni devas aldoni novan elementon 
al la vico, estas necese rearanĝi multajn aliajn elementojn por konservi la ordon. 
Por eviti tiun ĉi malavantaĝon oni povas uzi *arban strukturon*. Tia arbo havu 
tiucele du esencajn kvalitojn: Ĝi estu *dugrada* - do ĉiu nodo ne havu pli ol 
du rektajn postantojn. Ĝi estu *ordiigta* - do la ŝlosilo de la maldekstra postanto 
estu pli malgranda, la ŝlosilo de la dekstra estu pli granda ol la ŝlosilo de la 
koncerna nodo. 

Al niaj supre menciitaj subvicoj nun analogas la subarboj kaj 
la serĉado okazas responde en la dekstra aŭ maldekstra subarbo laŭ la grandeco 
de la ŝlosilo. Vi certe povas imagi la analogecon inter la enarba kaj la 
envica serĉado. Sed ja povas okazi, ke dum la konstruo de la arbo estiĝas 
malfavora strukturo, en la plej malfavora kazo kvazaŭvica.

<div class="mermaid">
  graph TD;
    r(R) --> n1( ) & n2(n1);
	  n2 --> n3( ) & n4(n2);
	  n4 --> n5( ) & n6(f);
</div>
maltaŭga arbo

Tiam ni devus kompari ĉiun nodon kun la serĉata, se ni volus 
trovi la lastan. Pro tiuj misebloj ni devas peni realigi proksimuman ekvilibron 
inter la ĉies du subarboj. Pri tiaj ekvilibraj arboj nun temas la sekvantaj linioj.

## Ekvilibraj Arboj

Ni uzos tiun difinon: Arbo estas ekvilibra, se la altecoj de la subarboj de ĉiu 
nodo diferencas maksimume je unu ŝtupo. Pro la amplekso de la teksto estu klarigota 
la garantiado de la ekvilibreco nur dum la procedo de la estingado de elementoj. 
Tiu sama procedo dum la aldonado de nodoj al la arbo ja estas iomete alia sed ne tro. 

Ni supozu, ke la arbo estis jam ekvilibra kaj nun ni volas estingi iun 
nodon ie en la arbo. Komencante je la radiko ni iteracie serĉos la nodon en la 
dekstraj aŭ maldekstraj subarboj laŭ la grandecoj de la ŝlosiloj. Trovinte 
la serĉatan nodon kiel finelementon ni simple forigos ĝin kaj nun nur devas 
zorgi pri la reekvilibrigo de la arbo. 

Alikaze, se ĝi ne estas finelemento, ni anstataŭigas la enhavon de 
la estingenda nodo per la enhavo de la plej dekstra finelemento en la 
maldekstra subarbo de la estingenda nodo, kaj poste tiun forigas. 

Ĉar la serĉado estas farata per iteracio de la serĉprocedo, oni povas 
(revene) laŭ la sama vojo reekvilibrigi nodon post nodo ĝis la radiko. 

Por tio oni bezonas informojn pri la ekvilibreco de ĉiu nodo, t. e. la altecoj 
de ĝiaj subarboj. Por tiu celo ĉiu nodo ricevas apud la ŝlosilo kaj la 
enhavaj informoj, ekz. adreso kaj telefonnumero de iu persono, ankoraŭ 
komponenton *balanco* kun la informoj pri la altecdiferenco de 
dekstra kaj maldekstra subarbo:

balanco = 1, se $$a_m < a_d$$  
balanco =-1, se $$a_m > a_d$$  
balanco = 0, se $$a_m = a_d$$  

Ĉe tio $$a_m$$ estas la alteco de la maldekstra subarbo, 
$$a_d$$ la alteco de la dekstra.
Nun ni rigardas nur tiujn kazojn, kiam en la maldekstra 
subarbo iu nodo estas estingita, la aliaj kazoj estas analogaj.

Se post estingo de nodo la alteco de maldekstra subarbo malaltiĝis, tiam 
la ekvilibro en la kazoj $$a_m = a_d$$  kaj $$a_m > a_d$$  ne estas ŝanĝita, 
nur la komponento *balanco* devas esti aktualigata. Sed en la kazo $$a_m < a_d$$ 
oni devas ŝanĝi la strukturon de la arbo, por redoni al ĝi la ekvilibron. Ĉe tio oni devas 
nove konsideri diversajn kazojn. La malsupra tabelo montras ilin kaj la necesan 
ŝanĝitan strukturon reekvilibrigitan. Ĉe la eĝoj estas indikitaj la altecoj 
de la subarboj relative al variablo $$a$$.

(1)

<table>
<tr>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+2|n1(1);
	n1 -->|a-1|n3( );
	n1 -->|a+1|n2(2);
	n2 -->|a|nx(x);
	n2 -->|a|n4( );
</div>
antaŭ ekvilibrigo:
alteco ŝanĝita;  
balanco(1)= 1;  
balanco(2)= 0
</td>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+2|n2(2);
	n2 -->|a+1|n1(1);
	n1 -->|a-1|n3( );
	n1 -->|a|nx(x);
	n2 -->|a|n4( );
</div>	
post ekvilibrigo:
alteco ne ŝanĝita;  
balanco(1)= 1;  
balanco(2)= -1  
</td>
</tr>
</table>


(2)

<table>
<tr>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+3|n1(1);
	n1 -->|a|n( );
	n1 -->|a+2|n2(2);
	n2 -->|a+1|n3(3);
	n2 -->|a|n4( );
	n3 -->|a-1|nx(x);
	n3 -->|a|ny(y);
</div>

antaŭ ekvilibrigo:
alteco ŝanĝita;  
balanco(1)= 1;  
balanco(2)= -1;  
balanco(3)= 1
</td>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+2|n3(3);
	n3 -->|a+1|n1(1);
	n1 -->|a|n( );
	n1 -->|a-1|nx(x);
	n3 -->|a+1|n2(2);
	n2 -->|a|ny(y);
	n2 -->|a|n4( );
</div>

post ekvilibrigo:
alteco ŝanĝita;  
balanco(1)= -1;  
balanco(2)= 0;  
balanco(3)= 0
</td>
</tr>
</table>

(3)

<table>
<tr>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+3|n1(1);
	n1 -->|a|n( );
	n1 -->|a+2|n2(2);
	n2 -->|a+1|n3(3);
	n2 -->|a|n4( );
	n3 -->|a|nx(x);
	n3 -->|a|ny(y);
</div>

antaŭ ekvilibrigo:
alteco ŝanĝita;  
balanco(1)= 1;  
balanco(2)= -1;  
balanco(3)= 0
</td>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+2|n3(3);
	n3 -->|a+1|n1(1);
	n1 -->|a|n( );
	n1 -->|a|nx(x);
	n3 -->|a+1|n2(2);
	n2 -->|a|ny(y);
	n2 -->|a|n4( );
</div>

post ekvilibrigo:
alteco ŝanĝita;  
balanco(1)= 0;
balanco(2)= 0;  
balanco(3)= 0
</td>
</tr>
</table>

(4)

<table>
<tr>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+3|n1(1);
	n1 -->|a|n( );
	n1 -->|a+2|n2(2);
	n2 -->|a+1|n3(3);
	n2 -->|a|n4( );
	n3 -->|a|nx(x);
	n3 -->|a-1|ny(y);
</div>

antaŭ ekvilibrigo:
alteco ŝanĝita;  
balanco(1)= 1;  
balanco(2)= -1;  
balanco(3)= -1
</td>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+2|n3(3);
	n3 -->|a+1|n1(1);
	n1 -->|a|n( );
	n1 -->|a|nx(x);
	n3 -->|a+1|n2(2);
	n2 -->|a-1|ny(y);
	n2 -->|a|n4( );
</div>

post ekvilibrigo:
alteco ŝanĝita;  
balanco(1)= 0; 
balanco(2)= 1;  
balanco(3)= 0
</td>
</tr>
</table>

(5)

<table>
<tr>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+2|n1(1);
	n1 -->|a-1|n3( );
	n1 -->|a+1|n2(2);
	n2 -->|a-1|nx(x);
	n2 -->|a|n4( );
</div>

antaŭ ekvilibrigo:
alteco ŝanĝita;  
balanco(1)= 1;  
balanco(2)= 1
</td>
<td>
<div class="mermaid">
  graph TD;
    r( ) -->|a+2|n2(2);
	n2 -->|a|n1(1);
	n1 -->|a-1|n3( );
	n1 -->|a-1|nx(x);
	n2 -->|a|n4( );
</div>	

post ekvilibrigo:
alteco ne ŝanĝita;  
balanco(1)= 0;  
balanco(2)= 0
</td>
</tr>
</table>


Tabelo: Kazoj post estingo de nodo en la maldekstra 
subarbo de  kaj maniero de reekvilibrigo

La ĝisnunaj pripensoj koncernis nur solan nodon, sed por reekvilibrigi 
la tutan arbon oni devas en la plej malbona kazo de la estingita nodo 
reiri ĝis la radiko decidante por ĉiu nodo, ĉu estas necese 
kaj kiamaniere restarigi ekvilibron. 

Per lerta eluzo de revoka maniero 
de serĉado al la estingenda nodo oni povas atingi postan ekvilibrigon.

El la tabelo oni povas ekscii, ke ekvilibriga operacio signifas en 
tiuj kazoj rotacion de tri aŭ kvin interligoj. 

## La Realigo

Ni nun volas prezenti la algoritman solvon de la ekvilibrigoproblemo. 
Estas uzata la lingvo Paskalo.

Respektante la antaŭajn konsiderojn ni difinas la strukturon de subarbo, 
kiu estas reprezentata de nodo kun alligitaj subarboj tiel:

```pascal
pSubarbo=^tSubarbo;      {montras al subarbo}
tSubarbo=object(tObject) {strukturo de nodo}

  Nomo: String;          {kodo, laŭ kiu la arbo estas ordigata}
  Strato, Urbo: String;  {datumoj}
  Balanco: ShortInt;     {infomo de ekvilibreco}

  DekstraSubarbo, MaldekstraSubarbo: pSubarbo;
    {ili montras al la du postantoj de la nodo, aŭ
    estas nil, se ne ekzistas postanto}

  {metodoj}
  constructor Krei(Iu, IuStrato, IuUrbo: String);
  destructor Forigi; virtual;
  procedure KopiiAl(s: pSubarbo);
  procedure Savi(var s: tStream); virtual;
  constructor Legi(var s: tStream);
end;
```

La bazaj metodoj, kiuj estas bezonataj por kreado, forigado, kopiado, 
savado al diskedo kaj legado de tiu, estu tie ĉi senkomentarie prezentataj, 
ĉar ili ne starigas algoritman problemon. Por ilia realigo estas uzata la 
konceptoj de objekto kaj fluo (tObject, tStream), kiuj estas uzeblaj 
de la versio 6.0 de Turbo Pascal.

```pascal
constructor tSubarbo.Krei(Iu, IuStrato, IuUrbo: String);
    {Difinas novan nodon per nomo, strato, urbo,...}
begin
  Nomo:=Iu;
  Strato:=IuStrato;
  Urbo:=IuUrbo;
  MaldekstraSubarbo:=nil;
  DekstraSubarbo:=nil;
  Balanco:=0;
end;

destructor tSubarbo.Forigi;
begin
  tObject.Done;
    if  MaldekstraSubarbo<>nil then MaldekstraSubarbo^.Forigi;
  if DekstraSubarbo<>nil then DekstraSubarbo^.Forigi;
end;

procedure tSubarbo.KopiiAl(s: pSubarbo);
begin
  s^.Nomo:=Nomo;
  s^.Strato:=Strato;
  s^.Urbo:=Urbo;
end;

procedure tSubarbo.Savi(var s: tStream);
var
  m,d: Boolean;
begin
  s.Write(Nomo,SizeOf(Nomo));
  s.Write(Strato,SizeOf(Strato));
  s.Write(Urbo,SizeOf(Urbo));
  s.Write(Balanco, SizeOf(Balanco));

  m:= MaldekstraSubarbo<>nil;
  d:= DekstraSubarbo<>nil;
  s.write(m,SizeOf(m));
  s.Write(d,SizeOf(d));

  if m then s.Put(MaldekstraSubarbo);
  if d then s.Put(DekstraSubarbo);
end;

constructor tSubarbo.Legi(var s: tStream);
var
  m,d: Boolean;
begin
  s.Read(Nomo,SizeOf(Nomo));
  s.Read(Strato,SizeOf(Strato));
  s.Read(Urbo,SizeOf(Urbo));
  s.Read(Balanco, SizeOf(Balanco));
  s.Read(m,SizeOf(m));
  s.Read(d,SizeOf(d));

  if m then MaldekstraSubarbo:=pSubarbo(s.Get) 
  else MaldekstraSubarbo:=nil;

  if d then DekstraSubarbo:=pSubarbo(s.Get) 
  else DekstraSubarbo:=nil;
end;

const
rSubarbo: tStreamRec = (
  ObjType: 1033;
  VmtLink: Ofs(TypeOf(tSubarbo)^);
  Load: @tSubarbo.Legi;
  Store: @tSubarbo.Savi);
```

La rikordo `rSubarbo` estas bezonanata por la registrado de la tipo `pSubarbo`, 
tio estas necesa, se oni volas uzi la objekton `tStream` por savado kaj legado.
La sekvanta objekto entenas la radikon de la arbo kaj la necesajn procedaĵon 
por aldonado kaj estingado de nodoj. Ĉar ambaŭ procedaĵoj entenas algoritmojn 
por serĉi nodon, vi certe mem scias dedukti procedaĵon, kies tasko estas 
serĉado de nodo kaj redono de ties informoj.

```pascal
pEkviArbo=^tEkviArbo;    {montras al ekvilibrita arbo}
tEkviArbo=object(tObject)   {Entenas la radikon de
    la arbo kaj la gravajn Algoritmojn por
      serĉi, trovi, savi, legi...}
  
  Radiko: pSubarbo;
  constructor Krei;
  destructor Forigi;
  procedure Aldonu(Iu: String; IuAdreso: tAdreso);
  procedure Estingu(Iu: String);

private
  Adreso: tAdreso;  {estas uzata por interdeponado de         
                adreso de aldonenda persono, tio 
                ŝparas la daŭran transdonon de ĝi al 
                la procedaĵo Aldoni, fakte oni povas 
                same procedi pri la nomo Iu, estu via 
                tasko plibonigi la labormanieron 
                tiele}
  procedure Aldoni(Iu: String; var s: pSubarbo;
    var AltecoShanghita: Boolean);
  procedure Estingi(Iu: String; var s: pSubarbo;
    var AltecoShanghita: Boolean);
end;
```

Unue ni rigardu la estingproblemon, ĉar tiun ni jam antaŭkonsideris.
La procedaĵo `Maldeks` zorgas por aktualigo aŭ restarigo  de ekvilibro 
post estingo de nodo en la maldekstra subarbo laŭ la supre konsideritaj kazoj.

```pascal
procedure MalDeks(var s: pSubarbo; 
              var AltecoShanghita: Boolean);
var
  s1, s2: pSubarbo; b1,b2: -1..+1;
begin
  case s^.Balanco of
   -1:  s^.Balanco:=0;
    0:  begin s^.Balanco:=1; AltecoShanghita:=false end;
    1:
     begin
       s1:=s^.DekstraSubarbo; b1:= s1^.Balanco;
       if b1>=0
       then
         begin
           s^.DekstraSubarbo:=s1^.MaldekstraSubarbo;
           s1^.MaldekstraSubarbo:=s;
           if b1 = 0
           then
             begin
              s^.Balanco:=1; s1^.Balanco:=-1;
              AltecoShanghita:=false
             end
           else
             begin
               s^.Balanco:=0;
               s1^.Balanco:=0
             end;
           s:=s1
         end
       else
         begin
          s2:=s1^.MaldekstraSubarbo;
          b2:=s2^.Balanco;
          s1^.MaldekstraSubarbo:=s1^.DekstraSubarbo;

          s2^.DekstraSubarbo:=s1;
          s^.DekstraSubarbo:=s2^.MaldekstraSubarbo;
          s2^.MaldekstraSubarbo:=s;

          if b2 = 1  then s^.Balanco:=-1 
          else s^.Balanco:=0;

          if b2 = -1 then s1^.Balanco:=1 
          else s1^.Balanco:=0;

          s:=s2; s2^.Balanco:=0
         end
      end
  end
end;
```

Analoge funkcias la procedaĵo `Deks`.

```pascal
procedure Deks(var s: pSubarbo; 
            var AltecoShanghita: Boolean);
var
  s1,s2: pSubarbo;
  b1,b2: -1..+1;
 begin
   case s^.Balanco of
     1: s^.Balanco:=0;
     0: begin s^.Balanco:=-1; AltecoShanghita:=false end;
    -1:
      begin
        s1:=s^.MaldekstraSubarbo;
        b1:=s1^.Balanco;
        if b1 <= 0
        then
          begin
            s^.MaldekstraSubarbo:=s1^.DekstraSubarbo;
            s^.DekstraSubarbo:=s;
            if b1 = 0
            then
              begin
                s^.Balanco:= -1;
                s1^.Balanco:=1;
                AltecoShanghita:=false
               end
             else
               begin
                s^.Balanco:=0;
                s1^.Balanco:=0
               end;
             s:=s1
          end
        else
          begin
            s2:=s1^.DekstraSubarbo;
            b2:=s2^.Balanco;
            s1^.DekstraSubarbo:=s2^.MaldekstraSubarbo;

            s2^.MaldekstraSubarbo:=s1;
            s^.MaldekstraSubarbo:=s2^.DekstraSubarbo;
            s2^.DekstraSubarbo:=s;

            if b2 = -1 then s^.Balanco:=1 
            else s^.Balanco:=0;

            if b2 = 1 then s1^.Balanco:=-1 
            else s1^.Balanco:=0;

            s:=s2;
            s2^.Balanco:=0
          end
      end
  end
end;
```

La procedaĵo `Anst` serĉas la plej dekstran finelementon de 
subarbo kaj anstataŭigas per ĝi la estingendan nodon.

```pascal
procedure Anst(var r: pSubarbo; 
            var AltecoShanghita: Boolean);
begin
  if r^.DekstraSubarbo <> nil
  then
    begin
      Anst(r^.DekstraSubarbo, AltecoShanghita);
      if AltecoShanghita then Deks(r,AltecoShanghita)
    end
  else
    begin
      r^.KopiiAl(t);
      t:=r; r:=r^.DekstraSubarbo;
      AltecoShanghita:=true
    end
end;
```

Fine la procedaĵo `Estingi` serĉas nodon, trovinte estingas ĝin per `Anst` kaj
poste zorgas por la ekvilibro de la arbo per la procedaĵoj `Maldeks` kaj `Deks`.

```pascal
procedure tEkviArbo.Estingi(Iu: String; var s: pSubarbo;
                      var AltecoShanghita: Boolean);
var t: pSubarbo;

  procedure MalDeks(var s: pSubarbo; 
                var AltecoShanghita: Boolean);
  ...
  procedure Deks(var s: pSubarbo; 
              var AltecoShanghita: Boolean);
  ...
  procedure Anst(var r: pSubarbo; 
              var AltecoShanghita: Boolean);
  ...
begin
  if s = nil
  then
    begin
      writeln(' Tiu nomo ne estas en la arbo. '); 
      AltecoShanghita:=false
    end
  else
  if Iu < s^.Nomo
  then
    begin
      Estingi(Iu, s^.MaldekstraSubarbo, AltecoShanghita);
      if AltecoShanghita then Maldeks(s,AltecoShanghita)
    end
  else
  if Iu > s^.Nomo
  then
    begin
       Estingi(Iu, s^.DekstraSubarbo, AltecoShanghita);
       if AltecoShanghita then Deks(s,AltecoShanghita)
    end
  else
    begin
      t:=s;
      if t^.DekstraSubarbo = nil
      then
        begin
          s:=t^.MaldekstraSubarbo;
          AltecoShanghita:=true
        end
      else
      if t^.MaldekstraSubarbo = nil
      then
        begin
          s:=t^.DekstraSubarbo;
          AltecoShanghita:=true
        end
      else
        begin
          Anst(t^.MaldekstraSubarbo,AltecoShanghita);
          if AltecoShanghita 
          then Maldeks(s,AltecoShanghita)
      end;
      Dispose(t,Forigi)
  end
end;
```

La procedaĵo `Aldoni` funkcias laŭ tre similaj principoj, sed estas kompreneble pli simpla:

```pascal
procedure tEkviArbo.Aldoni(Iu: String; var s: pSubarbo;
                  var AltecoShanghita: Boolean);
var
  s1,s2: pSubarbo;
begin
  if s = nil
  then
    begin
      New(s,Krei(Iu,Adreso.Strato,Adreso.Urbo));
      AltecoShanghita:=true;
    end
  else
  if s^.Nomo > Iu
  then
    begin
      Aldoni(Iu, s^.MaldekstraSubarbo, AltecoShanghita);
      if AltecoShanghita then
        case s^.Balanco of
          1: begin s^.Balanco:=0; 
              AltecoShanghita:=false end;
          0: s^.Balanco:=-1;
          -1:
            begin
              s1:=s^.MaldekstraSubarbo;
              if s1^.Balanco = -1 then
                begin
                  s^.MaldekstraSubarbo:=         
                          s1^.DekstraSubarbo;
                  s1^.DekstraSubarbo:=s;
                  s^.Balanco:=0; s:=s1
                end
              else
                begin
                  s2:=s1^.DekstraSubarbo;
                  s1^.DekstraSubarbo:= 
                          s2^.MaldekstraSubarbo;
                  s2^.MaldekstraSubarbo:=s1;
                  s^.MaldekstraSubarbo:=
                          s2^.DekstraSubarbo;
                  s2^.DekstraSubarbo:=s;
                  if s2^.Balanco = -1
                    then s^.Balanco:= 1
                    else s^.Balanco:=0;
                  if s2^.Balanco = 1
                    then s1^.Balanco:=-1
                    else s1^.Balanco:=0;
                  s:=s2
                end;
              s^.Balanco:=0;
              AltecoShanghita:=false
            end {case -1}
        end {case}
    end
  else
  if s^.Nomo < Iu
  then
    begin
      Aldoni(Iu, s^.DekstraSubarbo, AltecoShanghita);
      if AltecoShanghita then
        case s^.Balanco of
         -1:   begin s^.Balanco:=0; 
              AltecoShanghita:=false end;
          0: s^.Balanco:=1;
          1:
            begin
              s1:=s^.DekstraSubarbo;
              if s1^.Balanco = 1
              then
                begin
                  s^.DekstraSubarbo:= 
                          s1^.MaldekstraSubarbo;
                  s1^.MaldekstraSubarbo:=s;
                  s^.Balanco:=0; s:=s1
                end
              else
                begin
                  s2:=s1^.MaldekstraSubarbo;
                  s1^.MaldekstraSubarbo:=
                          s2^.DekstraSubarbo;
                  s2^.DekstraSubarbo:=s1;
                  s^.DekstraSubarbo:=
                          s2^.MaldekstraSubarbo;
                  s2^.MaldekstraSubarbo:=s;
                  if s2^.Balanco = 1
                    then s^.Balanco:=-1
                    else s^.Balanco:=0;
                  if s2^.Balanco = -1
                    then s1^.Balanco:=1
                    else s1^.Balanco:=0;
                  s:=s2
                end;
              s^.Balanco:=0;
              AltecoShanghita:=false
            end {case 1}
        end {case}
    end
  else
    writeln('Jam ekzistas')
end;
```

Nove sen komento la procedaĵoj por kreado kaj forigo. La procedaĵoj 
`Estingu` kaj `Aldonu` fakte estas la pakaĵoj por la supre priskribitaj algoritmoj. 
Ja uzanton de la objekto `tEkviArbo` certe ne interesas, ĉu la alteco de la arbo 
estas ŝanĝita je unu, kaj ne la variablo s, kiu fine nur redonas la radikon. 
Ĝi nur servas por trovo kaj retrotrovo de la vojo inter radiko kaj koncernata nodo.

```pascal
constructor tEkviArbo.Krei;
begin
  tObject.Init;
  Radiko:=nil;
end;

destructor tEkviArbo.Forigi;
begin
  if Radiko<>nil then Dispose(Radiko,Forigi);
  tObject.Done;
 end;

procedure tEkviArbo.Aldonu(Iu: String; IuAdreso: tAdreso);
var
  AltecoShanghita: Boolean;
begin
  Adreso.Strato:=IuAdreso.Strato;
  Adreso.Urbo:=IuAdreso.Urbo;
  AltecoShanghita:=false;
  Aldoni(Iu,Radiko,AltecoShanghita);
end;

procedure tEkviArbo.Estingu(Iu: String);
var
  AltecoShanghita: Boolean;
begin
  AltecoShanghita:=false;
  Estingi(Iu,Radiko,AltecoShanghita);
end;
```

Fine nun la modulo, kiu entenas ĉion ĉi:

```pascal
unit EkviArbo;
  {Uzebla de normala Paskalo kun objektoj aŭ 
  por Paskalo por Vindozo}

INTERFACE

{$IFDEF WINDOWS}
uses WObjects, WinCrt;
{$ELSE}
uses Objects, Crt;
{$ENDIF}

type
  tAdreso=record Strato,Urbo: String end;

  pSubarbo=^tSubarbo;
  ...
  pEkviArbo=^tEkviArbo;
  ...

IMPLEMENTATION

{--------------------tSubarbo-----------------------------}

  constructor tSubarbo.Krei(Iu, IuStrato, IuUrbo: String);
  ...

{----------------------tEkviarbo--------------------------}

  constructor tEkviArbo.Krei;
  ...

{---------------------------------------------------------}

begin
{$IFDEF WINDOWS}
  RegisterWObjects;
  RegisterType(rSubarbo);
{$ELSE}
  RegisterObjects;
   RegisterType(rSubarbo);
{$ENDIF}
end.
```

Post tio nun estu prezentata tre simpla programo, kiu uzas nian novan 
strukturon. La simpleco de la programo estas ŝuldata al la deziro, ke 
ĝi funkciu sub diversaj Paskal-versioj kaj nur prezentu la bazajn kvalitojn
kaj uzeblecojn de ekvilibrita arbo. Certe vi mem eltrovos pli bone aspektantajn aplikaĵojn.

```pascal
program ArboTesto;

{$IFDEF WINDOWS}
uses WinCrt,Ekviarbo,WObjects;
{$ELSE}
uses Crt,Ekviarbo,Objects;
{$ENDIF}

const
Datumaro='Arbo.Dat';

var
Arbo: pEkviarbo;
k,s,u: String;
a: tAdreso;
Fino: Boolean;
c: Char;

procedure Bildo(w: pSubarbo; l: Integer; 
          Strukturo: Boolean);
var
i: Integer;
begin
if w <> nil
then with w^ do
  begin
    Bildo(MaldekstraSubarbo,l+1,Strukturo);
    if Strukturo then
      for i:=1 to l do Write('      ');
    Write(Nomo);
    if not Strukturo then
      Write(' ',Strato,' ',Urbo);
    Writeln;
    Bildo(DekstraSubarbo,l+1,Strukturo)
  end
end;

procedure Savi;
var
s: tDosStream;
begin
  Writeln; Writeln('Savas la arbon...');
  s.Init(Datumaro,stCreate);
  if Arbo^.Radiko<>nil
  then s.Put(Arbo^.Radiko);
  s.Done;
end;

procedure Legi;
var
s: tDosStream;
begin
  Writeln; Writeln('Legas la arbon de diskedo...');
  s.Init(Datumaro,stOpenRead);
  if Arbo^.Radiko<>nil
  then Arbo^.Radiko^.Forigi;
  Arbo^.Radiko:=pSubarbo(s.Get);
  s.Done;
  Writeln; Bildo(Arbo^.Radiko,0,false);
end;

procedure Forigi;
begin
  Writeln; Writeln('Forigas chion');
  if Arbo^.Radiko<>nil
  then
  begin
    Arbo^.Radiko^.Forigi;
    Arbo^.Radiko:=nil;
  end;
end;

procedure Estingi;
begin
  Writeln; Bildo(Arbo^.Radiko,0,false);
  Writeln; Write('Kiun estingi?  '); Readln(k);
  while (k<> '') do
  begin
    Arbo^.Estingu(k);
    if Arbo^.Radiko=nil then k:=''
    else begin
      Writeln; Bildo(Arbo^.Radiko,0,false);
      Writeln; Write('Kiun ankorau estingi?  '); 
      Readln(k)
    end;
  end;
  if Arbo^.Radiko=nil
  then
  begin
    Writeln; Writeln('Arbo estas malplena'); 
  end;
end;

procedure Aldoni;
begin
  Writeln; Write('Kiun aldoni?  '); Readln(k);
  if k<>'' then begin
    Write('Strato:'); Readln(s);
    Write('Urbo:'); Readln(u);
  end;
  while k <> '' do begin
    a.Urbo:=u; a.Strato:=s;
    Arbo^.Aldonu(k,a);
    Write('Kiun ankorau aldoni? '); Readln(k);
    if k<>'' then begin
      Write('Strato:'); Readln(s);
      Write('Urbo:'); Readln(u);
    end;
  end;
end;

procedure Listo;
begin
  Writeln;  Bildo(Arbo^.Radiko,0,false); Writeln;
end;

procedure Strukturo;
begin
  Writeln; Bildo(Arbo^.Radiko,0,true); Writeln;
end;

procedure Fini;
begin
  Writeln; Writeln('Fino de la programo');
end;

begin
  Fino:=false; c:=' '; New(Arbo,Krei);
  while Fino=false do begin
    Writeln;
    Writeln('(A)ldoni + Serchi;  (E)stingi;  
                          (L)egi;  (S)avi;  ');
    Writeln('a(R)bo;  l(I)sto;  f(O)rigi chion;  (F)ini'); 
    c:=ReadKey;
    case c of
    'A','a': Aldoni;
    'E','e': Estingi;
    'O','o': Forigi;
    'R','r': Strukturo;
    'I','i': Listo;
    'L','l': Legi;
    'S','s': Savi;
    'F','f': begin Fini; Fino:=true; end;
    end
  end;
  Dispose(Arbo, Forigi);
end.
```

## Fonto

La algoritmoj de la procedaĵoj `Estingi` kaj `Aldoni` estas prenitaj el la libro:
Niklaus Wirth; "Algorithmen und Datenstrukturen mit Modula-2", 
4a eldono, ĉap. 4.4.8, Teubner-Verlag Stuttgart, 1986


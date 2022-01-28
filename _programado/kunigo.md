---
layout: page
title: Kunigo
---

Ofta tasko en komputilado estas la kunigado de du tabeloj komparante 
la enhavon de du specifaj kolumnoj.  Supozeble ĉiu programlingvo kapablas 
fari tion, sed ĉiuj nomas la koncepton per alia vorto, ekz-e 
SQL: *JOIN*, Excel: *VLOOKUP*, Prologo: *Unification* kaj en 
multaj lingvoj oni devas aparte programi ĝin per *WHILE*-maŝo kaj komparo.

Se ni havas ekzemple unu liston de ĉiuj paĝoj en Vikipedio kaj unu liston 
kun ĉiuj kapvortoj de Revo kaj volas eltrovi, kiuj vortoj estas klarigitaj 
kaj en Revo kaj en Vikipedio por aldoni referencojn, ni devos kompari kaj ekstrakti ilin per kunigo.
Oni povas elŝuti tian [liston de duonmiliono da paĝonomoj 
ĉe Vikipedio](http://download.wikimedia.org/eowiki/latest/eowiki-latest-all-titles-in-ns0.gz)
kaj ricevas tian tre miksitan liston:

```
!
!!
!!!
!!!_(muzikalbumo)
!Kung_lingvaro
!Xó
!Xóõ-a_lingvo
"
"Esperanto_en_Azio"
"Kronika"_boreliozo_Lyme
"Sapsan"_de_RZD
"Taurus"_de_Österreichische_Bundesbahnen
"Weird_Al"_Yankovic
"la_Patroj_de_la_Eklezio"
$
$100_Laptop
...
A-Komitatano
A-Star-Reul_Hyanghae_Chaguchagu
A-Star_Reul_Hyanghae_Chaguchagu
A-ha
A-ha_live_at_Vallhall_-_Homecoming
A-horizonto
A-karaktera_radiko
A-mei
A-minora
A-minoro
A-pineno
A-terpineno
A-terpinila_acetato
A-vitamino
A-vorteca_vorteto
A-vorto
...
Zygmunt_Smogorzewski
Zygmunt_Szendzielarz
Zygophyllaceae
Zygophyllales
Zygophyllum
Zygoptera
Zyli
Zymoseptoria_tritici
Zyprexa
Zyrardow
Zyrill_Fischer
Zyvile
Zywiec
...
🧓
🧔
🧕
🧠
🧡
🧢
🧤
🧦
```

### Brosado de la krudaj datumoj

La Viki-liston ni devas unua malpaki per `gzip -d < eoviki.gz`
kaj ĉe tiu okazo ni forigos ankaŭ ĉiujn listerojn, kiuj ne konsistas el nur literoj, streketoj kaj substrekoj. Substrekojn Vikipedio uzas kiel intervorta spaco. Ni ankaŭ forigos mallongigojn, kiuj havus majsuklon kiel dua litero: `grep -E "^[[:upper:]][-[:lower:]][-_[:alpha:]]*$"`. La paŝojn de la brosado ni konektas per tub-signoj: `|`. Laŭbezone ni povos ankoraŭ ennestigi la rezulton en XML-strukturon.

```bash
echo '<?xml version="1.0"?><viki>'
gzip -d < eoviki.gz \
  | grep -E '^[[:upper:]][-[:lower:]][-_[:alpha:]]*$' \
  | sed  -E 's%^(.*)$%<v>\1</v>%'
echo '</viki>'
```

### Kunigo esprimata en diversaj lingvoj

#### Ŝelo

La plej simpla metodo kunigi du dosierojn laŭ komuna kolumno ŝajnas esti la bazaj GNU-komandoj `sort` kaj `join` iel tiel:

```bash
join -i -t , \
  <(sort vikilst.csv | tr '_' ' ') \
  <(sort -t , revo_drv.csv)
```

Bedaŭrinde tio ĉe mi ne funkcias, pro unikodaj signoj en la listoj! Se vi trovis elegantan manieron eviti aŭ solvi tiun problemon, nepre skribu! Sola ebleco ŝajnas esti, tute forbrosi ĉiujn ne-esperantajn vortojn unue kaj konverti al iso-8859-3 aŭ uzi la x-kodon (cx, gx ktp).

#### SQL (rilatecaj datumbazoj)

```sql
SELECT v.titolo, r.mrk 
FROM vikipedio v
LEFT JOIN revo_drv r ON v.titolo = r.kap;
```

Ni devos ankoraŭ minuskligi kaj anstataŭigi la substrekojn por la komparo:

```sql
SELECT v.titolo, r.mrk 
FROM vikipedio v
LEFT JOIN revo_drv r 
     ON REPLACE(LOWER(v.titolo),'_',' ') = LOWER(r.kap);
```

#### Prologo

```prolog
referenco(Vorto,Marko) :-
    vikipedio(Vorto),
    revo_drv(Vorto,Marko).
```

kaj same kun la minuskligo kaj anstataŭigo de substrekoj:

```prolog
referenco(Vorto,Marko) :-
    vikipedio(Vorto),
    revo_drv(Kapvorto,Marko),
    regula(Vorto,KomparaVorto),
    regula(Kapvorto,KomparaVorto).

% ni minuskligas la vortojn kaj anstaŭigas substrekojn per spacoj
regula(Neregula,Regula) :-
    downcase_atom(NeRegula,Minuskla),
    atomic_list_concat(Vortoj,'_',Minuskla),
    atomic_list_concat(Vortoj,' ',Regula).
```

#### Perlo

Sen indeksi la komparliston daŭras eterne, do ni unue kreas asocian liston (haketmapon) el unu el la listo:    

```perl
my %drv_oj;
while (<REVO_DRV>) {
    chomp;
    my ($kapvorto,$marko) = split(';');
    $drv_oj->{$kapvorto} = $marko;
}
```

Poste ni povas trakuri la Vikiliston kaj trovi la konvenajn kapvortojn

```perl
my %ref_oj
while(<VIKI>) {
    chomp;
    my $regula = lc($_);
    $regula =~ s/_/ /g;
    my $mrk = $drv_oj->{$regula};
    print "$_;$mrk\n" if ($mrk);
}
```

#### XSLT

Denove ni devas uzi indekson (ŝlosilon, angle: *key*), ĉar aliokaze daŭros pli ol kelkajn minutojn, kompari la plurcent mil vikipediajn paĝojn kun la plurdek mil kapvortoj de Revo.

```xml
<xsl:key name="rindekso" 
    match="indekso/kap-oj[@lng='eo']/v[@mrk!='']" 
    use="lower-case(k)"/>

<!-- ni bezonas la dokumentradikon kiel 
     kunteksto malsupre -->
<xsl:variable name="radiko" select="/"/>

<xsl:template match="/">
  <vikiref>
    <xsl:for-each 
        select="document('eoviki.xml')//v">
      <xsl:call-template name="kunigo">
        <xsl:with-param name="viki" select="."/>
      </xsl:call-template>
    </xsl:for-each>
  </vikiref>
</xsl:template>

<xsl:template name="kunigo">
  <xsl:param name="viki"/>    
  <!-- kunteksto devas esti la dokumento 
       de la indekso! -->
  <xsl:for-each 
      select="$radiko/key('rindekso',
      translate(lower-case($viki),'_',' '))">
    <r v="{$viki}" r="{@mrk}"/>
  </xsl:for-each>
</xsl:template>    
```

Resume, evidentiĝas, ke en XSLT oni devas tajpi pli multe da kodo por realigi la kunigon de referencoj el du fontoj. Ni tamen decidis realigi tion per XSL en Revo, ĉar pli ol koncizeco rolas la kunteksto:

- granda parto de Revo estas transformado de XML per XSLT kaj aparte la indeksoj tiel kreiĝas
- do la fontodosiero de kapvortoj kaj markoj jam kreiĝas kiel XML-dosiero dum tiu procedo
- uzo de XML garantias sintakse ĝustajn rezultojn, kio malgrandigas la riskon de nerimarkitaj fuŝaĵoj



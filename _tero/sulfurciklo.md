---
layout: laborfolio
title: Sulfurciklo
chapter: 1.7
js:
  - sekcio-0b
  - yedmap-0b
js-ext:
  - mathjax3
---


<!--
https://en.wikipedia.org/wiki/Sulfur_cycle
https://de.wikipedia.org/wiki/Schwefelkreislauf
https://www.chemistryworld.com/features/the-secrets-of-the-sulfur-cycle/4015331.article
https://www.spektrum.de/lexikon/biologie-kompakt/schwefelkreislauf/10538
https://www.spektrum.de/lexikon/biologie/schwefelkreislauf/60195
https://www.spektrum.de/lexikon/geographie/schwefelkreislauf/7098
https://www.spektrum.de/lexikon/geowissenschaften/schwefelkreislauf/14560
-->


<script>

// ni ekstraktis el la origina fosforciklo-detala.graphml 
// per relo-biokemio/pro/trf/graphml2model.pl
const eĝoj = {
  "e0": ["n0", "n1" ],
  "e1": ["n8", "n1" ],
  "e2": ["n2", "n0" ],
  "e3": ["n1", "n2" ],
  "e4": ["n9", "n0" ],
  "e5": ["n8", "n9" ],
  "e6": ["n1", "n8" ],
  "e7": ["n2", "n1" ]
}
/*
const rondvojo = [
  '#mineraloj',
  '#sulfato',
  '#organismoj',
  '#atmosfero',
  '#sulfato',
  '#mineraloj',
  '#industrio',
  '#atmosfero'
]
*/

function je_stacio(celo,node) {
  if (celo[0] == '#') {
    // fermu ĉiujn malfermitajn sekciojn sed malfermu la celitan...
    Sekcio.malfermu(celo.substring(1),true);
  }
}

function al_sekcio(celo) {
  location.href = celo;
  // normale jam devas esti malfermita, sed eble tamen (re)fermita
  Sekcio.malfermu(celo.substring(1));
}

function movo_lau(egho,pado) {  
  let x = 30; //3s
  function dormu(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
  }  
  function movu() {
    if (x>0) {
      x--;
      pado.setAttribute("stroke-dashoffset",x);
      dormu(100).then(movu);
    } else {
        pado.classList.remove('mova');
    }
  };

  pado.classList.add('mova');
  movu();
}


let yedmap;

window.onload = () => {
  Sekcio.aranĝo();

  const yedSvg = document.querySelector("#y\\.node\\.0").closest("svg");
  yedmap = new YedMap(yedSvg,eĝoj,je_stacio,al_sekcio,movo_lau);
  yedmap.preparu("#mineraloj"); // , rondvojo
}
</script>

<style>
  .nuna {
    font-weight: bold;
    stroke-width: 2;
    stroke: #C44;
    stroke-dasharray: 3,2;
  }
  .nuna rect {

    fill: cornflowerblue;
  }
  .vm_nuna {
    stroke-width: 2;
    stroke: #C44;
    font-weight: bold;
  }
  .mova {
    stroke-dasharray: 3,3;
  }
</style>

{% include_relative inc/sulfurciklo-detala.svg %}


## mineraloj
{: .sekcio #mineraloj}

Sulfuro troviĝas en minerloj kiel pirito, $$\ce{FeS2}$$, aŭ
gipso -- akvohava kalcia sulfato -- $$\ce{Ca[SO4]·2H2O}$$.

Per vulkana aktiveco kaj erozio la mineraloj dissolviĝas, precipe kiel sulfatjonoj en la oceano[^W2].

## sulfatoj
{: .sekcio #sulfato}

Sulfatoj estas saloj de la sulfata acido. La saloj enhavas la jonon 
$$\ce{[SO4]^2−}$$ aŭ la jonon $$\ce{[HSO4]^−}$$.

Metalsulfatoj troviĝas en [mineraloj](#mineraloj) kiel gipso. Sulfatoj krome troviĝas en organikaj restaĵoj, solvitaj en akvo kaj kiel aerosolo en la atmosfero.

organikaj sulfur-molekuloj:

- aminacidoj: metionino, cisteino
- sulfokvinovozo ("glukozo kun sulfur-ligo", en: https://en.wikipedia.org/wiki/Sulfoquinovose)

## organismoj
{: .sekcio}

{% include_relative inc/sulfurciklo-biologia.svg %}

Sulfuro havas kvar precipajn oksidstatojn. La energia potencialo inter tiuj estas
uzata de organismoj en ambaŭ direktoj aŭ por gajni energion per oksidigo 
kaj asimilado de elementoj (ekz-e karbono el karbondioksido), aŭ por oksidigi hidrogenon
k.a. [^W6] [^W5].

### asimilado de sulfato

Mikroorganismoj kaj plantoj asimilas sulfaton por formi organikajn molekulojn kun SH-grupoj (sulfhidril-grupoj).
Aminacidoj kun tiaj grupoj estas metionino kaj cisteino. Krome sulfurhavajn heterociklojn kiel biotinon (vitamino B₇).
Ĉe tiu procezo sulfato ligita ĉe adenozintrifosfosulfato devas aktiviĝi al 
[3′-fosfoadenozin-5′-fosfosulfato (PAPS)](../biokemio/PAPS).


### putrado (malkombiniĝo)

Kiam vivaĵoj mortas, la sulfuro organikaj kombinaĵoj estas detruitaj de 
enzimoj kaj mikroorganismoj (Escherichia, Proteus k.a.).
Dum tio liberiĝas i.a. $$\ce{H2S}$$, venena por plej multaj vivaĵoj.


### oksidigo de sulfido

- Per oksidigo de $$\ce{H2S}$$ kun oksigeno al elementa sulfuro kelkaj mikroorganismoj (Beggiatoa, Thiovulum) 
  gajnas energion necesan por asimilado de karbondioksido.
- Per senoksigena fotosintezo kelkaj bakterioj uzas $$\ce{H2S}$$ kiel
  reduktilon por asimilado de karbondioksido. Ĉe tio estiĝas elementa sulfuro (Chromatium, Chlorobium)
  aŭ sulfato (purpurbakterioj)


### oksidigo de sulfuro:

Iuj bakterioj (Thiobacillus, Acidithiobacillus) kaj arĥeoj (Acidianus) oksidigas elementan sulfuron kun oksigeno
al sulfato. Ankaŭ kelkaj el la supre nomitaj sulfidoksidigaj organismoj kapablas pri tio. La liberiĝanta energio estas uzebla de la mikroorganismoj (ĥemotrofio).

### redukto (spirado) de sulfato

Certaj neoksigenuzaj bakterioj (Desulfovibrio, Desulfobacter) oksidigas hidrogenon aŭ organikajn substancojn
per sulfato. Estiĝas tiel ekz-e $$\ce{H2S}$$. Ĉe tio la sulfato ligiĝas al adenozinmonofosfato al
adenozinfosfosulfato (APS).

### redukto de sulfuro

Iuj bakterioj (Desulfuromonas) kaj arĥeoj (Pyrococcus) povas oksidigi hidrogenon aŭ organikajn substancojn
kun elementa sulfuro (t.e. sen oksigeno) al $$\ce{H2S}$$ uzante la liberiĝantan energion (ĥemotrofio).


## industrio
{: .sekcio #industrio}

ellaso de SO2

## atmosfera sulfuro
{: .sekcio #atmosfero}

<!-- https://de.wikipedia.org/wiki/Dimethylsulfoniumpropionat -->

En la atmosfero sulfuro aperas en pluraj kombinaĵoj:

1. Kiel sulfura dioksido ($$\ce{SO2}$$) ĝi devenas el vulkanoj, fumo de la industrio kaj DMS (vd. sub 3). 
Ĝi kaŭzas la acidan pluvon per oksidiĝo al sulfura trioksido ($$\ce{SO3}$$) kaj reago 
kun akvo al $$\ce{H2SO4}$$, t.e. sulfata acido[^W1]. Kiel kondensĝermo ĝi grave kontribuas al formado
de aerosolo kaj nuboj.

3. Kelkaj organikaj procezoj kiel putrado produktas $$\ce{H2S}$$, venanan gason malbonodora kiel putrantaj ovoj[^W5].

4. Dimetilsulfido (DMS), $$\ce{(CH3)2S}$$, originas el organikaj kombinaĵoj produktataj de fitoplanktono kaj bakterioj en la oceano kaj marĉoj kaj donas al la maroj ilian tipan odoron.
Per oksidiĝo estiĝas sulfura dioksido[^W3] [^W4] (vd sub 1).

## fontoj
{: .fontlisto}

[^W1]: [(de) Vikipedio: Schwefeldioxid (sulfura dioksido)](https://de.wikipedia.org/wiki/Schwefeldioxid)
[^W2]: [(en) Vikipedio: Sulfur sources and sinks (Sulfurfontoj kaj -malfontoj)](https://en.wikipedia.org/wiki/Sulfur_cycle#Sulfur_sources_and_sinks)
[^W3]: [(de) Vikipedio: Dimethylsulfid (dimetilsulfido)](https://de.wikipedia.org/wiki/Dimethylsulfid)
[^W4]: [(en) Vikipedio: CLAW hypothesis (hipotezo de CLAW)](https://en.wikipedia.org/wiki/CLAW_hypothesis)
[^W5]: [(de) Vikipedio: Schwefelkreislauf (sulfurciklo)](https://de.wikipedia.org/wiki/Schwefelkreislauf)
[^W6]: [(en) Vikipedio:Sulfur oxidation state (Oksidstatoj de sulfuro)](https://en.wikipedia.org/wiki/Sulfur_cycle#Sulfur_oxidation_state)
---
layout: laborfolio
title: Fosforciklo
chapter: 1.6
js:
  - sekcio-0b
  - yedmap-0b
js-ext:
  - mathjax3
---

Alie ol ĉe azoto, oksigeno, karbondioksido kaj akvovaporo, la atmosfero ne ludas
gravan rolon en la transportado de la vivelemento fosforo. Do terenoj teraj kaj akvaj
havas siajn apartajn ciklojn, kvankam okazas ankaŭ interŝanĝo inter ili ekzemple per
enfluo aŭ ellavo de materialo.

Entute la fosforciklo, kompare kun aliaj vivnutraj cikloj, estas tre malrapida 
ekster vivantaj organismoj kaj nur malmulte el la ekzistanta fosforo haveblas
en solvita formo por vegetaĵoj.

<!--
- surtera
![forsforciklo surtera](../assets/bld/fosforciklo.png)
- akva
-->

<script>

// ni ekstraktis el la origina fosforciklo-detala.graphml 
// per relo-biokemio/pro/trf/graphml2model.pl
const eĝoj = {
  "e0": ["n0", "n1" ],
  "e1": ["n1", "n2" ],
  "e10": ["n7", "n1" ],
  "e11": ["n5", "n0" ],
  "e12": ["n0", "n8" ],
  "e13": ["n8", "n1" ],
  "e2": ["n2", "n1" ],
  "e3": ["n1", "n3" ],
  "e4": ["n3", "n4" ],
  "e5": ["n4", "n5" ],
  "e6": ["n5", "n1" ],
  "e7": ["n3", "n6" ],
  "e8": ["n4", "n6" ],
  "e9": ["n5", "n7" ]
}

const rondvojo = [
  '#mineraloj',
  '#fosfato',
  '#plantoj',
  '#bestoj',
  '#restoj',
  '#fosfato'
]

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
  yedmap = 
    new YedMap(yedSvg,eĝoj,je_stacio,al_sekcio,movo_lau)
    .preparu("#mineraloj",rondvojo);
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


{% include_relative inc/fosforciklo-detala.svg %}


{::options parse_block_html="true" /}

## mineraloj
{: .sekcio #mineraloj}

Fosforhavaj mineraloj estas unuavice apatitoj, grupo de mineraloj kun ĝeneraligita formulo:
$$\ce{Ca5[(F,Cl,OH)|(PO4)3]}$$.
Ili formiĝas en magmo aŭ per sedimentiĝo de organika materialo.

Ostoĉeloj povas produkti el kalciaj kaj fosfataj jonoj la mineralon hidroksilapatito:
$$\ce{Ca5[OH|(PO4)3]}$$.
Tiel ostoj enhavas ĝin je duono, dentoj eĉ pli.  

Oni minas apatiton i.a. por produktado de mineralaj [sterkoj](#sterko). 
Erozio kaj vetero dissolvas la mineralon. 
Tiel [fosfato](#fosfato) atingas en la akvon kaj grundon, de kie vegetaĵoj povas enpreni ĝin.


## fosfatjonoj
{: .sekcio #fosfato}


<!-- https://de.wikipedia.org/wiki/Phosphor#Im_Boden -->

La fosforo en la grundo devenas aŭ el eroziitaj [mineraloj](#mineraloj) kiel apatitoj aŭ el organikaj 
[restaĵoj](#restoj). Homoj ankaŭ minas la mineralojn kaj produkas neorganikan sterkon. Simile bestaj ekstrekmentoj estas uzataj por sterkado kaj oni strebas regajni fosforon dum purigado de restakvoj, kiu alie perdiĝas en la restanta ŝlimo.

La plej granda parto de fosforo en la grundo troviĝas en stabilaj kombinoj, kiel apatitoj kaj kalciaj fosfatoj,
$$\ce{Ca3(PO4)2}$$, ne uzeblaj de vegetaĵoj, oni kalkulas je 3000 – 6000 kg/ha.

La dua plej granda parto estas nestabilaj fosfor-kombinoj adsorbitaj al aluminiaj kaj feraj oksidoj kaj argilo. Oni kalkulas pri 500 - 900 kg/ha. Per maladsorbo el tiuj povas liberiĝi fosfato uzebla de vegetaĵoj.

Oni kalkulas pri nur 1 - 2 kg/ha da solvita fosfato en la formo $$\ce{H2PO4^−}$$ aŭ $$\ce{HPO4^2−}$$, rekte uzebla de plantoj.[^W5]

## ferofosfato
{: .sekcio #ferofosfato}


Se la akvo de lago havas sufiĉe da oksigeno, fosfato sedimentiĝas en formo de $$\ce{Fe(III)PO4}$$. Tion oni nomas *fosfatkaptilo*. 

Fosfato en la supro de la lago estas enprenata de algoj. Post ties morto kaj sinkado, la fosfato en la profundo liberiĝas el la organika maso. Se tie troviĝas sufiĉa oksigeno, Fe(II)-jonoj povas oksidiĝi al Fe(III)-jonoj kaj precipiti kun la fosfato kiel $$\ce{Fe(III)PO4}$$ (ferofosfato).

$$\ce{Fe^3+ + PO4^3− → FePO4}$$

Ĉe manko de grunda oksigeno la fero reduktiĝas kaj liberigas la fosfaton el la kaptilo. Kiam pro cirkulado de la akvo ĝi supriĝas, tio povas kaŭzi amasan kreskadon de algoj. La profundiĝanta biomaso siavice povas foruzi tiom da grunda oksigeno, ke la fosfatkaptilo ĉesas funkcii daŭre. La ekvilibro de la lago "renversiĝas"[^W6].

Tiu renversiĝo estas pli verŝajna, se lago "sterkiĝas" per fosfato, kio per naturaj procezoj okazas tre malrapide, sed pro influo de la homo, kiam fosfatriĉa akvo el industrio kaj agrikulturo enfluas la lagon, povas okazi tre akcelate.

## vegetaĵoj
{: .sekcio #plantoj}


<!-- https://de.wikipedia.org/wiki/Phosphor#Im_Boden -->
Vegetaĵoj enprenas fosfaton kaj biologie adsorbas ĝin en sia organismo.
Ĉe la enpreno helpas enzimoj produktitaj de plantoj kaj mikroorganismoj, la fosfatazoj[^W1].

En la maroj estas preipe la fitoplanktono, mikroorganismoj kun fotosintezo, kiu 
enprenas fosfatjonojn por formado de organikaj molekuloj.

Fosforo estas i.a. esenca parto de la genaj molekuloj (RNA kaj DNA) kaj 
liveranto de energio per la molekulo ATP. La seka maso de surteraj
vegetaĵoj enhavas 0,15 % ĝis 0,50 % da fosforo[^W1].


## bestoj
{: .sekcio #bestoj}


Bestoj (inkluzivante mikroorganismojn kiel la zooplanktonon de la maroj) 
ricevas la bezonatan fosforon nutrante sind de vegetaĵoj kaj aliaj bestoj. 

Skelethavaj bestoj bezonas multe pli da fosforo ol vegetaĵoj, ĉar ĝi konsistigas 
konsiderindan parton de la ostoj kaj dentoj. La seka maso de
mamuloj enhavas ĉirkau 4% da fosforo. Tiel ekzemple plenkreska homo portas 
en si 700g da fosforo, el kiuj 600g estas parto de la ostoj. Ĉiutage por 
homo necesas enpreni averaĝe 0,75g i.a. per laktaĵoj, viando, fiŝaĵo, pano[^W1].


## restaĵoj
{: .sekcio #restoj}

La organika fosforo estas parte ekskrementata kaj la cetero aperas en la restaĵoj de mortintaj organismoj.
Iuj bakterioj kaj fitoplanktono havas enzimojn por hidrolizi organikajn fosforomolekulojn por regajni 
ĝin kiel fosfatjonoj.

La plej granda parto remineraliĝas, el kiu en maroj ĉirkaŭ 1% sedimentiĝas sur la marfundo[^W3]. Fiŝmanĝantaj birdoj lasas fosforhavajn ekskrementojn sur rokoj kiel [guano](#sterko).

## detruaj organismoj
{: .sekcio #detruantoj}

<!-- 
https://www.spektrum.de/lexikon/biologie-kompakt/destruenten-saprophagen-nahrungkette/2990
https://de.wikipedia.org/wiki/Saprobiont
https://de.wikipedia.org/wiki/Saprobiont#/media/Datei:Destruenten_im_Stoffkreislauf.svg 
-->

Sub *detruantoj* oni povas kategorii du grupojn da vivaĵoj kiuj nutras sin de organikaj restaĵoj kaj tiel recikligas la
fosforon.

Al la unua grupo apartenas putraj bakterioj (bezonantaj oksigenon) kaj fungoj, kiuj ĥemie detruas la organikan materialon en sia metabolo kaj liberigas i.a fosfatjonojn, kiujn la vegetaĵoj povas enpreni. Kelkaj vivas en simbiozo kun tiuj vegetaĵoj (ekzemple mikorizo, en kiu fungo interŝanĝas substancojn kun la radikoj de plantoj).

La alia grupo estas bestoj, kiuj diserigas kaj manĝas ekskrementojn kaj kadavrojn de aliaj bestoj kaj tiel ebligas al la unua grupo pli larĝe aliri tiun materialon. Al tiu grupo apartenas pluraj insektoj (skaraboj, termitoj), krustacoj, vermoj, ... ankaŭ la vulturoj[^W4] [^S2].


## sterkoj
{: .sekcio #sterko}


Tradicie kiel fosforsterkoj estas uzataj bestaj ekskrementoj: aŭ rekte de la bredado aŭ, antaŭ la haveblo de minerlaj fosforsterkoj, kiel guano, birdaj ekskrementoj kolektiĝintaj sur rokoj de insuloj.

Por la industrie produktitaj fosfatsterkoj oni ekspluatas la [mineralojn](#mineraloj) el minoj, kiuj troviĝas en nur sep landoj: Maroko, Jordanio, 
Usono, Rusujo, Sudafriko, Togolando kaj Ĉinujo[^W2]. Oni taksas, ke tiuj minoj elĉerpiĝos jam en la venontaj malmultaj jaroj.
Cetere la mineraloj el tiuj minoj enhavas konsiderindajn kvantojn da kadmio kaj urano, kion oni ne deziras en sia nutraĵo.

Tial necesas recikligi la fosforon el ekskrementoj, aparte tiuj kolektiĝantaj de la urboj en la ŝlimo de la
akvopurigejoj.

## konsumado
{: .sekcio #konsumado}


Per rikolto, fiŝkaptado kaj bredado de bestoj kaj ties konsumado 
la homoj transportas multe da fosforo el la naturaj kaj agrikulturaj 
regionoj en la urbojn kaj devas anstataŭigi ĝin sur la 
kampoj per [sterkado](#sterko).

Ĉar la apatitminoj baldaŭ elĉerpiĝos oni strebas regajni fosforon el 
restakvo kaj homaj ekskrementoj en la akvopurigejoj. 


### fontoj

[^W1]: [(de) Vikipedio: Phosphor, Biologische Bedeutung (Fosforo, biologia signifo)](https://de.wikipedia.org/wiki/Phosphor#Biologische_Bedeutung)

[^W2]: [(de) Vikipedio: Phosphate, Gewinnung (Fosfatoj, produktado)](https://de.wikipedia.org/wiki/Phosphate#Gewinnung)

[^W3]: [(en) Vikipedio: Phosphorus cycling (Forsfora ciklado)](https://en.wikipedia.org/wiki/Phosphorus_cycle#Phosphorus_cycling)

[^W4]: [(de) Vikipedio: Saprobiont](https://de.wikipedia.org/wiki/Saprobiont)

[^W5]: [(de) Vikipedio: Phosphor im Boden (Fosforo en la grundo)](https://de.wikipedia.org/wiki/Phosphor#Im_Boden)

[^W6]: [(de) Vikipedio: Phosphatfalle (fosfatkaptilo)](https://de.wikipedia.org/wiki/Phosphatfalle)


[^S1]: [(de) Kompaktlexikon der Biologie: Phosphorkreislauf](https://www.spektrum.de/lexikon/biologie-kompakt/phosphorkreislauf/8990)

[^S2]: [(de) Kompaktlexikon der Biologie: Detritusfresser](https://www.spektrum.de/lexikon/biologie-kompakt/detritusfresser/3002)

<!-- 
superrigardo:
https://en.wikipedia.org/wiki/Phosphorus_cycle
https://de.wikipedia.org/wiki/Phosphor#Im_Boden
https://www.spektrum.de/lexikon/biologie-kompakt/phosphorkreislauf/8990
http://lossl.de/_VO_951-309_19_PHOSPHOR.pdf

pri malseka grundo:
https://en.wikipedia.org/wiki/Eutrophication
https://de.wikipedia.org/wiki/Phosphatfalle
https://de.wikipedia.org/wiki/Umkippen
-->
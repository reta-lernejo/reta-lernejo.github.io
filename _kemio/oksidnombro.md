---
layout: laborfolio
title: Oksidnombroj
chapter: 1.1
js:
  - folio-0a
  - sekcio-0b
  - lewis-1a
js-ext:
  - mathjax3
css:
  - lewis-0c
---

Ekzemploj:
- [hidrogeno](#){: #hidrogeno onclick="ekz_on(event);"}
- [nitrogeno](#){: #nitrogeno onclick="ekz_on(event);"}
- [oksigeno](#){: #oksigeno onclick="ekz_on(event);"}
- [akvo](#){: #akvo onclick="ekz_on(event);"}
- [karbondioksido](#){: #CO2 onclick="ekz_on(event);"}
- [metano](#){: #CH4 onclick="ekz_on(event);"}
- [metanacido (formikacido)](#){: #HCOOH onclick="ekz_on(event);"}
- [dimetilsulfido](#){: #DMS onclick="ekz_on(event);"}

<script>

/*
const H_ =  [["H","3:"]];
const H2 = [["H","3."],["H","9."]]
const N2 =  [["N","3;9:"],["N","9;3:"]];
const O2 =  [["O","3%:::"],["O","9%:::"]];
const H2O = [["O","Z:a.A.a:"],["H","m e.",1,180-51.5],["H","e.",1,180+51.5]];
const CO2 = [["O","3%:::",-1],["C","3:9:"],["O","9%:::"]];
const CH4 = [["H","3.",-1],["C","3%...."],["H","9."],["H","6.",1,360],["H","0.",1,180]];
const COOH = [["C","1:5:"],["O","",1,30],["O","",1,120],["H"]];
const CH3_ = [["H"],["C"],["H","",1,0],["H","",1,180]];
const _CH3 = [["C"],["H"],["H","",1,0],["H","",1,180]];
const S = [["S","3.9."]];
*/

const grupoj = {
  OH: { a: "OH", l: { o: "3-h" } },
  _CH3: { a: "CH3", l: { c: "pmo-h1 6<h2 7>h3" }}, // angulo al samebena H: pmo = 109°(-45°)
  CH3_: { a: "CH3", l: { c: "omp-h1 6<h2 5>h3" }} // angulo al samebena H: omp = (45°)-109°
}

const molekulo = { // kiel ni difinu prezenton de ligoj kiel paroj? plej bone iel malloke por povi ŝalti la prezenton de la tuta formulo facile 
  H2:  { a: "H2", l: { h1: "3-h2" } }, // l: angulo, ligtipo, celatomo
  O2:  { a: "O2", l: { o1: "3=o2" }, e: { o1: "7:y:", o2: "1:5:" } }, // e-paroj de unua O: ĉe horloĝ-ciferoj 7 kaj 11 (y), de dua O: ĉe ciferoj 1 kaj 5
  N2:  { a: "N2", l: { n1: "3#n2" }, e: { n1: "9:", n2: "3:" } },
  H2O: { a: "OH2", l: { o: "dme-h1 mA-h2" }, e: { o: "Z:ma:" } }, // anguloj de H: dme = 180°-51,5° A = +105°, anguloj de e-paroj: mZ = -42° a = +85°
  CO2: { a: "CO2", l: { c: "3=o2 9=o1" }, e: { o1: "7:y:", o2: "1:5:" } },
  CH4: { a: "CH4", l: { c: "0-h1 3-h2 6-h3 9-h4"} }, // l: pli mallonge eble: "-% h1 h2 h3 h4"
  HCO_OH: { a: "CHO", l: { c: "9-h 1=o 5-OH" }, e: { o: "5:x:" }}, // OH referencas al grupoj, e-paroj de O-atomo: ĉe horloĝciferoj 5 kaj 10 (x)
  DMS: { a: "S", l: { s: "3o-_CH3 k-CH3_" }}, // fakte angulo S-C-C estas 99°, sed ni simpligas al 90°
}


const molekuloj = {
    hidrogeno: molekulo.H2,
    nitrogeno: molekulo.N2,
    oksigeno: molekulo.O2,
    akvo: molekulo.H2O,
    CO2: molekulo.CO2,
    CH4: molekulo.CH4,
    HCOOH: molekulo.HCO_OH,
    DMS: molekulo.DMS // (CH₃)₂S
}
  

function ekz_on(event) {
    event.preventDefault();
    frm = event.target.id;

    // malplenigu
    const on = ĝi("#on_enhavo");
    on.textContent = "";
    const lewis = new Lewis(on);

    // desegnu formulon kiel Lewis-strukturon   
    const molekulo = molekuloj[frm];
    lewis.grupoj = Object.keys(grupoj);
    lewis.molekulo(molekulo);
}

lanĉe (() => {
    const lgrp = new Lewis(ĝi("#oksidnro"));

    // difinu atomgrupojn uzeblajn en molekuloj kiel tuto
    for ([id,grp] of Object.entries(grupoj)) {
      lgrp.grupo(id,grp);
    }
})

</script>

<svg id="oksidnro"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="600" viewBox="-30 -20 150 60">
  <g id="on_enhavo"></g>
</svg>



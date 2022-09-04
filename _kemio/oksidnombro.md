---
layout: laborfolio
title: Oksidnombroj
chapter: 1.1
js:
  - folio-0a
  - sekcio-0b
  - lewis-1a
  - elementoj-0b
js-ext:
  - mathjax3
css:
  - lewis-1a
  - elementoj-0a
---

Ekzemploj:
- [hidrogeno](#){: #hidrogeno onclick="ekz_on(event);"}
- [nitrogeno](#){: #nitrogeno onclick="ekz_on(event);"}
- [oksigeno](#){: #oksigeno onclick="ekz_on(event);"}
- [akvo](#){: #akvo onclick="ekz_on(event);"}
- [karbondioksido](#){: #CO2 onclick="ekz_on(event);"}
- [metano](#){: #CH4 onclick="ekz_on(event);"}
- [metanacido (formikacido)](#){: #HCOOH onclick="ekz_on(event);"}
- [acetacido](#){: #C2H4O2 onclick="ekz_on(event);"}
- [etanolo](#){: #C2H5OH onclick="ekz_on(event);"}
- [dimetilsulfido](#){: #DMS onclick="ekz_on(event);"}

<script>


const grupoj = {
  OH: { a: "OH", l: { o: "3)-h" }, on: "-2 +1" },
  CH3: { a: "CH3", l: { c: "x)-h1 7)>h2 5)<h3" }, on: "-3 +1 +1 +1" }, // angulo al samebena H: pmo = 109°(-45°)
  _CH3: { a: "CH3", l: { c: "pmo)-h1 5)<h2 7)>h3" }, on: "-2 +1 +1 +1" }, // angulo al samebena H: pmo = 109°(-45°)
  CH3_: { a: "CH3", l: { c: "omp)-h1 7)>h2 5)<h3" }, on: "-2 +1 +1 +1" } // angulo al samebena H: omp = (45°)-109°
}

// kalkuli oksidnombrojn vd. https://www.periodni.com/de/oxidationszahlen_rechner.php

const molekulo = { // kiel ni difinu prezenton de ligoj kiel paroj? plej bone iel malloke por povi ŝalti la prezenton de la tuta formulo facile 
  H2:  { a: "H2", l: { h1: "3|-h2" }, on: "0 0" }, // l: angulo, ligtipo, celatomo
  O2:  { a: "O2", l: { o1: "3|=o2" }, e: { o1: "7:y:", o2: "1:5:" }, on: "0 0" }, // e-paroj de unua O: ĉe horloĝ-ciferoj 7 kaj 11 (y), de dua O: ĉe ciferoj 1 kaj 5
  N2:  { a: "N2", l: { n1: "3|#n2" }, e: { n1: "9:", n2: "3:" }, on: "0 0" },
  H2O: { a: "OH2", l: { o: "dme)-h1 mA)-h2" }, e: { o: "Z:ma:" }, on: "-2 +1 +1" }, // anguloj de H: dme = 180°-51,5° A = +105°, anguloj de e-paroj: mZ = -42° a = +85°
  CO2: { a: "CO2", l: { c: "3(=o2 9(=o1" }, e: { o1: "7:y:", o2: "1:5:" }, on: "+4 -2 -2" },
  CH4: { a: "CH4", l: { c: "0)-h1 3)-h2 6)-h3 9)-h4"}, on: "-4 +1 +1 +1 +1" }, // l: pli mallonge eble: "-% h1 h2 h3 h4"
  HCO_OH: { a: "CHO", l: { c: "9)-h 1(=o 5(-OH" }, e: { o: "3:y:" }, on: "+2 +1 -2" }, // OH referencas al grupoj, e-paroj de O-atomo: ĉe horloĝciferoj 5 kaj 10 (x)
  DMS: { a: "S", l: { s: "3o)-_CH3 k)-CH3_" }, on: "-2" }, // fakte angulo S-C-C estas 99°, sed ni simpligas al 90°
  C2H5OH: { a: "CH3O", l: { c: "4(-o 8|-CH3 y)>h1 1)<h2", o: "2)-h3" }, e: { o: "5:7:" }, on: "-1 +1 +1 +1 -2"},
  C2H4O2: { a: "CO2H", l: { c: "0(=o1 4(-o2 8|-CH3", o2: "2)-h" }, e: { o1: "x:2:", o2: "5:7:" }, on: "+3 -2 -2 +1"}
}

const molekuloj = {
    hidrogeno: molekulo.H2,
    nitrogeno: molekulo.N2,
    oksigeno: molekulo.O2,
    akvo: molekulo.H2O,
    CO2: molekulo.CO2,
    CH4: molekulo.CH4,
    HCOOH: molekulo.HCO_OH,
    C2H4O2: molekulo.C2H4O2,
    C2H5OH: molekulo.C2H5OH,
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
    const mol_g = lewis.molekulo(molekulo);
    if (frm == 'DMS') atributoj(mol_g,{ transform: "translate(0 -10)"});
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
    xmlns:xlink="http://www.w3.org/1999/xlink" width="600" viewBox="-35 -30 150 60">
 <style type="text/css">
    <![CDATA[
      path.mkojno {
        stroke: none;
        fill: url(#strie);
      }
    ]]>
  </style>
  <defs>
    <pattern id="strie" viewBox="0,0,4,1" height="20%" width="20%">
      <rect width="2" height="1" fill="black" stroke="black" stroke-width="0.6"/>
    </pattern>
  </defs>
  <g id="on_enhavo"></g>
</svg>


<label for="oksidnombroj">oksidnombroj:</label> <b><span id="oksidnombroj_info">0</span></b>
<input type="range" id="oksidnombroj" style="width: 20em; max-width: 80%" min="-4" max="9" value="0" onchange="aktualigo()" oninput="aktualigo()">


<script>
  let elementoj_tab = [];

  function aktualigo() {
    console.log("akt");
  }

  lanĉe (() => {
    const ps = ĝi("#periodsistemo");
    Elemento.periodsistemo(ps,false,(de_smb,al_smb) => {
        malemfazo(ĝi(`#ps_${de_smb}`),"emfazo_1");
        //aktualigo_distrib(al_smb);                
        if (al_smb) emfazo(ĝi(`#ps_${al_smb}`),"emfazo_1");
    });
    
    // ŝargu apartan element-tabelon kun oksidnombroj...
    Elemento.json_element_tabelo((elmTab) => {
        //valTab = Elemento.laŭ_ŝelo(elmTab);
        elementoj_tab = elmTab;
        // aktualigo();
    });
  });
</script>

<style>
  .emfazo rect {
    fill: #5353FF; /* #9370DB */
  }
  .emfazo text.smb {
    fill: white;
  }
</style>
<svg id="periodsistemo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="100%"
    viewBox="0 0 195 115"
    tabindex="0">
</svg>


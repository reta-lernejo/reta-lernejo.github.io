---
layout: laborfolio
title: Redoksreakcio
chapter: 1.1
js:
  - folio-0a
  - sekcio-0b 
  - lewis-1c
  - elementoj-0c
js-ext:
  - mathjax3
css:
  - lewis-1a  
---

ekzemploj:  
  - kompleta forbruliĝo de metano: $$\ce{CH4 + 2O2 -> CO2 + 2H2O}$$
  - nekompleta forbruliĝo de metano: $$\ce{2CH4 + 3O2 -> 2CO + 4H2O}$$
  - sintezo de metano: $$\ce{CO2 + 4H2 -> CH4 + 2H2O}$$
  - sintezo de amoniako: $$\ce{N2 + 3 H2 -> 2NH3}$$
  - kompleta forbruligo de glukozo: $$\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O}$$

teste...:
- [karbondioksido](#){: #CO2 onclick="ekz_on(event);"}
- [metano](#){: #CH4 onclick="ekz_on(event);"}



<script>

const grupoj = {
  OH: { a: "OH", l: { o: "3)-h" }, on: "-2 +1" },
  CH3: { a: "CH3", l: { c: "x)-h1 7)>h2 5)<h3" }, on: "-3 +1 +1 +1" }, // angulo al samebena H: pmo = 109°(-45°)
  _CH3: { a: "CH3", l: { c: "pmo)-h1 5)<h2 7)>h3" }, on: "-2 +1 +1 +1" }, // angulo al samebena H: pmo = 109°(-45°)
  CH3_: { a: "CH3", l: { c: "omp)-h1 7)>h2 5)<h3" }, on: "-2 +1 +1 +1" } // angulo al samebena H: omp = (45°)-109°
}

// kalkuli oksidnombrojn vd. https://www.periodni.com/de/oxidationszahlen_rechner.php

const molekuloj = { // kiel ni difinu prezenton de ligoj kiel paroj? plej bone iel malloke por povi ŝalti la prezenton de la tuta formulo facile 
  H2:  { a: "H2", l: { h1: "3-h2" }, on: "0 0" }, // l: angulo, ligtipo, celatomo
  O2:  { a: "O2", l: { o1: "3=o2" }, e: { o1: "7:y:", o2: "1:5:" }, on: "0 0" }, // e-paroj de unua O: ĉe horloĝ-ciferoj 7 kaj 11 (y), de dua O: ĉe ciferoj 1 kaj 5
  N2:  { a: "N2", l: { n1: "3#n2" }, e: { n1: "9:", n2: "3:" }, on: "0 0" },
  H2O: { a: "OH2", l: { o: "dme-h1 mA-h2" }, e: { o: "Z:ma:" } }, //, on: "-2 +1 +1" }, // anguloj de H: dme = 180°-51,5° A = +105°, anguloj de e-paroj: mZ = -42° a = +85°
  CO2: { a: "CO2", l: { c: "3=o2 9=o1" }, e: { o1: "7:y:", o2: "1:5:" } }, //, on: "+4 -2 -2" },
  CO: { a: "CO", l: { c: "3#o" }, e: { c: "9:", o: "3:" }, on: "+2 -2" },
  CH4: { a: "CH4", l: { c: "0-h1 3-h2 6-h3 9-h4"}, on: "-4 +1 +1 +1 +1" }, // l: pli mallonge eble: "-% h1 h2 h3 h4"
}

/*
const ekvacioj = {
  metanbrulo: [CH4,'+',2*O2,'->',CO2,'+',2*H2O],
  metankreo: [CO2,'+',4*H2,'->',CH4,'+',2*H2O]
}
*/

function ekz_on(event) {
    event.preventDefault();
    frm = event.target.id;
    desegno(frm);
}

function desegno(frm) {
    // malplenigu
    const svg = ĝi("#redoks_enhavo");
    svg.textContent = "";
    const lewis = new Lewis(svg);
    const elementoj = Elemento.listo();

    // desegnu formulon kiel Lewis-strukturon
    const mlk = molekuloj[frm];
    lewis.grupoj = Object.keys(grupoj);
    const mol_g = lewis.molekulo(mlk,{
      // kalkulu kaj montru oksidnombrojn
      on_fŝ: true,
      // kalkulu kaj montru arkojn de elektron-atributo (por oksidnombroj)
      on_arkoj: true,
      // funkcio, kiu redonas la elektronegativecon de elemento
      eneg: (smb) => elementoj[smb].eneg 
    });
    if (frm == 'DMS') atributoj(mol_g,{ transform: "translate(0 -10)"});
}

lanĉe (() => {
    const lgrp = new Lewis(ĝi("#redokso"));

    // difinu atomgrupojn uzeblajn en molekuloj kiel tuto
    for ([id,grp] of Object.entries(grupoj)) {
      lgrp.grupo(id,grp);
    }

    desegno("H2O")
})

</script>

<svg id="redokso"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="600" viewBox="-35 -30 150 60">
 <style type="text/css">
    <![CDATA[
      path.mkojno {
        stroke: none;
        fill: url(#strie);
      }

      .elemento text.shargo, .jonkrampo text {
        fill: SeaGreen;
        font-weight: bold;
      }

      text.o-nro {
          font-size: 3.5px;
          font-weight: bold;
      }

    ]]>
  </style>
  <defs>
    <pattern id="strie" viewBox="0,0,4,1" height="20%" width="20%">
      <rect width="2" height="1" fill="black" stroke="black" stroke-width="0.6"/>
    </pattern>
  </defs>
  <g id="redoks_enhavo"></g>
</svg>

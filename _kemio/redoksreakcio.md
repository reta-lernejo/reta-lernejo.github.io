---
layout: laborfolio
title: Redoksreakcio
js:
  - folio-0a
  - sekcio-0b 
  - lewis-1c
  - elementoj-0c
js-ext:
  - mathjax3
css:
  - lewis-1c 
---

Se dum redoksa reakcio sume liberiĝas energio en formo de varmo aŭ lumo, oni nomas ĝin ekzoterma, se kontraŭe
energio konsumiĝas - endoterma. Ekzoterma redoksreakcio nomiĝas ankaŭ bruliĝo. Foje oni nomas bruliĝon ankaŭ nur tian ekzoterman reakcion, kiu postlasas kiel reakciaj produktoj nur akvon kaj karbondioksidon.

La reakcianto, kiu oksidas alian reakcianton, t.e. mem reduktiĝas oni nomas oksidilo. La alia reakcianto, kiu oksidiĝas reduktante la duan, estas nomata reduktilo.

ekzemploj:  
  - [kompleta forbruliĝo de metano](#){: #metano_1 onclick="ekz_on(event);"}: $$\ce{CH4 + 2O2 -> CO2 + 2H2O}$$
  - [nekompleta forbruliĝo de metano](#){: #metano_2 onclick="ekz_on(event);"}: $$\ce{2CH4 + 3O2 -> 2CO + 4H2O}$$
  - [sintezo de metano](#){: #metano_3 onclick="ekz_on(event);"}: $$\ce{CO2 + 4H2 -> CH4 + 2H2O}$$
  - [sintezo de amoniako](#){: #amoniako_1 onclick="ekz_on(event);"}: $$\ce{N2 + 3H2 -> 2NH3}$$
  - [kompleta forbruligo de glukozo](#){: #glukozo_1 onclick="ekz_on(event);"}: $$\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O}$$


<script>

// kalkuli oksidnombrojn vd. https://www.periodni.com/de/oxidationszahlen_rechner.php

const molekuloj = { // kiel ni difinu prezenton de ligoj kiel paroj? plej bone iel malloke por povi ŝalti la prezenton de la tuta formulo facile 
  H2:  { a: "H2", l: { h1: "3-h2" } }, // l: angulo, ligtipo, celatomo
  O2:  { a: "O2", l: { o1: "3=o2" }, e: { o1: "7:y:", o2: "1:5:" } }, // e-paroj de unua O: ĉe horloĝ-ciferoj 7 kaj 11 (y), de dua O: ĉe ciferoj 1 kaj 5
  N2:  { a: "N2", l: { n1: "3#n2" }, e: { n1: "9:", n2: "3:" } },
  H2O: { a: "OH2", l: { o: "dme-h1 mA-h2" }, e: { o: "Z:ma:" } }, // anguloj de H: dme = 180°-51,5° A = +105°, anguloj de e-paroj: mZ = -42° a = +85°
  CO2: { a: "CO2", l: { c: "3=o2 9=o1" }, e: { o1: "7:y:", o2: "1:5:" } }, 
  CO: { a: "CO", l: { c: "3#o" }, e: { c: "9:", o: "3:" }, s: { c: "-", o: "+" } },
  NH3: { a: "NH3", l: { n: "1-h1 3-h2 5-h3" }, e: {n: "9:" }},
  CH4: { a: "CH4", l: { c: "0-h1 3-h2 6-h3 9-h4"} }, // l: pli mallonge eble: "-% h1 h2 h3 h4"
    // https://en.wikipedia.org/wiki/Glucose#/media/File:Alpha_glucose_views.svg
    /*
  C6H12O6: { a: "C6H12O6", l: {  
    c1: "0-h1 3-h2 6-c2 9-o1",
    o1: "9-h3",
    c2: "3==o6 5-h4 7--c3",
    c3: "y-h5 5--c4 7-o2",
    o2: "9-h6",
    c4: "0-o3 3--c5 6-h7",
    o3: "3-h8",
    c5: "0-h9 1--c6 6-o4",
    o4: "3-h10",
    c6: "1-h11 5-o5 y==o6",
    o5: "3-h12"
  } }*/
  C6H12O6: { a: "C6O", 
    g: { 
      "OH": { a: "OH", on: "-2 +1" } 
    }, 
    l: { 
      c1: "x-o 2>OH 6-c2", 
      c2: "4>OH 8-c3",
      c3: "6<OH x-c4",
      c4: "8>OH 0-c5",
      c5: "x<c6 2-o",
      c6: "0-OH" }, 
    on: "+1 0 0 0 0 -1 -2" 
  }
}

const ekvacioj = {
  metano_1: "CH4 + 2*O2 -> CO2 + 2*H2O",
  metano_2: "2*CH4 + 3 * O2 -> 2*CO + 4*H2O",
  metano_3: "CO2 + 4*H2 -> CH4 + 2*H2O",
  amoniako_1: "N2 + 3*H2 -> 2*NH3",
  glukozo_1: "C6H12O6 + 6*O2 -> 6*CO2 + 6*H2O"
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
    lewis.ekvacio(ekvacioj[frm], molekuloj, {
      // kalkulu kaj montru oksidnombrojn
      on_fŝ: true,
      // kalkulu kaj montru arkojn de elektron-atributo (por oksidnombroj)
      on_arkoj: true,
      // funkcio, kiu redonas la elektronegativecon de elemento
      eneg: (smb) => elementoj[smb].eneg 
    });
}

lanĉe (() => {
    const lgrp = new Lewis(ĝi("#redokso"));

    desegno("metano_1")
})

</script>

<svg id="redokso"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-5 -30 320 160">
 <style type="text/css">
    <![CDATA[
      path.mkojno {
        stroke: none;
        fill: url(#strie);
      }

      rect.mkojno {
        fill: black;
        stroke: black;
        stroke-width: 0.6;
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
      <rect width="2" height="1"/>
    </pattern>
  </defs>
  <g id="redoks_enhavo"></g>
</svg>

---
layout: laborfolio
title: Redoksreakcio
js:
  - folio-0b
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

<!-- https://mhchem.github.io/MathJax-mhchem/ -->

ekzemploj:
  - [hidrogenkorodo de fero](#){: .ref #h_korodo}: $$\ce{Fe + 2H+ <=> Fe^2+ + H2}$$
  - [oksigenkorodo de fero](#){: .ref #o_korodo}: $$\ce{2Fe^2+ +4(OH)- + 1/2 O2 + H2O -> 2Fe(OH)3}$$
  
  - [redukto de hematito per CO](#){: .ref #hematito_1}: $$\ce{3Fe2O3 + CO -> 2Fe3O4 + CO2}$$
  - [redukto de hematito per H₂](#){: .ref #hematito_2}: $$\ce{3Fe2O3 + H2 -> 2Fe3O4 + H2O}$$
  - [rekta redukto de hematito](#){: .ref #hematito_3}: $$\ce{3Fe2O3 + C -> 2Fe3O4 + CO}$$

  - [redukto de magnetito per CO](#){: .ref #magnetito_1}: $$\ce{Fe3O4 + CO -> 3FeO + CO2}$$
  - [redukto de magnetito per H₂](#){: .ref #magnetito_2}: $$\ce{Fe3O4 + H2 -> 3FeO + H2O}$$
  - [rekta redukto de magnetito](#){: .ref #magnetito_3}: $$\ce{Fe3O4 + C -> 3FeO + CO}$$

  - [redukto de vustito per CO](#){: .ref #vustito_1}: $$\ce{FeO + CO -> Fe + CO2}$$
  - [redukto de vustito per H₂](#){: .ref #vustito_2}: $$\ce{FeO + H2 -> Fe + H2O}$$
  - [rekta redukto de vustito](#){: .ref #vustito_3}: $$\ce{FeO + C -> Fe + CO}$$

  - [kompleta forbruliĝo de metano](#){: .ref #metano_1}: $$\ce{CH4 + 2O2 -> CO2 + 2H2O}$$
  - [nekompleta forbruliĝo de metano](#){: .ref #metano_2}: $$\ce{2CH4 + 3O2 -> 2CO + 4H2O}$$
  - [sintezo de metano](#){: .ref #metano_3}: $$\ce{CO2 + 4H2 -> CH4 + 2H2O}$$
  - [sintezo de amoniako](#){: .ref #amoniako_1}: $$\ce{N2 + 3H2 -> 2NH3}$$
  - [kompleta forbruligo de glukozo](#){: .ref #glukozo_1}: $$\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O}$$


<script>

// kalkuli oksidnombrojn vd. https://www.periodni.com/de/oxidationszahlen_rechner.php

const molekuloj = { // kiel ni difinu prezenton de ligoj kiel paroj? plej bone iel malloke por povi ŝalti la prezenton de la tuta formulo facile 
  H2:  { a: "H2", l: { h1: "3-h2" } }, // l: angulo, ligtipo, celatomo
  H_p:  { j: "H+" }, 
  O2:  { a: "O2", l: { o1: "3=o2" }, e: { o1: "7:y:", o2: "1:5:" } }, // e-paroj de unua O: ĉe horloĝ-ciferoj 7 kaj 11 (y), de dua O: ĉe ciferoj 1 kaj 5
  N2:  { a: "N2", l: { n1: "3#n2" }, e: { n1: "9:", n2: "3:" } },
  H2O: { a: "OH2", l: { o: "dme-h1 mA-h2" }, e: { o: "Z:ma:" } }, // anguloj de H: dme = 180°-51,5° A = +105°, anguloj de e-paroj: mZ = -42° a = +85°
  OH_m: { a: "OH", l: { o: "3-h" }, e: { o: "0:6:9:"}, s: { _: "-", o: "-"} },
  C: { a: "C", e: { c: "0.3.6.9." } },
  CO2: { a: "CO2", l: { c: "3=o2 9=o1" }, e: { o1: "7:y:", o2: "1:5:" } }, 
  CO: { a: "CO", l: { c: "3#o" }, e: { c: "9:", o: "3:" }, s: { c: "-", o: "+" } },
  Fe: { a: "Fe" },
  Fe_2p: { j: "Fe2+" },
  Fe2O3: { j: ["O2-","Fe3+","O2-","Fe3+","O2-"], e: { o1: "0:3:6:9:", o2: "0:3:6:9:", o3: "0:3:6:9:" } },
  Fe3O4: { j: ["O2-","Fe3+","O2-","Fe2+","O2-","Fe3+","O2-"], e: { o1: "0:3:6:9:", o2: "0:3:6:9:", o3: "0:3:6:9:", o4: "0:3:6:9:" } },
  "Fe(OH)3": { a: "Fe", 
    g: { "OH": { a: "OH", on: "-2 +1" } }, 
    l: { fe: "0-OH 4-OH 8-OH" }, 
    on: "+3"
  },
  FeO: { j: ["O2-","Fe2+"], e: { o: "0:3:6:9:"} },
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
  h_korodo: "Fe + 2*H_p <-> Fe_2p + H2",
  o_korodo: "2*Fe_2p + 4*OH_m + ½*O2 + H2O -> 2*Fe(OH)3",
  metano_1: "CH4 + 2*O2 -> CO2 + 2*H2O",
  metano_2: "2*CH4 + 3 * O2 -> 2*CO + 4*H2O",
  metano_3: "CO2 + 4*H2 -> CH4 + 2*H2O",
  amoniako_1: "N2 + 3*H2 -> 2*NH3",
  glukozo_1: "C6H12O6 + 6*O2 -> 6*CO2 + 6*H2O",
  hematito_1: "3*Fe2O3 + CO -> 2*Fe3O4 + CO2",
  hematito_2: "3*Fe2O3 + H2 -> 2*Fe3O4 + H2O",
  hematito_3: "3*Fe2O3 + C -> 2*Fe3O4 + CO",
  magnetito_1: "Fe3O4 + CO -> 3*FeO + CO2",
  magnetito_2: "Fe3O4 + H2 -> 3*FeO + H2O",
  magnetito_3: "Fe3O4 + C -> 3*FeO + CO",
  vustito_1: "FeO + CO -> Fe + CO2",
  vustito_2: "FeO + H2 -> Fe + H2O",
  vustito_3: "FeO + C -> Fe + CO",
  test: "Fe2O3"
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
      // jonojn marku per angulo, ne krampoj...
      jon_angulo: true,
      // funkcio, kiu redonas la elektronegativecon de elemento
      eneg: (smb) => elementoj[smb].eneg,
      // tro longajn ekvaciojn aranĝu dulinie...
      dulinie: frm.startsWith("hematito") || frm.startsWith("magnetito")
    });
}

lanĉe(() => {
    const lgrp = new Lewis(ĝi("#redokso"));
    //desegno("test");
    desegno("metano_1");
});

reference((ref) => {
  desegno(ref);
});

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

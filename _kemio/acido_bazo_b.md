---
layout: laborfolio
title: Acidoj kaj bazoj (laŭ Brønsted-Lowry)
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - laboratorio-0c
  - k_acidbaz-0a
css:
  - laboratorio-0c
---

<!--
https://www.vedantu.com/chemistry/acids-and-bases

eksperimentoj:

baksodo /natria bikarbonato) kun vinagro (vinagrcida/etila solvaĵo):
- https://en.wikipedia.org/wiki/Sodium_bicarbonate
CH3COOH(aq) + NaHCO3(s) -> CO2(g) + H2O(l) + NaCH3COO(aq)
?? koncizsa jonekvacio: HCO3-(aq) + H+(aq) -> CO2(g) +H2O(l)

videoj:
- https://www.youtube.com/watch?v=nd1wZkzegX8
- https://www.youtube.com/watch?v=GRUlE2850F0
- https://www.youtube.com/watch?v=Ow1VerS39l0
- https://www.youtube.com/watch?v=E4ba9X9IY_s

baksodo kun citronacido:
- https://www.youtube.com/watch?v=GAwNAD64wIA

solvaĵo de vinagracido:
CH3​COOH ⇆ CH3​COO- + H+

pH de 1 M (=1mol/l) CH3​COOH solvaĵo: 
// https://www.toppr.com/ask/question/what-is-the-ph-of-a-1-m-ch3coohsolutionkaof-acetic-acid-18-times105-kw/
pH=−log[H+]=−log(0.004243)=2.4


https://www.uibk.ac.at/organic/ag-kreutz/dateien/teil_3.pdf


titrado / titraj pH-kurboj:
HCl + NaOH / acetacido + NaOH: https://www.youtube.com/watch?v=tc-cKeyjc8U (kaj referencitaj 2)

nocioj:
- korespondaj acido-bazo-paroj
- neŭtraligo
- ekvilibro
- titrado/ekvivalent-punkto


titrado de amoniako kun HCl: https://www.youtube.com/watch?v=cMHD8TGPWoA

titrado de citronacido kaj fosforacido:
https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Supplemental_Modules_(Analytical_Chemistry)/Analytical_Sciences_Digital_Library/Courseware/Chemical_Equilibrium/02_Text/02_Acid-Base_Chemistry/14_Titration_of_a_Polyprotic_Weak_Acid_with_Sodium_Hydroxide

-->

<!--
acidoj:

HCl
H2SO4
H2CO3


bazoj:

NH3
NaOH
KOH
Ca(OH)2

reakcioj:

HCl + H2O <-> Cl- + H3O+
NH3 + H2O <-> NH4+ + OH-



-->

<script>
  let lab; // la laboratorio kaj iloj
  const ALTO = 500;
  const LARĜO = 300;

  lanĉe(()=>{
    lab = new Laboratorio(ĝi("#eksperimento"),"fono",LARĜO,ALTO+10);

    // bureto supre
    bureto = Lab.bureto("bureto");
    lab.metu(bureto,{id: "supre", x:(LARĜO)/2, y:ALTO-180});

    // konusflakono malsupre
    flakono = Lab.konusflakono("flakono",25);
    lab.metu(flakono,{id: "malsupre", x:(LARĜO)/2-30, y:ALTO});

  });
</script>

<svg id="eksperimento"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-10 -10 320 520">
 <style type="text/css">
    <![CDATA[
      .butono.premita rect {
        fill: #004b4b;
      }
    ]]>
  </style>
</svg>

---
layout: laborfolio
title: Redoksreakcio
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - elementoj-0c
  - k_kombinoj-0a
  - k_formuloj-0a
  - k_elektrodpot-0a
css:
  - k_formuloj-0a 
---

...paĝostumpo...

Se dum redoksa reakcio sume liberiĝas energio en formo de varmo aŭ lumo, oni nomas ĝin ekzoterma, se kontraŭe
energio konsumiĝas - endoterma. Ekzoterma redoksreakcio nomiĝas ankaŭ bruliĝo. Foje oni nomas bruliĝon ankaŭ nur tian ekzoterman reakcion, kiu postlasas kiel reakciaj produktoj nur akvon kaj karbondioksidon.

La reakcianto, kiu oksidas alian reakcianton, t.e. mem reduktiĝas oni nomas oksidilo. La alia reakcianto, kiu oksidiĝas reduktante la duan, estas nomata reduktilo.

<!-- teorio kaj eksperimentoj:
https://www.youtube.com/watch?v=35zo207gks0 - Die Redoxreaktion - Teil 1 (Theorie und Versuche)
https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Book%3A_Introduction_to_Inorganic_Chemistry_(Wikibook)/04%3A_Redox_Stability_and_Redox_Reactions
-->

<!-- klarigu duon-reakciojn... 
https://en.wikipedia.org/wiki/Half-reaction
https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/electrochemistry/02half_reactions/18_21.htm
https://de.serlo.org/chemie/127701/die-teilgleichungen-oxidation-und-reduktion
https://de.serlo.org/chemie/129021/%C3%BCbungsaufgaben-teilgleichungen

- ekvilibro
https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Analytical_Chemistry_2.1_(Harvey)/06%3A_Equilibrium_Chemistry/6.04%3A_Equilibrium_Constants_for_Chemical_Reactions

-- interese:
https://www.heise.de/news/Mahlzeit-Batterie-zum-Verzehr-geeignet-8980754.html
-->

oksidilo (e-akceptanto): (x)O ()N ()H
{: .elekto #oksidilo}

reduktilo (e-donanto): (x)C ()Fe ()S ()H
{: .elekto #reduktilo}

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

  - [oksidigo de H₂S](#){: .ref #h2s_oksidigo}: $$\ce{H2S + 3O2 -> 2SO2 + 2H2O}$$

  - [kompleta forbrulo de metano](#){: .ref #metano_1}: $$\ce{CH4 + 2O2 -> CO2 + 2H2O}$$
  - [nekompleta forbrulo de metano](#){: .ref #metano_2}: $$\ce{2CH4 + 3O2 -> 2CO + 4H2O}$$
  - [sintezo de metano](#){: .ref #metano_3}: $$\ce{CO2 + 4H2 -> CH4 + 2H2O}$$
  - [sintezo de amoniako](#){: .ref #amoniako_1}: $$\ce{N2 + 3H2 -> 2NH3}$$
  - [kompleta forbrulo de glukozo](#){: .ref #glukozo_1}: $$\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O}$$


<script>

// kalkuli oksidnombrojn vd. https://www.periodni.com/de/oxidationszahlen_rechner.php

const ekvacioj = {
  h_korodo:    {Fe:[0,2],  H:[1,0],  _:"Fe + 2*H^+ <-> Fe^2+ + H2"},
  o_korodo:    {Fe:[2,3],  O:[0,-2], _:"2*Fe^2+ + 4*OH^- + ½*O2 + H2O -> 2*Fe(OH)3"},
  metano_1:    { C:[-4,4], O:[0,-2], _:"CH4 + 2*O2 -> CO2 + 2*H2O"},
  metano_2:    { C:[-4,2], O:[0,-2], _:"2*CH4 + 3 * O2 -> 2*CO + 4*H2O"},
  metano_3:    { C:[4,-4], H:[0,1],  _:"CO2 + 4*H2 -> CH4 + 2*H2O"},
  amoniako_1:  { N:[0,-3], H:[0,1],  _:"N2 + 3*H2 -> 2*NH3"},
  glukozo_1:   { C:[0,-4], O:[0,-2], _:"C6H12O6 + 6*O2 -> 6*CO2 + 6*H2O"},
  hematito_1:  {Fe:[3,2],  C:[2,4],  _:"3*Fe2O3 + CO -> 2*Fe3O4 + CO2"},
  hematito_2:  {Fe:[3,2],  H:[0,1],  _:"3*Fe2O3 + H2 -> 2*Fe3O4 + H2O"},
  hematito_3:  {Fe:[3,2],  C:[0,2],  _:"3*Fe2O3 + C -> 2*Fe3O4 + CO"},
  magnetito_1: {Fe:[3,2],  C:[2,4],  _:"Fe3O4 + CO -> 3*FeO + CO2"},
  magnetito_2: {Fe:[3,2],  H:[0,1],  _:"Fe3O4 + H2 -> 3*FeO + H2O"},
  magnetito_3: {Fe:[3,2],  C:[0,2],  _:"Fe3O4 + C -> 3*FeO + CO"},
  vustito_1:   {Fe:[3,0],  C:[2,4],  _:"FeO + CO -> Fe + CO2"},
  vustito_2:   {Fe:[3,0],  H:[0,1],  _:"FeO + H2 -> Fe + H2O"},
  vustito_3:   {Fe:[3,0],  C:[0,2],  _:"FeO + C -> Fe + CO"},
  h2s_oksidigo:{ S:[-2,4], O:[0,-2], _:"2*H2S + 3*O2 -> 2*SO2 + 2*H2O"},
  test: {_: "Fe(OH)3"}
}

/*
const ekvacioj = {
  metanbrulo: [CH4,'+',2*O2,'->',CO2,'+',2*H2O],
  metankreo: [CO2,'+',4*H2,'->',CH4,'+',2*H2O]
}
*/

function desegno(frm) {
    // malplenigu
    const svg = ĝi("#redoks_enhavo");
    svg.textContent = "";

    const elementoj = Elemento.listo();
    const kform = new KformEkvacio(svg,{
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

    // desegnu formulon kiel Lewis-strukturon
    kform.ekvacio(ekvacioj[frm]._, kkombinoj);
}

lanĉe(() => {
    const lgrp = new KformEkvacio(ĝi("#redokso"));
    desegno("test");
    //desegno("metano_1");
});

reference((ref) => {
  desegno(ref);
});

elekte((elekto,valoro) => {
  console.log(elekto+':'+valoro);
});

</script>

<svg id="redokso"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-5 -35 325 80">
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

## hidrogenkorodo de fero
{: #s_hidrogenkorodo}

$$\ce{Fe + 2H+ <=> Fe^2+ + H2}$$

duon-reakcioj:

$$\ce{Fe -> Fe^2+ + 2e-}$$  
$$\ce{2H+ + 2e- -> H2}$$

## redukto de hematito per CO
{: #s_hematito_1}

$$\ce{3Fe2O3 + CO -> 2Fe3O4 + CO2}$$

duon-reakcioj:

$$\ce{6Fe^3+ 8O^2- +2e- -> 4Fe^3+ +2Fe^2+ + 4O2}$$  
$$\ce{CO + O^2- ->  CO2 + 2e-}$$

<!--
## oksidigo de H₂S

$$\ce{H2S + 3O2 -> 2SO2 + 2H2O}$$

duon-reakcioj:

$$\ce{2S^2- + 2O2 -> 2S^4+ + 4O^2- + 4e-}$$  
$$\ce{4H+ + 3O2 + 4e- -> 2H2O}$$


## kompleta forbrulo de metano

$$\ce{CH4 + 2O2 -> CO2 + 2H2O}$$
-->
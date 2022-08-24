---
layout: laborfolio
title: Interatomaj fortoj
chapter: 2
js-ext:
  - mathjax3
---

En ĥemio rolas precipe la elektronoj de la eksteraj orbitaloj.
Vidu la paĝon pri [elektrondistribuo](elektrondistribuo). Oni nomas ilin valentaj elektronoj.

Ĉe la elementoj de la ĉefaj grupoj en la perioda sistemo de elementoj
tio estas la elektronoj de la p- kaj s-orbitaloj. Ilia nombro egalas al
la numero de la grupo (1 ĝis 8).

Ĉe la transirmetaloj en la malĉefaj grupoj aldoniĝas la elektronoj de la
d-orbitalo de la antaŭa ŝelo al la valento. 

# La okopa regulo

La atomoj strebas al elektrondistribuo de noblaj gasoj kun plenaj eksteraj orbitaloj, kio
estas energie favora stato. Ĉe hidrogeno tio estas du elektronoj ĉe aliaj elementoj ok. 
Tial oni nomas ĝin la regulo de la ok.

Por atingi tion atomoj ligiĝas inter si laŭ tri bazaj manieroj: 

1. metaloj donas troajn elektronojn al nemetaloj, formas [jonajn ligojn](jona_ligo);
   ekzemplo estas ordinara salo uzata en la kuirejo ($$\ce{NaCl}$$)
2. nemetaloj uzas kelkajn eksterajn elektronparojn komune en [kovalentaj ligoj](kovalenta_ligo) tiel formante molekulojn; ekzemplo 
   estas akvo ($$\ce{H2O}$$) aŭ oksigno ($$\ce{O2}$$)
3. metaloj formas kradon de pozitivaj jonoj inter kiuj elektroj povas libere moviĝi, kion oni nomas [metala ligado](metala_ligo)

Ĉar noblaj gasoj troviĝas jam en favora stato ili tre malofte aperas en molekuloj.

<!--...elektronegativeco...

- Kreu apartajn paĝojn por ĉiu ligotipo! 

- pol(ar/usec)aj ligoj...: klarigu en aparta paĝo pri kovalenta ligo... 

- NaCl per jmol: http://lampx.tugraz.at/~hadley/ss1/crystalstructure/structures/nacl/nacl.php

-->

<!--

## Ekzemploj

Kiel ekzemploj de molekuloj kun kovalentaj ligoj ni povas rigardi gasajn molekulojn, kiuj troviĝas en la atmosfero:

- [nitrogeno](#N2){: #N2 onclick="glewis(event);"}
- [oksigeno](#O2){: #O2 onclick="glewis(event);"}
- [argono](#Ar){: #Ar onclick="glewis(event);"}
- [akvo (vaporo)](#H2O){: #H2O onclick="glewis(event);"}
- [karbondioksido](#CO2){: #CO2 onclick="glewis(event);"}
- [neono](#Ne){: #Ne onclick="glewis(event);"}
- [heliumo](#He){: #He onclick="glewis(event);"}
- [metano](#CH4){: #CH4 onclick="glewis(event);"}
- [kriptono](#Kr){: #Kr onclick="glewis(event);"}


-->
<!--
Ekzemploj de molekuloj formantaj (kun)valentajn ligojn estas hidrogeno kun (kun)valenta elektronparo,
oksigeno kun du (kun)valentaj paroj kaj nitrogeno kun tri (kun)valentaj paroj:
-->
<!--
<script>

  const gasoj = {
    N2: [["N","0#4:"],["N","0:"]],
    O2: [["O","0=3:5:"],["O","1:7:"]],
    Ar: [["Ar","0:2:4:6:"]],
    H2O:[["O","5:7:"],["H","7-"],["H","5-"]],
    CO2:[["C",""],["O","0="],["O","4="]],
    Ne: [["Ne","0:2:4:6:"]],
    He: [["He","4:"]],
    CH4:[["C",""],["H","1-"],["H","3-"],["H","5-"],["H","7-"]],
    Kr: [["Kr","0:2:4:6:"]]
  }

  const jonoj = {
    OH: [["O^-","6:0:2:"],["H","0-"]],
    H3O:[["O^⊕","0:"],["H","0-"],["H","6-"],["H","2-"]],
    Cl: [["Cl^-","0:2:4:6:"]],
    Na: [["Na^+"]],
    Mg: [["Mg^2+"]],
    K:  [["K^+"]],
    SO4:[["S",""],["O","0=3:5:"],["O","2=5:7:"],["O^-","4-0:2:6:"],["O^-","6-0:2:4:"]],
    Ca: [["Ca^2+"]],
    CO3:[["C",""],["O","1=4:6:"],["O^-","4-6:0:2:"],["O^-","6-0:2:4:"]]
    }

  function glewis(event) {
    event.preventDefault();
    const frm = event.target.id;
    const svg = document.getElementById("glewis");
    _lewis(svg,frm,gasoj[frm]);
  }

  function jlewis(event) {
    event.preventDefault();
    const frm = event.target.id;
    const svg = document.getElementById("jlewis");
    _lewis(svg,frm,jonoj[frm]);
  }

  function _lewis(svg,frm,spec) {
    console.log(frm)+": "+spec;

    // malplenigu
    svg.textContent = "";
    // desegnu Lewis-strukturon
    lewis(svg,spec);
  }

  window.onload = () => {
    const svg = document.getElementById("glewis");
    lewis(svg,[
      ["H","0-"],
      ["H",""],
    ]);
  }

</script>

<style>
/*
  svg {
    stroke-width: 0px;
    background-color: lightblue;
  }
  */

  text {
      font-family: helvetica, sans-serif;
      /*
      stroke: black;
      stroke-width: 0.2px;
      */
      font-size: 10px;
      text-anchor: middle;
      dominant-baseline: central;
  }
  tspan.sup {
    font-size: 8px;
  }
  circle {
      fill: black;
  }
  line {
      stroke: black;
      stroke-width: .6;
  }
</style>

<svg id="glewis"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="240" viewBox="-30 -30 60 60">    
</svg>

En la formuloj streko simbolas (kun)valentan elektronparon, dum punkto 
simbolas valentan elektronon, kiu ne partoprenas en molekula ligo.
-->

<!-- iuj jonoj solvitaj en oceano vd. https://en.wikipedia.org/wiki/Ocean#Residence_times_of_chemical_elements_and_ions -->

<!--
Jonoj, solvitaj en marakvo, estas i.a.:

- [hidroksido](#OH){: #OH onclick="jlewis(event);"}
- [kloro](#Cl){: #Cl onclick="jlewis(event);"}
- [natrio](#Na){: #Na onclick="jlewis(event);"}
- [magnezio](#Mg){: #Mg onclick="jlewis(event);"}
- [kalio](#K){: #K onclick="jlewis(event);"}
- [sulfato](#SO4){: #SO4 onclick="jlewis(event);"}
- [kalcio](#Ca){: #Ca onclick="jlewis(event);"}
- [karbonato](#CO3){: #CO3 onclick="jlewis(event);"}
-->
<!--
// H+, OH-:
- [akvo](#H2O){: #H2O onclick="jlewis(event);"}

pri CO3 vd. ankaŭ
https://chemistry.stackexchange.com/questions/66033/in-the-carbonate-anion-which-atoms-gain-the-two-electrons

// - [silicio](#Si){: #Si onclick="glewis(event);"}
// - [mangano](#Mn){: #Mn onclick="glewis(event);"}
// - [aluminio](#Al){: #Al onclick="glewis(event);"}
// - [fero](#Fe){: #Fe onclick="glewis(event);"}
-->
<!--
<svg id="jlewis"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="240" viewBox="-30 -30 60 60">    
</svg>
-->

<!-- https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/intermolecular_forces/01review/review2.htm 

# jona lewis desegno... MgO
https://cnx.org/resources/3d947fe1453d06102e824653195aae5c/CG11C1_020.png
# NaCl
https://4.bp.blogspot.com/-jaAOIZ97HYM/VwUGn4KaVpI/AAAAAAAAArc/KUildrS-VB0-Hse5_6j_tGe8t6REfbsQg/s1600/772263_orig.jpeg
# MgCl2
https://www.nextgurukul.in/media/images/q2aanswers/1554099/Magnesium-Chloride-Formation_1401944529549.gif
# NH4NO3
http://ammoniumnitrate.weebly.com/uploads/9/8/2/0/9820288/500629623.png?371
-->
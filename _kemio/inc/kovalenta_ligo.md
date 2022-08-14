---
layout: laborfolio
title: Kovalentaj ligoj
js:
  - lewis-0b
  - jmol-0a
  - jsmol/JSmol.min  
js-ext:
  - mathjax3
---

Du nemetalaj atomoj interligiĝas alie ol metaloj kun nemetalaj atomoj. Ili ne plenigas sian okopan da elektronoj per transigo de unuopa elektrono, sed ili kunigas po unu el iliaj elektronoj al komuna paro. Tion oni nomas *kovalenta ligo*. Pluraj atomoj kunligitaj kovalente oni nomas *molekulo*.

Kiel ekzemploj ni povas rigardi kelkajn molekulojn troviĝantaj en nia atmosfero:

- [akvo (vaporo)](#H2O){: #H2O onclick="glewis(event);"}
- [oksigeno](#O2){: #O2 onclick="glewis(event);"}
- [nitrogeno](#N2){: #N2 onclick="glewis(event);"}
- [karbondioksido](#CO2){: #CO2 onclick="glewis(event);"}
- [metano](#CH4){: #CH4 onclick="glewis(event);"}

La kovalentajn parojn oni kutimes desegnas kiel streko anstataŭ per dupunkto.

<script>

  let svg, lewis;  

  const gasoj = {
    N2: [["N","0#4:"],["N","0:"]],
    O2: [["O","0=3:5:"],["O","1:7:"]],
    H2O:[["O","5:7:"],["H","7-"],["H","5-"]],
    CO2:[["C",""],["O","0="],["O","4="]],
    CH4:[["C",""],["H","1-"],["H","3-"],["H","5-"],["H","7-"]],
  }

  function glewis(event) {
    event.preventDefault();
    const frm = event.target.id;

    // malplenigu
    svg.textContent = "";
    // desegnu Lewis-strukturon
    lewis.molekulo(gasoj[frm]);
  }

  window.onload = () => {
    svg = document.getElementById("glewis");
    lewis = new Lewis(svg);

    lewis.molekulo([
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
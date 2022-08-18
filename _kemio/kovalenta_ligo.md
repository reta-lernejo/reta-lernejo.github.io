---
layout: laborfolio
title: Kovalentaj ligoj
chapter: 2.2
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

Noto: la kovalentajn parojn oni kutimes desegnas [kiel streko](#streko){: #streko onclick="streko(event);"}
anstataŭ per du punktoj.

<script>

  let svg, lewis, frm = "H2";  

  const gasoj = {
    N2: [["N",">;:"],["N","<;:"]],
    O2: [["O",">:::"],["O","<:::"]],
    H2O:[["O",">..::[37,105,85,85]"],["H","<.[217]",1,37],["H","^.[-37]",1,142]], // devus esti 104,5°, sed ni devas adapti lewis.molekulo()
    CO2:[["O",">:::",-1],["C","<::"],["O","<:::"]],
    CH4:[["H",">.",-1],["C","<...."],["H","<."],["H","v.",1,270],["H","^.",1,90]],
  }

  const gasoj2 = {
    H2: [["H",">-"],["H"]],
    N2: [["N",">#:"],["N","< :"]],
    O2: [["O",">=::"],["O","< ::"]],
    H2O:[["O",">--::"],["H"],["H","",1,90]],
    CO2:[["O",">=::",-1],["C"],["O","<=::"]],
    CH4:[["H","",-1],["C","<----"],["H"],["H","",1,270],["H","",1,90]],
  }

  function glewis(event) {
    event.preventDefault();
    frm = event.target.id;

    // malplenigu
    svg.textContent = "";
    // desegnu Lewis-strukturon
    lewis.molekulo(gasoj[frm]);
  }

  function streko(event) {
    event.preventDefault();
    // malplenigu
    svg.textContent = "";
    // desegnu Lewis-strukturon
    lewis.molekulo(gasoj2[frm]);
  }

  window.onload = () => {
    svg = document.getElementById("glewis");
    lewis = new Lewis(svg);

    lewis.molekulo([
      ["H",">."],
      ["H","<.",1],
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

  /* koloroj vd. http://jmol.sourceforge.net/jscolors/#color_H ... */

  g.H * {
    fill: #777777;
  }

  g.O * {
    fill: #FF0D0D;
  }

  g.N * {
    fill: #3050F8;
  }

  g.C * {
    fill: #222222;
  }

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
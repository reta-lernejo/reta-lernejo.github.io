---
layout: laborfolio
title: Kovalentaj ligoj
chapter: 2.2
js:
  - folio-0a
  - lewis-0c
  - jmol-0a
  - jsmol/JSmol.min
css:
  - lewis-0c  
---

Du nemetalaj atomoj interligiĝas alie ol metaloj kun nemetalaj atomoj. Ili ne plenigas sian 
eksteran okopon da elektronoj per transigo de unuopa elektrono, sed ili kunigas po unu el siaj elektronoj al komuna paro. Tion oni nomas *kovalenta ligo*. Pluraj atomoj kunligitaj kovalente oni nomas *molekulo*.

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
    N2: [["N","3;9:"],["N","9;3:"]],
    O2: [["O","3%:::"],["O","9%:::"]],
    H2O:[["O","Z:a.A.a:"],["H","9 z.",1,130],["H","e.",1,231]],
    CO2:[["O","3%:::",-1],["C","3:9:"],["O","9%:::"]],
    CH4:[["H","3.",-1],["C","3%...."],["H","9."],["H","6.",1,360],["H","0.",1,180]],
  }

  const gasoj2 = {
    H2: [["H","3-"],["H"]],
    N2: [["N","3#9:"],["N","3:"]],
    O2: [["O","3%=::"],["O","9% ::"]],
    H2O:[["O","3%--::"],["H"],["H","",1,180]],
    CO2:[["O","3%=::",-1],["C"],["O","9%=::"]],
    CH4:[["H","",-1],["C","9%----"],["H"],["H","",1,360],["H","",1,180]],
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

  lanĉe( () => {
    svg = ĝi("#glewis");
    lewis = new Lewis(svg);

    lewis.molekulo([
      ["H","3."],
      ["H","9.",1],
    ]);
  });

</script>

<svg id="glewis"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="240" viewBox="-30 -30 60 60">    
</svg>
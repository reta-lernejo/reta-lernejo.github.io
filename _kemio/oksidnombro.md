---
layout: laborfolio
title: Oksidnombroj
chapter: 1.1
js:
  - folio-0a
  - sekcio-0b
  - ewis-0d
js-ext:
  - mathjax3
---

Ekezemploj:

<script>

const grp = {
    H_:  [["H","3:"]],
    N2:  [["N","3;9:"],["N","9;3:"]],
    O2:  [["O","3%:::"],["O","9%:::"]],
    H2O: [["O","Z:a.A.a:"],["H","m e.",1,180-51.5],["H","e.",1,180+51.5]],
    CO2: [["O","3%:::",-1],["C","3:9:"],["O","9%:::"]],
    CH4: [["H","3.",-1],["C","3%...."],["H","9."],["H","6.",1,360],["H","0.",1,180]],
    COOH: [["C","1:5:"],["O","",1,30],["O","",1,120],["H"]],
    CH3_: [["H"],["C"],["H","",1,0],["H","",1,180]],
    _CH3: [["C"],["H"],["H","",1,0],["H","",1,180]],
}

const ekz {
    N2: [N2],
    O2: [O2],
    H2O: [H2O],
    CO2: [CO2],
    CH4: [CH4],
    HCOOH: [H_,COOH],
    DMS: [CH3_,S,_CH3] // (CH₃)₂S
}
  

function  ekz_on(event) {
    event.preventDefault();
    frm = event.target.id;

    // malplenigu
    const on = ĝi("#on_enhavo");
    on.textContent = "";
    lewis = new Lewis(on);

    // desegnu Lewis-strukturon
   
    const grupoj = grp[frm];
    lewis.formulo(grupoj);
}

</script>

<svg id="oksidnro"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="600" viewBox="-20 -10 150 35">
  <g id="on_enhavo"></g>
</svg>



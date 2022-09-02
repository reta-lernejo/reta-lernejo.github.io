---
layout: laborfolio
title: Oksidnombroj
chapter: 1.1
js:
  - folio-0a
  - sekcio-0b
  - lewis-0d
js-ext:
  - mathjax3
css:
  - lewis-0c  
---

Ekzemploj:
- [hdirogeno](#){: #hidrogeno onclick="ekz_on(event);"}
- [nitrogeno](#){: #nitrogeno onclick="ekz_on(event);"}
- [oksigeno](#){: #oksigeno onclick="ekz_on(event);"}
- [akvo](#){: #akvo onclick="ekz_on(event);"}
- [karbondioksido](#){: #CO2 onclick="ekz_on(event);"}
- [metano](#){: #CH4 onclick="ekz_on(event);"}
- [metanacido (formikacido)](#){: #HCOOH onclick="ekz_on(event);"}
- [dimetilsulfido](#){: #DMS onclick="ekz_on(event);"}

<script>


const H_ =  [["H","3:"]];
const H2 = [["H","3."],["H","9."]]
const N2 =  [["N","3;9:"],["N","9;3:"]];
const O2 =  [["O","3%:::"],["O","9%:::"]];
const H2O = [["O","Z:a.A.a:"],["H","m e.",1,180-51.5],["H","e.",1,180+51.5]];
const CO2 = [["O","3%:::",-1],["C","3:9:"],["O","9%:::"]];
const CH4 = [["H","3.",-1],["C","3%...."],["H","9."],["H","6.",1,360],["H","0.",1,180]];
const COOH = [["C","1:5:"],["O","",1,30],["O","",1,120],["H"]];
const CH3_ = [["H"],["C"],["H","",1,0],["H","",1,180]];
const _CH3 = [["C"],["H"],["H","",1,0],["H","",1,180]];
const S = [["S","3.9."]];


const ekz = {
    hidrogeno: [H2],
    nitrogeno: [N2],
    oksigeno: [O2],
    akvo: [H2O],
    CO2: [CO2],
    CH4: [CH4],
    HCOOH: [H_,COOH],
    DMS: [CH3_,S,_CH3] // (CH₃)₂S
}
  

function ekz_on(event) {
    event.preventDefault();
    frm = event.target.id;

    // malplenigu
    const on = ĝi("#on_enhavo");
    on.textContent = "";
    const lewis = new Lewis(on);

    // desegnu formulon kiel Lewis-strukturon   
    const termoj = ekz[frm];
    lewis.formulo(termoj);
}

</script>

<svg id="oksidnro"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="600" viewBox="-20 -20 150 60">
  <g id="on_enhavo"></g>
</svg>



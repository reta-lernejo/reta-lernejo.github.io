---
layout: laborfolio
title: Redoksreakcio
chapter: 1.1
js:
  - folio-0a
  - sekcio-0b 
js-ext:
  - mathjax3
---

ekzemploj:  
  - kompleta forbruliĝo de metano: $$\ce{CH4 + 2O2 -> CO2 + 2H2O}$$
  - nekompleta forbruliĝo de metano: $$\ce{2CH4 + 3O2 -> 2CO + 4H2O}$$



<script>
    const kemiaĵoj = {
        H2: [["H","3-"],["H"]],
        N2: [["N","3#9:"],["N","3:"]],
        O2: [["O","3%=::"],["O","9% ::"]],
        H2O:[["O","Z:a-A-a:"],["H","",1,180-51.5],["H","",1,180+51.5]],
        CO2:[["O","3%=::",-1],["C"],["O","9%=::"]],
        CH4:[["H","",-1],["C","9%----"],["H"],["H","",1,360],["H","",1,180]],
    }
    const ekvacioj = {
        metanbrulo: [CH4,'+',2*O2,'=',CO2,'+',2*H2O]
    }


</script>
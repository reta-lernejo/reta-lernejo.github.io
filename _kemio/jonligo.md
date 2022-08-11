---
layout: laborfolio
title: Jonligoj
js:
  - lewis-0b
js-ext:
  - mathjax3
---



<script>
  let svg, lewis;  

  function jonigo() {
    function _jonigo2() {
      const na = svg.querySelector("[href='#j_Na']");    
      const cl = svg.querySelector("[href='#j_Cl']");    
      svg.removeChild(na);
      svg.removeChild(cl);

      // nun transformu al jonoj kaj pli proksimigu
      lewis.animacio("j_Naplus",-20,0,-15,0,1);
      lewis.animacio("j_Clminus",15,0,10,0,1);
    }

    // unue proksimigu atomojn
    lewis.animacio("j_Na",-25,0,-20,0,7);
    lewis.animacio("j_Cl",20,0,15,0,7,_jonigo2);

/*
    const na = svg.querySelector("[href='#j_Na']");    
    const cl = svg.querySelector("[href='#j_Cl']");    
    svg.removeChild(na);
    svg.removeChild(cl);

    lewis.montru("j_Naplus",-13,0);
    lewis.montru("j_Clminus",13,0);
    */
  }

  window.onload = () => {
    svg = document.getElementById("jlewis");
    lewis = new Lewis(svg);

    lewis.simbolo("j_Na","Na",1);
    lewis.simbolo("j_Naplus","Na",0,"+");
    lewis.simbolo("j_Cl","Cl",7);
    lewis.simbolo("j_Clminus","Cl",8,"-");

    lewis.montru("j_Na",-20,0);
    lewis.montru("j_Cl",20,0);

    jonigo();
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
  line, polyline {
      stroke: black;
      stroke-width: .6;
  }
</style>

<svg id="jlewis"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="240" viewBox="-30 -30 60 60">    
</svg>


<!-- 

# jona lewis desegno... MgO
https://cnx.org/resources/3d947fe1453d06102e824653195aae5c/CG11C1_020.png
# NaCl
https://4.bp.blogspot.com/-jaAOIZ97HYM/VwUGn4KaVpI/AAAAAAAAArc/KUildrS-VB0-Hse5_6j_tGe8t6REfbsQg/s1600/772263_orig.jpeg
# MgCl2
https://www.nextgurukul.in/media/images/q2aanswers/1554099/Magnesium-Chloride-Formation_1401944529549.gif
# NH4NO3
http://ammoniumnitrate.weebly.com/uploads/9/8/2/0/9820288/500629623.png?371
-->
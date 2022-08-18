---
layout: laborfolio
title: Jonaj ligoj
chapter: 2.1
js:
  - lewis-0b
  - jmol-0a
  - jsmol/JSmol.min  
js-ext:
  - mathjax3
---

Atomoj strebas al la favora elektron-distribuo de nobelaj gazoj. Por atingi tion, metalaj atomoj povas fordoni troajn valentajn elektronojn, dum nemetalaj povas akcepti ilin por kompletigi sian okopon.

Per tio la metala atomo ricevas pozitivan ŝargon, t.e. fariĝas pozitiva jono dum la nemetala fariĝas negativa jono. Per elektrostatika forto ili tiriĝas unu al alia, tiel formante *jonan ligon*. Do jona ligo baziĝas sur transigo de elektrono kaj elektrostatika altirforto.

La sekva skema desegnofilmeto montras tiun principon ĉe atomo de natrio kaj atomo de kloro formantaj NaCl t.e. kuirsalon. 

<script>
  let svg, lewis;  

  function forigu(href) {
    const el = svg.querySelector(`[href='#${href}']`);
    if (el) svg.removeChild(el);
  }

  function jonigo() {
    function _jonigo2() {
      forigu("j_Na");
      forigu("j_Cl");
/*
      const na = svg.querySelector("[href='#j_Na']");    
      const cl = svg.querySelector("[href='#j_Cl']");    
      svg.removeChild(na);
      svg.removeChild(cl);
      */

      // nun transformu al jonoj kaj pli proksimigu
      lewis.animacio("j_Naplus",-16,0,3,0,1);
      lewis.animacio("j_Clminus",16,0,-3,0,1);
    }

    // kaŝu jonojn el ebla anaŭa animacio
    forigu("j_Naplus");
    forigu("j_Clminus");

    // proksimigu atomojn
    lewis.animacio("j_Na",-20,0,4,0,7);
    lewis.animacio("j_Cl",20,0,-4,0,7,_jonigo2);

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

    //jonigo();
  }

</script>

<style>
/*
  svg {
    stroke-width: 0px;
    background-color: lightblue;
  }
  */

  /* koloroj vd. http://jmol.sourceforge.net/jscolors/#color_Na ... */

  g.Na text, g.Na circle {
    fill: #AB5CF2;
  }

  g.Cl text, g.Cl circle {
    fill: #1FF01F;
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
  line, polyline {
      stroke: black;
      stroke-width: .6;
  }
</style>

<button onclick="jonigo();">Ek!</button>
<svg id="jlewis"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="240" height="240" viewBox="-30 -30 60 60">    
</svg>

En la realo interagas ne nur du atomoj sed multaj samtempe kaj ĉar elektrostatikaj fortoj efikas inter ĉiuj pozitivaj kaj negativaj jonoj formiĝas *jona krado* kiel montrita en la malsupra bildo.

<div id="jmol_NaCl">
<script type="text/javascript">
  Jmol._isAsync = true;
  jmol_kesto("jmol_NaCl",
    "inc/NaCl.pdb",
    300,200,
    (app) => { Jmol.script(app,
      'set antialiasDisplay ON; spacefill 80%;'
    )}
  );
</script>
</div>


Jonaj ligoj cetere povas formiĝi ne nur inter atomoj, sed ankaŭ inter molekuloj.


<!-- 

# jona lewis desegno... MgO
https://cnx.org/resources/3d947fe1453d06102e824653195aae5c/CG11C1_020.png
# NaCl
https://4.bp.blogspot.com/-jaAOIZ97HYM/VwUGn4KaVpI/AAAAAAAAArc/KUildrS-VB0-Hse5_6j_tGe8t6REfbsQg/s1600/772263_orig.jpeg
# MgCl2
https://www.nextgurukul.in/media/images/q2aanswers/1554099/Magnesium-Chloride-Formation_1401944529549.gif
# NH4NO3
http://ammoniumnitrate.weebly.com/uploads/9/8/2/0/9820288/500629623.png?371


# pri jona kaj kovalenta ligo, orbitaloj ktp.
https://chemistry.mcmaster.ca/esam/Chapter_7/intro.html
-->
---
layout: laborfolio
title: Precipito
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - laboratorio-0a
---


<!--
https://en.wikipedia.org/wiki/Solubility_chart
https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/chemical_reactions/module4_3/4_3_2.htm
https://en.wikipedia.org/wiki/Solubility#Solubility_of_ionic_compounds_in_water
https://de.wikipedia.org/wiki/L%C3%B6slichkeit
https://www.hoffmeister.it/chemie/14-ionen-salze-faellungsreaktionen_und_ionenbindung.pdf
-->

<script>
  let lab;

  lanĉe(()=>{
    lab = new Laboratorio(ĝi("#eksperimento"),"fono",500,510);
    // preparu erojn por precipito
    lab.ero_smb("ero_1",3);
    lab.ero_smb("ero_2",50);

    // glaso kun likvo/precipito
    const precipito = Lab.precipito("p_1","precipito",
      {id: "ero_1", n: 51, a: 150, af: 10, s:250, d: 10, r: 3},
      {id: "ero_2", n: 11, a: 80, af: 100, s:300, d: 50},
      100, 250);

    const glaso = Lab.glaso("glaso",precipito);
    lab.metu(glaso,200,500);

    // substanco unu
    const NaCl = Lab.gutbotelo("nacl","NaCl",70);
    lab.metu(NaCl,10,500);

    // substanco 2
    const AgNO3 = Lab.gutbotelo("agno3","AgNO₃",15,190);
    lab.metu(AgNO3,300,150);

    // faligu erojn
    for (const a of ĝi("#eksperimento").querySelectorAll("animateMotion")) {
      a.beginElement();
    }
  })
</script>

<svg id="eksperimento"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-10 -10 520 520">
 <style type="text/css">
    <![CDATA[
      #fono {
        fill: #AFEEFF;
      }

      .likvo {
        fill: #eeeeee;
        stroke: gray;
        stroke-width: 0.1;
        fill-opacity: 0.2;
      }

      #ero_1 {
        fill: url(#r_gradiento_blanka);        
      }

      #ero_2 {
        fill: url(#r_gradiento_blanka);
      }

      .vitro {
        fill: none;
        stroke: black;
        stroke-width: 1.0;
      }

      .ujo text {
        font-size: 10px;
      }


    ]]>
  </style>
  <defs>
    <pattern id="strie" viewBox="0,0,4,1" height="20%" width="20%">
      <rect width="2" height="1"/>
    </pattern>
    <radialGradient id="r_gradiento_blanka">
      <stop offset="0%" stop-color="white" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>    
  </defs>
</svg>
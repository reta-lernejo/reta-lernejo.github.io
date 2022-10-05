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
    lab = new Laboratorio(ĝi("#eksperimento"));
    //const glaso = Lab.glaso();
    //lab.metu(glaso,200,500);
    const NaCl = Lab.gutbotelo("NaCl",70);
    lab.metu(NaCl,0,500);
    for (let i=0; i<5; i++) {
      const b = Lab.gutbotelo(i,15,i*45);
      lab.metu(b,100+i*60,500);
    }

    //const AgNO3 = Lab.gutbotelo("AgNO₃",15,170);
    //lab.metu(AgNO3,350,500);
  })
</script>

<svg id="eksperimento"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-10 -10 500 800">
 <style type="text/css">
    <![CDATA[
      .vitro {
        fill: none;
        stroke: black;
        stroke-width: 1.0;
      }

      .ujo text {
        font-size: 10px;
      }

/*
      .gutbotelo .likvo {
        clip-path: path('M0,-100 L0,-4 Q0,0 4,0 L36,0 Q40,0 40,-4 L40,-100 Z');
      }  
      */    

      .likvo {
        fill: silver;
        stroke: gray;
        stroke-width: 0.1;
      }
    ]]>
  </style>
  <defs>
    <pattern id="strie" viewBox="0,0,4,1" height="20%" width="20%">
      <rect width="2" height="1"/>
    </pattern>
  </defs>
</svg>
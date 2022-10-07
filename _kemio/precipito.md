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
  // solvebloj, true: bone solvebla, false: malbone solvebla
  function solvebla(katjono,anjono) {
    // 1)
    if (['Li+','Na+','K+','Rb+','NH4+'].indexOf(katjono)>=0) return true;

    // 2)
    if (['Cl-','Br-','I-'].indexOf(anjono)>=0) {
      if (['Ag+','Pb2+','Hg2+','Cu+'].indexOf(katjono)>=0) return false;
      else return true;
    }

    // 3) - parte jam kovrita de (1)
    if ('OH-' == anjono) {
      if (['Li+','Na+','K+','Rb+','NH4+','Sr2+','Ba2+'].indexOf(katjono)>=0) return true
      else return false;
    }

    // 4)
    if ('NO3-' == anjono) return true;

    // 5) fakte jam kovrita de (1)
    if (['PO43-','CO32-'].indexOf(anjono)>=0) {
      if (['Li+','Na+','K+','Rb+','NH4+'].indexOf(katjono)>=0) return true;
      else return false;
    }

    // 6)
    if ('SO42-' == anjono) {
      if (['Ca2+','Sr2+','Ba2+','Pb2+'].indexOf(katjono)>=0) return false;
      else return true;
    }

    throw `Neniu regulo por solveblo de ${katjono} | ${anjono}!`;
  }

  const jonoj = {
    "NaCl": ['Na+','Cl-'],
    "KI": ['K+','I-'],
    "Na₂CO₃": ['Na+','CO32-'],
    "CuSO₄": ['Cu2+','SO42-'],
    "AgNO₃": ['Ag+','NO3-'],
    "Ba(NO₃)₂": ['Ba2+','NO3-'],
    "Pb(NO₃)₂": ['Pb2+','NO3-'],
    "NaOH": ['Na+','OH-']
  }
    
  function s_testo() {
    // solveblo de 'reakciantoj'
    for (const j in jonoj) {
      const j_ = jonoj[j];
      console.log(`${solvebla(...j_)?'solvebla':'nesolvebla'} ${j}`);
    }
    // solveblo de produktoj (rekombinoj)
    const jj = Object.keys(jonoj);
    for (let n1 = 0; n1<jj.length-1; n1++) {
      for (let n2 = n1+1; n2<jj.length; n2++) {
        const j1 = jj[n1], jj1 = jonoj[j1];
        const j2 = jj[n2], jj2 = jonoj[j2];
  
        console.log(`${solvebla(jj1[0],jj2[1])?'solvebla':'nesolvebla'} ${jj1[0]} ${jj2[1]}`);
        console.log(`${solvebla(jj2[0],jj1[1])?'solvebla':'nesolvebla'} ${jj2[0]} ${jj1[1]}`);
      }
    } 
  }

  const substancoj = [
    "NaCl",
    "KI",
    "Na₂CO₃",
    "CuSO₄",
    "AgNO₃",
    "Ba(NO₃)₂",
    "Pb(NO₃)₂",
    "NaOH"
  ];

  /**
  * Kreu botelon en difinita situacio
  * @param {number} nro numero de la substanco
  * @param {boolean} maldekstre true:maldekstre, false:dekstre
  * @param {number} stato 0: staranta malsupre, 1: levita supren, 2: elverŝo
  */
  function botelo(nro, maldekstre, enhavo) {
    const subst = substancoj[nro];

    // kreu la botelon
    const botl = Lab.gutbotelo(`subst_${nro}`,subst+"\n(aq)",enhavo);

    // PLIBONIGU: aldonu helpfunkcion por tio en lab
    kiam_klako(botl.g,(event) => { // reago al klako
      const b = event.currentTarget;
      const nro = b.id.split(/_/)[1];
      const subst = substancoj[nro];
      console.log(subst);
      // forigu la botelon kaj metu en novan staton
      b.remove();
      // aktualigu la botelon
      boteloj[nro].stato = ++binfo.stato%3;
      botelo(nro);
    });

    // starigu la botelon
    const x_ŝovo = maldekstre? 10 : 130;
    const x = x_ŝovo + nro*45 + Math.random()*3;
    const y = 497 + Math.random()*5;
    lab.metu(botl,{
      id: nro,
      x:x, y:y,
      maldekstre: maldekstre,
      stato: 0 // 0: stare surtable
    });
  }

  /*    
    if (binfo.stato == 0) {
      const x_ŝovo = binfo.maldekstre? 10 : 130;
      x = x_ŝovo + nro*45 + Math.random()*3;
      y = 497 + Math.random()*5;

    // levita
    } else if (binfo.stato == 1) {
      x = binfo.maldekstre? 150:350;
      y = 150;
      ra = binfo.maldekstre? 70:-70; // klinangulo

    // elverŝo
    } else {
      x = binfo.maldekstre? 210:260;
      y = binfo.maldekstre? 150:100;
      ra = binfo.maldekstre? 170:-170; // klinangulo
    }
    */

  let lab;

  lanĉe(()=>{
    s_testo();

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
    lab.metu(glaso,{id: "tablo", x:200, y:500});

    // kreu botelojn kun substancoj laŭ numero
    for (nro = 0; nro<substancoj.length; nro++) {
      // kreu botelon
      const maldekstre = nro<4;
      botelo(nro, maldekstre, 
        maldekstre? 50+Math.random()*40 : 15+Math.random()*30);
    }

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
        fill: #DDF8FF;
      }

      .likvo {
        fill: #88aaff;
        fill-opacity: 0.3;
        /*
        stroke: gray;
        stroke-width: 0.1;
        */
      }

      #ero_1 {
        fill: url(#r_gradiento_blanka);        
      }

      #ero_2 {
        fill: url(#r_gradiento_blanka);
      }

      .vitro {
        /*fill: none;*/
        stroke: black;
        stroke-width: 1.0;
        fill: url(#vitro);
      }

      .ombro {
        fill: url(#r_gradiento_ombro);
      }

      .ujo text {
        font-size: 9px;
      }

      .ujo tspan:first-child {
        font-stretch: extra-condensed;
        font-weight: bold;
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
    <radialGradient id="r_gradiento_ombro" fx="60%" fy="10%">
      <stop offset="0%" stop-color="black" stop-opacity="0.1"/>
      <stop offset="60%" stop-color="black" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="black" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vitro">
      <stop offset="0%" stop-color="#00A" stop-opacity="0.5"/>
      <stop offset="7%" stop-color="#09F" stop-opacity="0.2"/>
      <stop offset="8%" stop-color="white" stop-opacity="0.6"/>
      <stop offset="48%" stop-color="white" stop-opacity="0"/>
      <stop offset="90%" stop-color="#AEF" stop-opacity="0"/>
      <stop offset="98%" stop-color="black" stop-opacity="0.7"/>
    </linearGradient>     
  </defs>
</svg>
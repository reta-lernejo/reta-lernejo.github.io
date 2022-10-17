---
layout: laborfolio
title: Precipito
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - laboratorio-0a
---

...paĝo en preparo...

<!--
https://en.wikipedia.org/wiki/Solubility_chart
https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/chemical_reactions/module4_3/4_3_2.htm
https://en.wikipedia.org/wiki/Solubility#Solubility_of_ionic_compounds_in_water
https://de.wikipedia.org/wiki/L%C3%B6slichkeit
https://www.hoffmeister.it/chemie/14-ionen-salze-faellungsreaktionen_und_ionenbindung.pdf

https://en.intl.chemicalaid.com/tools/equationbalancer.php?equation=Pb%28NO3%292+%2B+CuSO4+%3D+Pb%28SO4%292+%2B+CuNO3
-->

<!--
eksperimentoj:

- https://www.youtube.com/watch?v=DVrfgHMHjS4
- https://www.youtube.com/watch?v=Qc2pWUIzP2k
- https://www.youtube.com/watch?v=hVBsrwJFBTY

- NaCl + AgNO3 -> AgCl(s) + NaNO3 // blanka (https://www.youtube.com/watch?v=xR_VZXOz64A)
- KI + AgNO3 -> AgI(s) + KNO3 // flaveta (https://www.youtube.com/watch?v=m_0lpAFAisU)
- 2NaI + Pb(NO3)2 -> PbI2(s) + 2NaNO3 // flava (https://www.youtube.com/watch?v=hVBsrwJFBTY)
- 2KI + Pb(NO3)2 -> PbI2(s) + 2KNO3 // flava (https://www.youtube.com/watch?v=diW7q7RFJBM, https://www.youtube.com/watch?v=6TRuMSjxgYs, https://www.youtube.com/watch?v=2EQznGPZY5A,  https://www.youtube.com/watch?v=H4COWrI0WsQ)
- 2NaCl + Pb(NO3)2 -> PbCl2 + 2NaNO3 // blanka (https://www.youtube.com/watch?v=0RuayQSG6fc)
- CuSO4 + 2NAOH -> Cu(OH)2(s) + Na2SO4 // helblua (https://www.youtube.com/watch?v=hVBsrwJFBTY)
- 2NaCl + Ba(NO3)2 -> 2NaNO3 + BaCl2 // ĉiuj solveblaj (https://www.youtube.com/watch?v=hVBsrwJFBTY)
- Na2CO3 + Ba(NO3)2 -> BaCO3(s) + 2NaNO3 // blanka (https://www.youtube.com/watch?v=hVBsrwJFBTY)
- xxx -> PbSO4 (https://www.youtube.com/watch?v=ZYNEHwHAtqk 7:26)
-(?) CuSO4 + 2 NaOH -> Cu(OH)2 + Na2SO4 (https://de.wikipedia.org/wiki/Kupfer(II)-nitrat, blau-grün)
- -> Ag2CO3 // blankbruna (https://www.youtube.com/watch?v=_lDLzmhF8E8, https://www.youtube.com/watch?v=HqAlLWwxWdw)
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

  function precipito_ecoj(katjono,anjono) {
    // devio de koloro kaj geometriaj ecoj de precipitaĵo
    // aprioraj estas:
    //  e1 = {id: "ero_3", n: 51, alto: 150, falaĵalto: 10, supro: 270,
    //        daŭro: 10, aperdaŭro: 5, videblo: 0.0, klasoj: "ero_1 kaŝita"};
    //  e2 = {id: "ero_50", n: 11, alto: 80, falaĵalto: 100, supro: 300,
    //        daŭro: 50, aperdaŭro: 3, videblo: 0.0, klasoj: "ero_2 kaŝita"};

    if (
      katjono == 'Pb2+' && anjono == 'I-') {
      return { 
        koloro: "flava", 
        //eroj1: { id: "ero_20", n: 25, falaĵalto: 40 },
        eroj1: { id: "ero_5", n: 150, daŭro: 5, aperdaŭro: 8, falaĵalto: 20 },
        eroj2: { n: 25, alto: 120, faldistanco: 20 }
      };
    } else if (
      katjono == 'Ag+' && anjono == 'I-') {
      return { koloro: "flaveta" };
    } else if (
      katjono == 'Ag+' && anjono == 'CO32-') {
      return { koloro: "blankbruna" };
    } else if (
      katjono == 'Ag+' && anjono == 'OH-') {
      return { koloro: "bruna" };
    } else if (
      katjono == 'Cu2+' && anjono == 'OH-' ||
      katjono == 'Cu2+' && anjono == 'CO32-') {
      return { koloro: "helblua" };
    } else if (
      katjono == 'Ag+' && anjono == 'Cl-' ||
      katjono == 'Ba2+' && anjono == 'CO32-' ||
      katjono == 'Ba2+' && anjono == 'SO42-' ||
      katjono == 'Pb2+' && anjono == 'CO32-' ||
      katjono == 'Pb2+' && anjono == 'Cl-' ||
      katjono == 'Pb2+' && anjono == 'OH-' ||
      katjono == 'Pb2+' && anjono == 'SO42-') {
      return { koloro: "blanka" };
    }
  }

  const jonoj = {
    // maldekstre
    "NaCl": ['Na+','Cl-'],
    "KI": ['K+','I-'],
    "Na₂CO₃": ['Na+','CO32-'],
    "NaOH": ['Na+','OH-'],
    // dekstre
    "AgNO₃": ['Ag+','NO3-'],
    "Ba(NO₃)₂": ['Ba2+','NO3-'],
    "Pb(NO₃)₂": ['Pb2+','NO3-'],
    "CuSO₄": ['Cu2+','SO42-']
  }  
    
  function s_testo() {
    // solveblo de 'reakciantoj'
    for (const j in jonoj) {
      const j_ = jonoj[j];
      const solvbl = solvebla(...j_);
      //console.log(`${solvbl?'solvebla':'nesolvebla'} ${j}`);
      if (!solvbl) throw "Ne solvebla reakcianto: "+j;
    }
    // solveblo de produktoj (rekombinoj)
    const jj = Object.keys(jonoj);
    for (let n1 = 0; n1<jj.length-1; n1++) {
      for (let n2 = n1+1; n2<jj.length; n2++) {
        const j1 = jj[n1], jj1 = jonoj[j1];
        const j2 = jj[n2], jj2 = jonoj[j2];
  
        const solvbl1 = solvebla(jj1[0],jj2[1]);
        const solvbl2 = solvebla(jj2[0],jj1[1]);

        if (solvbl1 && solvbl2) console.log(`(informe) ambaŭ solveblaj: ${jj1[0]} ${jj2[1]}; ${jj2[0]} ${jj1[1]}`);
        if (!solvbl1 && !solvbl2) throw `(evitende) Ambaŭ nesolveblaj: ${jj1[0]} ${jj2[1]}; ${jj2[0]} ${jj1[1]}`;
        if (!solvbl1 && !precipito_ecoj(jj1[0],jj2[1])) throw `Nedifinitaj ecoj por precipito ${jj1[0]} ${jj2[1]}`;
        if (!solvbl2 && !precipito_ecoj(jj2[0],jj1[1])) throw `Nedifinitaj ecoj por precipito ${jj2[0]} ${jj1[1]}`;
        // console.log(`${solvebla(jj1[0],jj2[1])?'solvebla':'nesolvebla'} ${jj1[0]} ${jj2[1]}`);
        // console.log(`${solvebla(jj2[0],jj1[1])?'solvebla':'nesolvebla'} ${jj2[0]} ${jj1[1]}`);
      }
    }
  }

  const substancoj = [
    // maldekstre
    "NaCl",
    "KI",
    "Na₂CO₃",
    "NaOH",
    // dekstre
    "AgNO₃",
    "Ba(NO₃)₂",
    "Pb(NO₃)₂",
    "CuSO₄"
  ];


  let lab; // la laboratorio kaj iloj
  let mikso = []; // miksaĵo de du ĥemiaĵoj


  function miksaldono(maldekstre,substanco) {
    const s = maldekstre?0:1;
    mikso[s] = substanco;

    function nesolvebla(s1,s2) {
      if (s1 && s2) {
        const jj1 = jonoj[s1];
        const jj2 = jonoj[s2];

        return !solvebla(jj1[0],jj2[1]) || !solvebla(jj2[0],jj1[1]);
      }
    }

    function prcpt_ecoj(s1,s2) {
        const jj1 = jonoj[s1];
        const jj2 = jonoj[s2];

        return (
          precipito_ecoj(jj1[0],jj2[1]) ||
          precipito_ecoj(jj2[0],jj1[1])
        );
    }

    if (nesolvebla(mikso[0],mikso[1])) {
      // lanĉu precipiton
      // const prcp = ĝi("#_glaso_glaso_enhavo .precipito");
      // forigu display: none!
      // prcp.classList.remove("klara_likvo");

      const glaso = lab.iloj["glaso"];

      let precipito;

      // apriora precipito, eroj1: eretoj, eroj2: nuboj
      let e1 = {id: "ero_3", n: 51, alto: 150, falaĵalto: 10, supro: 270, daŭro: 10, aperdaŭro: 5, videblo: 0.0, klasoj: "ero_1 kaŝita"};
      let e2 = {id: "ero_50", n: 11, alto: 80, falaĵalto: 100, supro: 300, daŭro: 50, aperdaŭro: 3, videblo: 0.0, klasoj: "ero_2 kaŝita"};

      const ecoj = prcpt_ecoj(mikso[0],mikso[1]);
      if (ecoj.eroj2) e2 = Object.assign(e2,ecoj.eroj2);
      if (ecoj.eroj1) e1 = Object.assign(e1,ecoj.eroj1);

      precipito = Lab.falaĵo("p_1","precipito",
        e1, e2,
        100, 250);

      // adaptu la koloron de la gradiento
      if (ecoj && ecoj.koloro) {
        for (const stp of ĉiuj("#gradiento_precipito stop")) {
          //stp.className = `p_${klr}`;
          Lab.a(stp,{class: `p_${ecoj.koloro}`});
        }
      }

      glaso.enhavo(precipito,true);  // aldonu precipiton al jama likvo
      const eroj1 = ĉiuj('#_glaso_glaso_enhavo .ero_1').entries();
      const eroj2 = ĉiuj('#_glaso_glaso_enhavo .ero_2').entries();
      const intervalo = 5;

      function ek(eroj) {
        const e = eroj.next();
        if (!e.done) {
          const use = e.value[1];
          //use.classList.remove("kaŝita");
          for (const a of use.querySelectorAll("animateMotion, animate")) {
            a.beginElement();
          }
          use.classList.remove("kaŝita");
          setTimeout(() => ek(eroj),
            // per hazarda tempo ni evitas ke eroj aperu tro orde de maldekstre dekstren
            Math.random()*intervalo);
        }
      }

      // nur post iom da tempo (1s) precipito entute komenciĝu
      setTimeout(() => ek(eroj2), 500);
      // nur post la grandaj nubaj eroj elfalu la malgrandaj kristalaj
      setTimeout(() => ek(eroj1), 3000);
    };

    if (mikso[0] && mikso[1]) {
      // montru la koncernan formulon
      const ekv = document.getElementById(`${mikso[0]}_${mikso[1]}`); //ĝi(`#${mikso[0]}_${mikso[1]}`);
      ekv.classList.remove("kaŝita");
    }
  }


  /**
  * Kreu botelon en difinita situacio
  * @param {number} nro numero de la substanco
  * @param {boolean} maldekstre true:maldekstre, false:dekstre
  * @param {number} stato 0: staranta malsupre, 1: levita supren, 2: elverŝo
  */
  function stara_botelo(nro, maldekstre, enhavo) {
    const subst = substancoj[nro];

    // kreu la botelon
    const botl = Lab.gutbotelo(nro,subst+"\n(aq)",enhavo);
    botl.stato = 0; // 0: stare surtable
    botl.maldekstre = maldekstre;

    // starigu la botelon
    const x_ŝovo = maldekstre? 10 : 130;
    const x = x_ŝovo + nro*45 + Math.random()*3;
    const y = 497 + Math.random()*5;
    lab.metu(botl,{
      id: nro,
      x:x, y:y
    });

    return botl;
  }

  function botel_restarigo() {
    // restarigu eventuale levitan botelojn

    for (const l of ["LM","LD","VM","VD"]) {
      const loko = lab.lokoj[l];
      if (loko._ilo !== undefined) {
        // rekreu starantan botelon
        const botl = lab.iloj[loko._ilo];
        const subst = substancoj[botl.id];
        const nova = Lab.gutbotelo(botl.id,subst+"\n(aq)",botl.pleno);

        nova.stato = 0; // staranta
        nova.maldekstre = botl.maldekstre;
        lab.klak_reago(nova,botel_levo);

        const x_ŝovo = nova.maldekstre? 10 : 130;
        const x = x_ŝovo + nova.id*45 + Math.random()*3;
        const y = 497 + Math.random()*5;

        lab.movu(botl,botl.id,nova);
      }
    }
  }

  function botel_levo(botl) {
    // kontrolu, ĉu la loko estas libera ankoraŭ
    // plibonigu: se ne jam elverŝita ni ankaŭ povus
    // anstatŭigi tiun botelon - necesos funkcio por restarigo...!
    const L = botl.maldekstre? "M":"D";
    if (lab.okupita(`L${L}`) || lab.okupita(`V${L}`)) {
      console.log("Levita loko jam okupita!");
      return;
    }

    // rekreu klinitan botelon
    const subst = substancoj[botl.id];
    ra = botl.maldekstre? 70:-70; // klinangulo
    const nova = Lab.gutbotelo(botl.id,subst+"\n(aq)",botl.pleno,ra);

    nova.stato = 1; // levita
    nova.maldekstre = botl.maldekstre;
    lab.klak_reago(nova,botel_verŝo);

    lab.movu(botl,botl.maldekstre?"LM":"LD",nova)
  }

  function botel_verŝo(botl) {
    // rekreu klinitan botelon
    const subst = substancoj[botl.id];
    ra = botl.maldekstre? 170:-170; // klinangulo
    const nova = Lab.gutbotelo(botl.id,subst+"\n(aq)",botl.pleno,ra);

    nova.stato = 2; // verŝa
    nova.maldekstre = botl.maldekstre;
    lab.movu(botl,botl.maldekstre?"VM":"VD",nova);

    // por verŝgutoj ni bezonas la pinton de la botelo kaj la surfacon de la glaso
    const pinto = botl.pinto();
    const pt = lab.svgKoord(ĝi('#'+pinto.id),pinto.x,pinto.y);
/*
    ĝi("#lab_aranĝo").append(Lab.e("circle",{
      cx: pt.x, cy: pt.y, r: 3, fill:"red"
    }));
*/
    //const surfaco = lab.iloj["glaso"].surfaco();
    const surfaco = {id: "_glaso_glaso", x: 50, y: -250};

    // surfaco indikas la mezpunkton de la surfaco, por
    // vertikala falo ni poste uzu pt.x!
    const sf = lab.svgKoord(ĝi('#'+surfaco.id),surfaco.x,surfaco.y);
/*
    ĝi("#lab_aranĝo").append(Lab.e("line",{
      x1: pt.x, x2: pt.x + (sf.x-pt.x)/5, 
      y1: pt.y, y2: sf.y, stroke:"green"
    }));
    */

    // KOREKTU:
    // anstataŭ s uzu y0 kaj ne negativigu kiel por precipito#
    // anstataŭ fd uzu dy
    // permesu doni x0 KAJ dx
    // pli bone havu flekseblan falaĵon kun aŭ sen limiga likvo!
    const gutoj_id = "gutoj_"+(nova.maldekstre?"md":"dk");
    const verŝo = Lab.falaĵo(gutoj_id,"gutoj",
      {
        id: "guto", n: 7,
        alto: 3,
        falaĵalto: 2,
        x0: pt.x,
        supro: -pt.y,
        daŭro: 1,  // daŭro: 1s
        faldistanco: sf.y-pt.y,
        poste: (ev) => {
          const gutoj = ĝi('#'+gutoj_id);
          if (gutoj) gutoj.remove(); // ial ĝi foje ne ekzistas..., kial? eble akcidenta duobla klako?
          miksaldono(nova.maldekstre,subst);
        }
      },
      null, 0, 0); 

    ĝi("#lab_aranĝo").append(verŝo);
    for (a of ĉiuj(`#${gutoj_id} animateMotion`)){
      a.beginElement();
    };
  }


  lanĉe(()=>{
    s_testo();

    lab = new Laboratorio(ĝi("#eksperimento"),"fono",500,510);
    // preparu erojn por precipito kaj gutoj
    lab.ero_smb("ero_3",3);
    lab.ero_smb("ero_5",5);
    lab.ero_smb("ero_20",20);
    lab.ero_smb("ero_50",50);
    /*
    lab.ero_smb("ero_agi",50);
    lab.ero_smb("ero_pb",50);
    lab.ero_smb("ero_cu",50);
    */
    lab.ero_smb("guto",3);

/*
    // precipitaĵoj estu komence nevideblaj
    for (const prcp of ĉiuj(".precipito") {
      prcp.classList.add("klara_likvo");
    } 
    */

    const glaso = Lab.glaso("glaso",5/6); // alteco = 250 (5/6*300)
    lab.metu(glaso,{id: "tablo", x:200, y:500});

    // kreu botelojn kun substancoj laŭ numero
    for (nro = 0; nro<substancoj.length; nro++) {
      // kreu botelon
      const maldekstre = nro<4;
      const botl = stara_botelo(nro, maldekstre, 
        maldekstre? 50+Math.random()*40 : 15+Math.random()*30);

      lab.klak_reago(botl,botel_levo);
    }

    // aldonu lokojn levitajn kaj verŝajn
    // (la koordinatoj estas malsamaj pro
    // iom neregula rotaciado de gutboteloj
    // konservante konvenan kvanton da enhavo)
    lab.nova_loko({id: "LM", x: 150, y: 150});
    lab.nova_loko({id: "LD", x: 350, y: 150});
    lab.nova_loko({id: "VM", x: 210, y: 150});
    lab.nova_loko({id: "VD", x: 290, y: 120});

    // faligu erojn
    /*
    for (const a of ĝi("#eksperimento").querySelectorAll("animateMotion")) {
      a.beginElement();
    }
    */
    for (const ekv of ĉiuj(".prc_ekv")) {
      ekv.classList.add("kaŝita");
    }

    const ree = lab.butono("ree",10,10,30,20);
    lab.klak_reago({g: ree},(ev) => {
      // remetu botelojn...
      botel_restarigo();
      // purigu la enhavon de la glaso
      const glaso = lab.iloj["glaso"];
      glaso.enhavo(5/6);

      for (const ekv of ĉiuj(".prc_ekv")) {
        ekv.classList.add("kaŝita");
      }
    });

  })
</script>

<svg id="eksperimento"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-10 -10 520 520">
 <style type="text/css">
    <![CDATA[
      #fono {
        fill: #0C3742;
      }

      .butono rect {
        fill: cornflowerblue;
        fill-opacity: 0.2;
        stroke: white;
        stroke-width: 0.5;
      }
      .butono text {
        dominant-baseline: hanging;
        fill: white;
      }

      .kaŝita {
        display: none;
      }

      .likvo {
        fill: #88aaff;
        fill-opacity: 0.3;
        /*
        stroke: gray;
        stroke-width: 0.1;
        */
      }

      #_gutbotelo_1 .likvo {
        fill: #ffff00;
        fill-opacity: 0.1;
      }

      /* kaŝu precipitaĵon */
      .klara_likvo use {
        display: none;
      }

      .p_blanka {
        stop-color: white;
      }

      .p_flava {
        stop-color: #fd0;
      }

      .p_flaveta {
        stop-color: #fea;
      }

      .p_helblua {
        stop-color: #8ff
      }

      .p_blankbruna {
        stop-color: #fdb; /* #feb; #db8? */
      }

      .p_bruna {
        stop-color: #2e2626; /* #322 */
      }

      #ero_3, #ero_5, #ero_20, #ero_50 {
        fill: url(#gradiento_precipito);
      }

      #guto {
        stroke: gray;
        stroke-width: 0.5;
        stroke-dasharray: 5 10;
        fill: #8cd;
        fill-opacity: 0.6;
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

      .etikedo {
        fill: white;
        fill-opacity: 0.4;
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
    <radialGradient id="gradiento_precipito">
      <stop class="p_blanka" offset="20%" stop-opacity="0.6"/>
      <stop class="p_blanka" offset="100%" stop-opacity="0"/>
    </radialGradient> 
    <!--
    <radialGradient id="r_gradiento_blanka">
      <stop offset="0%" stop-color="white" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient> 
    <radialGradient id="r_gradiento_flava">
      <stop offset="0%" stop-color="#ffdd00" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#ffdd00" stop-opacity="0"/>
    </radialGradient>    
    <radialGradient id="r_gradiento_flaveta">
      <stop offset="0%" stop-color="#fea" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#fea" stop-opacity="0"/>
    </radialGradient>    
    <radialGradient id="r_gradiento_blua">
      <stop offset="0%" stop-color="#8ff" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#8ff" stop-opacity="0"/>
    </radialGradient>
    -->
    <radialGradient id="r_gradiento_ombro" fx="60%" fy="10%">
      <stop offset="0%" stop-color="black" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="black" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="black" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vitro">
      <stop offset="0%" stop-color="#00A" stop-opacity="0.5"/>
      <stop offset="7%" stop-color="#09F" stop-opacity="0.2"/>
      <stop offset="8%" stop-color="white" stop-opacity="0.6"/>
      <stop offset="48%" stop-color="white" stop-opacity="0"/>
      <stop offset="90%" stop-color="#034" stop-opacity="0"/>
      <stop offset="98%" stop-color="black" stop-opacity="0.7"/>
    </linearGradient>
  </defs>
</svg>

<!--
    // maldekstre
    "NaCl": ['Na+','Cl-'],
    "KI": ['K+','I-'],
    "Na₂CO₃": ['Na+','CO32-'],
    "NaOH": ['Na+','OH-'],
    // dekstre
    "AgNO₃": ['Ag+','NO3-'],
    "Ba(NO₃)₂": ['Ba2+','NO3-'],
    "Pb(NO₃)₂": ['Pb2+','NO3-'],
    "CuSO₄": ['Cu2+','SO42-']
-->

<span class="prc_ekv" id="NaCl_AgNO₃">$$\ce{NaCl(aq) + AgNO3(aq) -> AgCl(s) + NaNO3(aq)}$$</span>
<span class="prc_ekv" id="NaCl_Ba(NO₃)₂">$$\ce{2NaCl(aq) + Ba(NO3)2(aq) -> BaCl2(aq) + 2NaNO3(aq)}$$</span>
<span class="prc_ekv" id="NaCl_Pb(NO₃)₂">$$\ce{2NaCl(aq) + Pb(NO3)2(aq) -> PbCl2(s) + 2NaNO3(aq)}$$</span>
<span class="prc_ekv" id="NaCl_CuSO₄">$$\ce{2NaCl(aq) + CuSO4(aq) -> CuCl2(aq) + Na2SO4(aq)}$$</span>
<span class="prc_ekv" id="KI_AgNO₃">$$\ce{KI(aq) + AgNO3(aq) -> AgI(s) + KNO3(aq)}$$</span>
<span class="prc_ekv" id="KI_Ba(NO₃)₂">$$\ce{2KI(aq) + Ba(NO3)2(aq) -> BaI2(aq) + 2KNO3(aq)}$$</span>
<span class="prc_ekv" id="KI_Pb(NO₃)₂">$$\ce{2KI(aq) + Pb(NO3)2(aq) -> PbI2(s) + 2KNO3}$$</span>
<span class="prc_ekv" id="KI_CuSO₄">$$\ce{2KI(aq) + CuSO4(aq) -> CuI2(aq) + K2SO4(aq)}$$</span>
<span class="prc_ekv" id="Na₂CO₃_AgNO₃">$$\ce{Na2CO3(aq) + 2AgNO3(aq) -> Ag2CO3(s) + 2NaNO3(aq)}$$</span>
<span class="prc_ekv" id="Na₂CO₃_Ba(NO₃)₂">$$\ce{Na2CO3(aq) + Ba(NO3)2(aq) -> BaCO3(s) + 2NaNO3(aq)}$$</span>
<span class="prc_ekv" id="Na₂CO₃_Pb(NO₃)₂">$$\ce{Na2CO3(aq) + Pb(NO3)2(aq) -> PbCO3(s) + 2NaNO3(aq)}$$</span>
<span class="prc_ekv" id="Na₂CO₃_CuSO₄">$$\ce{Na2CO3(aq) + CuSO4(aq) -> CuCO3(s) + Na2SO4(aq)}$$</span>
<span class="prc_ekv" id="NaOH_AgNO₃">$$\ce{NaOH(aq) + AgNO3(aq) -> AgOH(s) + NaNO3(aq)}$$</span>
<span class="prc_ekv" id="NaOH_Ba(NO₃)₂">$$\ce{2NaOH(aq) + Ba(NO3)2(aq) -> Ba(OH)2(aq) + 2NaNO3(aq)}$$</span>
<span class="prc_ekv" id="NaOH_Pb(NO₃)₂">$$\ce{2NaOH(aq) + Pb(NO3)2(aq) -> Pb(OH)2(s) + 2NaNO3(aq)}$$</span>
<span class="prc_ekv" id="NaOH_CuSO₄">$$\ce{2NaOH(aq) + CuSO4(aq) -> Cu(OH)2(s) + Na2SO4}$$</span>

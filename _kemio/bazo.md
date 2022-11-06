---
layout: laborfolio
title: Bazoj
chapter: "3.2.2"
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - laboratorio-0b
  - k_acidbaz-0a
css:
  - laboratorio-0b
---
<!--
https://de.wikipedia.org/wiki/Universalindikator
https://en.wikipedia.org/wiki/Universal_indicator

http://www.ewt-wasser.de/de/wissen/konzentrationsangaben-einheitenumrechnung.html

-->

paĝo en preparo....


*Bazoj* estas ĥemiaj kombinaĵoj, kiuj aŭ enhavas hidroksidjonon $$\ce{OH-}$$ kaj disociiĝas en akvo al metalo kaj hidroksidjonoj, ekzemple[^cd]:

$$\ce{NaOH <-> Na+ + OH-}$$

Solvaĵojn de tiaj bazoj en akvo oni nomas ankaŭ *alkala solvaĵo* aŭ *lesivo*.

Aliaj bazoj ne enhavas hidroksidon, sed en akvo akceptas protonojn postlastante hidroksidjonon, ekzemple:

$$\ce{NH3 + H2O <-> NH4^+ + OH-}$$

Ĉar tiuj hidroksijonoj povas kuniĝi kun superfluaj H+-jonoj al akvomolekuloj, bazoj reduktas la koncentritecon de H+-jonoj kaj tiel *malacidigas* aŭ *neŭtraligas* acidan solvaĵon.

<!-- pOH, valoro, sumo pH + pOH = 14 / Kw Kdiss... 
https://www.chemie.de/lexikon/PH-Wert.html
https://de.wikipedia.org/wiki/PH-Wert#pOH-Wert
-->


<!--

- gusto
- hidroksidjonoj hidrogenitaj en akva solvaĵo 
- mezureblo per kolorŝanĝo
- koncentriĝo / logaritma skalo: pH7: H+ 0,000001 mol/l 
- akvo: H2O(l) + H2O(l) -> H+(aq) + OH-(aq)          
   
-->


<script>
  let lab; // la laboratorio kaj iloj
  let bastono; // la vitra bastono por fari la pH-provon
  let indikilo; // la pH-iundikilo
  let substanco = "H₂O"; // la elektita substanco
  const ALTO = 240;
  const LARĜO = 300;

  substancoj = {   
    sango: [7.4,"hsl(0 90% 40%)",.8],
    saplesivo: [10,"hsl(60 90% 95%)",.75],
    intestsuko: [8,"hsl(100, 90%, 80%",.7],
    marakvo: [8,"hsl(200, 70%, 30%",.6],
    "NaOH 0,1 mol/l": [13,"hsl(270, 20%, 90%)",.2],
    "NaOH 0,01 mol/l": [12,"hsl(270, 20%, 90%)",.2],
    "NaOH 0,001 mol/l": [11,"hsl(270, 20%, 90%)",.2],
    "NaOH 0,0001 mol/l": [10,"hsl(270, 20%, 90%)",.2],
    "NaOH 0,00001 mol/l": [9,"hsl(270, 20%, 90%)",.2],
  }

  function substanc_elekto(subst) {
    // plenigu la glason
    substanco = subst;
    const ecoj = substancoj[subst];
    const enhavo = ĝi("#_glaso_provtubo_enhavo .likvo") || ĝi("#_glaso_provtubo_enhavo .__subst");
    Lab.a(enhavo,{class: "__subst", fill: ecoj[1], "fill-opacity": ecoj[2]}); 
    indikilo.makulo(7,true); // true: forigu makulon
    lab.movu(bastono,"B1");
    /*
    const makulo = ĝi("#indikilo .makulo") || ĝi("#indikilo .__makulo");
    Lab.a(makulo, {
      fill: '',
      "fill-opacity": 0
    })
    */
  }

  function pHprovo() {
    lab.movu(bastono,"B2");
    const ecoj = substancoj[substanco];
    indikilo.makulo(ecoj[0]); // kolorigu laŭ pH-valoro
    console.log(`${substanco}, pH: ${ecoj[0]}`);
    /*
    Lab.a(makulo, {
      class: "__makulo",
      fill: `hsl(${pHklr},70%,50%)`,
      "fill-opacity": .7
    });
    */
  }

  lanĉe(()=>{
    lab = new Laboratorio(ĝi("#eksperimento"),"fono",LARĜO,ALTO+10);

    // pH-indikilon maldekstre
    indikilo = Lab.indikilo();
    lab.metu(indikilo,{id: "maldekstre", x:(LARĜO)/2-80, y:ALTO-50});

    // vitra bastono unue por ke ĝi aperu "en" la provtubo
    bastono = Lab.bastono("bastono");
    lab.metu(bastono,{id: "B1", x:(LARĜO)/2+8+40, y:ALTO});
    lab.nova_loko({id: "B2", x:(LARĜO)/2, y:ALTO});

    // metu provtubon en la mezon
    const provtubo = Lab.provtubo("provtubo",1/6); // enhavo (5/6*150)
    lab.metu(provtubo,{id: "tablo", x:(LARĜO)/2+40, y:ALTO-5});

    // ni faru pH-provon se uzanto klakas ie
    // sur bastonon, provtubon aŭ pH-indikilon
    lab.klak_reago(bastono,pHprovo);
    lab.klak_reago(provtubo,pHprovo);
    lab.klak_reago(indikilo,pHprovo);

    // elekteblaj substancoj
    const btn_w = 70; btn_h = 16; 
    let dk_y = 10, md_y = 10;

    for (s of Object.keys(substancoj)) { 
      let btn;     
      if (s.startsWith("Na")) {
        btn = lab.butono(s,-10,md_y,btn_w+30,btn_h);
        md_y += btn_h + 4;
      } else {
        btn = lab.butono(s,LARĜO-btn_w+10,dk_y,btn_w,btn_h);
      dk_y += btn_h + 4;
      }
 
      lab.klak_reago({g: btn},(btn) => {
        const subst = btn.g.textContent;
        // forigu klason .premita de antaŭa butono...
        for (const b of ĉiuj("#eksperimento .butono")) {
          b.classList.remove("premita");
        }
        // montru nun elektitan substancon kaj butonon
        btn.g.classList.add("premita");
        substanc_elekto(subst);
      });
    }

  });

</script>

<svg id="eksperimento"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-10 -10 320 260">
 <style type="text/css">
    <![CDATA[
      .likvo {
        display: none;
      }
      .butono.premita rect {
        fill: #004b4b;
      }
    ]]>
  </style>
</svg>

##fontoj

[^cd]: [Basen (Chemie)](https://www.chemie.de/lexikon/Basen_%28Chemie%29.html)

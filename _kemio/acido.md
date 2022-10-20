---
layout: laborfolio
title: Acidoj
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - laboratorio-0b
css:
  - laboratorio-0b
---
<!--
https://de.wikipedia.org/wiki/Universalindikator
https://en.wikipedia.org/wiki/Universal_indicator

-->

<script>

  let lab; // la laboratorio kaj iloj
  const ALTO = 240;
  const LARĜO = 300;

  substancoj = {
    citronsuko: [2,"hsla(59, 82%, 61%, .8)"],
    kolao: [4,"hsla(28, 54%, 20%, .4)"],
    vinagro: [3,"hsla(72, 100%, 93%, .1)"],
    stomaksuko: [1,"hsla(72, 100%, 93%, .6)"],
    mineralakvo: [5,"hsla(0, 90%, 90%, .05)"],
    lakto: [6,"hsla(0 90% 90% 0.9)"],
    salivo: [6,"hsla(0, 90%, 90%, .3)"],
    "H₂O": [7,"hsla(0, 90%, 90%, .05)"],
    sango: [7,"hsla(0 90% 50% 0.7)"],
    citronlimonado: [3,"hsla(59, 82%, 61%, .1)"],
    acidlakto: [5,"hsla(0 90% 90% 0.9)"]
  }

  function substanc_elekto(subst) {
    // plenigu la glason
    const ecoj = substancoj[subst];
    const enhavo = ĝi("#_glaso_provtubo_enhavo .likvo") || ĝi("#_glaso_provtubo_enhavo .__subst");
    Lab.a(enhavo,{class: "__subst", fill: ecoj[1]}); 

    // la bastonmovo pli bone okazu ĉe alklako de la provtubo...
    //lab.movu(bastono,"B2");
  }

  lanĉe(()=>{
    lab = new Laboratorio(ĝi("#eksperimento"),"fono",LARĜO,ALTO+10);

    // pH-indikilon maldekstre
    const indikilo = Lab.indikilo();
    lab.metu(indikilo,{id: "maldekstre", x:(LARĜO)/2-80, y:ALTO-50});

    // vitra bastono unue por ke ĝi aperu "en" la provtubo
    const bastono = Lab.bastono("bastono");
    lab.metu(bastono,{id: "B1", x:(LARĜO)/2+8+40, y:ALTO});
    lab.nova_loko({id: "B2", x:(LARĜO)/2, y:ALTO});


    // metu provtubon en la mezon
    const provtubo = Lab.provtubo("provtubo",1/6); // enhavo (5/6*150)
    lab.metu(provtubo,{id: "tablo", x:(LARĜO)/2+40, y:ALTO-5});

    // elekteblaj substancoj
    const btn_w = 70; btn_h = 16; 
    let btn_y = 10;

    for (s of Object.keys(substancoj)) {
      const btn = lab.butono(s,LARĜO-btn_w+10,btn_y,btn_w,btn_h);
      lab.klak_reago({g: btn},(btn) => {
         const subst = btn.g.textContent;
         substanc_elekto(subst);
      });
      btn_y += btn_h + 4;
    }


  });

</script>

<svg id="eksperimento"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-10 -10 320 260">
 <style type="text/css">
    <![CDATA[
    ]]>
  </style>
</svg>

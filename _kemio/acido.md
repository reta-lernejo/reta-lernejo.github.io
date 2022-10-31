---
layout: laborfolio
title: Acidoj
chapter: "3.2.1"
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

https://de.wikipedia.org/wiki/S%C3%A4urekonstante
https://de.wikipedia.org/wiki/Universalindikator
https://en.wikipedia.org/wiki/Universal_indicator
https://www.aqion.de/site/ph-tabelle-saeuren
https://www.hoffmeister.it/index.php/chemiebuch-anorganik/232-freies-lehrbuch-anorganische-chemie-24-saeure-base-gleichgewichte

http://www.ewt-wasser.de/de/wissen/konzentrationsangaben-einheitenumrechnung.html
https://dieklugeeule.com/wie-berechnet-man-den-ph-wert-von-hcl/

-->

paĝo en preparo....

<!--

- gusto
- protonoj hidrogenitaj en akva solvaĵo -> reakcio kun akvo...(?)
- mezureblo per kolorŝanĝo
- koncentriĝo / logaritma skalo: pH7: H+ 0,000001 mol/l 
- akvo: H2O(l) + H2O(l) -> H+(aq) + OH-(aq)
          H+(aq) = akvigita/hidratigita jono (vd. solvaĵoj), oni skribas ofte kiel oksonium/hidronium H3O+
   
-->

Acidoj estas ĥemiaj kombinaĵoj, kiuj povas transigi unu aŭ pluraj el siaj hidrogenatomoj kiel jono, t.e. la nuklea protono sen la elektrono, al alia reakcianto. Aparte en akva solvaĵo ili perdas hidrogenjonon $$\ce{H+}$$ kiu siavice, kiel klarigita en la ĉapitro pri [solvaĵoj](solvajho), ĉirkaŭiĝas de akvaj molekuloj. En ekvacio oni skribas la rezulton iom simplige kiel $$\ce{H3O+}$$:

$$\ce{HCl + H2O <-> H3O+ + Cl-}$$

Tiu procezo okazas en ambaŭ direktoj kaj alstrebas ekvilibron, kiu i.a. dependas de la konkreta acidospeco, la solvilo kaj la temperaturo. Tion oni signas per dudirekta sago en la ekvacio.

Acidoj troviĝas en multaj nutraĵoj kiel frukto, fermentaĵoj kiel vinagro aŭ jahurto, en mineralakvo enhavanta karbonacidon ktp. Ili donas al tiuj nutraĵoj ilian karakterizan acidan guston. Ekzistas pli fortaj kaj pli malfortaj acidoj. Tiu grado de acideco dependas de la koncentriĝo de protonoj solvitaj en akvo. Ĉe certa temperaturo kaj specifa acido tiu koncentriĝo estas esprimebla per konstanto tiel:

$$K_a = \frac{c(H_3O^+) \times c(A^-)}{c(HA)}$$

La esprimo $$c(X)$$ estas la koncerna koncentriĝo, $$HA$$ la acido kaj $$A-$$ la acidresto, kiu perdis unu protonon. 
Oni ofte skribas pli koncize:

$$K_a = \frac{[H^+] [A^-]}{[HA]}$$



<script>
  let lab; // la laboratorio kaj iloj
  let bastono; // la vitra bastono por fari la pH-provon
  let indikilo; // la pH-indikilo
  let substanco = "H₂O"; // la elektita substanco
  const ALTO = 240;
  const LARĜO = 300;

  substancoj = {
    citronsuko: [2,"hsl(59, 82%, 61%)",.8],
    kolao: [4,"hsl(15, 85%, 12%)",.8],
    vinagro: [3,"hsl(100, 90%, 80%",.3],
    stomaksuko: [1.4,"hsl(100, 90%, 80%",.7],
    mineralakvo: [5,"hsl(270, 20%, 80%",.2],
    lakto: [6,"hsl(60 90% 99%)",.95],
    salivo: [6,"hsl(270, 10%, 100%)",.5],
    "H₂O": [7,"hsl(270, 20%, 90%)",.2],
    citronlimonado: [3,"hsl(60, 80%, 70%)",.3],
    acidlakto: [5,"hsl(60 90% 95%)",.95],
    "HCl 0,1 mol/l": [1.08,"hsl(270, 20%, 90%)",.2],
    "HCl 0,01 mol/l": [2.04,"hsl(270, 20%, 90%)",.2],
    "HCl 0,001 mol/l": [3.01,"hsl(270, 20%, 90%)",.2],
    "HCl 0,0001 mol/l": [4,"hsl(270, 20%, 90%)",.2],
    "HCl 0,00001 mol/l": [5,"hsl(270, 20%, 90%)",.2],
  }

  function substanc_elekto(subst) {
    // plenigu la glason
    substanco = subst;
    const ecoj = substancoj[subst];
    const enhavo = ĝi("#_glaso_provtubo_enhavo .likvo") || ĝi("#_glaso_provtubo_enhavo .__subst");
    Lab.a(enhavo,{class: "__subst", fill: ecoj[1], "fill-opacity": ecoj[2]}); 
    indikilo.makulo(7,true); // true: forigu la makulon
    lab.movu(bastono,"B1");
  }

  function pHprovo() {
    lab.movu(bastono,"B2");
    const ecoj = substancoj[substanco];
    indikilo.makulo(ecoj[0]);
    console.log(`${substanco}, pH: ${ecoj[0]}`);
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
      if (s.startsWith("H")) {
        btn = lab.butono(s,-10,md_y,btn_w+20,btn_h);
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

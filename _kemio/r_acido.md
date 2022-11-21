---
layout: laborfolio
title: Acidoj
chapter: "3.3.1"
next_ch: r_bazo
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - laboratorio-0c
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


<!--

- gusto
- protonoj hidrogenitaj en akva solvaĵo -> reakcio kun akvo...(?)
- mezureblo per kolorŝanĝo
- koncentriteco / logaritma skalo: pH7: H+ 0,000001 mol/l 
- akvo: H2O(l) + H2O(l) -> H+(aq) + OH-(aq)
          H+(aq) = akvigita/hidratigita jono (vd. solvaĵoj), oni skribas ofte kiel oksonium/hidronium H3O+
   
-->

*Acidoj*, laŭ koncepto de Johannes Nicolaus Brønsted kaj Thomas Martin Lowry, estas ĥemiaj kombinaĵoj, kiuj povas transigi unu aŭ pluraj el siaj hidrogenatomoj kiel jono, t.e. la nuklea *protono* sen la elektrono, al alia reakcianto. Aparte en akva solvaĵo ili *disociiĝas*, t.e. ili perdas hidrogenjonon $$\ce{H+}$$ kiu siavice, kiel klarigita en la ĉapitro pri [solvaĵoj](l_solvajho), ĉirkaŭiĝas de akvaj molekuloj. En ekvacio oni skribas la rezulton iom simplige kiel $$\ce{H3O+}$$:

$$\ce{HCl + H2O <-> H3O+ + Cl-} \tag{1}$$

Tiu procezo okazas en ambaŭ direktoj kaj alstrebas ekvilibron, kiu i.a. dependas de la konkreta acidospeco, la solvilo kaj la temperaturo. Tion oni signas per dudirekta sago en la ekvacio. La ekvilibro de tia reakcio povas esti deduktata el la [leĝo de masefiko](r_ekvilibro) de Cato Maximilian Guldberg kaj Peter Waage.

Acidoj troviĝas en multaj nutraĵoj kiel frukto, fermentaĵoj kiel vinagro aŭ jahurto, en mineralakvo enhavanta karbonacidon ktp. Ili donas al tiuj nutraĵoj ilian karakterizan acidan guston. Ekzistas pli *fortaj* kaj pli *malfortaj* acidoj. Tiu grado de acideco dependas de la koncentriteco de protonoj solvitaj en akvo. La ekvilibro de specifa acido ĉe iu temperaturo estas donebla kiel specialiĝo de la leĝo de masefiko per konstanto, la *acido-konstanto*, esprimanta propocion inter reakciaj produktoj kaj reakciantoj[^cd]:

$$K_a = \frac{c(\ce{H_3O^+}) \cdot c(\ce{A^-})}{c(\ce{HA})}$$

La esprimo $$c(X)$$ estas la koncerna koncentriteco, $$\ce{HA}$$ la acido kaj $$\ce{A-}$$ la acidresto, kiu perdis unu protonon. La koncentritecon de la reakcianto $$\ce{H2O}$$ oni konsideras konstanta dum tiu reakcio kaj do inkluzivas en la konstanto $$K_a$$. Oni ofte skribas pli koncize:

$$K_a = \frac{[\ce{H^+}] [\ce{A^-}]}{[\ce{HA}]} \tag{2}$$

Konante la konstancon $$K_a$$ por iu acido, oni do povas elkalkuli la koncentritecon de la protonoj en la solvaĵo per

$$[\ce{H^+}] = K_a \cdot \frac{[\ce{HA}]}{[\ce{A^-}]}$$

Ĉar koncentritecoj povas esti nombroj kun multaj nuloj oni prefere uzas tiun ekvacion en logaritma formo (uzante la negativan dekuman logaritmon):

$$\begin{align}
pH = -log([\ce{H^+}]) &= pK_a - log(\frac{[\ce{HA}]}{[\ce{A^-}]})\\
\text{kun } pK_a &= -log(K_a \cdot \pu{1 l/mol})
\end{align}$$

Tiu formo nomiĝas *ekvacio de Hendersson-Hasselbalch*. La uzado de la dekuma logaritmo praktike tre faciligas la kalkuladon. Se oni ekzemple scias la valoron pH de iu acido kun donita koncentriteco, oni ricevas la respondan pH-valoron de tiu acido en dekona koncentriteco simple adiciante 1. (Tamen atentu, ke la montrita ekvacio estas simpligo, kiu aparte ne plu validas ĉe tre diluitaj acidoj!)

Ekzistas substancoj, kiuj ŝanĝas sian koloron depende de la pH-valoro. Per lerta kombino de tiaj substancoj oni ricevas universalan indikilon de pH-valoro, kiu per kontinua kolorspektro ebligas mezuri la pH-valoron de iu nekonata solvaĵo. En la malsupra eksperimenteto vi povas eltrovi pH-valorojn de diversaj acidaĵoj.

Necesas scii, ke ankaŭ en pura akvo ties molekuloj iomete disociiĝas al jonoj $$\ce{H^+}$$ kaj $$\ce{OH^-}$$. La koncentriteco $$[\ce{H^+}]$$ en $$\ce{H2O}$$ ĉe normala temperaturo estas proksimume $$\pu{0,0000001 mol/l}$$. Do nun vi povas elkalkuli la pH-valoron de pura akvo kaj poste kontroli en la eksperimento.

<script>
  let lab; // la laboratorio kaj iloj
  let provtubo; // provtubo kun la acido
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
    // ĉe mineralakvo / limonado aldonu vezikojn
    forigu("#vezikoj");
    if (subst == "citronlimonado" || subst == "mineralakvo" || subst == "kolao") {
      vezikoj();
    }
    
    indikilo.makulo(7,true); // true: forigu la makulon
    lab.movu(bastono,"B1");

  }

  function pHprovo() {
    lab.movu(bastono,"B2");
    const ecoj = substancoj[substanco];
    indikilo.makulo(ecoj[0]);
    console.log(`${substanco}, pH: ${ecoj[0]}`);
  }

  function vezikoj() {
    const lalto = 1/6 * 150;
    // ni uzas "falaĵo"-n por leviĝantaj vezikoj, tial supro estu 0 kaj faldistanco negativa!
    const v1 = { id: "veziko", klasoj: "", n: 12, daŭro: 1, supro: 0, alto: 15, faldistanco: -lalto, videblo: 1.0 };
    const v2 = { id: "veziko", klasoj: "", n: 10, daŭro: 5, aperdaŭro: 3, supro: 0, alto: 20, faldistanco: -lalto, videblo: 1.0 };

    const limigo = provtubo.enhavlimigo("path.__subst");
    veziketoj = Lab.falaĵo("vezikoj","vezikoj",
        v1, v2, limigo, 25, lalto);
    provtubo.enhavo(veziketoj,true);  // aldonu vezikojn al jama likvo

    for (const a of ĉiuj("#vezikoj animate")) {
      a.beginElement();
    }
    for (const am of ĉiuj("#vezikoj animateMotion")) {
      Lab.a(am,{
        repeatCount: "indefinite",
        fill: "remove"
      });
      am.beginElement();
    }
  }

  lanĉe(()=>{
    lab = new Laboratorio(ĝi("#eksperimento"),"fono",LARĜO,ALTO+10);
    lab.difinoj().append(
      Lab.e("circle",{
        id: "veziko",
        class: "veziko",
        r: 0.8
      })
    );

    // pH-indikilon maldekstre
    indikilo = Lab.indikilo();
    lab.metu(indikilo,{id: "maldekstre", x:(LARĜO)/2-80, y:ALTO-50});

    // vitra bastono unue por ke ĝi aperu "en" la provtubo
    bastono = Lab.bastono("bastono");
    lab.metu(bastono,{id: "B1", x:(LARĜO)/2+8+40, y:ALTO});
    lab.nova_loko({id: "B2", x:(LARĜO)/2, y:ALTO});

    // metu provtubon en la mezon
    provtubo = Lab.provtubo("provtubo",1/6); // enhavo (1/6*150)
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
      .veziko {
        fill: url(#vitro);
        stroke: black;
        stroke-width: 0.2;
      }
      .butono.premita rect {
        fill: #004b4b;
      }
    ]]>
  </style>
</svg>

## Kalkule taksi pH-valoron de konata acido
{: .sekcio}

Konante la konstanton $$K_a$$ kaj la originan koncentritecon $$[\ce{HA}]_0$$ de acido oni cetere povas proksimume elkalkuli la pH-valoron de akva solvaĵo. 

Por forta acido kiel $$\ce{HCl}$$ oni premisas, ke cent procentoj de la acido disociiĝas, do laŭ la formulo (1) oni ricevas:

$$\begin{align}[\ce{H+}] &= [\ce{HCl}]_0 \\ pH &= -log([\ce{HCl}]_0)\end{align}$$

Por malforta acido oni devas uzi la ekvacion (2). Nur malgranda parto de acido disociiĝas 
al sama nombro de protonoj kaj jonoj da acidresto. Do serĉante la valoron $$x = [\ce{HA}]_0 - [\ce{HA}] = [\ce{H+}] = [\ce{A-}]$$ ĉe la ekvilibro, ni ricevas la ekvacion[^ph]:

$$\begin{align}
K_a = \frac{x \cdot x}{[\ce{HA}]_0-x} &\approx \frac{x^2}{[\ce{HA}]_0}, x \ll [\ce{HA}]_0\\
x &\approx \sqrt{K_a \cdot [\ce{HA}]_0}\\
pH &\approx \frac{1}{2}(pK_a - log[\ce{HA}]_0)
\end{align}$$

Ekzemple, per tiu formulo, por vinagro kun 5% da $$\ce{CH3COOH}$$, kun [mola maso](r_unuoj_grandoj) 
de $$\pu{60 g/mol}$$, do $$\pu{0,083 mol/l}$$ kaj $$pKa = 4,75$$ ni ricevas:

$$pH \approx \frac{1}{2}(4,75 - log(0,083)) \approx 2,9 $$


## fontoj
{: .fontoj}

[^cd]: [Säuren (Chemie)](https://www.chemie.de/lexikon/S%C3%A4uren.html)
[^ph]: [pH-Wert](https://www.cup.uni-muenchen.de/puchinger/glossar/glossarB3_2.html)
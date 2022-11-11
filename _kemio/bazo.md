---
layout: laborfolio
title: Bazoj
chapter: "3.3.2"
next_ch: "acido_bazo"
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

$$\ce{NaOH <-> Na+ + OH-} \tag{1}$$

Solvaĵojn de tiaj bazoj en akvo oni nomas ankaŭ *alkala solvaĵo* aŭ *lesivo*.

Aliaj bazoj ne enhavas hidroksidon, sed en akvo akceptas protonojn postlastante hidroksidjonon, ekzemple:

$$\ce{NH3 + H2O <-> NH4^+ + OH-}$$

Ĉar tiuj hidroksidjonoj povas kuniĝi kun superfluaj H+-jonoj al akvomolekuloj, bazoj reduktas la koncentritecon de H+-jonoj kaj tiel *malacidigas* aŭ *neŭtraligas* acidan solvaĵon.

Analoge al acidoj oni difinas bazokonstanton per formulo:

$$K_b = \frac{[\ce{OH^-}] \cdot [\ce{BH^+}]}{[\ce{B}]} \tag{2}$$

kaj

$$pOH = -log([\ce{OH^-}]) = pK_b - log(\frac{[\ce{B}]}{[\ce{BH^+}]}), pK_b = -log(K_b \cdot \pu{1 l/mol})$$

<!--
https://de.wikipedia.org/wiki/Dissoziation_(Chemie)
Ka*Kb = 10e-14
=> pOH, valoro, sumo pH + pOH = 14 / Kw Kdiss... 
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

## Kalkule taksi pOH- kaj pH-valorojn de konata bazo
{: .sekcio}

Konante la konstanton $$K_b$$ kaj la originan koncentritecon $$[\ce{B}]_0$$ de bazo oni povas proksimume elkalkuli la pOH- kaj pH-valorojn de akva solvaĵo. Oni aplikas la analogajn premisojn kaj simpligojn kiel ĉe pH-kalkulo de acidoj.


Por forta bazo kiel $$\ce{NaOH}$$ oni premisas, ke cent procentoj de la bazo disociiĝas, do laŭ la formulo (1) oni ricevas:

$$\begin{align}[\ce{OH-}] &= [\ce{NaOH}]_0 \\ pOH &= -log([\ce{NaOH}]_0)\end{align}$$

Por malforta bazo oni devas uzi la ekvacion (2). Nur malgranda parto de tia bazo disociiĝas. Do serĉante la valoron $$x = [\ce{B}]_0 - [\ce{B}] = [\ce{OH-}] = [\ce{BH+}]$$ ĉe la ekvilibro, oni ricevas la ekvacion:

$$\begin{align}
K_b = \frac{x \cdot x}{[\ce{B}]_0-x} &\approx \frac{x^2}{[\ce{B}]_0}, x \ll [\ce{B}]_0\\
x &\approx \sqrt{K_b \cdot [\ce{B}]_0}\\
pOH &\approx \frac{1}{2}(pK_b - log[\ce{B}]_0)
\end{align}$$

La pH-valoron en akva solvaĵo ĉe temperaturo de 25°C oni ricevas kiel $$pH = 14 - pOH$$

## fontoj
{: .fontoj}

[^cd]: [Basen (Chemie)](https://www.chemie.de/lexikon/Basen_%28Chemie%29.html)

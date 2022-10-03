---
layout: laborfolio
title: Solvaĵoj
chapter: 2.7
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - k_kombinoj-0a
  - k_formuloj-0b
css:
  - k_formuloj-0a
---

<!-- https://de.wikipedia.org/wiki/L%C3%B6sung_(Chemie)#Trennung -->

Kiam substancoj intermiksiĝas povas estiĝi *solvaĵo*: la molekuloj de unu substanco, kutime flua, la *solvilo*, ŝoviĝas inter la molekulojn de alia substanco, la *solvataĵo*, superante ties intermolekulaj fortoj. Akvo estas bona solvilo pro siaj dipolaj molekuloj kaj la kapablo formi hidrogenpontojn. Aliaj solviloj ekzemple estas organikaj fluaĵoj kiel alkoholo, acetono aŭ oleo.

Ankaŭ jonajn ligojn solvilo povas certagrade superi, tiel natria klorido solviĝas facile en akvo. Ĉar la akvomolekuloj estas dipolaj, ili
tiam ĉirkaŭas la jonojn. 

<script>

const kompleksoj = {
  "Na_4H2O": {
    c: { j: "Na+", l: "0_H2Ov 3_H2O< 6_H2Ov 9_HeO>" },
    g: {
      "H2O^": { a: "OH2", l: { o: "dme-h1 mA-h2" }, e: { o: "Z:ma:" } },
      "H2Ov": { a: "OH2", l: { o: "e-h1 mA-h2"}, e: { o: "dZ:ma:" } },
      "H2O<": { a: "OH2", l: { o: "ke-h1 mA-h2"}, e: { o: "kZ:ma:" } },
      "H2O>": { a: "OH2", l: { o: "mkme-h1 mA-h2"}, e: { o: "mkmZ:ma:" } },
    }    
  }
}


function s_desegno(frm) {
    // malplenigu
    const svg = ĝi("#jonsolvo_enhavo");
    svg.textContent = "";

    //const elementoj = Elemento.listo();
    const kform = new KformKombino(svg,{
      // kalkulu kaj montru oksidnombrojn
      on_fŝ: false,
      // kalkulu kaj montru arkojn de elektron-atributo (por oksidnombroj)
      on_arkoj: false,
      // jonojn marku per angulo, ne krampoj...
      jon_angulo: true//,
      // funkcio, kiu redonas la elektronegativecon de elemento
      //eneg: (smb) => elementoj[smb].eneg,
      // tro longajn ekvaciojn aranĝu dulinie...
      //dulinie: frm.startsWith("xxx")
    });

    // desegnu formulon kiel Lewis-strukturon
    kform.komplekso(kompleksoj[frm]);
}

lanĉe(() => {
    //const lgrp = new KformEkvacio(ĝi("#ekvacio"));
    //desegno("karbonacido");
    //desegno("metano_1");
    s_desegno("Na_4H2O");
});

/*
reference((ref) => {
  desegno(ref);
});
*/
</script>


<svg id="jonsolvo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-5 -35 300 60">
 <style type="text/css">
    <![CDATA[
      .elemento text.shargo, .jonkrampo text {
        fill: SeaGreen;
        font-weight: bold;
      }
    ]]>
  </style>
  <defs>
    <pattern id="strie" viewBox="0,0,4,1" height="20%" width="20%">
      <rect width="2" height="1"/>
    </pattern>
  </defs>
  <g id="jonsolvo_enhavo"></g>
</svg>

Solvado estas fizika fenomeno inversigebla. Sed kiam pluraj substancoj solviĝas en iu solvilo povas okazi ĥemiaj reakcioj kiel precipito aŭ acid-bazaj reakcioj.

Tiel ekzemple karbondioksido grandparte solviĝas kiel gaso en akvo, sed parto kombiniĝas kun akvo al 
[karbonacido](#){: .ref #karbonacido}: $$\ce{CO2 + H2O <=>  H2CO3}$$,
kiu siavice disociiĝas al [hidrogenkarbonatjonoj](#){: .ref #h_karbonato}: kaj oksonio $$\ce{H2CO3 + H2O <=> H3O^{+} + HCO3^{-}}$$ 
kaj plu al [karbonatjonoj](#){: .ref #karbonato}: $$\ce{HCO3^{-} + H2O <=> CO3^{2-} + H3O^{+}}$$ [^W1].

<script>


const ekvacioj = {
  karbonacido: { _:"CO2 + H2O <=> H2CO3"},
  h_karbonato: { _: "H2CO3 + H2O <=> H3O^+ + HCO3^-"},
  karbonato: {_: "HCO3^- + H2O <=> CO3^2- + H3O^+"}
};

function desegno(frm) {
    // malplenigu
    const svg = ĝi("#ekvaci_enhavo");
    svg.textContent = "";

    //const elementoj = Elemento.listo();
    const kform = new KformEkvacio(svg,{
      // kalkulu kaj montru oksidnombrojn
      on_fŝ: false,
      // kalkulu kaj montru arkojn de elektron-atributo (por oksidnombroj)
      on_arkoj: false,
      // jonojn marku per angulo, ne krampoj...
      jon_angulo: true//,
      // funkcio, kiu redonas la elektronegativecon de elemento
      //eneg: (smb) => elementoj[smb].eneg,
      // tro longajn ekvaciojn aranĝu dulinie...
      //dulinie: frm.startsWith("xxx")
    });

    // desegnu formulon kiel Lewis-strukturon
    kform.ekvacio(ekvacioj[frm]._, kkombinoj);
}

lanĉe(() => {
    //const lgrp = new KformEkvacio(ĝi("#ekvacio"));
    //desegno("karbonacido");
    //desegno("metano_1");
});

reference((ref) => {
  desegno(ref);
});
</script>

<svg id="ekvacio"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-5 -35 300 60">
 <style type="text/css">
    <![CDATA[
      .elemento text.shargo, .jonkrampo text {
        fill: SeaGreen;
        font-weight: bold;
      }
    ]]>
  </style>
  <defs>
    <pattern id="strie" viewBox="0,0,4,1" height="20%" width="20%">
      <rect width="2" height="1"/>
    </pattern>
  </defs>
  <g id="ekvaci_enhavo"></g>
</svg>

<h2></h2>
[Kemiaj reakcioj](reakcioj){: .sekva_folio}

## fontoj
{: .fontoj}

[^W1]: [(de) Lösung, Trennung](https://de.wikipedia.org/wiki/L%C3%B6sung_(Chemie)#Trennung)

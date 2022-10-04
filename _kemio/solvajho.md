---
layout: laborfolio
title: "Solvaĵoj"
chapter: "2.7"
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - k_kombinoj-0a
  - k_formuloj-0b
css:
  - k_formuloj-0b
---

<!-- https://de.wikipedia.org/wiki/L%C3%B6sung_(Chemie)#Trennung -->

Kiam substancoj intermiksiĝas povas estiĝi *solvaĵo*: la molekuloj de unu substanco, kutime flua, la *solvilo*, ŝoviĝas inter la molekulojn de alia substanco, la *solvataĵo*, superante ties intermolekulaj fortoj. Akvo estas bona solvilo pro siaj dipolaj molekuloj kaj la kapablo formi hidrogenpontojn. Aliaj solviloj ekzemple estas organikaj fluaĵoj kiel alkoholo, acetono aŭ oleo.

Ankaŭ jonajn ligojn solvilo povas certagrade superi. Tiel natria klorido solviĝas facile en akvo. Ĉar la akvomolekuloj estas dipolaj, ili sfere ĉirkaŭas la jonojn kaj efikas tiel forte, ke dissolviĝas la ligoj inter la saljonoj.

<script>

// vd ekz-e
// http://raimisait.weebly.com/water-chemistry/water-chemistry
// https://arxiv.org/pdf/1909.10262.pdf

const akvoj6 = {
  "H2O.0": { a: "OH2", l: { o: "6dme-h1 mA-h2" }, e: { o: "6Z:ma:" } },
  "H2O.1": { a: "OH2", l: { o: "7dme-h1 mA-h2" }, e: { o: "7Z:ma:" } },
  "H2O.2": { a: "OH2", l: { o: "8dme-h1 mA-h2" }, e: { o: "8Z:ma:" } },
  "H2O.3": { a: "OH2", l: { o: "9dme-h1 mA-h2" }, e: { o: "9Z:ma:" } },
  "H2O.4": { a: "OH2", l: { o: "xdme-h1 mA-h2" }, e: { o: "xZ:ma:" } },
  "H2O.5": { a: "OH2", l: { o: "ydme-h1 mA-h2" }, e: { o: "yZ:ma:" } },
  "H2O.6": { a: "OH2", l: { o: "0dme-h1 mA-h2" }, e: { o: "0Z:ma:" } },
  "H2O.7": { a: "OH2", l: { o: "1dme-h1 mA-h2" }, e: { o: "1Z:ma:" } },
  "H2O.8": { a: "OH2", l: { o: "2dme-h1 mA-h2" }, e: { o: "2Z:ma:" } },
  "H2O.9": { a: "OH2", l: { o: "3dme-h1 mA-h2" }, e: { o: "3Z:ma:" } },
  "H2O.x": { a: "OH2", l: { o: "4dme-h1 mA-h2" }, e: { o: "4Z:ma:" } },
  "H2O.y": { a: "OH2", l: { o: "5dme-h1 mA-h2" }, e: { o: "5Z:ma:" } },
}

const akvoj5 = {
  "H2O.0": { a: "OH2", l: { o: "0dme-h1 mA-h2" }, e: { o: "0Z:ma:" } },
  "H2O.1": { a: "OH2", l: { o: "sdme-h1 mA-h2" }, e: { o: "sZ:ma:" } },
  "H2O.2": { a: "OH2", l: { o: "ssdme-h1 mA-h2" }, e: { o: "ssZ:ma:" } },
  "H2O.3": { a: "OH2", l: { o: "sssdme-h1 mA-h2" }, e: { o: "sssZ:ma:" } },
  "H2O.4": { a: "OH2", l: { o: "ssssdme-h1 mA-h2" }, e: { o: "ssssZ:ma:" } },
  "H2O.5": { a: "OH2", l: { o: "sdme-h1 mA-h2" }, e: { o: "sZ:ma:" } },
  "H2O.6": { a: "OH2", l: { o: "ssdme-h1 mA-h2" }, e: { o: "ssZ:ma:" } },
  "H2O.7": { a: "OH2", l: { o: "sSdme-h1 mA-h2" }, e: { o: "sSZ:ma:" } },
  "H2O.8": { a: "OH2", l: { o: "sSsdme-h1 mA-h2" }, e: { o: "sSsZ:ma:" } },
  "H2O.9": { a: "OH2", l: { o: "sSSdme-h1 mA-h2" }, e: { o: "sSSZ:ma:" } }
}  


const kompleksoj = {
  "Na_6H2O": {
    c: { 
      j: "Na+", //l: "0_H2Ov 3_H2O< 6_H2O^ 9_H2O>" },
      l: "0_H2O.0 2_H2O.2 4_H2O.4 6_H2O.6 8_H2O.8 x_H2O.x 1_H2O.1 3_H2O.3 5_H2O.5 7_H2O.7 9_H2O.9 y_H2O.y",
      d: { _: 1.2, "H2O.1": 2.4, "H2O.3": 2.4, "H2O.5": 2.4, "H2O.7": 2.4, "H2O.9": 2.4, "H2O.y": 2.4 }
    },
    g: akvoj6
  },

  "Cl_5H2O": {
    c: { j: "Cl-", l: "2_H2O.0 s_H2O.1 s_H2O.2 s_H2O.3 s_H2O.4 d_H2O.5 s_H2O.6 s_H2O.7 s_H2O.8 s_H2O.9",
         d: { _: 1.4, "H2O.5": 2.4, "H2O.6": 2.4, "H2O.7": 2.4, "H2O.8": 2.4, "H2O.9": 2.4 } 
    },
    g: akvoj5
  },


  "test": {
    c: { j: "Na+", l: "0_H2Ov 6_H2O^" },
    g: {
      "H2O^": { a: "OH2", l: { o: "dme-h1 mA-h2" }, e: { o: "Z:ma:" } },
      "H2Ov": { a: "OH2", l: { o: "e-h1 mA-h2"}, e: { o: "dZ:ma:" } }
    }    
  }
}


function s_desegno(frm, tr_x) {
    
    const svg = ĝi("#jonsolvo_enhavo");
    // svg.textContent = ""; // malplenigu

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
    const kmpl = kform.komplekso(kompleksoj[frm]);
    if (tr_x)
      kmpl.setAttribute("transform",`translate(${tr_x} 0)`);

}

lanĉe(() => {
    //const lgrp = new KformEkvacio(ĝi("#ekvacio"));
    //desegno("karbonacido");
    //desegno("metano_1");
    s_desegno("Na_6H2O"); 
    s_desegno("Cl_5H2O",160);
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
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-80 -80 320 160">
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

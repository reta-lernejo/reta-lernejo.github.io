---
layout: laborfolio
title: Acidoj kaj bazoj (laŭ Brønsted-Lowry)
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - laboratorio-0c
  - k_acidbaz-0b
css:
  - laboratorio-0c
---

paĝo en preparo...

<!--
https://www.vedantu.com/chemistry/acids-and-bases

eksperimentoj:

baksodo /natria bikarbonato) kun vinagro (vinagrcida/etila solvaĵo):
- https://en.wikipedia.org/wiki/Sodium_bicarbonate
CH3COOH(aq) + NaHCO3(s) -> CO2(g) + H2O(l) + NaCH3COO(aq)
?? koncizsa jonekvacio: HCO3-(aq) + H+(aq) -> CO2(g) +H2O(l)

videoj:
- https://www.youtube.com/watch?v=nd1wZkzegX8
- https://www.youtube.com/watch?v=GRUlE2850F0
- https://www.youtube.com/watch?v=Ow1VerS39l0
- https://www.youtube.com/watch?v=E4ba9X9IY_s

baksodo kun citronacido:
- https://www.youtube.com/watch?v=GAwNAD64wIA

solvaĵo de vinagracido:
CH3COOH ⇆ CH3COO- + H+

pH de 1 M (=1mol/l) CH3​COOH solvaĵo: 
// https://www.toppr.com/ask/question/what-is-the-ph-of-a-1-m-ch3coohsolutionkaof-acetic-acid-18-times105-kw/
pH=−log[H+]=−log(0.004243)=2.4


https://www.uibk.ac.at/organic/ag-kreutz/dateien/teil_3.pdf


titrado / titraj pH-kurboj:
https://studyflix.de/chemie/saure-base-titration-und-titrationskurve-1842

HCl + NaOH / acetacido + NaOH: https://www.youtube.com/watch?v=tc-cKeyjc8U (kaj referencitaj 2)

nocioj:
- korespondaj acido-bazo-paroj
- neŭtraligo
- ekvilibro
- titrado/ekvivalent-punkto


titrado de amoniako kun HCl: https://www.youtube.com/watch?v=cMHD8TGPWoA

titrado de citronacido kaj fosforacido:
https://chem.libretexts.org/Bookshelves/Analytical_Chemistry/Supplemental_Modules_(Analytical_Chemistry)/Analytical_Sciences_Digital_Library/Courseware/Chemical_Equilibrium/02_Text/02_Acid-Base_Chemistry/14_Titration_of_a_Polyprotic_Weak_Acid_with_Sodium_Hydroxide

fosforacido: 
https://www.kappenberg.com/experiments/ph/pdf-th/f06.pdf

sulfuracido:
https://studyflix.de/chemie/saure-base-titration-und-titrationskurve-1842

-->

<!--
acidoj:

HCl
H2SO4
H2CO3


bazoj:

NH3
NaOH
KOH
Ca(OH)2

reakcioj:

HCl + H2O <-> Cl- + H3O+
NH3 + H2O <-> NH4+ + OH-



-->

<script>

  const eksperimentoj = {
    e1: {nomo: "titri HCl (kun NaOH)", 
      acido: 1, s: "HCl", ml: 25, c: 0.1,
      s_b: "NaOH", ml_b: 50, c_b: 0.1},
    e2: {nomo: "titri CH₃COOH (kun NaOH)", 
      acido: 1, s: "CH3COOH", ml: 25, c: 0.1, 
      s_b: "NaOH", ml_b: 50, c_b: 0.1},
    e3: {nomo: "titri H₃PO₄ (kun NaOH)", 
      acido: 3, s: "H3PO4", ml: 17, c: 0.5, 
      s_b: "NaOH", ml_b: 50, c_b: 0.5},
    e4: {nomo: "titri NH₃ (kun HCl)", 
      acido: 0, s: "NH3", ml: 25, c: 0.1, 
      s_b: "HCl", ml_b: 50, c_b: 0.1}
  }

  let lab; // la laboratorio kaj iloj
  let bureto, flakono, sondilo, diagramo, eksperimento;
  const ALTO = 500;
  const LARĜO = 500;
  const X_FLAKONO = 380;


  function preparo() {
    flakono.enhavo(eksperimento.ml);
    bureto.fermu();
    bureto.enhavo(eksperimento.ml_b);
    diagramo.viŝu();
    // komenca valoro
    pH_mezuro();
  }

  function pH_mezuro() {
    // substanco en la flakono
    const s = eksperimento.s == "NaOH"? "OH-" : eksperimento.s;
    // substanco en la bureto
    const s_b = eksperimento.s_b == "NaOH"? "OH-" : eksperimento.s_b;

    // titrado de acido kun forta bazo diferencas de titradod e bazo kun forta acido
    let pH;
    if (eksperimento.acido == 1) {
      pH = AB.pH2_acido(
        { a: s, 
          c: eksperimento.c, 
          v: eksperimento.ml/1000 },
        { b: s_b, 
          c: eksperimento.c_b, 
          v: bureto.ml/1000 }
      );
    } else if (eksperimento.acido > 1) {
      valj = AB.acidtitrado_plurprotona(
        { a: s, 
          c: eksperimento.c, 
          v: eksperimento.ml/1000 },[bureto.ml/1000]);
      pH = valj[0];
    } else {
      pH = AB.pH2_bazo(
        { b: s, 
          c: eksperimento.c, 
          v: eksperimento.ml/1000 },
        { a: s_b, 
          c: eksperimento.c_b, 
          v: bureto.ml/1000 }
      );
    }

    if (pH > -10 && pH < 16) {
      sondilo.valoro(`pH ${pH.toFixed(1)}`);
      diagramo.punkto(bureto.ml,pH,LabPHIndikilo.pH_koloro(pH));
    } else {
      // evitu montri aparte vortojn NaN aŭ Infinity...
      sondilo.valoro('pH --');
    }
  }


  lanĉe(()=>{
    lab = new Laboratorio(ĝi("#eksperimento"),"fono",LARĜO,ALTO+10);
    // difinu gutojn
    lab.ero_smb("guto",3);

    // bureto supre
    bureto = Lab.bureto("bureto",100); // elfluo = 100ml, t.e. malplena
    lab.metu(bureto,{id: "supre", x:X_FLAKONO+5, y:ALTO-180});

    // sondilo meze
    sondilo = Lab.sondilo("pHsondilo",4,250,-4,"pH");
    lab.metu(sondilo,{id: "meze", x:X_FLAKONO+18, y:ALTO});

    // diagramo maldekstre
    diagramo = Lab.diagramo("pH-diagramo",
      {nomo: "ml", mrg: 10, min: 0, max: 50, i1: 1, i2: 5, i3: 10},
      {nomo: "pH", mrg: 10, min: 0, max: 14, i1: 1, i2: 7, i3: 14});
    lab.metu(diagramo,{id: "maldekstre", x:10, y:ALTO});

    // konusflakono malsupre
    flakono = Lab.konusflakono("flakono",25);
    lab.metu(flakono,{id: "malsupre", x:X_FLAKONO-30, y:ALTO});

    function fluo(fermu) {
      if (bureto.ml>=60) return; // bureto malplenigita!
      if (bureto.fermita) return; // bureto estas (ĵus) fermita

      // por verŝgutoj ni bezonas la pinton de la bureto kaj la surfacon de la flakonenhavo
      const pinto = bureto.pinto();
      const surfaco = flakono.surfaco();
      lab.gutoj("gutoj","guto",7,pinto,surfaco,() => {
        const ms = 600;
        const ml = 0.5;

        // fluigu 1ml el la bureto
        bureto.elfluo(ml);
        if (fermu) {
          bureto.fermu();
        } else {
          prokrastu(() => fluo(false), ms);
        }

        // aldonu 1ml al flakonlikvo
        flakono.enfluo(ml);
        pH_mezuro();
      });
    }

    // klako al bureto elgutigu 1 ml
    lab.klak_reago(bureto.ujo(), () => {
      bureto.malfermu();
      fluo(true);
    });

    // klako sur krano malfermu aŭ fermu ĝin!
    lab.klak_reago(bureto.krano(), () => {
      if (bureto.fermita) {
        bureto.malfermu();
        prokrastu(() => fluo(false), 500);
      } else {
        bureto.fermu();
        purigu_prokrastojn();
      }
    });

    //pH_mezuro();

    // butonoj por elekti eksperimenton
    const btn_w = 130, btn_h = 16;
    let btn_y = 10;

    for (eksp in eksperimentoj)
    {
      const nomo = eksperimentoj[eksp].nomo;
      const btn = lab.butono(nomo,-10,btn_y,btn_w,btn_h);
      btn.id = eksp;
      btn_y += 20;

      lab.klak_reago({g: btn},(btn) => {
        // forigu klason .premita de antaŭa butono...
        for (const b of ĉiuj("#eksperimento .butono")) {
          b.classList.remove("premita");
        }
        // montru nun elektitan substancon kaj butonon
        btn.g.classList.add("premita");
        // const subst = btn.g.textContent;
        eksperimento = eksperimentoj[btn.g.id];
        preparo();
      });
    }
  });
</script>

<svg id="eksperimento"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="-10 -10 520 520">
 <style type="text/css">
    <![CDATA[
      .butono.premita rect {
        fill: #004b4b;
      }
    ]]>
  </style>
</svg>

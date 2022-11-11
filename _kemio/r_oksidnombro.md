---
layout: laborfolio
title: Oksidnombroj
chapter: "3.4.1"
js:
  - folio-0b
  - sekcio-0b
  - k_formuloj-0a
  - elementoj-0c
css:
  - k_formuloj-0a
  - elementoj-0a
---

<!--
vd.
https://de.wikipedia.org/wiki/Oxidationszahl
https://de.wikipedia.org/wiki/Liste_der_Oxidationsstufen_der_chemischen_Elemente#FN_*
https://en.wikipedia.org/wiki/Oxidation_state
https://en.wikipedia.org/wiki/Oxidation_state#List_of_oxidation_states_of_the_elements


Toward a comprehensive definition of oxidation state (IUPAC Technical Report)
https://www.degruyter.com/document/doi/10.1515/pac-2013-0505/html

-->

Por pli bone kompreni multajn ĥemiajn reakciojn, kie atomoj de unu reakcianto donas elektronojn (oksidiĝas) kaj
atomoj de alia akceptas elektronojn (reduktiĝas), montriĝis avantaĝe enkonduki formalismon de oksidnombroj por
distingi la diversajn statojn de la reakciantoj kaj la reakciaj produktoj.

Tia *oksidnombro* reprezentas *hipotezan ŝargon* de atomo, se ĉiuj ĝiaj ligoj al aliaj atomoj en la kombinaĵo estus plene jonaj. Ĝi ne reprezentas veran ŝargon aŭ alian atoman econ, sed estas nura formalismo, sed kun
praktika utilo en la bilancado de ĥemiaj reakcioj.

Por atribui oksidnombrojn al atomoj de kombinaĵo oni eliras de la Luiz-diagramo de tiu kombinaĵo. Por la kalkulo oni bezonas de ĉiu atomo la valenton kaj ĝian elektronegativecon.

La valento, resp. nombro de valentaj elektronoj, por elementoj de la ĉefgrupoj estas difinita kiel la nombro de elektronoj en la s- kaj p-orbitaloj de la plej alta okupita ŝelo. Tio estas unu respektive du por la grupoj unukaj du de la perioda sistemo kaj 3 ĝis 8 por la grupoj 13 ĝis 18.

Por la kalkulado de oksidnombro, ĉe ĉiu ligo en la Luiz-diagramo oni atribuas ĉiujn kovalentajn elektronojn al la pli elektronegativa atomo. Por ligoj inter samspecaj atomoj oni egale dividas la elektronojn. La oksidnombro de ĉiu atomo tiam rezultiĝas kiel la diferenco inter la valento kaj la tiel atribuitaj elektronoj. 

Ekzemploj:
- [hidrogeno](#){: .ref #H2}
- [nitrogeno](#){: .ref #N2}
- [oksigeno](#){: .ref #O2}
- [akvo](#){: .ref #H2O}
- [karbondioksido](#){: .ref #CO2}
- [karbonmonoksido](#){: .ref #CO}
- [sulfatjono](#){: .ref #SO4}
- [nitratjono](#){: .ref #NO3}
- [metano](#){: .ref #CH4}
- [metanacido (formikacido)](#){: .ref #CH2O2}
- [acetacido](#){: .ref #C2H4O2}
- [etanolo](#){: .ref #C2H6O}
- [dimetilsulfido](#){: .ref #DMS}

<script>

/* aŭtomata kalkulo de oksidnombroj momente ne funkcias kun grupoj... ĉar tio dependas, 
  kun kiu atomo ili estas ligitaj...!
const grupoj = {
  OH: { a: "OH", l: { o: "3)-h" }, on: "-2 +1" },
  CH3: { a: "CH3", l: { c: "x)-h1 7)>h2 5)<h3" }, on: "-3 +1 +1 +1" }, // angulo al samebena H: pmo = 109°(-45°)
  _CH3: { a: "CH3", l: { c: "pmo)-h1 5)<h2 7)>h3" }, on: "-2 +1 +1 +1" }, // angulo al samebena H: pmo = 109°(-45°)
  CH3_: { a: "CH3", l: { c: "omp)-h1 7)>h2 5)<h3" }, on: "-2 +1 +1 +1" } // angulo al samebena H: omp = (45°)-109°
}
*/

// kalkuli oksidnombrojn vd. https://www.periodni.com/de/oxidationszahlen_rechner.php

const molekulo = { // kiel ni difinu prezenton de ligoj kiel paroj? plej bone iel malloke por povi ŝalti la prezenton de la tuta formulo facile 
  H2:  { a: "H2", l: { h1: "3-h2" } }, //on: "0 0" }, // l: angulo, ligtipo, celatomo
  O2:  { a: "O2", l: { o1: "3=o2" }, e: { o1: "7:y:", o2: "1:5:" } }, //on: "0 0" }, // e-paroj de unua O: ĉe horloĝ-ciferoj 7 kaj 11 (y), de dua O: ĉe ciferoj 1 kaj 5
  N2:  { a: "N2", l: { n1: "3#n2" }, e: { n1: "9:", n2: "3:" } }, //on: "0 0" },
  H2O: { a: "OH2", l: { o: "dme-h1 mA-h2" }, e: { o: "Z:ma:" } }, //on: "-2 +1 +1" }, // anguloj de H: dme = 180°-51,5° A = +105°, anguloj de e-paroj: mZ = -42° a = +85°
  CO2: { a: "CO2", l: { c: "3=o2 9=o1" }, e: { o1: "7:y:", o2: "1:5:" } }, //on: "+4 -2 -2" },
  CO: { a: "CO", l: { c: "3#o" }, e: { c: "9:", o: "3:" }, s: { c: "-", o: "+" } }, //on: "+2 -2" },
  /*
  SO4: { a: "SO4", l: { s: "0(=o1 p(>o2 s(<o3 s(=o4" },
         s: { _: "2-", o2: "1-", o3: "1-" },
         e: { o1: "x:2:", o2: "s:s:s:", o3: "3:6:9:", o4: "6:x:" }, on: "+6 -2 -2 -2 -2" },
         */
  SO4: { a: "SO4", l: { s: "0-o1 3=o2 6-o3 9=o4" },
         s: { _: "2-", o1: "-", o3: "-" },
         e: { o1: "9:0:3:", o2: "1:5:", o3: "3:6:9:", o4: "7:y:" } }, //on: "+6 -2 -2 -2 -2" },
  NO3: { a: "NO3", l: { n: "x=o1 2-o2 6-o3" }, s: {_: "-", n:"+", o2: "-", o3: "-" },
        e: {o1: "8:0:", o2: "y:2:5:", o3: "3:6:9:"} }, //on: "+5 -2 -2 -2"},
  CH4: { a: "CH4", l: { c: "0-h1 3-h2 6-h3 9-h4"} }, // on: "-4 +1 +1 +1 +1" }, // l: pli mallonge eble: "-% h1 h2 h3 h4"
  /*
  HCOOH: { a: "CHO", l: { c: "9-h 1=o 5-OH" }, e: { o: "3:y:" } }, // on: "+2 +1 -2" }, // OH referencas al grupoj, e-paroj de O-atomo: ĉe horloĝciferoj 5 kaj 10 (x)
  */
  CH2O2: { a: "CH2O2", l: { c: "9-h1 1=o1 5-o2", o2: "3-h2" }, e: { o1: "3:y:", o2: "8:5:" } }, // on: "+2 +1 -2" }
  /*
  C2H4O2: { a: "CO2H", l: { c: "0=o1 4-o2 8-CH3", o2: "2-h" }, e: { o1: "x:2:", o2: "5:7:" } } //, on: "+3 -2 -2 +1"}
  C2H5OH: { a: "CH3O", l: { c: "4-o 8-CH3 y>h1 1<h2", o: "2-h3" }, e: { o: "5:7:" } }, //on: "-1 +1 +1 +1 -2"},
  */
  C2H4O2: { a: "C2H4O2", l: { c1: "0=o1 4-o2 8-c2", o2: "2-h1", c2: "x-h2 7>h3 5<h4" }, e: { o1: "x:2:", o2: "5:7:" } }, //, on: "+3 -2 -2 +1"}
  C2H6O: { a: "C2H6O", l: { c1: "4-o 8-c2 y>h1 1<h2", o: "2-h3", c2: "x-h4 7>h5 5<h6" }, e: { o: "5:7:" } }, //on: "-1 +1 +1 +1 -2"},
  /*
  DMS: { a: "S", l: { s: "3o-_CH3 k-CH3_" } }, //on: "-2" }, // (CH₃)₂S, fakte angulo S-C-C estas 99°, sed ni simpligas al 90°
  */
  DMS: { a: "SC2H6", l: { s: "3o-c1 k-c2", c1: "pmo-h1 5<h2 7>h3", c2: "omp-h4 7>h5 5<h6" }, e: { s: "9o:k:" } } //on: "-2" }, // (CH₃)₂S, fakte angulo S-C-C estas 99°, sed ni simpligas al 90°
}
  

function desegno(frm) {
    // malplenigu
    const on = ĝi("#on_enhavo");
    on.textContent = "";
    const lewis = new KformKombino(on,{
      // kalkulu kaj montru oksidnombrojn
      on_fŝ: true,
      // kalkulu kaj montru arkojn de elektron-atributo (por oksidnombroj)
      on_arkoj: true,
      // funkcio, kiu redonas la elektronegativecon de elemento
      eneg: (smb) => elementoj[smb].eneg 
    });
    const elementoj = Elemento.listo();

    // desegnu formulon kiel Lewis-strukturon   
    const mlk = molekulo[frm];
    //lewis.grupoj = Object.keys(grupoj);
    const mol_g  = lewis.molekulo(mlk);
    if (frm == 'DMS') atributoj(mol_g,{ transform: "translate(0 -10)"});
}

lanĉe (() => {
    const lgrp = new KformKombino(ĝi("#oksidnro"));
    desegno("H2O")
});

reference((ref) => {
  desegno(ref);
});

</script>

<svg id="oksidnro"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="600" viewBox="-35 -30 150 60">
 <style type="text/css">
    <![CDATA[
      path.mkojno {
        stroke: none;
        fill: url(#strie);
      }

      rect.mkojno {
        fill: black;
        stroke: black;
        stroke-width: 0.6;
      }

      .elemento text.shargo, .jonkrampo text {
        /*fill: SeaGreen;*/
        font-weight: bold;
      }

      text.o-nro {
          font-size: 3.5px;
          font-weight: bold;
      }

    ]]>
  </style>
  <defs>
    <pattern id="strie" viewBox="0,0,4,1" height="20%" width="20%">
      <rect class="mkojno" width="2" height="1"/>
    </pattern>
  </defs>
  <g id="on_enhavo"></g>
</svg>



<label for="oksidnombroj">oksidnombro:</label> <b><span id="oksidnombroj_info">0</span></b>
<input type="range" id="oksidnombroj" style="width: 20em; max-width: 80%" min="-4" max="9" value="0" onchange="aktualigo_ps()" oninput="aktualigo_ps()">

<div id="oksidnombroj_elemento"></div>

<script>
  let elementoj_tab = [];

  function aktualigo_on(smb) {
    // console.log("akt on");
    if (smb) {
        const nomo = Elemento.smb(smb).nomo;
        const on = Elemento.oksid_nro(smb);
        ĝi("#oksidnombroj_elemento").innerHTML = `tipaj oksidnombroj de <i>${nomo}</i> (<strong>${smb}</strong>)  en kombinaĵoj: ${on.join(', ')}`
    } else {
        ĝi("#oksidnombroj_elemento").textContent = '--'; // malplenigu
    }

  }

  function aktualigo_ps() {
    console.log("akt ps");
    const v = ĝi("#oksidnombroj").value;
    const vv = (v>0)? "+"+v : v;
    ĝi("#oksidnombroj_info").textContent = vv;

    for (const e of ĉiuj("#periodsistemo .elm")) {
      // forigu ĉiujn emfazojn antaŭ aktualigo...
      const smb = e.id.split('_')[1];
      const on = Elemento.oksid_nro(smb);
      const cl = e.classList;

      if (on.indexOf(vv)>-1) cl.add("emfazo")
      else cl.remove("emfazo")
    }

  }

  lanĉe (() => {
    const ps = ĝi("#periodsistemo");
    Elemento.periodsistemo(ps,true,(de_smb,al_smb) => {
        malemfazo(ĝi(`#ps_${de_smb}`),"emfazo_1");
        aktualigo_on(al_smb);              
        if (al_smb) emfazo(ĝi(`#ps_${al_smb}`),"emfazo_1");
    });
    
    // ŝargu apartan element-tabelon kun oksidnombroj...
    Elemento.json_element_tabelo((elmTab) => {
        //valTab = Elemento.laŭ_ŝelo(elmTab);
        elementoj_tab = elmTab;
        aktualigo_ps();
    });
  });
</script>

<style>
  .emfazo rect {
    fill: #5353FF; /* #9370DB */
  }
  .emfazo text.smb {
    fill: white;
  }

  .emfazo_1 rect {
    fill: #000088 !important;
  }

  .emfazo_1 text {
    fill: white !important;
  }  
</style>
<svg id="periodsistemo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="100%"
    viewBox="0 0 195 115"
    tabindex="0">
</svg>


### aldonaj notoj

- Oni povas tiel ankaŭ elkakluli oksidnombrojn de transirmetaloj en kunordigaj kompleksoj, sed tie
  aperas la malfacilaĵo, ke la valento por transirmetaloj ne estas unuece difinita. Kutime oni alkalkulas la
  elektronojn de la d-orbitalo. Iuj enkalkulas ĉiujn elektronojn superantaj
  la antaŭan nobelgasan distribuon. Uzante la saman difinon por desegni la Luiz-diagramon
  kaj por la kalkulado de la oksidnombro, oni tamen ricevas koheran rezulton.
- Ekzistas pluraj difinoj kaj sur tiuj bazitaj skaloj de elektronegativeco: tiu de Paŭling, de Mulliken, de Allen k.a.
  La skaloj de Paŭling, Mulliken k.a. havas la malavantaĝon ke estas certa interdependeco de ilia
  difino surbaze de ligfortoj en molekuloj kaj la difino de oksidnombroj. Do oni iom preferas la skalon de Allen, 
  kiu baziĝas sur spektroskope mezurebla joniga energio de elektronoj en neligitaj atomoj kaj do evitas tian interdependecon. Krome montriĝis, ke en kelkaj limkazoj la skalo de Allen donas rezulton pli koheron kun realaj observoj.[^i1]


### fontoj
{: .fontoj}

[^i1]: [Toward a comprehensive definition of oxidation state (IUPAC Technical Report), Appendix B](https://www.degruyter.com/document/doi/10.1515/pac-2013-0505/html)
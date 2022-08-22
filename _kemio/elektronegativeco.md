---
layout: laborfolio
title: Elektronegativeco
chapter: 2.4
js:
  - folio-0a
  - elementoj-0a
  - svg-0c
---

*Elektronegativeco* de elemento estas mezuro pri la kapablo de ĝiaj atomoj altiri elektronojn al si. Tiel du atomoj kun sama elektronegativeco prefere formas kovalentajn ligojn. Se la elektronegativeco diferencas, la ligo ne estas egalmezura, t.e. *poluseca*. Sed ĉe tre granda diferenco la
ligo estas jona, ĉar elektrono komplete transiras de unu atomo al alia.[^W1]


<script>

  lanĉe (() => {
    const ps = ĝi("#periodsistemo");
    Elemento.periodsistemo(ps,true);
  });
</script>

<style>
  rect {
    fill: none;
    stroke: black;
    stroke-width: .3;
  }

  text {
      font-family: helvetica, sans-serif;
      /*
      stroke: black;
      stroke-width: 0.2px;
      */
  }

  text.etikedo {
      font-size: 4px;
      text-anchor: middle;
      dominant-baseline: central;
  }

  text.smb {
      font-size: 4.8px;
      font-weight: bold;
      text-anchor: middle;
      dominant-baseline: central;
  }

  .emfazo1 rect {
    fill: #cceeFF;
  }
  .emfazo2 rect {
    fill: #89CFF0;
  }
  .emfazo3 rect {
    fill: #5353FF; /* #9370DB */
  }
  .emfazo3 text.smb, .emfazo3 text.eneg {
    fill: white;
  }
  .emfazo4 rect {
    fill: #bbbbEE;
  }
  .emfazo5 rect {
    fill: #e0e0FF;
  }

  text.nro {
    font-size: 2.4px;
    font-weight: bold;
    dominant-baseline: hanging;
  }

  text.eneg {
    font-size: 2.4px;
    dominant-baseline: text-bottom;
  }
</style>
<svg id="periodsistemo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="0 0 195 115">
</svg>

<script>
  const eneg = Elemento.laŭ_neg();
  const lneg = Object.keys(eneg)
    .filter(a => {return ! isNaN(a)})
    .sort((a,b) => { return +a-b;});

  lanĉe(() =>{
    let n1 = 1;
    for (e in lneg) {
      if (lneg[e] == 1.0) {
        n1 = e;
        break;
      }
    }

    atributoj(ĝi("#eneg_val"),{
      min: 0,
      max: lneg.length-1, 
      value: n1
    });

    aktualigo();
  })

  function aktualigo_info() {
      const nro = ĝi('#eneg_val').value;
      ĝi('#eneg_info').textContent = lneg[nro];
  }

  function aktualigo() {
    const val = ĝi('#eneg_val').value;

    // elektita negativeco +/- 2 ŝtupoj
    const e1 = val>=2? eneg[lneg[+val-2]] : [];
    const e2 = val>=1? eneg[lneg[+val-1]] : [];
    const e3 = eneg[lneg[+val]];
    const e4 = val < lneg.length-1? eneg[lneg[+val+1]] : [];
    const e5 = val < lneg.length-2? eneg[lneg[+val+2]] : [];

    for (const e of ĉiuj("#periodsistemo .elm")) {
      // forigu ĉiujn emfazojn antaŭ aktualigo...
      const smb = e.id.split('_')[1];
      const cl = e.classList;
      cl.remove("emfazo1","emfazo2","emfazo3","emfazo4","emfazo5");
      // aldonu emfazojn se la elemento estas en unu el la kvin listoj
      if (e1.indexOf(smb)>-1) cl.add("emfazo1");
      if (e2.indexOf(smb)>-1) cl.add("emfazo2");
      if (e3.indexOf(smb)>-1) cl.add("emfazo3");
      if (e4.indexOf(smb)>-1) cl.add("emfazo4");
      if (e5.indexOf(smb)>-1) cl.add("emfazo5");
    }
  }
</script>

<!-- 
-9..0: ciuj e-neg, kiuj rondigite donas la entjeran valoron
0.7 .. 4 pasoj je dekono, nur ekzaktaj valoroj kalkuliĝu

-->

<label for="eneg_info">elektronegativeco (laŭ Paŭling):</label> <b><span id="eneg_info">1</span></b><br>
<input type="range" id="eneg_val" style="width: 100%" step="1" value="12" min="0" max="118"  onchange="aktualigo()" oninput="aktualigo_info(); aktualigo();">



### fontoj

[^W1]: [(en) Intermolecular Forces: Review Electronegativity](https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/intermolecular_forces/01review/review4.htm)

[^W2]: [(de) Elektronegativität](https://de.wikipedia.org/wiki/Elektronegativit%C3%A4t)

<!-- 
aliaj fontoj:
https://pubchem.ncbi.nlm.nih.gov/periodic-table/#view=list
https://www.chemie.de/lexikon/Elektronegativit%C3%A4t.html#Pauling-Skala 
https://www.degruyter.com/document/doi/10.1515/ci-2020-0305/html
https://www.cup.lmu.de/ac/kluefers/homepage/L/kc2/literature/iupac_oxidation_state_2016.pdf
-->
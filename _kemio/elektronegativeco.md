---
layout: laborfolio
title: Elektronegativeco
chapter: 2.4
js:
  - folio-0a
  - sekcio-0b
  - mathjax/es5/tex-chtml
  - elementoj-0b
  - svg-0c
  - jmol-0a
  - jsmol/JSmol.min
css:
  - elementoj-0a  
---

*Elektronegativeco* de elemento estas mezuro pri la kapablo de ĝiaj atomoj altiri 
ligajn elektronojn al si. Tiel du atomoj kun sama elektronegativeco formas 
egalecajn kovalentajn ligojn. Se la elektronegativeco diferencas (pli ol 0,5), la ligo ne estas egalmezura, 
t.e. *poluseca*. Sed ĉe tre granda diferenco (2.0 aŭ pli) la
ligo estas jona, ĉar elektrono komplete transiras de unu atomo al alia.[^W1]

La intervalon de 1,7 ĝis 2,0 oni foje nomas jona transiro, ĉar foje necesas pli detale esplori, ĉu tiam temas pri poluseca aŭ jona ligo.


<script>

  lanĉe (() => {
    // kreu SVG de perioda sistemo
    const ps = ĝi("#periodsistemo");
    Elemento.periodsistemo(ps,true,
      (de_smb,al_smb) => {
          malemfazo(ĝi(`#ps_${de_smb}`));
          if (al_smb) emfazo(ĝi(`#ps_${al_smb}`));
          aktualigo_info();                
      });
  });
</script>

<style>
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
  .emfazo rect {
    fill: #000088 !important;
  }
  .emfazo text {
    fill: white !important;
  }  
</style>

<svg id="periodsistemo"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" viewBox="0 0 195 115">
</svg>

<script>
  const eneg = Elemento.laŭ_neg(true);
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
      const emfazita_elemento = ĝi("#periodsistemo .emfazo");

      if (emfazita_elemento) {
        const smb = emfazita_elemento.id.split('_')[1];
        const eneg = Elemento.smb(smb).eneg;
        ĝi('#eneg_lbl').textContent = `negativec-diferenco (${smb} - ${lneg[nro]}):`;
        ĝi('#eneg_info').textContent = Math.round(Math.abs(eneg-lneg[nro])*100)/100;
      } else {
        ĝi('#eneg_lbl').textContent = `elektronegativeco (laŭ Paŭling):`;
        ĝi('#eneg_info').textContent = lneg[nro];
      }
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

<label id="eneg_lbl" for="eneg_info">elektronegativeco (laŭ Paŭling):</label> <b><span id="eneg_info">1</span></b><br>
<input type="range" id="eneg_val" style="width: 100%" step="1" value="12" min="0" max="118"  onchange="aktualigo()" oninput="aktualigo_info(); aktualigo();">

## Polusecaj ligoj
{: .sekcio}

Se ni rigardas ekzemple molekulon de metanolo ni ricevas la sekvajn diferencojn
por la unuopaj ligoj:

$$\ce{C-H}: 2,55-2,20 = 0,35$$  
$$\ce{C-O}: 3,44-2,55 = 0,89$$  
$$\ce{O-H}: 3,44-2,20 = 1,24$$  

Ĉiuj do estas kovalentaj, sed oksigeno pro sia alta elektronegativeco pli forte altiras la elektronojn de la hidrogena kaj karbona ligantoj. Tiel estiĝas poluseca ligo kiu rezultas en negativa parta ŝargo ĉe la oksigenatomo kaj pozitiva parta ŝargo ĉe la najbara hidrogenatomo.

<!-- ![elektrostatika potencialo de metanolo](inc/metanolo_mep.png) -->

<div id="jmol_metanolo">
<script type="text/javascript" async>
  //Jmol._isAsync = true;
// 'isosurface resolution 6 molecular map mep; color isosurface translucent;'
  lanĉe(() => {
      jmol_div("jmol_metanolo",
      "inc/metanolo.spt",
      600,400,
      (app) => { Jmol.script(app,
        'set antialiasDisplay ON'
      )}
    );
  });
</script>
</div>
elektrostatika potencialo de metanolo


<!-- lig-preferoj...
https://en.wikipedia.org/wiki/Periodic_table#Metallicity
-->

<!-- montro de elektrostatika potencialo...:
https://chemapps.stolaf.edu/jmol/docs/examples-11/surfacedemos.htm
https://chemapps.stolaf.edu/jmol/docs/examples-11/isosurface.htm
https://wiki.jmol.org/index.php/File_formats/Surfaces
https://www.poissonboltzmann.org/

# konvertado...
http://biochemlabsolutions.com/Molecule%20Docking/FORMATS/Formats%20PDB%20PDBQT%20SDF%20MOL.html

superrigardon pri tiu kaj alia konceptoj donas la prezentaĵo:
https://www.csus.edu/indiv/s/spencej/chem%2031%20summer%2014%20web/day%202%20lecture.pdf

-->

<h2></h2>
[intermolekulaj fortoj](intermolekulaj_fortoj){: .sekva_folio}


## fontoj
{: .fontoj}

[^W1]: [(en) Intermolecular Forces: Review Electronegativity](https://www2.chem.wisc.edu/deptfiles/genchem/netorial/rottosen/tutorial/modules/intermolecular_forces/01review/review4.htm)

[^W2]: [(de) Elektronegativität](https://de.wikipedia.org/wiki/Elektronegativit%C3%A4t)

<!-- 
aliaj fontoj:
https://pubchem.ncbi.nlm.nih.gov/periodic-table/#view=list
https://www.chemie.de/lexikon/Elektronegativit%C3%A4t.html#Pauling-Skala 
https://www.degruyter.com/document/doi/10.1515/ci-2020-0305/html
https://www.cup.lmu.de/ac/kluefers/homepage/L/kc2/literature/iupac_oxidation_state_2016.pdf
-->
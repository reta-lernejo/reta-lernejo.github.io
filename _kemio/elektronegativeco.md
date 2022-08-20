---
layout: laborfolio
title: Elektronegativeco
chapter: 2.4
js:
  - folio-0a
  - elementoj-0a
  - svg-0c
---

... mezuro por... influas la specon de ligo...

<script>

  function erekt(elm) {
    const g = SVG.grupo(`ps_${elm.simbolo}`);

    // apartaj koordinatoj por aktinidoj/lantanidoj
    let gr = elm.grupo, pd = elm.periodo;
    if (elm.grupo < 0) {
      gr = -elm.grupo;
      pd += 3;
    }
    SVG.atributoj(g,{
      transform: `translate(${10*gr} ${10*pd})`
    })
    const r = SVG.rektangulo(0,0,10,10);

    // elementsimbolo
    const sm = SVG.teksto(elm.simbolo,5,5);
    SVG.atributoj(sm,{
      class: "smb"
    });

    // elementnumero
    const nr = SVG.teksto(elm.nro,1,1);
    SVG.atributoj(nr,{
      class: "nro"
    });

    // elektronegativeco
    const en = SVG.teksto(isNaN(elm.eneg)? '?':elm.eneg,1,9);
    SVG.atributoj(en,{
      class: "eneg"
    });

    g.append(r,nr,en,sm);
    return g;
  }

  function p_nro(p) {
    let y = 0;
    if (p == 2 || p>12 && p<18) y++;
    if (p>=3 && p<=12) y+=3;
    const nro = SVG.teksto(p,10*p+5,10*y+5);
    SVG.atributoj(nro, {
      class: "etikedo"
    });
    return nro;
  }

  function g_nro(g) {
    const gr = ["0","I","II","III","IV","V","VI","VII"][g];
    const nro = SVG.teksto(gr,5,10*g+5);
    SVG.atributoj(nro, {
      class: "etikedo"
    });
    return nro;
  }

  lanĉe (() => {
    const ps = ĝi("#periodsistemo");

    for (let p=1; p<=18; p++) {
      ps.append(p_nro(p));
    }
    for (let g=1; g<=7; g++) {
      ps.append(g_nro(g));
    }

    for (let e=1; e<=118; e++) {
      const elm = Elemento.nro(e);
      //console.log(elm);
      ps.append(erekt(elm));
    }
  });
</script>

<style>
  rect {
    fill: none;
    stroke: black;
    stroke-width: .5;
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
      font-size: 5px;
      font-weight: bold;
      text-anchor: middle;
      dominant-baseline: central;
  }

  .emfazo2 rect {
    fill: orange;
  }
  .emfazo2 text.smb {
    fill: blue;
  }
  .emfazo1 rect {
    fill: yellow;
  }
  .emfazo3 rect {
    fill: darkorange;
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
    xmlns:xlink="http://www.w3.org/1999/xlink" width="820" height="480" viewBox="-10 -10 210 120">
</svg>

<script>
  const eneg = Elemento.laŭ_neg();
  const lneg = Object.keys(eneg)
    .sort(function(a,b) { return a - b;});

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
      max: lneg.length-2, // ignoru NaN
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
    for (const q of document.querySelectorAll(".emfazo1")) {
      q.classList.remove("emfazo1");
    }
    for (const q of document.querySelectorAll(".emfazo2")) {
      q.classList.remove("emfazo2");
    }
    for (const q of document.querySelectorAll(".emfazo3")) {
      q.classList.remove("emfazo3");
    }

    const e2 = eneg[lneg[+val]];
    for (const e of e2) {
      ĝi(`#ps_${e}`).classList.add("emfazo2");
    }

    if (val>0) {
      const e1 = eneg[lneg[+val-1]];
      for (const e of e1) {
        ĝi(`#ps_${e}`).classList.add("emfazo1");
      }
    }

    if (val < lneg.length-2) {
      const e3 = eneg[lneg[+val+1]];
      for (const e of e3) {
        ĝi(`#ps_${e}`).classList.add("emfazo3");
      }
    }
    //console.log(nro);
  }
</script>

<!-- 
-9..0: ciuj e-neg, kiuj rondigite donas la entjeran valoron
0.7 .. 4 pasoj je dekono, nur ekzaktaj valoroj kalkuliĝu

-->

<label for="eneg_info">elektronegativeco:</label> <b><span id="eneg_info">1</span></b><br>
<input type="range" id="eneg_val" style="width: 50em; max-width: 80%" step="1" value="12" min="0" max="118"  onchange="aktualigo()" oninput="aktualigo_info()">

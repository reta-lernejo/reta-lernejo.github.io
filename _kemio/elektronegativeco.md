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
      console.log(elm);
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
    function aktualigo_info() {
        const nro = ĝi('#eneg_val').value;
        ĝi('#eneg_info').textContent = nro;
    }

    function aktualigo() {
        const nro = ĝi('#eneg_val').value;
        //console.log(nro);
    }
</script>

<!-- 
-9..0: ciuj e-neg, kiuj rondigite donas la entjeran valoron
0.7 .. 4 pasoj je dekono, nur ekzaktaj valoroj kalkuliĝu

-->

<label for="eneg_info">elektronegativeco:</label> <b><span id="eneg_info">1</span></b><br>
<input type="range" id="eneg_val" style="width: 50em; max-width: 80%" step="0.1" value="1.0" min="-9.0" max="4.0"  onchange="aktualigo()" oninput="aktualigo_info()">

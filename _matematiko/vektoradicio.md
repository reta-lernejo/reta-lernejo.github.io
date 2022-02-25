---
layout: laborfolio
title: Vektoradicio
---

  <!-- servi mankantajn funkciojn depende de uzata retumilo -->
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <!-- subteno por matematikaj kaj kemiaj formuloj -->
  <script id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js">
  </script>


(prilaborata...)

<!-- https://tex.stackexchange.com/questions/526950/how-to-type-column-vectors-in-mathjax -->

<!-- $$ \begin{bmatrix} 1 \cr 3 \end{bmatrix} + \begin{bmatrix} 2 \cr 2 \end{bmatrix} = ? $$ -->

<style>
  #tasko {
    display: grid;
    grid-template-areas:
      'k1 x1 k2 op k3 x2 k4 eg k5 x k6'
      'k1 y1 k2 op k3 y2 k4 eg k5 y k6'
  }

  #k1,#k2,#k3,#k4,#k5,#k6,#op,#eg {
    font-size: 200%;
  }
  
  #k1 {
    grid-area: k1;
  }
  #k2 {
    grid-area: k2;
  }
  #k3 {
    grid-area: k3;
  }
  #k4 {
    grid-area: k4;
  }
  #k5 {
    grid-area: k5;
  }
  #k6 {
    grid-area: k6;
  }

  #op {
    grid-area: op;
  }
  #eg {
    grid-area: eg;
  }

  #x1 {
    grid-area: x1;
  }
  #x2 {
    grid-area: x2;
  }
  #y1 {
    grid-area: y1;
  }
  #y2 {
    grid-area: y2;
  }
  #x {
    grid-area: x;
  }
  #y {
    grid-area: y;
  }


</style>

<div id="tasko">
  <span id="k1">(</span>
  <span id="x1">x1</span>
  <span id="y1">y1</span>
  <span id="k2">)</span>
  <span id="op">+</span>
  <span id="k3">(</span>
  <span id="x2">x2</span>
  <span id="y2">y2</span>
  <span id="k4">)</span>
  <span id="eg">=</span>
  <span id="k5">(</span>
  <input id="x" type="text" size="2" value="x">
  <input id="y" type="text" size="2" value="y">
  <span id="k6">)</span>
</div>

<svg version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    class="kartezia"
    width="600" height="600" 
    viewBox="0.0 -10.0 10.0 10.0">

  <!-- https://stackoverflow.com/questions/3846015/flip-svg-coordinate-system -->

  <style type="text/css">
    <![CDATA[

      svg.kartezia {
        display:flex;
      }

      /* Flip the vertical axis in <g> to emulate cartesian. */
      svg.kartezia > g {
        transform: scaleY(-1);
      }

      /* Re-flip all <text> element descendants to their original side up. 
      
      svg.kartezia > g text {
        transform: scaleY(-1) translate(0,-10);
      }*/

        text {
            font-size: 0.5px;
            text-anchor: middle;
            fill: black;
            stroke: none;
        }
        path {
            stroke: black;
            stroke-width: 0.02;
            /*stroke-linecap: round;*/
            fill: none;
        }
        #krado {
            fill: none;
            stroke-width: 0.01;
            stroke: gray;
        }
        #desegno {
            stroke: black;
            fill: none;
            stroke-width: 0.05;
            stroke-linecap: round;
        }
    ]]>
  </style> 

 <!-- ni metas la fluojn antaŭ la stokojn por ke ili kovru, tio provizore ŝparas
    elkalkuli komencon kaj finon de la pado depende de radiusoj -->

    <defs>
    <!-- ni kreos per JS 
      <g id="vektoro">
        <line x1="0" y1="0" x2="1" y2="0"/>
        <line x1="1" y1="0" x2="0.96" y2="0.02"/>
        <line x1="1" y1="0" x2="0.96" y2="-0.02"/>
      </g> -->

      <g id="pinto">
        <line x1="-0.4" y1="0.1" x2="0" y2="0"/>
        <line x1="-0.4" y1="-0.1" x2="0" y2="0"/>
      </g>
    </defs> 

<g id="krado">
    <line x1="0.01" y1="0" x2="0.01" y2="10"/>
    <line x1="1" y1="0" x2="1" y2="10"/>
    <line x1="2" y1="0" x2="2" y2="10"/>
    <line x1="3" y1="0" x2="3" y2="10"/>
    <line x1="4" y1="0" x2="4" y2="10"/>
    <line x1="5" y1="0" x2="5" y2="10"/>
    <line x1="6" y1="0" x2="6" y2="10"/>
    <line x1="7" y1="0" x2="7" y2="10"/>
    <line x1="8" y1="0" x2="8" y2="10"/>
    <line x1="9" y1="0" x2="9" y2="10"/>
    <line x1="9.99" y1="0" x2="9.99" y2="10"/>

    <line y1="0.01" x1="0" y2="0.01" x2="10"/>
    <line y1="1" x1="0" y2="1" x2="10"/>
    <line y1="2" x1="0" y2="2" x2="10"/>
    <line y1="3" x1="0" y2="3" x2="10"/>
    <line y1="4" x1="0" y2="4" x2="10"/>
    <line y1="5" x1="0" y2="5" x2="10"/>
    <line y1="6" x1="0" y2="6" x2="10"/>
    <line y1="7" x1="0" y2="7" x2="10"/>
    <line y1="8" x1="0" y2="8" x2="10"/>
    <line y1="9" x1="0" y2="9" x2="10"/>
    <line y1="9.99" x1="0" y2="9.99" x2="10"/>
</g>
<g id="desegno">
<!-- ni kreos per JS
    <use href="#vektoro"  transform="rotate(20) scale(6)"/>
    <text x="3" y="8">A</text>
    <use href="#vektoro"  transform="rotate(40) scale(5)"/>
    <text x="4" y="9">B</text>
    -->
</g>
 </svg>


<script>
  function vektoro(nomo,x,y,x0=0,y0=0) {
    var ns = "http://www.w3.org/2000/svg";
    const g = document.createElementNS(ns,"g");
    const linio = document.createElementNS(ns,"line");
    linio.setAttribute("x1",x0);
    linio.setAttribute("y1",y0);
    linio.setAttribute("x2",x+x0);
    linio.setAttribute("y2",y+y0);

    const teksto = document.createElementNS(ns,"text");
    teksto.textContent = nomo;
    teksto.setAttribute("x",x+x0-.2);
    teksto.setAttribute("y",-y-y0-.1); // -y ĉar ni devos speguli la koordinasistemon
    teksto.setAttribute("transform","scale(+1,-1)");

    // por aldoni la pinton ni devas scii la angulon ĉirkaŭ kiu ni rotaciu
    const a = Math.atan2(y, x) * 180 / Math.PI;
    const pinto = document.createElementNS(ns,"use");
    pinto.setAttribute("href","#pinto");
    pinto.setAttribute("transform","translate("+(x+x0)+","+(y+y0)+") rotate("+a+")");
    g.append(linio,teksto,pinto);
    const svg = document.getElementById("desegno");
    svg.append(g);
  }

  vektoro("A",1,3);
  vektoro("B",2,2,1,3);
  vektoro("A+B",3,5);
</script>
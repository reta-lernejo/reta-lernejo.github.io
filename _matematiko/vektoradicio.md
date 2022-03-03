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


<!-- https://tex.stackexchange.com/questions/526950/how-to-type-column-vectors-in-mathjax -->

<!-- $$ \begin{bmatrix} 1 \cr 3 \end{bmatrix} + \begin{bmatrix} 2 \cr 2 \end{bmatrix} = ? $$ -->

<style>
  #tasko {
    display: grid;
    justify-items: center;
    grid-template-columns: .5em 2em .5em 2em .5em 2em .5em 2em .5em 5em .5em;
    grid-template-areas:
      'k1 x1 k2 op k3 x2 k4 eg k5 x k6'
      'k1 y1 k2 op k3 y2 k4 eg k5 y k6';
  }

  #tasko, #tasko input {
    font-size: 16pt;
  }

  #butonoj input {
    font-size: 16pt;
    margin: .5em;
    background-color: lightblue;
  }

  #butonoj input:first-of {
    margin-left: 10em;
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
  <span id="k1">&#x27ee;</span>
  <span id="x1">x₁</span>
  <span id="y1">y₁</span>
  <span id="k2">&#x27ef;</span>
  <span id="op">+</span>
  <span id="k3">&#x27ee;</span>
  <span id="x2">x₂</span>
  <span id="y2">y₂</span>
  <span id="k4">&#x27ef;</span>
  <span id="eg">=</span>
  <span id="k5">&#x27ee;</span>
  <input id="x" type="text" size="1" placeholder="x₁+x₂">
  <input id="y" type="text" size="1" placeholder="y₁+y₂">
  <span id="k6">&#x27ef;</span>
</div>

<div id="butonoj">
  <input type="button" value="nova tasko" onclick="nova_tasko()"/>
  <input type="button" value="kontrolu" onclick="kontrolu()"/>
</div>

<svg version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    class="kartezia"
    width="600" height="600" 
    viewBox="-1.0 -11.0 12.0 12.0">

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
            stroke: #999;
            fill: none;
            stroke-width: 0.05;
            stroke-linecap: round;
        }
        .malbona {
          stroke: red;
        }
        .bona {
          stroke: green;
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
  let v1 = {}, v2 = {};

  function metu(kampo,valoro) {
    document.getElementById(kampo).textContent = valoro;
  }

  function valoro(kampo) {
    return document.getElementById(kampo).value;
  }

  function forigu(kampo) {
    return document.getElementById(kampo).value='';
  }

  function vektoro(nomo,cls,x,y,x0=0,y0=0) {
    var ns = "http://www.w3.org/2000/svg";
    const g = document.createElementNS(ns,"g");
    const linio = document.createElementNS(ns,"line");
    linio.setAttribute("x1",x0);
    linio.setAttribute("y1",y0);
    linio.setAttribute("x2",x+x0);
    linio.setAttribute("y2",y+y0);
    if (cls) linio.classList.add(cls);

    const teksto = document.createElementNS(ns,"text");
    const xl = x0 + x/2;
    const yl = y0 + y/2;
    teksto.textContent = nomo;
    teksto.setAttribute("x",xl+.5);
    teksto.setAttribute("y",-yl); // -y ĉar ni devos speguli la koordinasistemon
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

  function nova_tasko() {
    function n_arbitra(max) {
      return Math.floor(Math.random()*max+0.51);
    }
    function v_arbitra(max_x=10,max_y=10) {
      return {
        x: n_arbitra(max_x),
        y: n_arbitra(max_y)
      }
    }

    v1 = v_arbitra();
    v2 = v_arbitra(10-v1.x,10-v1.y);

    metu("x1",v1.x);
    metu("y1",v1.y);
    metu("x2",v2.x);
    metu("y2",v2.y);
    forigu("x");
    forigu("y");

    metu("desegno",'');
    vektoro("v₁",'',v1.x,v1.y);
    vektoro("v₂",'',v2.x,v2.y);
    /*
    vektoro("v₂",v2.x,v2.y,v1.x,v1.y);
    vektoro("v₁+v₂",v1.x+v2.x,v1.y+v2.y);
    */
  }

  function kontrolu() {
    metu("desegno",'');

    // montru ambaŭ vektorojn konektitaj
    vektoro("v₁",'',v1.x,v1.y);
    vektoro("v₂",'',v2.x,v2.y,v1.x,v1.y);

    // montru la donitan rezulton en komparo
    const X = valoro("x");
    const Y = valoro("y");
    const devio = Math.abs(X - v1.x - v2.x) + Math.abs(Y - v1.y -v2.y);
    const cls = devio < 0.1? 'bona' : 'malbona';
    vektoro("v₁+v₂",cls,+X,+Y);
  }

  //nova_tasko();
</script>
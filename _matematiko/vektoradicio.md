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

$$ \begin{bmatrix} 1 \cr 3 \end{bmatrix} + \begin{bmatrix} 2 \cr 2 \end{bmatrix} = ? $$

<svg version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="600" height="600" 
    viewBox="0 0 10.0 10.0">

  <style type="text/css">
    <![CDATA[
        text {
            font-size: 0.8px;
            text-anchor: middle
        }
        path {
            stroke: black;
            stroke-width: 0.02;
            /*stroke-linecap: round;*/
            fill: none;
        }
        line {
            stroke: black;
            fill: none;
            stroke-width: 0.01;
            stroke: gray;
        }
    ]]>
  </style> 

 <!-- ni metas la fluojn antaŭ la stokojn por ke ili kovru, tio provizore ŝparas
    elkalkuli komencon kaj finon de la pado depende de radiusoj -->

    <defs>
       <path id="vektoro" d="M0 0 L10 0 M9.6 0.2L10 0L9.6 -0.2 "></path>
    </defs> 

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

    <use href="#vektoro"  transform="translate(0 10) rotate(-20) scale(.5)"/>
    <text x="3" y="8">A</text>
    <use href="#vektoro"  transform="translate(0 10) rotate(-40) scale(.5)"/>
    <text x="4" y="9">B</text>
 </svg>
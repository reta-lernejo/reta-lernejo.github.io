---
layout: laborfolio
title: Teoremo de Pitagoro
js:
  - svg-0b
js-ext: mathjax3
---

Laŭ la teoremo de Pitagoro por orta triangulo validas, ke la kvadrato super la plej 
longa latero (la hipotenuzo kun longeco $$c$$), egalas al 
la sumo de la kvadratoj de la du pli mallongaj lateroj 
(la katetoj apudantaj la ortan angulon kun longecoj $$a$$ kaj $$b$$ 🐈):

$$ c^2 = a^2 + b^2 $$

Per tiu formulo oni ankaŭ povas elkalkuli la longecon de hipotenuzo per la formulo:

$$ c = \sqrt{a^2+b^2} $$

Dum la jarcentoj homoj trovis plurajn manierojn pruvi la teoremon de Pitagoro. Malsupre ni prezentas grafikan pruvon.

<label for="val_a">valoro de $$a$$ (tiel ke $$a+b=1$$):</label> 
<input type="range" id="val_a" style="width: 50em; max-width: 80%" value="a" min="0.1" max="0.5" value="0.3" step="0.01" onchange="aktualigu()"><br/>
<span id="valoroj"></span>

<label for="val_a">ŝovo:</label> 
<input type="range" id="val_tf" style="width: 50em; max-width: 80%" value="tf" min="0.0" max="1.0" value="0.0" step="0.01" onchange="aktualigu()">

<svg version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    class="kartezia"
    width="80%" height="80%" 
    viewBox="0.0 0.0 1.0 1.0">


    <style type="text/css">
    <![CDATA[
        rect {
            fill: none;
            stroke: gray;
            stroke-width: 0.002;
            stroke-linecap: round;
        }

        polygon {
            fill: gray;
            stroke: black;
            stroke-width: 0.002;
            stroke-linecap: round;
        }
    ]]>
    </style>

    <defs id="difinoj">
        <polygon id="triangulo" points="0,0 0,0.3 0.7,0"/>
    </defs>

    <rect width="1.0" height="1.0"/>

    <g id="desegno">
        <use id="t1" href="#triangulo"/>
        <use id="t2" href="#triangulo" transform="translate(0 1) rotate(-90)"/>
        <use id="t3" href="#triangulo" transform="translate(1 1) rotate(180)"/>
        <use id="t4" href="#triangulo" transform="translate(1 0) rotate(90)"/>
    </g>
</svg>    


<script>

  function metu(kampo,valoro) {
    document.getElementById(kampo).textContent = valoro;
  }

  function valoro(kampo) {
    return parseFloat(document.getElementById(kampo).value,10);
  }

  function forigu(kampo) {
    return document.getElementById(kampo).value='';
  }

    /** desegnas ortan triangulon kun donitaj parametroj
     * a: la longeco de la plej mallonga kateto (0.1 .. 0.5) se la hipotenuzo c=1
     * phi: rotacia angulo
     * tx,ty: forŝovo de la origino al punkto (tx,ty)
     */

    // per transformfaktoro tf ni movas la triangulojn 2,3,4 al
    // alternativa pozcio por montri sufacojn a² kaj b² anstataŭ c²

/*
    function desegnu() {
        
        const a = valoro("val_a"); //0.2;
        const tf = valoro("val_tf"); // 0.0;

        // dismetu la triangulon kun katetoj a, (1-a) al la kvar anguloj
        dif_triangulo("t1",a);
        dif_triangulo("t2",a,-90,0.0,1.0);
        dif_triangulo("t3",a,180,1.0,1.0);
        dif_triangulo("t4",a,90,1.0,0.0);

        uzo_triangulo("t1");
        uzo_triangulo("t2",0,(1-a)*tf,0);
        uzo_triangulo("t3",-90*tf,0.0,-(1-a)*tf);
        uzo_triangulo("t4",+tf*90,-tf*a,tf*a);
    }*/

    function aktualigu() {
        const a = valoro("val_a");
        const tf = valoro("val_tf");
        const b = 1-a;


        const valoroj = document.getElementById("valoroj");
        const rnd = (x) => Math.round(100*x)/100;
        const ival = (n,v) => `<b>${n}</b>=${rnd(v)} `;
        valoroj.innerHTML = 
          ival('a',a) + ival('b',b) 
          + ival('a/b',a/b) + ival('b/a', b/a)
          + ival('a²',a*a) + ival('b²',b*b)
          + ival('c²',(a*a+b*b)) + ival('c',Math.sqrt(a*a+b*b));

        const points = `0,0 0,${a} ${b},0`;
        SVG.atributoj("triangulo",{points: points});

        const tf2 = `translate(${b*tf} 1) rotate(-90)`;
        const tf3 = `translate(${1-a*tf} ${1-b*tf}) rotate(180)`;
        const tf4 = `translate(1 ${a*tf}) rotate(90)`;

        SVG.atributoj("t2",{transform: tf2});
        SVG.atributoj("t3",{transform: tf3});
        SVG.atributoj("t4",{transform: tf4});
    }

    // kreu iniciale la desegnon
    //desegnu();

</script>
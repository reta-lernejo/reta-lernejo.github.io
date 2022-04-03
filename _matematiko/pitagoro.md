---
layout: laborfolio
title: Teoremo de Pitagoro
js:
  - svg-0b
js-ext: mathjax3
---

Laŭ la teoremo de Pitagoro por orta triangulo validas, ke la kvadrato super la plej 
longa latero, la hipotenuzo, egalas al la sumo de la kvadartoj de la du pli mallongaj lateroj, la katetoj:

$$ c^2 = a^2 + b^2 $$

Per tiuformulo oni ankaŭ povas elkalkuli la longecon de hipotenuzo per la formulo:

$$ c = \sqrt{a^2+b^2} $$

Dum la jarcentoj homoj trovis plurajn manierojn pruvi la teoremon de Pitagoro. Malsupre ni prezentas grafikan pruvon.


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

    <rect width="1.0" height="1.0"/>

    <g id="desegno">
    </g>
</svg>    


<script>
    /** desegnas ortan triangulon kun donitaj parametroj
     * a: la longeco de la plej mallonga kateto (0.1 .. 0.5) se la hipotenuzo c=1
     * phi: rotacia angulo
     * tx,ty: forŝovo de la origino al punkto (tx,ty)
     */
    function orttriangulo(a,phi,tx,ty) {
        const punktoj = "0,0 0," + a + " " + (1-a) +",0 ";
        let transformo = "";
        if (tx+ty) transformo += "translate("+tx+" "+ty+")";
        if (phi) transformo += " rotate("+phi+")";
        const triangulo = SVG.poligono(punktoj,transformo);
        SVG.aldonu("desegno",triangulo);
    }

    const a = 0.2;
    const tf = 1.0;

    // per transformfaktoro tf ni movas la triangulojn 2,3,4 al
    // alternativa pozcio por montri sufacojn a² kaj b² anstataŭ c²

    orttriangulo(a);
    orttriangulo(a,-90,(1-a)*tf,1.0);
    orttriangulo(a,180-90*tf,1.0,1.0-(1-a)*tf);
    orttriangulo(a,90+tf*90,1.0-tf*a,tf*a);

</script>
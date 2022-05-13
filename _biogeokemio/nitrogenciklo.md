---
layout: laborfolio
title: Nitrogenciklo
js:
  - puzlo-0b  
---

## Puzlo

<script>
  window.onload = () => {
    const bgimg = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Nitrogen_Cycle-eo.svg/1024px-Nitrogen_Cycle-eo.svg.png";
    const svgpuzlo = new SVGPuzlo("puzzlecontainer",4,3,700,500,5,3,21.0);
    svgpuzlo.kreu(bgimg,13,0.04);
  }
</script>

<svg id="puzzlecontainer"
 version="1.1" 
    id="puzzlecontainer"
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="900" height="600" 
    >        
     
    <style type="text/css">
    <![CDATA[

        #puzzlecontainer {
            /*width: 94vw;*/
            position: relative;
            left: calc(-50vw + 60%);
        }

        #tablo {
            stroke: none;
            fill: Gainsboro;
        }

        #fono {
            stroke: none;
            fill: LightBlue;
        }

        .puzlero {
            stroke: #444;
            stroke-width: 1;
            /*            
            stroke-opacity: 0.8
            stroke-dasharray: 5,1;
            fill: none; 
            */
            fill: url(#bildo);
        }

        .puzlero:hover {
            stroke-width: 3;
            stroke: #822;
        }

        .puzlero.elektita {
            stroke-width: 4;
            stroke: #C44;
            stroke-dasharray: 3,2;
            fill: url(#bld_elektita);
            /*fill: gray;*/
        }

    ]]>
  </style>   

  <g id="puzleroj"></g>
</svg>

## Demandoj

  <svg width="500" height="500" version="1.1">
    <use xlink:href="#s-1-1" class="puzlero" transform="translate(-100 -100)"></use>
  </svg>

- Kial vivaĵoj bezonas nitrogenon?
  - ili bezonas ĝin por spirado
  - la organikaj molekuloj, el kiuj vivaĵoj konsistas, enhavas nitrogenon
  - ...
- Kial nur malmultaj uzas la nitrogenon de la atmosfero?
  - ĉar ili ne kapablas flugi por kolekti sufiĉe
  - ĉar tio kostus tro da energio
  - ĉar ili povas pli facile ĝin akiri per radikoj/digestado
- De kie originas la nitrogeno de la atmosfero?
  - ĝi originas el la kosma gasnubo, el kiu poste fariĝis la planedo Tero
  - ĝi eliĝis el vulkanoj dum la historio de la tero
  - la plantoj kaj bestoj elspiras ĝin
  - ĝi estiĝas kiam fungoj kaj bakterioj detruas organikajn substancojn

<!--https://boxy-svg.com/ideas/123/jigsaw-puzzle-generator -->

<pre id="graph" style="display: none">
    digraph {
        N2 [label="atomsfera\nnitrogeno (N₂)"]
        NH4 [label="NH₄⁺"]
        NO2 [label="NO₂⁻"]
        NO3 [label="NO₃⁻"]

        N2 -> NH4 [label="oksidigaj\nbakterioj"]
        NH4 -> NO2 [label="nitratigaj\nbakterioj"]
        NO2 -> NO3 [label="nitratigaj\nbakterioj"]
        NO3 -> N2 [label="malnitratigaj\nbakterioj"]
    }

</pre>

<div id="rend"></div>

<!--
    // OS [label="oksidigaj simbiontoj"]
    //  NH₄⁺ NO₂⁻ NO₃⁻
-->

---
layout: laborfolio
title: Nitrogenciklo
js:
  - puzlo-0b
---

## Puzlo

Por solvi la tutan puzlon mankas kelkaj puzleroj. 
Trovu ilin per ĝustaj respondoj al la malsupraj [demandoj](#demandoj)!

<script>

  function simple_hash(str) { 
      for(var a=0,c=str.length;c--;)a+=str.charCodeAt(c),a+=a<<10,a^=a>>6;a+=a<<3;a^=a>>11;return((a+(a<<15)&4294967295)>>>0).toString(16)
  }

  function respondo(event) {
    event.preventDefault();
    const trg = event.target
    const h = trg.id.substring(1);
    const ref = trg.getAttribute("href").substring(1);
    
    if ( h == simple_hash(ref)) {
      // ĉe gusta respondo videbligu la puzleron!
      montru(ref);
    }
  }

  function montru(svg_id) {
      const svg = document.getElementById(svg_id); 
      svg.removeAttribute("style");
      const [s,xi,yi] = svg_id.split('-');
      document.getElementById(`p-${xi}-${yi}`).classList.remove('kashita');
  }

  window.onload = () => {
    const bgimg = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Nitrogen_Cycle-eo.svg/1024px-Nitrogen_Cycle-eo.svg.png";
    const svgpuzlo = new SVGPuzlo("puzzlecontainer",4,3,700,500,5,3,21.0);
    svgpuzlo.kreu(bgimg,13,0.04);

   // aranĝu unuopajn disajn puzlerojn
   for (let xi=0;xi<4;xi++) {
     for (let yi=0;yi<3;yi++) {
       const id = `svg-${xi}-${yi}`;
       const sp = document.getElementById(id);
       if (sp) {
         svgpuzlo.puzlero(id,xi,yi,{style: "display: none;"});
         document.getElementById(`p-${xi}-${yi}`).classList.add('kashita');
       }
     }
   }

  }
</script>

<svg id="puzzlecontainer"
 version="1.1" 
    id="puzzlecontainer"
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="700" height="500" 
    viewBox="0 0 1050 750"
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

        .puzlero.kashita {
          display: none;
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

- Kial vivaĵoj bezonas nitrogenon?
  - [ili bezonas ĝin por spirado](#svg-2-1){: #h78475f61 onclick="respondo(event);"}
  - [la organikaj molekuloj, el kiuj vivaĵoj konsistas, enhavas nitrogenon](#svg-2-1){: #h75475e61 onclick="respondo(event);"}
  - ...
  <svg id="svg-2-1" version="1.1"></svg>


- Kial nur malmultaj vivaĵoj uzas la nitrogenon de la atmosfero?
  - [ĉar ili ne kapablas flugi por kolekti sufiĉe](#svg-1-0){: #h8b1d14a5 onclick="respondo(event);"}
  - [ĉar uzi N₂ kostus tro da energio](#svg-1-0){: #h6b1c74b5 onclick="respondo(event);"}
  - [ĉar kombinaĵoj kun hidrogeno aŭ oksigeno estas pli facile uzeblaj](#svg-2-0){: #hcd728582 onclick="respondo(event);"}
  - [ĉar ili povas pli facile povas akiri nitrogenon per radikoj/digestado](#svg-1-0){: #hbb1a7eb2 onclick="respondo(event);"}

  <svg id="svg-1-0" version="1.1"></svg>
  <svg id="svg-2-0" version="1.1"></svg>


- De kie originas la nitrogeno de la atmosfero?
  - [ĝi originas el la kosma gasnubo, el kiu poste fariĝis la planedo Tero](#svg-3-2){: #hcd7b8582 onclick="respondo(event);"}
  - [ĝi eliĝis el vulkanoj dum la historio de la tero](#svg-3-2){: #hcd728562 onclick="respondo(event);"}
  - [la plantoj kaj bestoj elspiras ĝin](#svg-3-1){: #hcd726582 onclick="respondo(event);"}
  - [iuj mikroorganismoj transformas nitraton al molekula nitrogeno](#svg-3-1){: #hd2be8fb2 onclick="respondo(event);"}

  <svg id="svg-3-1" version="1.1"></svg>
  <svg id="svg-3-2" version="1.1"></svg>


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

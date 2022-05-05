---
layout: laborfolio
title: Nitrogenciklo
js:
  - viz
  - lite.render
---

## Demandoj

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


<script>
  let viz = new Viz();
  const graph = document.getElementById("graph").textContent;
  const rend = document.getElementById("rend");
  
  viz.renderSVGElement(graph)
  .then(function(element) {
    rend.appendChild(element);
  })
  .catch(error => {
    // Create a new Viz instance (@see Caveats page for more info)
    viz = new Viz();

    // Possibly display the error
    console.error(error);
  });
</script>

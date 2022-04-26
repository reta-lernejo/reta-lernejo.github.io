---
layout: laborfolio
title: Nitrogenciklo
js:
  - viz
  - lite.render
---

<pre id="graph" style="display: none">
    digraph {
        N2 [label="atomsfera nitrogeno (N₂)"]
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

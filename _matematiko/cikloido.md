---
layout: laborfolio
title: Cikloido
js:
    - folio-0a
js-ext: mathjax3
css: 
    - kurbo-0a
---

Cikloido estas ebena kurbo, naskita de punkto apartenanta al cirklo, kiu ruliĝas sur fiksa rekto.
Kiel parametra ekvacio oni povas doni ĝin kiel:

$$x=r(\theta-\sin(\theta))$$; $$y=r(1-\cos(\theta))$$

La parametro $$r$$ estas la radiuso de la cirklo kaj $$\theta$$ donas la angulon je kiu la ciklo turniĝis.

{% include_relative inc/k_cikloido.svg %}

<script>
    function aktualigo_r() {
        const r = ĝi("#radiuso").value;
        ĝi("#radiuso_info").textContent = r;
    }
    function animacio(evt) {
        const r = ĝi("#radiuso").value;
        start(evt,200,r);
    }
</script>
<label for="radiuso">r =</label> <b><span id="radiuso_info">1</span></b>
<input type="range" id="radiuso" style="width: 20em; max-width: 80%" step="0.1" min="0.1" max="4" value="1" 
    onchange="animacio(event)" oninput="aktualigo_r()">



[^W1]: [Vikipedio: Cikloido](https://eo.wikipedia.org/wiki/Cikloido)

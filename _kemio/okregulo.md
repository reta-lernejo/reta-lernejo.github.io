---
layout: laborfolio
title: La regulo de la ok
js:
  - lewis-0a
js-ext:
  - mathjax3
---

En ĥemio rolas precipe la elektronoj de la eksteraj orbitaloj.
Vidu la paĝon pri [elektrondistribuo](). Oni nomas ilin valentaj elektronoj.

Ĉe la elementoj de la ĉefaj grupoj en la perioda sistemo de elementoj
tio estas la elektronoj de la p- kaj s-orbitaloj. Ilia nombro egalas al
la numero de la grupo (1 ĝis 8).

Ĉe la transirmetaloj en la malĉefaj grupoj aldoniĝas la elektronoj de la
d-orbitalo de la antaŭa ŝelo al la valento. 

# La regulo de la ok

La atomoj strebas al elektrondistribuo de noblaj gasoj kun plenaj eksteraj orbitaloj, kio
estas energie favora stato. Ĉe hidrogeno tio estas du elektronoj ĉe aliaj elementoj ok. 
Tial oni nomas ĝin la regulo de la ok.

Ekzistas du bazaj rimedoj por atingi pli favaoran staton: atomo kun manko de elektronoj "pruntas"
elektronon de atomo kun malmanko, tiel formantaj *jono*jn. Aŭ du atomoj uzas paron da elektronoj komune,
tiel formanta *(kun)valentan ligon*. La kunajon de tiel ligitaj atomoj oni nomas *molekulo*.
Ĉar noblaj gazoj troviĝas jam en favora stato ili tre malofte aperas en molekuloj.

...elektronegativeco, polaraj ligoj...

Ekzemploj de molekuloj formantaj valentaj ligoj estas hidrogeno kun (kun)valenta elektronparo,
oksigeno kun du (kun)valentaj paroj kaj nitrogeno kun tri (kun)valentaj paroj:

<script>
  window.onload = () => {
    
    const svg_H2 = document.getElementById("H2");
    lewis(svg_H2,[
      ["H","0-"],
      ["H",""],
    ]);

    const svg_O2 = document.getElementById("O2");
    lewis(svg_O2,[
      ["O","0=3:5:"],
      ["O","1:7:"],
    ]);

    const svg_N2 = document.getElementById("N2");
    lewis(svg_N2,[
      ["N","0#4:"],
      ["N","0:"],
    ]);

  }
</script>

<style>
        text {
            font-family: sans-serif;
            /*
            stroke: black;
            stroke-width: 0.2px;
            */
            font-size: 12px;
            text-anchor: middle;
            dominant-baseline: central;
        }
        circle {
            fill: black;
        }
        line {
            stroke: black;
            stroke-width: .6;
        }
</style>

<svg id="H2"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="50" viewBox="-10 -10 40 20">    
</svg>

<svg id="O2"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="50" viewBox="-10 -10 40 20">    
</svg>

<svg id="N2"
    version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="50" viewBox="-10 -10 40 20">    
</svg>

En la formuloj streko simbolas (kun)valentan elektronparon, dum punkto simbolas valentan elektronon, kiu ne partoprenas en molekula ligo.
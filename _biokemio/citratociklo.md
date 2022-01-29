---
layout: page
title: Citratociklo
---

  <!-- servi mankantajn funkciojn depende de uzata retumilo -->
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <!-- subteno por matematikaj kaj kemiaj formuloj -->
  <script id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js">
  </script>
  
  <!-- vd. pri baza ideo de diagramoj en md-teksto: https://www.jappoker.com/blog/2018/markdown-grammar/ -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>

<!-- uzeblaj TeX-komandoj en formuloj vd.
http://docs.mathjax.org/en/latest/input/tex/macros/index.html 

speciale pri mhchem: https://docs.moodle.org/311/en/Chemistry_notation_using_mhchem
-->


## Resuma reakcio

$$
\begin{align*}
&\ce{O}\\
&||\\
\ce{CH3-&C-S-KoA + 3H2O -> 2CO2 + 8H + KoA-SH}
\end{align*}
$$

<!--
$$
\begin{array}{ccl}
\ce{O} & \ce{OH} & \ce{O}\\
|| & | & ||\\
\ce{HO-C-CH2}&\ce{-CH}&\ce{-C-OH}
\end{array}
$$
-->


<div class="mermaid">
    graph TD;
        s1["C₂ acetil-KoA"]-->s2["C₆ citrato"];
        s2-->s3["C₆ izocitrato"]-->s4["C₅ α-ketoglutarato"];
        s4-->s5["C₄ sukcinil-KoA"]-->s6["C₄ sukcinato"];
        s6-->s7["C₄ fumarato"]-->s8["C₄ malato"];
        s8-->s9["C₄ okzalacetato"] --> s2;        
</div>

![ciklo (tradukenda)](../assets/bld/TCA_cycle.svg)

CC BY 3.0, TCA cycle; tricarboxylic acid cycle; Szent-Györgyi-Krebs cycle
[Wikimedia: Yikrazuul, propra verko](https://commons.wikimedia.org/wiki/File:TCA_cycle.svg)
        

### Paŝoj



1. Transformo de okzalacetato al citrato per la enzimo citrat-sintazo

   ![okzalacetato](../assets/bld/Oxalacetat.svg)

2. Transformo de citrato al cis-akonitato kaj plu al izocitrato per la enzimo akonitazo

3. Transformo de izocitrato al okzalsukcinato kaj plu al $$\alpha$$-ketoglutarato per la enzimo izocitrat-dehidrogenazo

4. Transformo de $$\alpha$$-ketoglutarato al sukcinil-koA per la enzimo sukcinil-koA-sintetazo

5. ktp.
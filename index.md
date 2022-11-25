---
layout: laborfolio
---

{::options parse_block_html="true" /}

<style>
  .fronto {
    display: flex; 
    align-items: center
  }
  .epigrafo {
    flex: 60% 1 5; 
    margin-left: 1.5em; 
    padding: 1em; 
    font-size: 120%; 
    border: 2px dotted gray; 
    border-top-right-radius: 1em; 
    border-bottom-right-radius: 1em; 
    border-left: none;
  }
</style>

<div class="fronto">
  ![Korvo](corvus.jpg){: style="width: 200px; border: 1px solid gray; padding: 2px"}

  «*Tiuj molbekuloj skuas la planedon sen vere kompreni ĝin.
  Ili eĉ kredas, ke nin plenekstermis kometo, grak-grak-grak.
  Ŝtonnestuloj, ŝtalflugiluloj, katkunuloj, kotonplumuloj, grak-grak-grak!*»
  {: .epigrafo}
  
</div>

Tie ĉi kolektiĝas lernmaterialoj pri diversaj fakoj. 
La projekto estas juna do bv. ne atendu jam multe da materialo
nek ke ĉio funkcias senmanke.

[Kontribuantoj](about) estas bonvenaj.




<!-- alternativa nomo elementoj & molekuloj -->

## [Kemio](/kemio)

{% assign kem = site.kemio | sort: "chapter" %}
{% for t in kem %}
{% assign c = t.chapter | prepend: "c" %}
{% if t.title and c.size == 2 %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}  

## [Biokemio](/biokemio)

{% assign bio = site.biokemio | sort: "chapter" %}
{% for t in bio %}
{% assign c = t.chapter | prepend: "c" %}
{% if t.title and c.size == 2 %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}  

<!-- alternativa nomo: (sistemo) Tero -->

## [Biogeokemio](/biogeokemio)

{% assign bio = site.biogeokemio | sort: "chapter" %}
{% for t in bio %}
{% assign c = t.chapter | prepend: "c" %}
{% if t.title and c.size == 2 %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}  

<!-- alternativa nomo: vivo | organismoj -->


## Programado

{% assign progr = site.programado | sort: "title" %}
{% for t in progr %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}


## Matematiko

{% assign mat = site.matematiko | sort: "title" %}
{% for t in mat %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}


## Esperanto

{% assign esp = site.esperanto | sort: "title" %}
{% for t in esp %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}  
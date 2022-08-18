---
layout: home
---

![Korvo](corvus.jpg){: width="200px"}

Ni volas tie ĉi kolekti lernmaterialon pri diversaj fakoj. 
La projekto estas juna do bv. ne atendu jam multe da materialo
nek ke ĉio funkcias senmanke.

Kontribuantoj estas bonvenaj.


## Esperanto

{% assign esp = site.esperanto | sort: "title" %}
{% for t in esp %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}  


<!-- alternativa nomo elementoj & molekuloj -->

## Kemio

{% assign kem = site.kemio | sort: "chapter" %}
{% for t in kem %}
{% assign c = t.chapter | prepend: "c" %}
{% if t.title and c.size == 2 %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}  

<!-- alternativa nomo: (sistemo) Tero -->

## Biogeokemio

{% assign bio = site.biogeokemio | sort: "chapter" %}
{% for t in bio %}
{% assign c = t.chapter | prepend: "c" %}
{% if t.title and c.size == 2 %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}  

<!-- alternativa nomo: vivo | organismoj -->

## Biokemio

{% assign bio = site.biokemio | sort: "chapter" %}
{% for t in bio %}
{% assign c = t.chapter | prepend: "c" %}
{% if t.title and c.size == 2 %}
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

## Programado

{% assign progr = site.programado | sort: "title" %}
{% for t in progr %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}
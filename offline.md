---
layout: home
---

!!! Vi ne havas retkonekton aŭ la retservo ne estas atingebla !!!
{: style="color: red"}

![Korvo](corvus.jpg){: width="200px"}

Ni volas tie ĉi kolekti lernmaterialon pri diversaj fakoj. 
La projekto estas juna do bv. ne atendu jam multe da materialo
nek ke ĉio funkcias senmanke.

Kontribuantoj estas bonvenaj.




<!-- alternativa nomo elementoj & molekuloj -->

## [Kemio](/kemio)

## [Materio (kemio)](/kemio)

* [Atomoj kaj elementoj](relo-kemio/kemio/a_atomoj)  

* [Interatomaj fortoj](relo-kemio/kemio/l_atomaj_fortoj)  

* [Kemiaj reakcioj](relo-kemio/kemio/r_reakcioj)  

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


## Lingvo

{% assign esp = site.lingvo | sort: "title" %}
{% for t in esp %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}
{% endfor %}
---
layout: laborfolio
js:
  - epigraf-0a
css:
  - epigraf-0a
---

<style>
  .fronto {
    display: flex; 
    align-items: center;
    margin-bottom: 2em;
  }
</style>

<div class="fronto">
  <img src="corvus.jpg" alt="Korvo" style="width: 200px; border: 1px solid gray; padding: 2px">
  <blockquote id="epigrafo" class="epigrafo">«&#x202F;grak-grak-grak!&#x202F;»</blockquote>
</div>

<script>
  const epi = document.getElementById("epigrafo");
  const txt = epigrafo();
  if (epi && txt) {
    epi.textContent = "«\u202F" + txt[0] + "\u202F»" + (txt[1]? " (" + txt[1] + ")" : "");
  }
</script>

Tie ĉi kolektiĝas lernmaterialoj pri diversaj fakoj. 
La projekto estas juna do bv. ne atendu jam multe da materialo
nek ke ĉio funkcias senmanke.

[Kontribuantoj](about) estas bonvenaj.

<!-- alternativa nomo elementoj & molekuloj -->

## [Materio (kemio)](/relo-kemio/kemio)

* [Atomoj kaj elementoj](relo-kemio/kemio/a_atomoj)  

* [Interatomaj fortoj](relo-kemio/kemio/l_atomaj_fortoj)  

* [Kemiaj reakcioj](relo-kemio/kemio/r_reakcioj)

<!-- alternativa nomo: vivo | organismoj -->

## [Vivo (biokemio)](/relo-biokemio/biokemio)

* [La ses elementoj esencaj por vivo](relo-biokemio/biokemio/esencaj_elementoj)

* [Aminacidoj](relo-biokemio/biokemio/aminacido)

* [Proteinoj](relo-biokemio/biokemio/proteino)

* [Genkodilo](relo-biokemio/biokemio/genkodilo)

<!-- alternativa nomo: (sistemo) Tero -->

## [Tero (tersciencoj)](/tero)

{% assign bio = site.tero | sort: "chapter" %}
{% for t in bio %}
{% assign c = t.chapter | prepend: "c" %}
{% if t.title and c.size == 2 %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}  


## Fiziko

### Varmo (termodinamiko)

{% assign fiz = site.fiziko | sort: "title" %}
{% for t in fiz %}
{% assign c = t.chapter | prepend: "c" %}
{% if t.title and c.size == 2 %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}

## Lingvo

* [Lingvolernado](lingvo)

## Programado

{% assign progr = site.programado | sort: "title" %}
{% for t in progr %}
{% if t.title %}
* [{{ t.title | escape }}]({{ t.url | relative_url }})
{% endif %}  
{% endfor %}


## [Matematiko](/relo-matematiko/)

* [Enhavo](/relo-matematiko/)

* [Logiko](/relo-matematiko/logiko)


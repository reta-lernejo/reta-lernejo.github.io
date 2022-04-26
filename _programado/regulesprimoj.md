---
layout: laborfolio
title: Regulesprimoj
---

Regulesprimoj ebligas serĉi kaj anstataŭigi tekstelementojn per malsimplaj skemoj.
Ili estas kreitaj origine de Ken Thompson en la 1960-aj jaroj 
por `qed`, polinia uniksa redaktilo, kaj poste aperis en 
`grep`, dosiertraserĉilo. Nuntempe ili estas uzeblaj en preskaŭ ĉiuj programlingvoj kaj en
multaj profesiaj redaktiloj.

<!--  fasadoj por elprovado
https://www.regextester.com/
(aŭ: https://regexr.com/, https://regexplained.com...)
-->

# Serĉado de signoj


<style>



  fieldset input, button {
    font-size: 120%;
    min-width: 2em;
  }

  .gr {
    font-size: 160%;
    font-weight: bold;
  }

  #teksto {
    font-size: 120%;
  }

  .em  {
    background-color: deepskyblue;
  }
</style>

<fieldset>
  <i>provteksto</i>:
  <p id="teksto">
    Mia naskiĝtagfesto estas je la 15a de Aŭgusto
  </p>
  <p id="sgn_btn">
    <button>.</button>
    <button>*</button>
    <button>+</button>
    <button>?</button>
    <button>\</button>
    <button>[]</button>
    <button>{}</button>
    <button>()</button>
    <button>|</button>
    <button>^</button>
    <button>$</button>
  </p>
  <p>
    <span class="gr">/</span>
    <input type="text" id="re" size="42">
    <span class="gr">/</span>
    <input type="text" id="flg" size="2">
  </p>
  <input type="button" value="Apliku" onclick="re_apliku();">
  <input type="button" value="Viŝu" onclick="re_vishu();">
</fieldset>


<script>
    function signo(event) {
      const btn = event.target;
      if (btn.tagName == "BUTTON") {
        const v = btn.textContent;
        const re = document.getElementById("re");
        
        if (re.selectionStart || re.selectionStart == '0') {
          var startPos = re.selectionStart;
          var endPos = re.selectionEnd;
          re.value = re.value.substring(0, startPos)
              + v
              + re.value.substring(endPos, re.value.length);
        } else {
          re.value += v;
        }
      }
    }

    document.getElementById("sgn_btn").addEventListener("click",signo);

    function re_apliku() {
        const t = document.getElementById("teksto");
        const re = document.getElementById("re").value;
        const flg = document.getElementById("flg").value;
        const re_c = new RegExp(re,flg);

        // se nenio troviĝas ni montras la nudan tekston
        let markita_teksto = t.textContent.trim();

        //if (const m = re_c.exec(t.textContent)) {
        //  markita_teksto = t.textContent.substring(0,m.index)+'<span class="em">'+m[0]+'</span>'
        //    + t.textContent.substring(m.index + m[0].length);
        //    //  replace(re_c,'<span class="emfaze">'+'xxxx'+'</span>');

        //}
        markita_teksto = markita_teksto.replace(re_c,'<span class="em">$&</span>')

        t.innerHTML = markita_teksto;
    }

    function re_vishu() {
        const re = document.getElementById("re");
        const t = document.getElementById("teksto");
        re.value = '';
        t.innerHTML = t.textContent;
    }

</script>

{::options parse_block_html="true" /}

<details style="border-top: 1px dotted black">
  <summary markdown="span">Leciono 1</summary>

Regulesprimoj uzas ordinarajn literojn kaj signojn kaj specialsignojn. Literoj kaj ciferoj 
reprezentas sin mem, do ne estas specialsignoj. Ofte oni metas regulesprimon inter strekojn
'/', sed tio iom varias laŭ programlingvo kaj redaktilo. Do `/e/` serĉas aperon de litero `e`.
Se oni volas serĉi specialsignon oni devas antaŭmeti `\`.

Oni povas provizi regulesprimon per aldonaj flagoj. Ekzemple la flago `g` (angle: *global*),
serĉas ĉiujn aperojn de la serĉteksto: `/e/g`.

Per la rektaj krampoj oni povas serĉi alternativajn signojn. Ekzemple `/[abc]/` serĉas pri
aperoj de iu el la literoj `a`, `b` aŭ `c`. Se la serĉataj signoj reprezentas intervalon en la 
kodo (Askio, do supersigna `ĉ` ne estas en la intervalo `a-d`) - 
do ekzemple estas en alfabeta ordo, oni povas uzi streketon por doni la intervalon:
`/[a-d]/` serĉas pri la unuaj kvar literoj de la latina alfabeto. 

Ĉar `[` kaj `]` estas specialsignoj, por *serĉi* rektajn krampojn, vi devas skribi
tiel: `\[` respektive `\]`.

### Taskoj

- Kontrolu ĉu la litero `u` aperas en la teksto
- Trovu ĉiujn `u` en la teksto
- Trovu ĉiujn vokalojn en la teksto
- Trovu ĉiujn ciferojn en la teksto

</details>
<details style="border-top: 1px dotted black">
  <summary markdown="span">Leciono 2</summary>

Komencon oni sigas per specialsigno `^`, do `/^a/` trovas literon `a` nur, se ĝi aperas en la komenco
de la teksto. Simile `$` signas finon de la teksto, ekz-e `/o$/`.

### Taskoj

- Kontrolu, ĉu la teksto komenciĝas per iu el la literoj k, m aŭ n
- Kontrolu, ĉu la teksto finiĝas per vokalo
- Kontrolu ĉu la teksto komenciĝas per majusklo

</details>
<details style="border-top: 1px dotted black">
  <summary markdown="span">Leciono 3</summary>


La punkto `.` reprezentas ciun ajn signon (literon, ciferon ktp.).
Se vi volas serĉi punkton anstataŭe, vi devas 'eskapi' gin tiel:
`/\./`.

Per la specialsigno `?` oni esprimas, ke la antaŭa signo povas okazi aŭ ne.
Do ekz-e la esprimo `11?` trovas unu aŭ du sisekvajn unuojn.
Dum `1.1` trovas du unuojn kun iu ajn signo inter ili, ekz-e `1a1`
aŭ `1:1` aŭ `111`.

### Taskoj 

- Trovu ĉiujn aperojn de vokalo sekvata eventuale de litero `g`
- Trovu ĉiujn aperojn de vokalo sekvata de spaco
- Trovu ĉiujn aperojn de du vokaloj kun iu ajn intera signo 

</details>
<details style="border-top: 1px dotted black">
  <summary markdown="span">Leciono 4</summary>

### Taskoj
- Trovu ĉiujn ciferojn kun sekvanta `a` en la teksto
- Trovu ĉiujn signojn, kiuj ne estas vokalo
- Trovu ĉiujn signojn kiuj estas nek vokalo, nek spaco, nek cifero
- Trovu ĉiujn du signojn, inter kiuj ne troviĝas vokalo
- Trovu ĉiujn vokalojn kun unu aŭ du sekvantaj signoj, kiuj ne estas spaco
 
</details>
<details style="border-top: 1px dotted black">
  <summary markdown="span">Leciono 5</summary>

...

### Taskoj

- Trovu ĉiujn vokalojn en vortkomenco
- Trovu ĉiujn spacojn inter vortoj
- Trovu ĉiujn vortojn kiuj havas kvin aŭ malpli da literoj
 

</details>

## Ripetoj serĉante en alia teksto 

Teksto: `Feritagoj estas 3a de Junio, 20a de Aŭgusto ĝis 1a de Septembro, unua semjano en la
komenco de Novembro`
 

### Taskoj

- Trovu ĉiujn ciferojn en la teksto
- Kontrolu, cu la teksto komenciĝas per minusklo
- Trovu ciferojn sekvatajn de punkto aŭ litero `a`.


## Leciono 6 

### Taskoj

- Trovu ĉiujn du signojn inter kiuj ne estas vokalo
- Trovu ĉiujn vokalojn sekvataj de unu aŭ du postaj signoj, kiuj ne estas spacoj
- Trovu ĉiujn vortojn, kiuj enhavas ne pli ol unu vokalon

 
# Serĉado de vortoj

Teksto: `Feritagoj estas 3a de Junio, 20a de Aŭgusto ĝis 1a de Septembro, 27a de Septembro, unua semjano en la
komenco de Novembro`

 
### Taskoj

- Trovu ciujn somermonatojn en la teksto
- Trovu, ĉu iu monato ripetiĝas
- Trovu ĉiujn datumojn donitajn per tago+monato
- Trovu datintervalojn (de...ĝis)

<!-- 
3. Serĉado de vortoj (2) look ahea, look behind k.a.
-->

# Serĉi kaj anstataŭigi
 

### Taskoj

- Anstataŭigu ĉiujn `u`per `ŭ`
- Anstataŭigu ciujn aperojn de `Aŭgusto`per `Septembro`
- Forigu ĉiujn tagindikojn antaŭ iu monato


### Taskoj

- Anstataŭigu ĉiujn tagindikojn kun nur unu cifero per `0`+cifero
- Anstatŭigu vortumon `en la komenco de`+monato per `de`+monato


Jen resumo pri la lernitaj aferoj...

| Signo | Signifo | Ekzemplo |
| `^` | komenco | `^kor` |
| `$` | fino | `aŭ$` |
| `.` | ĉiu signo | `k.r.` |
| `[]` | iu el la enkrampigitaj literoj | `^pl[iu]$` |
| `[^]` | iu signo krom la enkrampigitaj literoj | `^kor[^tv]o$` |
| `?` | nul aŭ unu da | `^ko[r]v?o$` |
| `*` | nul aŭ pli da | `^k[ore]*o$` |
| `+` | unu aŭ pli da | `^k[ore]+o$` |
| `|` | alternativo | `(pli|plu)` |
| `[[:<:]]` | vortkomenco - por serĉi en plurvortaĵoj | `[[:<:]]kubo$` |
| `[[:>:]]` | vortfino - por serĉi en plurvortaĵoj | `a[[:>:]] k.+o$` |



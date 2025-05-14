---
layout: laborfolio
title: Logiko 1 - Logikaj funkcioj
js:
  - folio-0c
js-ext: mathjax3
---

<!-- helpopaĝoj:
https://de.wikipedia.org/wiki/Boolesche_Funktion
https://en.wikipedia.org/wiki/List_of_logic_symbols
-->

<style>
  dt {
    font-size: 120%;
    background-color: cornflowerblue;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding-left: 0.2em;
    margin-top: 0.5em;
  }
  dd {
    border: 2px solid cornflowerblue;
    border-top: none;
    padding: .2em;
  }
  dt, dd {
    display: none;
  }
  dt.malkashita, dd.malkashita {
    display: block;
  }
</style>

<script>

// unuargumentaj logikaj funkcioj
const lf1 = {
  nul: () => 0,
  unu: () => 1,
  id:  (x) => x,
  ne:  (x) => Number(!x)
};
const lf1_dok = {
  nul: 'f1_nul_unu',
  unu: 'f1_nul_unu',
  id:  'f1_id',
  ne:  'f1_ne'
};

// duargumentaj logikaj funkcioj
const lf2 = {
  nul: () => 0,
  unu: () => 1, // T (taŭtologio)
  idx: (x) => x, // x
  idy: (x,y) => y, // y
  nex: (x) => Number(!x), // NOTx
  ney: (x,y) => Number(!y), //NOTy
  spx: (x,y) => Number(x&&!y), // y subpremas x
  spy: (x,y) => Number(!x&&y), // x subpremas y
  kaj: (x,y) => x&&y, // AND
  aŭ: (x,y) => x||y, // OR
  disaŭ: (x,y) => x^y, // XOR x!= y
  impl: (x,y) => Number(!(y==0&&x==1)),
  repl: (x,y) => Number(!(y==1&&x==0)),
  ekv: (x,y) => Number(x==y), //XNOR | NXOR
  nek: (x,y) => Number(!(x||y)), // NOR
  malkaj: (x,y) => Number(!(x&&y)) // NAND
}

const lf2_dok = {
  nul: 'f2_nul_unu',
  unu: 'f2_nul_unu',
  idx: 'f2_idx_idy',
  idy: 'f2_idx_idy',
  nex: 'f2_nex_ney',
  ney: 'f2_nex_ney',
  spx: 'f2_spx_spy',
  spy: 'f2_spx_spy',
  kaj: 'f2_kaj_malkaj',
  aŭ: 'f2_au_nek',
  disaŭ: 'f2_ekv_disau',
  impl: 'f2_impl_repl',
  repl: 'f2_impl_repl',
  ekv: 'f2_ekv_disau',
  nek: 'f2_au_nek',
  malkaj: 'f2_kaj_malkaj',
}

butone((ago) => {
  console.log(ago);

  dl_kaŝu = () => {
    ĉiuj('dt,dd').forEach((d_) => {
      d_.classList.remove('malkashita');
    });
  };
  dl_malkaŝu = (id) => {
    dt = ĝi('#'+id);
    if (dt) {
      dt.classList.add('malkashita');
      let dd = dt.nextElementSibling;
      while (dd && dd.tagName == 'DD') {
        dd.classList.add('malkashita');
        dd = dd.nextElementSibling;
      }
    }
  }

  [f_aro,f] = ago.split('_');

  // unuargumentaj funkcioj
  if (f_aro == 'lf1') {
    // montru priskribon
    dl_kaŝu();
    dl_malkaŝu(lf1_dok[f]);

    const th = ĝi("#tabelo1 thead tr");
    // nomo de la funkcio
    th.children[1].textContent = f;
    // valoroj de la funkcio en la dua kolumno
    ĉiuj("#tabelo1 tbody tr").forEach((tr) => {
      const x = parseInt(tr.children[0].textContent)
      const td2 = tr.children[1];
      td2.textContent = lf1[f](x)
    });

  // duargumentaj funkcioj
  } else if (f_aro == 'lf2') {
    // montru priskribon
    dl_kaŝu();
    dl_malkaŝu(lf2_dok[f]);

    const th = ĝi("#tabelo2 thead tr");
    // nomo de la funkcio
    th.children[2].textContent = f;
    // valoroj de la funkcio en la dua kolumno
    ĉiuj("#tabelo2 tbody tr").forEach((tr) => {
      const x = parseInt(tr.children[0].textContent)
      const y = parseInt(tr.children[1].textContent)
      const td2 = tr.children[2];
      td2.textContent = lf2[f](x,y)
    });
  }
})
</script>

Tio ĉi estas epitoma laborfolio, ne lernolibro, nek deviga terminaro aŭ kompleta kompendio.
Mi tie ĉi notis informojn pri nocioj, kiujn mi iam devis lerni por ekzameno.

## Logikaj funkcioj

En la klasika logiko oni laboras nur per du diversaj valoroj: *vera* kaj *malvera*, aŭ 0 kaj 1.
Logikaj funkcioj bildigas variablojn, kiuj havas unu el du valoroj, al tiuj du valoroj denove.
Ekzemple `ne` estas unuargumenta logika funkcio, kiu bildigas 0 al 1 kaj 1 al 0,
oni ĝin signas per superstreketo: $$ \overline{0}=1 $$. Duargumentaj, logikaj
funkcioj estas `kaj` kaj `aŭ`.

Ekzistas kvar unu-argumentaj logikaj funkcioj:

[nul][unu][id][ne]
{: .butonoj #lf1}

{: #f1_nul_unu}`nul` kaj `unu`
: La funkcioj `nul` kaj `unu` ignoras la argumenton kaj ĉiam rezultas en 0 (malvera) respektive 1 (vera). Do efektive ili povas esti konsiderataj kiel senargumentaj funkcioj. Cetere oni nomas esprimon, kiu ĉiam estas malvera *kontraŭdiro* ($$\bot$$). Esprimon ĉiam veran oni ankaŭ nomas *taŭtologio* ($$\top$$).

{: #f1_id}`id`
: La funkcio `id` (idento) ĉiam redonas la argumenton senŝanĝe.

{: #f1_ne}`ne`
: La funkcio `ne` - neg(aci)o, ĉiam redonas la kontraŭon de la argumento. Oni povas signi ĝin per $$\lnot$$, sed ni ĉi tie uzas alternative la superstrekon, kiu koncizigas esprimon kun pluraj aplikaj de funkcio `ne`. En programlingvo oni povas realigi ĝin per `(x) => !x ` aŭ per `(x) => 1-x`.

|x|f(x)|
|-|-|
|0||
|1||
{: #tabelo1 style="width:min-content"}

<!--
Montru unu- kaj duargumentajn logikfunkciojn per tabeloj:
1-argumentaj [nul] [unu] [id] [ne]

2-argumentoj 
  [nul-0] [kaj-AND] 
  [kajne] [id1] 
  [nekaj] [id2] 
  [disaŭ-XOR] [aŭ-OR] 
  [malaŭ-NOR] [maldisaŭ-XNOR]
  [ne2] [repl?]
  [ne1] [impl]
  [malkaj-NAND] [unu-T]

vd. ankaŭ https://de.wikipedia.org/wiki/Boolesche_Funktion
-->

Entute ekzistas 16 diversaj du-argumentaj logikaj funkcioj, jen elekto:

[nul] [unu] [idx] [nex] [idy] [ney] [spx] [spy] [kaj] [malkaj] [aŭ] [nek] [impl] [repl] [ekv] [disaŭ]
{: .butonoj #lf2}

{: #f2_nul_unu}`nul` kaj `unu`
: La duargumentaj funkcioj `nul` (kontraŭdiro) kaj `unu` (taŭtologio) ne dependas de siaj argumentoj. Ni jam pritraktis ilin sub la unuargumentaj. Ili aperas tie ĉi pro kompleteco.

{: #f2_idx_idy}`idx` kaj `idy`
: La idento-funkcioj `idx` kaj `idy` ignoras unu el siaj argumentoj kaj funkcias kiel unuargumenta idento sur la argumento x respektive y.

{: #f2_nex_ney}`nex` kaj `ney`
: La neaj funkcioj `nex` ($$\overline{x}$$) kaj `ney` ($$\overline{y}$$) ignoras unu el siaj argumentoj kaj funkcias kiel unuargumenta negacio sur la argumento x respektive y.

{: #f2_spx_spy}`spx` kaj `spy`
: Ĉe la funkcio `spx` (subpremo de x, alinome inhib(ici)o de x), la argumento y, se vera, subpremas, t.e. nuligas, malverigas, la valoron de x. La funkcio `spy` (subpremo de y) inversigas la rolon de ambaŭ argumentoj. En programlingvo oni povas realigi `spx` per `(x,y) => x && !y` aŭ per `(x,y) => x > y`.

{: #f2_kaj_malkaj}`kaj` kaj `malkaj`
: La funkcio `kaj` (konjunkcio, AND) estas vera nur, se ambaŭ argumentoj estas veraj. Ni simboligas ĝin per la kutima signo $$\land$$. En programlingvo oni povas realigi ĝin per `(x,y) => x && y` aŭ per `(x,y) =>  x*y`. 
: La funkcio `malkaj` (ekskludo, ankaŭ NAND aŭ Ŝeferfunkcio laŭ *Henry Maurice Sheffer*) estas ĉiam vera, krom se ambaŭ argumentoj estas veraj. Alivorte ĝi estas la negacio de `kaj`. Oni povas simboligi ĝin per $$x\mid y$$ aŭ $$x\barwedge y$$. En programlingvo oni povas realigi ĝin per `(x,y) => ! (x && y)` aŭ `(x,y) =>  1 - x*y`.

{: #f2_au_nek}`aŭ` kaj `nek`
: La funkcio `aŭ` (inkluziva disjunkcio, OR) estas vera, se alemanŭ unu el ĝiaj argumentoj estas vera. Ni simboligas ĝin per la kutima signo $$\lor$$. En programlingvo oni povas realigi ĝin per `(x,y) => x || y`, `(x,y) => x+y > 0` aŭ per `(x,y) => x + y - x*y`.
: La funkcio `nek` (NOR, nihilo, funkcio de Peirce) estas vera nur, se nek x nek y estas veraj. Ĝia simbolo estas $$⊽$$ kaj oni povas programlingve realigi ĝin per `(x,y) => !(x||y)` aŭ `(x,y) => x+y == 0`.

{: #f2_impl_repl}`impl` kaj `repl`
: La funkcio `impl` (implico) estas malvera nur, se x estas vera, sed y estas malvera: *Se pluvas, mi ĉiam restas hejme*. Oni simboligas ĝin per $$\implies$$ kaj programlingve povas esprimi ĝin per `(x,y) => x<=y`. 
: La funkcio `repl` (inversa implico, reimplico) estas malvera, se y estas vera, sed ne x: *Nur se estas bela vetero (x), foje mi promenas (y)*. Do x esprimas necesan kondiĉon, por ke y estu vera. Oni uzas la simbolon $$\Leftarrow$$ kaj realigas ĝin en programo ekzemple per `(x,y) => x>=y`.

{: #f2_ekv_disau}`ekv` kaj `disaŭ`
: La funkcio `ekv` (XNOR, NXOR, XAND, ekvivalento, duobla implico) estas vera nur, se ambaŭ x kaj y havas la saman valoron. Oni uzas la simbolon $$\iff$$ 
aŭ $$\odot$$ kaj programlingve esprimas ĝin per `(x,y) => x==y`.
: La funkcio `disaŭ` (ekskluziva disjunkcio, XOR) estas vera, se nur unu el ambaŭ argumento estas vera. Ĝia simbolo estas $$\oplus$$ aŭ $$\veebar$$ kaj oni povas programlingve realigi ĝin per `(x,y) => x^y` aŭ per `(x,y) => x != y`.



|x|y|f(x,y)|
|-|-|-|
|0|0||
|0|1||
|1|0||
|1|1||
{: #tabelo2 style="width:min-content"}

## Supermetado de funkcioj

Oni per supermetado de logikaj funkcioj povas ricevi novajn. Ekzemple oni povas ricevi la logikan funkcion 
`kaj` per supermetado de la du funkcioj `ne` kaj `aŭ`: $$ x \lor y = \overline{\overline{x} \land \overline{y}} $$.

<!-- klarigu skribmanierojn \land - similas majusklan A, \lor similas la "u" resp. la hoketon super "ŭ",
oni povas forlasi \land kaj skribi "ab"; \overline oni povas ankaŭ skribi \lnot, sed tio estas malpli konciza -->

## Bulea Algebro

Ĉiu logika funkcio povas esti reprezentata kiel *bulea termo*,
tio estas supermetaĵo de la funkcioj `ne`, `kaj` kaj `aŭ`. Validas diversaj leĝoj por tiuj funkcioj:

komutaj: $$ a \land b = b \land a; a \lor b = b \lor a $$

asociaj: $$(a \land b) \land c = a \land (b \land c); ( a \lor b) \lor c = a \lor (b \lor c) $$

distribuaj: $$ (a \land b) \lor c = (a \lor c) \land (b \lor c); (a \lor b) \land c = (a \land c) \lor (b \land c) $$

De-Morganaj: $$\overline{x \land y} = \overline{x} \lor \overline{y}; \overline{x \lor y} = \overline{x} \land \overline{y} $$

k.a.

## Reprezentaj formoj

Ĉiu logika funkcio povas esti reprezentata kiel alternativo de konjunkcioj de variabloj kaj negaciitaj variabloj: 
$$ xy \lor \overline{x}(y \lor xz)\overline{(x(\overline{y} \lor z) \lor yz)} = xy \lor \overline{x}y\overline{z} $$. 

Se ĉiu konjunkcio entenas ĉiujn variablojn de la funkcio, oni nomas tion *plena alternativa reprezento*. 
Tiu reprezentaĵo estas unika por ĉiu esprimo: $$ xy \lor \overline{x}y\overline{z} = xyz \lor xy\overline{z} \lor \overline{x}y\overline{z} $$.


## Rilato inter logiko kaj algebro de aroj

$$M$$ estu aro de $$2^m$$ elementoj, tiam la strukturoj $$ \{P(M);\cup;\cap;C\} $$ kaj 
$$ \{ F_2^m;\land;\lor;\lnot\} $$ estas isomorfaj. Ĉe tio $$P(M)$$ estas la aro de ĉiuj sub-aroj de $$M$$. 
$$\cup,\cap,C$$ estas la kunigo, intersekco kaj komplemento da aroj. $$F_2^m$$ estas la aro de ĉiuj $$m$$-argumentaj logikaj funkcioj.

## Kompleteco de funkcisistemo

Sistemo de logikaj funkcioj estas *kompleta*, se ĉiu logika funkcio estas reprezentebla 
per supermetado de la funkcioj el tiu sistemo. Ĉar ĉiu logika funkcio estas reprezentebla 
per submetaĵo el la funkcioj `kaj`, `aŭ` kaj `ne`, sistemo estas jam kompleta, se tiuj tri funkcioj 
estas reprezenteblaj per la funkcioj de la sistemo. Jam la sistemoj $$\{\land;\lnot\}$$ kaj 
$$\{\lor;\lnot\}$$ estas kompletaj.

## Simetria diferenco

La funkcion $$\oplus$$ laŭ $$x \oplus y = (x \land \overline{y}) \lor (\overline{x} \land y)$$ 
oni nomas *simetria diferenco*, aŭ ankaŭ *duuma adicio*. La funkcisistemo $$\{\oplus;\land\}$$ estas kompleta. 
Oni per ĝi povas konstrui algebron, kie validas tiuj leĝoj:

$$x \oplus y = y \oplus x$$

$$ x(y \oplus z) = xy \oplus xz$$

$$x \oplus x = 0$$

$$x\oplus 0 = x$$

$$x\oplus 1 = \overline{x}$$

k.a.

## Lineara funkcio

*Lineara funkcio* estas reprezentebla kiel sumo en la formo $$\bigoplus_i(\alpha_i \land x_i \oplus \beta_i)$$.


## Fermita klaso de funkcioj

Aro de logikaj funkcioj estas *fermita*, se ĉiu supermetaĵo de funkcioj el la aro apartenas mem al la aro.
Per supermeto de la funkcioj de iu sistemo oni ricevas fermitan klason, ĝi estas *generita* de la sistemo.

## Monotonaj funkcioj

Se $$\textbf{σ} = (\sigma_1,...\sigma_n)$$ kaj $$\textbf{τ} = (\tau_1,...\tau_n)$$ estas n-opoj kun 
elementoj 0 kaj 1 ni difinas rilaton $$\le$$ per $$\textbf{σ}\le\textbf{τ} \iff \sigma_i\le\tau_i; i=1,...,n$$. 
Iu n-argumenta funkcio $$f$$ estas **monotona**, se el $$\textbf{σ}\le\textbf{τ}$$ sekvas $$ f(\textbf{σ})\le f(\textbf{τ})$$. 
Ekzemple la funkcioj `kaj`, `aŭ`, `nul` kaj `unu` estas monotonaj. 
La funkcio `ne` estas ne monotona. Ĉiu bulea termo, kiu ne entenas la funkcion `ne` reprezentas monotonan funkcion kaj 
ĉiu monotona funkcio estas reprezentebla kiel bulea termo sen la funkcio `ne`. 
La aro de ĉiuj monotonaj funkcioj estas fermita klaso. Ĝi estas generita de la funkcioj 
`kaj`, `aŭ`, `nul` kaj `unu`.

<!-- klarigu funkciojn nul (1->0,0->0) kaj unu (1->1,0->1) -->

## Kvazaŭ kompleta funkcisistemo

Sistemo de logikaj funkcioj estas *kvazaŭ kompleta*, se ĝi fariĝas kompleta per aldono de la funkcioj `nul` kaj `unu`.
Funkcisistemo estas kvazaŭ kompleta, se ĝi entenas almenaŭ nemonotonan kaj nelinearan funkciojn.

## Dualaj funkcioj

Du n-argumentaj logikaj funkcioj $$f_1$$ kaj $$f_2$$ estas *dualaj*, se
$$f_1(x_1,...,x_n) = \overline{f_2(\overline{x_1},...,\overline{x_n})}$$.
Ekzemple la funkcioj `kaj` kaj `aŭ` estas dualaj funkcioj. La memdualaj funkcioj formas fermitan klason.

## Konservantaj funkcioj

Funkcio $$f$$ estas *nul-konservanta*, se $$f(0,...,0) = 0$$. Funkcio $$f$$ estas *unu-konservanta*,
se $$f(1,...,1) = 1$$. La nul-konservantaj kaj la unu-konservantaj funkcioj formas fermitajn klasojn.
Sistemo de funkcioj estas kompleta, se ĝi entenas almenaŭ nelinearan, nemonotonan, memdualan, nenulkonservantan 
kaj neunukonservantan funkciojn. Kompreneble unu funkcio povas havi plurajn de tiuj kvalitoj.


## Taskoj

(1) Estu donita la funkcio $$f$$ per la sekva tabelo:

|x|y|z|f|
|-|-|-|-|
|0|0|0|0|
|0|0|1|1|
|0|1|0|0|
|0|1|1|1|
|1|0|0|1|
|1|0|1|0|
|1|1|0|0|
|1|1|1|1|
{: style="width: min-content"}

Montru, ke la sistemo konsistanta nur el tiu funkcio $$f$$ estas kvazaŭ kompleta! Reprezentu $$f$$
per la funkcioj $$\oplus$$  kaj $$\land$$ !

(2) Transformu la sekvajn esprimojn en alternativon de konjunkcioj kaj en konjunkcion de alternativoj:

(a) $$((p\implies(q\implies r))\implies ((p\implies q)(p\implies r)))$$

(b) $$((o\implies q)\implies ((\overline{p}\implies \overline{q})))$$

(c) $$(((p\implies q)\implies p) \implies p)$$ !


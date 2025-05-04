---
layout: laborfolio
title: Logiko 1 - Logikaj funkcioj
js-ext: mathjax3
---

Tio ĉi estas epitoma laborfolio, ne lernolibro, nek deviga terminaro aŭ kompleta kompendio.
Mi tie ĉi notis informojn pri nocioj, kiujn mi iam devis lerni por ekzameno.

## Logikaj funkcioj

En la klasika logiko oni laboras nur per du diversaj valoroj: *vera* kaj *malvera*, aŭ 0 kaj 1.
Logikaj funkcioj bildigas variablojn, kiuj havas unu el du valoroj, al tiuj du valoroj denove.
Ekzemple `ne` estas unuargumenta logika funkcio, kiu bildigas 0 al 1 kaj 1 al 0,
oni ĝin signas per superstreketo: $$ \overline{0}=1 $$. Aliaj, duargumentaj, logikaj
funkcioj estas `kaj` kaj `aŭ`.

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


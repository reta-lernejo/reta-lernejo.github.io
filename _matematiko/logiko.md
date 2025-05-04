---
layout: laborfolio
title: Notoj pri logiko
js-ext: mathjax3
---



## Antaŭparolo

Tio ĉi estas laborpapero, ne lernolibro, nek deviga terminaro aŭ kompleta kompendio. 
Mi tie ĉi notis informojn pri nocioj, kiujn mi devis lerni por ekzameno. 

Tamen mi konsilas al vi ne forĵeti tiujn notojn. Ili povas doni al vi ruĝan fadenon, 
se vi relernas por ekzameno, se vi volas eklerni ion pri logiko kaj bezonas gvidilon 
tra la amaso da nocioj kaj lernendaĵoj, se vi volas skribi lernolibron kaj bezonas 
iun vicordon aŭ koncepton por ĝi, aŭ se vi volas starigi terminaron pri logiko kaj 
volas havi superrigardon pri necesaj nocioj.

Uzante aŭ nur legante tiun ĉi kajeron vi certe ekvidos multajn malbelaĵojn, netaŭgajn 
terminojn aŭ difinojn, erarojn. Volu informi min pri viaj rimarkoj por ke mi povu 
plibonigi la materialon ĝis ĝi eble fariĝos vera kompendio.

Mi ne volas plenigi la materialon per pruvoj aŭ tro longaj klarigoj aŭ ek­zem­ploj. 
Tamen kelkaj ekzemploj kaj klarigaj vortoj povus pli bone ilustri ĝin. 
Se vi scias taŭgajn, skribu al mi.

Se vi deziras skribi lernolibron pri logiko aŭ ion similan uzante 
tiun ĉi materialon, vi rajtas transpreni kaj utiligi ĉion el ĝi, 
sed volu informi min pri via projekto.

Wolfram Diestel, Lepsiko, en Julio 1994


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

*Lineara funkcio* estas reprezentebla en la formo $$\bigoplus_i(\alpha_i \land x_i \oplus \beta_i)$$.


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

## Verdikta kalkulsistemo

### Verdikta esprimo

*Verdikta esprimo* estas vico de signoj $$p_1,p_2,...$$ por variabloj 
kaj $$(, ), 0, 1, \land, \lor, \lnot, \implies, \iff$$ kaj sekvas al la indukta difino:

(1)	Ĉiu verdikta variablo estas esprimo.

(2)	Se $$Z$$ estas esprimo, tiam ankaŭ $$\lnot Z$$ estas esprimo.

(3)	Se $$Z_1, Z_2$$ estas esprimoj, tiam ankaŭ $$(Z_1 \land Z_2), (Z_1 \lor Z_2), (Z_1 \implies Z_2), (Z_1 \iff Z_2)$$ estas esprimoj.

(4)	Signovico estas esprimo nur tiam, kiam ĝi estas konstruebla per (1) - (3).

### Interpreto

Funkcio, kiu alordigas al ĉiu variablo, uzita en esprimo unu de la valoroj 0, 1 estas nomata *interpreto*.
Interpreto $$f$$ *plenumas* esprimon aŭ esprimo *estas valida* laŭ interpreto $$f$$, se la valoro rezultanta
el la anstataŭigo de la variabloj per la respektivaj valoroj 0 aŭ 1 en la esprimo estas 1.
Se eĉ aro $$X$$ de esprimoj estas valida laŭ la interpreto $$f$$, tiam ĝi estas *modelo* de la esprimaro $$X$$.
La *teorio* de interpreto $$f$$ estas la aro de ĉiuj esprimoj, kiujn $$f$$ plenumas.
Teorio de interpretaro $$F$$ estas la aro de ĉiuj esprimoj, kiujn plenumas ĉiuj interpretoj $$f$$ el $$F$$.

### Valideco kaj plenumebleco de esprimoj

Se por esprimo ekzistas plenumanta interpreto, la esprimo estas *plenu­mebla*.
Esprimo estas *ĝenerale valida*, se ĝi estas valida laŭ ĉiuj eblaj interpretoj.
Oni volas ekscii, ĉu esprimo estas ĝenerale valida, plenumebla aŭ ne plenumebla, t.e. kontraŭdira.
Validas la sekvaj interrilatoj: Se esprimo $$A \implies B$$ estas ĝenerale valida kaj ankaŭ $$A$$ 
estas ĝenerale valida, tiam ankaŭ $$B$$. Se esprimo $$A$$ estas ĝenerale valida, tiam ĝi restas tia, 
kiam oni anstataŭigas variablojn el ĝi per iuj esprimoj. Esprimo $$A$$ estas ĝenerale valida tiam, kaj nur tiam, 
kiam $$\lnot A$$ estas ne plenumebla.

### Konkludado

Esprimo $$A$$ estas *konkludebla* el esprimaro $$X$$, se ĉiu interpreto plenumanta $$X$$ ankaŭ plenumas $$A$$, 
t.e. la modelaro de $$X$$ estas sub-aro de la modelaro de $$\{A\}$$.

La aro $$X'$$ de ĉiuj esprimoj, konkludeblaj el esprimaro $$X$$, entenas $$X$$
kaj estas egala al la aro $$X''$$ de ĉiuj esprimoj konkludeblaj el $$X'$$.
Se la esprimaro $$X$$ estas sub-aro de esprimaro $$Y$$, tiam la aro $$X'$$ de esprimoj konkuldeblaj el $$X$$ 
estas sub-aro de $$Y'$$, la aro de esprimoj konkludeblaj el $$Y$$.

Por ĉiuj esprimoj $$A, B$$ kaj la esprimaro $$X$$ validas:

(1) Se el $$X$$ estas konkludebla $$A \implies B$$ kaj $$A$$ estas konkludebla el $$X$$, tiam ankaŭ $$B$$ estas konkludebla el $$X$$.

(2) Se el $$X$$ estas konkludebla $$A \implies B$$, tiam el $$X \cup \{A\}$$  estas konklu­debla $$B$$.

(3) Se el $$X \cup \{A\}$$ estas konkludebla $$B$$, tiam el $$X$$ estas konkludebla $$A \implies B$$.

### Kompleta, maksimuma kaj finie plenumebla esprimaroj

Kompleta estas esprimaro $$X$$, se por iuj esprimoj $$A$$ kaj $$B$$ validas la sekvaj postuloj:

(1) $$A \notin X$$ ekzakte tiam, kiam $$\lnot A \in X$$

(2) $$A \land B \in X$$ ekzakte tiam, kiam $$\{A;B\} \in X$$

(3) $$A \lor B \in X$$ ekzakte tiam, kiam $$\{A;B\} \cap X \ne \emptyset$$

(4) $$A \implies B \in X$$ ekzakte tiam, kiam kun $$A \in X$$ ankaŭ $$B \in X$$

Esprimaro $$X$$ estas nomata *maksimuma*, se $$X$$ estas pelnumebla kaj ĉiu vera super-aro ne estas pelnumebla.
*Finie plenumebla* ĝi estas nomata, se ĉiu finia sub-aro de ĝi estas plenumebla. Finie plenumebla esprimaro
estas plenumebla.

### Deduktado

Esprimo $$A$$ estas *deduktebla* el esprimaro $$X$$, se inter ambaŭ ekzistas deduktrilato. 
Deduktrilato estas rilato $$\implies$$ inter esprimoj $$A, B,...$$ kaj esprimaroj $$X, Y,...$$, 
kiu plenumas la sekvajn postulojn:

(1) Se $$A$$ estas elemento de $$X$$, tiam $$X \implies A$$.

(2) Se $$X \implies A$$ kaj $$X$$ estas sub-aro de $$Y$$, tiam ankaŭ $$Y \implies A$$.

(3) Se por ĉiuj $$A$$ el $$Y$$ estas $$X \implies A$$  kaj cetere $$Y \implies B$$, tiam ankaŭ $$X \implies B$$.

(4) Se $$X \implies A$$, tiam ekzistas finia sub-aro $$Y$$ de $$X$$ tia, ke $$Y \implies A$$.

La sistemon el ĉiuj esprimoj kun la rilato $$\implies$$ oni nomas deduktsistemo.

Oni povas konstrui deduktsistemon ankaŭ alimaniere. Ni volas signi la aron de ĉiuj esprimoj per $$F$$.
$$n$$-argumenta *deduktregulo* estas $$(n+1)$$-argumenta rilato $$R$$ en $$F^{n+1}$$.
Pluropo $$(A_1,...,A_n,A_0)$$ estas *apliko* de la regulo $$R$$ al la premisoj $$A_1,...,A_n$$ kun la konkludo $$A_0$$.

Por regularo $$\Delta$$ ni povas difini deduktrilaton $$\stackrel{\Delta}{\implies}$$ tiel:
Por iu esprimaro $$X$$ estu $$X^\Delta$$ la plej malgranda aro, kiu plenumas la postulon:
Se $$(A_1,...A_n,A_0) \in R; R \in \Delta$$ kaj $$A_1,...,A_n \in X^\Delta$$, tiam ankaŭ
$$A_0 \in X^\Delta$$. Nun ni difinas $$X \stackrel{\Delta}{\implies} A: \iff A \in X^\Delta$$.
Estas pruveble, ke tiamaniere difinita dedukt­rilato estas ekvivalenta nocio al la unue difinita.

### Aksiomsistemoj

Oni volas fiksi kelkajn esprimojn tiel, ke ĉiuj ĝenerale validaj esprimoj estas dedukteblaj
el tiuj esprimoj per kelkaj fiksitaj deduktreguloj. Tiujn esprimojn oni tiam nomas *aksiomoj*.

Jen aksiomaro **AI**:

(1) $$ A \implies (B \implies A)$$

(2) $$((A \implies B) \implies A) \implies A$$

(3) $$((A \implies B) \implies (B \implies C)) \implies (A \implies C)$$

(4) $$A \land B \implies A$$ (5) A $$\land B \implies B$$

(6) $$(A \implies B) \implies ((A \implies C) \implies (A \implies B \land C))$$

(7) $$A \implies A \lor B$$ (8) $$B \implies A \lor B$$

(9) $$(A \implies C) \implies ((B \implies C) \implies (A \lor B \implies C))$$

(10) $$(A \iff B) \implies (A \implies B)$$ (11) $$(A \iff B) \implies (B \implies A)$$

(12) $$(A \implies B) \implies ((B \implies A) \implies (A \iff B))$$

(13) $$(A \implies B) \implies (\lnot B \implies \lnot A)$$

(14) $$A \implies \lnot\lnot A$$ (15) $$\lnot\lnot A \implies A$$

Se $$\stackrel{\alpha}{\implies}$$ estas la deduktrilato apartenanta al la regulo 
$$R := \{(A;A \implies B;B)|A,B esprimoj\}$$ tiam ni difinas deduktrilaton µ
$$X \implies A :\iff X \cup \textbf{AI} \stackrel{\alpha}{\implies} A $$. Esprimo $$A$$ estas ĝenerale valida, 
se ĝi estas deduktebla el la aksiomoj $$\bf{AI}$$ per $$\stackrel{\alpha}{\implies}$$. 
Fine iu esprimo $$A$$ estas deduktebla el iu esprimaro $$X$$ laŭ nia ĵus konstruita aksiomsistemo 
ekzakte tiam, kiam ĝi estas konkludebla.

Alia aksiomsistemo **AII** sen $$\iff$$ estas:

(1) $$A \implies (B \implies A)$$

(2) $$(A \implies B) \implies ((A\implies(B\implies C)) \implies (A\implies C))$$

(3) $$(A\land B)\implies A$$ $$ (4) $$(A\land B)\implies B$$

(5) $$A\implies(B\implies(A\land B))$$

(6) $$A\implies (A\lor B)$$ (7) $$B\implies (A\lor B)$$

(8) $$(A\implies C) \implies ((B\implies C) \implies ((A\lor B)\implies C))$$

(9) $$(A\implies B) \implies((A\implies\lnot B)\implies \lnot A)$$

(10) $$\lnot\lnot A \implies A$$

Tria **AIII**:

(1) $$A\implies(B\implies A)$$

(2) $$(A\implies(B\implies C)) \implies((A\implies B)\implies(A\implies C))$$

(3) $$(\lnot A\implies \lnot B)\implies ((\lnot A \implies B)\implies A)$$

## Predikata kalkulsistemo

### Predikato

Predikato estas funkcio $$P: M^n \rightarrow \{0;1\}$$. La aron $$M$$ oni nomas *objektaro* aŭ *individuaro*, 
kies elementoj estas *objektoj* aŭ *individuoj*. La nocio de predikato estas parenca al tiu de rilato: 
$$P(x_1,...,x_n) = 1 \iff (x_1,...,x_n) \in R$$.

### Liberaj, fiksitaj kaj ligitaj variabloj

En predikatlogikaj esprimoj ekzistas kaj logikaj variabloj kaj individuovariabloj. Se oni scias nenion pri ili, ili estas *liberaj*.
Oni *fiksas* variablon donante al ĝi valoron. Oni *ligas* variablon per kvantosignoj: 
$$\forall x P(x)$$ - por ĉiuj $$x$$ estas $$P(x); \exists y P(y)$$ - ekzistas $$y$$ kun $$P(x)$$.

### Signoj

En predikata logiko ekzistas tiuj signogrupoj:

variabloj: $$x_1, x_2,...$$

konstantoj: $$a_1,a_2,...$$

predikatsignoj: $$P_1,P_2,...$$

funkcisignoj: $$f_1,f_2,...$$

log. funkcioj, kvantosignoj: $$\forall, \exists, \land, \lor, \lnot, \implies, \iff$$

teknikaj helpsignoj: $$),($$ k.a.

### Ekvivalentaĵoj pri la kvantosignoj

Por transformado de esprimoj kun kvantosignoj oni bezonas tiujn ĉi ekvivalentaĵojn:

$$\lnot(\exists x P(x)) \iff \forall x \lnot P(x)$$

$$\lnot(\forall x P(x)) \iff \exists x \lnot P(x)$$

$$\forall x (P_1(x) \land P_2(x)) \iff \forall x P_1(x) \lor \forall y P_2(y)$$

$$\exists x (P_1(x) \lor P_2(x)) \iff \exists x P_1(x) \lor \exists y P_2(y)$$

$$\forall (P_1(x) \lor P_2(x)) \iff \forall x P_1(x) \lor \forall y P_2(y)$$

$$\exists x (P_1(x) \land P_2(x)) \iff \exists x P_1(x) \land \exists y P_2(y)$$

$$\forall x \forall y P(x,y) \iff \forall y \forall x P(x,y)$$

$$\exists x \exists y P(x,y) \iff \exists y \exists x P(x,y)$$

$$\forall x (P(x) \land y) \iff (\forall x P(x)) \land y$$

$$\forall x (P(x) \lor y) \iff (\forall x P(x)) \lor y$$

$$\exists x (P(x) \land y) \iff (\exists x P(x)) \land y$$

$$\exists x (P(x) \lor y) \iff (\exists x P(x)) \lor y$$

### Aksiomoj de la predikata kalkulsistemo

Al la aksiomoj de la verdikta kalkulsistemo (ekz. **AI**, **AII** aŭ **AIII**) estas aldonataj du ceteraj:

$$\forall x F(x) \implies F(y)$$

$$F(y) \implies \exists x F(x)$$

### Deduktreguloj de la predikata kalkulsistemo

La jam konata: $$\frac{A, A \implies B}{B}$$

Krome: $$\frac{F \implies G(x)}{F \implies \forall x G(x)}$$ kaj 
$$\frac{G(x) \implies F}{\exists x G(x) \implies F}$$

### Interpreto

Interpreto de predikatlogika esprimo konsistas en nemalplena objektaro $$M$$,
dono de la valoroj de konstantoj, de la funkcioj kaj predikatoj.

### Modelo; plenumebla, ĝenerale valida, kontraŭdira esprimoj

Tiuj nocioj estas difinitaj analoge kiel en verdikta logiko.

### Preneksformo

Esprimo havas *preneksformon*, se ĝi havas la sekvan formon:
$$(Q_1 x_1)...(Q_k x_k)M$$,
ĉe kio $$(Q_i x_i)$$ estas aŭ $$(\forall x_i)$$ aŭ $$(\exists x_i)$$ kaj $$M$$ esprimo sen kvantosignoj. 
$$(Q_1 x_1)...(Q_k x_k)M$$ estas nomata *prefikso*.

Preneksformon oni ricevas laŭ tiuj paŠoj:
(1) Eliminu sag-signojn per:
$$F \iff G = (F \implies G) \lor (G \implies F); F \implies G = \lnot F \lor G

(2) Tiru negaciojn internen:

$$\lnot(\lnot F) = F; \lnot(F \land G) = \lnot F \lor \lnot G; \lnot(F \lor G) = \lnot F \land \lnot G)$$

$$\lnot(\forall x F[x]) = \exists x \lnot F[x]; \lnot (\exists F[x]) = \forall x \lnot F[x]$$

(3) Donu al la variabloj unikajn nomojn

(4) Apliku la regulojn donitajn sub alineo *ekvivalentaĵoj pri la kvantosignoj*

### Skolemado 

Nomita laŭ Thoralf Skolem (1920). La ideo estas anstataŭi esprimon
$$\forall x_1 \forall x_s...\forall x_n \exists y F$$ per
$$\forall x_1 \forall x_2...\forall X_n F^*$$. Ĉe tio oni ricevas
$$F^*$$ el $$F$$ per substituo de la variablo $$y$$ per funkcio dependanta de la variabloj
$$x_1,x_2,...,x_n$$.

Tia funkcio estas nomata *skolemfunkcio*. Normale la skolemfunkcio ne estas konata,
same kiel la $$y$$ antaŭe ne estis konata, sed oni povas trovi tiun, se ankaŭ $$y$$ estas trovebla
laŭ la $$x_1,x_2,...,x_n$$. Tia transformo, nomita *skolemado*, ne konservas modelojn, sed la kvaliton
'esti plenumebla aŭ ne'.

Se oni skolemus la $$\forall$$-signojn, estus konservata la ĝenerala valideco.
ekzemplo: $$\exists x \forall y \forall z \exists u \forall v \exists w P(x,,y,z,u,v,w)$$ estas
en skolema norm­for­mo: $$\forall y \forall z \forall v P(a_x,y,z,f_u(y,z,v,f_w(y,z,v)))$$.

## Deduktsistemoj

### Rezolucia kalkulsistemo

Oni povas skribi esprimon en konjunkcia prezentaĵo: 

$$((L_1 \lor L_2 \lor ... \lor L_n)\land ... \land(K_1 \lor K_2 \lor ... \lor K_m))$$

ankaŭ kiel aro de aroj:

$$\{\{L_1;L_2;...;L_n\};...;\{K_1;K_2;...K_m\}\}$$.

Tiun formon oni nomas *klaŭzformo*, la internaj aroj estas *klaŭzoj* kaj la tuta aro la *klaŭzaro*.

Rezolucia klakulsistemo (laŭ John Alan Rolunson: A Machine-Oriented Logic Based Resolution (1965)) 
laboras kun tiuj klaŭzoj. Sola aksiomo estas kontraŭdiro en formo de malplena klaŭzo kaj sola deduktregulo 
estas rezoluci-regulo, kiu simpligite aspektas tiel:

| klaŭzo 1: | $$L;K_1;K_2;...;K_n$$ |
| klaŭzo 2: | $$\lnot L; M_1;M_2;...;M_m$$ |
|===|===|
|rezolucio: | $$K_1;K_2;...;K_n;M_1;M_2;...;M_m$$ |

Praktike oni utiligas substituojn por konstrui parojn $$L, \lnot L$$.

Per tiu sistemo oni pruvas ekz. teoremon $$F_1 \land ... \land F_n \implies B $$ per tio, 
ke oni kondukas la esprimon $$F_1 \land ... \land F_n \implies \lnot B $$ al kontraŭdiro, t.e. malplena klaŭzo.

La rezolucia kalkulsistemo ne estas kompleta!

### Egaliga kalkulsistemo

Ideo estas egaligo de esprimoj per substituo.

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

(3) Montru, ke por ĉiu verdikta esprimo ekzistas ekvivalenta esprimo sen la funkcisignoj $$\iff$$ kaj $$\implies$$ !

(4) Montru, ke po ĉiu verdikta esprimo ekzistas ekvivalenta esprimo, kiu entenas nur la funkcisignojn $$\implies$$ kaj $$\lnot$$ !

(5) Pruvu, ke por iuj du esprimoj A kaj B la sekvaj asertoj estas ekvivalentaj:

(a) $$A\implies B$$ estas ĝenerale valida

(b) $$A\land\lnot B$$ estas ne plenumebla

(c) la modelo de A estas sub-aro de la modelo de B!

(6) Montru, ke la sekvaj esprimoj estas dedukteblaj el la aksiomsistemo **AI**:

(a) $$((p\implies q)\land(r\lor q))\implies(p\implies q)$$

(b) $$p \iff \lnot\lnot p$$ !

(7) Montru, ke la la aksiomsistemo **AIII** estas deduktebla el **AII** per la regulo $$R$$ kaj substituo de esprimoj!
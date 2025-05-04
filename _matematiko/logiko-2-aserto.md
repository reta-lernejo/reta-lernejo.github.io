---
layout: laborfolio
title: Logiko 2 - Aserta kalkulsistemo
js-ext: mathjax3
---

### Aserta esprimo

*Aserta esprimo* estas vico de signoj $$p_1,p_2,...$$ por variabloj 
kaj $$(, ), 0, 1, \land, \lor, \lnot, \implies, \iff$$ kaj sekvas al la indukta difino:

(1)	Ĉiu aserta variablo estas esprimo.

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


## Taskoj

(1) Montru, ke por ĉiu aserta esprimo ekzistas ekvivalenta esprimo sen la funkcisignoj $$\iff$$ kaj $$\implies$$ !

(2) Montru, ke po ĉiu aserta esprimo ekzistas ekvivalenta esprimo, kiu entenas nur la funkcisignojn $$\implies$$ kaj $$\lnot$$ !

(3) Pruvu, ke por iuj du esprimoj A kaj B la sekvaj asertoj estas ekvivalentaj:

(a) $$A\implies B$$ estas ĝenerale valida

(b) $$A\land\lnot B$$ estas ne plenumebla

(c) la modelo de A estas sub-aro de la modelo de B!

(4) Montru, ke la sekvaj esprimoj estas dedukteblaj el la aksiomsistemo **AI**:

(a) $$((p\implies q)\land(r\lor q))\implies(p\implies q)$$

(b) $$p \iff \lnot\lnot p$$ !

(5) Montru, ke la la aksiomsistemo **AIII** estas deduktebla el **AII** per la regulo $$R$$ kaj substituo de esprimoj!
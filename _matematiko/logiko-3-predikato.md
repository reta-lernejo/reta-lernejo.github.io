---
layout: laborfolio
title: Logiko 3 - Predikata kalkulsistemo
js-ext: mathjax3
---

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

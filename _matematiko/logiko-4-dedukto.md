---
layout: laborfolio
title: Logiko 4 - Deduktsistemoj
js-ext: mathjax3
---

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

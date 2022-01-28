---
layout: page
title: Prologo
---

* Enhavo
{:toc}

## Lerni la bazojn de Prologo

Jen ni enkondukas en la programlingvon Prologo. Pro koncizeco ni klarigas nur la bazajn aferojn por kompreni, kiel Prologo funkcias kaj helpi per la unuaj paŝoj. Se vi volas pli enprofundiĝi ni rekomendas uzi iujn el la pli detalaj enkondukoj, bedaŭrinde precipe angla- aŭ alilingvaj:

- [Learn Prolog Now!](http://www.let.rug.nl/bos/lpn//lpnpage.php?pageid=online)
- [Prolog für Linguisten](http://www.fb10.uni-bremen.de/homepages/hackmack/prolog/skript)
- [SWI Prolog - Getting started quickly](https://www.swi-prolog.org/pldoc/man?section=quickstart)
- [SWI Prolog - Glossary of Terms](https://www.swi-prolog.org/pldoc/man?section=glossary#gloss:compound)
- [SWISH - Example programs](https://swish.swi-prolog.org/example/examples.swinb)
- [An Introduction to Prolog](https://link.springer.com/content/pdf/bbm%3A978-3-642-41464-0%2F1.pdf)

### Unuaj paŝoj

<!-- https://www.metalevel.at/prolog/concepts -->

Bazaj terminoj:

- atomo
- variablo
- predikato
- fakto
- regulo

*Atomoj* estas nomoj (vortoj) kiuj staras por si mem. Ili komenciĝu per minusklo aŭ alie estu enfermitaj en simplaj citiloj: `banano`, `flava`, `'Ludoviko'`.

*Variabloj* povas preni iujn valorojn: nombrojn, atomojn, esprimojn ktp. Ili havas majusklan nomon: `A`, `B`, `Homo`. 
Anonima variablo komenciĝas per substreko `_`, `_A`, `_kc`, oni povas uzi ĝin, se la valoro ne interesas.

*Predikato* estas esprimo el *nomo* kaj arbitra nombro de *argumentoj*. La nombron de argumentoj oni indikas post oblikvo: `pluvas/0`, `frukto/1`, `homo/1`, `koloro/2`, `geedzoj/3`.
Predikatojn oni difinas per kolekto de *klaŭzoj*, kiuj siavice povas esti *faktoj* aŭ *reguloj*. 

Jen kelkaj faktoj por la supre nomitaj predikatoj. Regulojn ni pririgardos pli poste.

```prolog
pluvas.

frukto(banano).
frukto(pomo).
frukto(frago).
frukto(frambo).
frukto(pruno).
frukto(kukumo).

koloro(banano,flava).
koloro(pomo,flava).
koloro(pomo,ruĝa).
koloro(frago,ruĝa).
koloro(frambo,ruĝa).
koloro(pruno,violkolora).
koloro(kukumo,verda).

homo('Ludoviko').
homo('Klara').

geedzoj('Ludoviko','Klara',1887).
```

Se vi volas uzi viajn faktojn skribu ilin en dosieron, ekzemple `faktoj.pl` kaj lanĉu Prologon kun ili:

```
swipl faktoj.pl
```

Alternative vi ankaŭ povas poste *konsulti* viajn faktojn por ŝargi ilin (la inviton `?-` skribas Prologo, vi nur skribu la parton post tiu):

```prolog
swipl
?- consult(faktoj).
```

aŭ pli koncize:

```prolog
swipl
?- [faktoj].
```


Ni povas nun pridemandi predikatojn donante arbitrajn argumentojn. Laŭ la difinitaj faktoj (kaj reguloj), Prologo provos trovi solvojn.  

Jen ni demandas ĉu pluvas, pri la koloro de frukto, pri la fruktoj de certa koloro kaj ĉu certa frukto havas certan koloron, 
kaj ĉu Ludoviko edziĝis kaj kun kiu kaj kiam:

```prolog
?- pluvas.
true.

?- koloro(kukumo,K).
K = verda.

?- koloro(F,ruĝa).
F = pomo ;
F = frago ;
F = frambo ;
false.

?- koloro(banano,flava).
true.

?- geedzoj('Ludoviko',P,J).
J = 1887,
P = 'Klara' ;
false.
```

Vi povas elprovi tion rekte sur retpaĝo de [SWI-Ŝelo](https://swish.swi-prolog.org/), aŭ alternative instali SWI-Prologon, meti la faktojn en dosieron, kiun vi ŝargas kiel supre klarigita kaj poste pridemandi.

Per *reguloj* vi povas riĉigi viajn faktojn. Ekzemple ĉe geedzoj la ordo de la unuaj du argumentoj estas egalaj. Sed se vi demandas `geedzoj('Klara',P,J).`, vi ne ricevas respondon. Do aŭ ni devos ĉiam doni du faktojn por geedzoj aŭ pli bone uzi aldonan *regulon*:

```prolog
geedzoj('Ludoviko','Klara',1887).
geedzoj(P1,P2,J) :- geedzoj(P2,P1,J).
```

Se vi nun demandas pri Klara, vi ricevos la atendian respondon. Sed vi ankaŭ rimarkos problemon kun la regulo.

```prolog
?- geedzoj('Klara',P,J).
J = 1887,
P = 'Ludoviko' 

?- geedzoj(P,Q,_).
P = 'Ludoviko',
Q = 'Klara' ;
P = 'Klara',
Q = 'Ludoviko' ;
P = 'Ludoviko',
Q = 'Klara' ;
P = 'Klara',
Q = 'Ludoviko' ;
P = 'Ludoviko',
Q = 'Klara' ;
...
```

La regulo ĉiam denove aplikiĝos kaj trovas pli kaj pli da solvoj ĉiam interŝanĝante ambaŭ partnerojn. Tio okazas, ĉar la regulo vokas sin mem. Do ni devas krei apartan predikaton por malhelpi tion:

```prolog
geedzoj('Ludoviko','Klara',1887).

estas_geedzoj(P1,P2,J) :- geedzoj(P1,P2,J).
estas_geedzoj(P1,P2,J) :- geedzoj(P2,P1,J).
```

Tion ni ankaŭ povas skribi kiel alternativo.

```prolog
geedzoj('Ludoviko','Klara',1887).

estas_geedzoj(P1,P2,J) :- 
    geedzoj(P1,P2,J);
    geedzoj(P2,P1,J).
```

## Konceptoj de Prologo

Ni supre jam menciis kelkajn bazajn konceptojn, sed ni bezonas kompreni kelkajn pliajn por ekhavi ideon, kiel Prologo solvas problemojn, t.e. serĉas solvojn por viaj demandoj surbaze de faktoj kaj reguloj.

### Termoj

Nombroj, *atomoj*, *variabloj* kaj la malplena listo `[]`, estas *simplaj termoj*, sed ni povas kombini ilin ankoraŭ al *kunmetitaj termoj* uzante atomojn kiel *funktorojn*:

La sekvaj: 

```prolog
  punkto(1.2,3.14)
  punkto(X,Y,Z) 
  linio(p(1,2),p(X,Y)) 
```

estas ekzemploj de kunmetitaj termoj. La atomoj `punkto`, `p`, `linio` estas la funktoroj kaj inter la krampoj povas sekvi arbitra nombro de aliaj simplaj aŭ kunmetitaj termoj kiel argumentoj. Ĝenerale oni skribas ilin en la formo `funktoro(Termo_1,...,Termo_n)`. Oni nomas kunmetitajn termojn ankaŭ *strukturoj*.

Por havi pli legeblan sintakson oni povas skribi kelkajn kunmetitajn termojn en pli konvencia formo uzante *operatorojn*. Tiu formo interne estas tradukata al la norma formo:

```prolog
% 3+4 => +(3,4)
?- write_canonical(3+4).
+(3,4)

% -1 => -(1)
?- write_canonical(-1).
-1

% listojn ni klarigos en aparta ĉapitro..:
% [a,b,c] => .(a,.(b,.(c,[])))
?- write_term([a,b,c],[dotlists(true)]).
.(a,.(b,.(c,[])))
```

### Kapoj kaj korpoj

Ni komence jam enkondukis simplan *regulon* pri geedzoj. Reguloj havas ĉiam *kapon* kaj *korpon*. La kapo estas la termo antaŭ la operatoro `:-` kaj la korpo estas la termo post tiu. Jen alia ekzemplo:

```prolog
filino(F,P) :-
  ido(F,P),
  virino(F).
```

Do la kapo esprimas la predikaton, per kiu ni povas aplikigi la regulon kaj la korpo esprimas, kio devas veriĝi, por ke ni ricevu pozitivan respondon.

Se vi metas tiujn faktojn en dosieron `familio.pl`.

```prolog
virino(klara).
virino(lidja).
viro(ludvik).
ido(lidja,klara).
ido(lidja,ludvik).
```

vi poste povas pridemandi:

```prolog
?- [familio].

?- filino(klara,lidja).
false.

?- filino(lidja,klara).
true.

?- filino(lidja,P).
F = klara ;
F = ludvik ;
false.
```

Do ni i.a. trovis du solvojn pri kies filino Lidja estas. Interne, por respondi vian demandon Prologo serĉis fakton aŭ regulon kun la kapa predikato filino/2, trovis la regulon kaj la du kondiĉojn en la korpo, ke Klara devas esti ido de la koncerna persono kaj mem virino. Trovinte konvenajn faktojn ido/2 kaj virino/1 ĝi redonis la solvojn aŭ `false` se ne (plu) troviĝis solvo.

Fakte vi povas ankaŭ faktojn imagi havantaj korpon, nome `true`. Do tiuj du klaŭzoj estas ekvivalentaj:

```prolog
virino(klara).
virino(klara) :- true.
```

## Prologo estas serĉroboto

### Unuigalgoritmo

Serĉante solvon por viaj demandoj, Prologo trairas sian stokon da faktoj kaj reguloj provante strukture unuigi vian demandon kun ili. Pli ĝenerale *unuigo* estas egaligo de du termoj sukcesanta, aŭ se ambaŭ enhavas neniujn variablojn kaj estas strukture egalaj aŭ se ili havas ambaŭ variablojn en samaj lokoj, aŭ se oni povas anstataŭigi la variablojn de unu termo per simpla termo el la dua tiel, ke ambaŭ termoj fariĝas egalaj. Eksplicite ni povas demandi pri eglaeco per `=` kaj tiel ilustri, kio en nia klarigo eble sonas iom konfuze:

```prolog
?- =(mi,mi).
true.

?- =(mi,1).
false.

?- =(Mi,1).
Mi = 1.

?- =(Mi,Iu).
Mi = Iu.

?- =(linio(p(1,2),p(X,Y)),linio(p(A,B),p(2,C))).
X = B, B = 2,
Y = C,
A = 1.
```

Ĉar `=` estas operatoro ni povas same skribi:

```prolog
?- mi=mi.
true.

?- Mi='Petro'.
Mi = 'Petro'.

% ktp.
```

Cetere, la unua [unuigo-algoritmo](https://en.wikipedia.org/wiki/Unification_(computer_science)) estis ellaborita en 1930 de Jaques Herbrand.

Atentu: ĉar la funktoro `=` estas uzata por unuigo, ni ne povas uzi ĝin por aritmetiko kiel en aliaj programlingvoj. Por aritmetiko ni devas uzi `is`:

```prolog
?- A = 1+2.
A = 1+2.

?- 3 = 1+2.
false.

?- 3 is 1+2.
true.

?- A is 1+2.
A = 3.
```

### Serĉalgoritmo

En la antaŭa ĉapitro ni jam skizis, kiel la interna serĉo pri demando funkcias. Prologo provas unuigi la demandon kun iu kapo el la stoko de klaŭzoj. Kaj trovinte tiun, se temas pri fakto ĝi povas tuj redoni `true` kune kun la variabloj ligitaj dum unuigo aŭ alikaze se temas pri korpo ĝi uzas ĝin kiel nova demando (aŭ listo de demandoj, se ni konsideras, ke la komo `,` signifas *kaj*, do konjunkcion kaj la punktokomo `;` signifas *aŭ*, do alternativon.)

Sed tio nur estas parto de la algoritmo, ĉar ofta konstato estos, ke por iu el la kolektitaj subdemandoj ne troviĝos konvena respondo. En tiukazo oni devas reiri kaj avanci al la sekva fakto aŭ regulo por provi denove. Tiun reiri kaj reprovi oni nomas *respurado* (angle: *backtracking*). Tiu respurado rilate la originan (vian) demandon ankaŭ permesas trovi ne nur unu respondon, sed iom post iom ĉiujn.

Do resume, Prologo estas maŝino kun tri kapabloj: unuigo, laŭvica traserĉo de la klaŭzoj kaj respurado, kiuj en kombino permesas al ĝi traserĉi la arbon de ĉiuj eblecoj, por iom post iom trovi ĉiujn respondojn al via demando. Cetere oni nomas tian serĉmetodon ankaŭ *profundo-unua serĉo* (kontraste kun larĝo-unua serĉo), ĉar elirante de la radiko ĝi unue sekvas ĉiujn pli kaj pli profundajn disbranĉigojn ĝis folia finaĵo, poste revenas al la lasta disbranĉigo, avancas al venonta folia finaĵo ktp.

### La tranĉo

Ni ankoraŭ devas mencii la *tranĉon* (angle: *cut*), ĉar ĝi iom fuŝas la supre priskribitan algoritmon ellasante partojn de la serĉarbo. La avantaĝo estas plia rapideco, uzata prudente, la malvantaĝo estas ke povas pretervidiĝi dezirataj solvoj kaj tiel ofte okazas konfuzo kaj laciga sencimigo, se oni erare metis ĝin en maltaŭaga loko.

Ni revenu al la supra familio kaj supozu, ke niaj faktoj ne enhavas informojn per la predikatoj ido/2, sed nur patro/2 kaj patrino/2. Tiuokaze ni bezonas du regulojn por nia predikato filino/2:

```prolog
filino(F,P) :-
  patrino(P,F),
  virino(F).

filino(F,P) :-
  patro(P,F),
  virino(F).
```

Kaj aldone ni supozu, ke ni ne estas interesitaj pri ambaŭ gepatroj, sed sufiĉas scii unu el ambaŭ. Tiam ni povas tranĉi la serĉon per `!`:

```prolog
patro(ludvik,lidja).
patrino(klara,lidja).
virino(lidja).

filino(F,P) :-
  patrino(P,F),
  virino(F),!.

filino(F,P) :-
  patro(P,F),
  virino(F).
```

Se nin nun demandas pri gepatro de Lidja ni tuj ricevas la patrinon kaj la programo eĉ ne plu ofertas pluan serĉon. Pro la tranĉo ĝi tuj finas. 

```prolog
?- filino(lidja,P).
F = klara.

?- filino(lidja,ludvik).
true.
```

Sed kiel vi vidas, vi povas plu demandi, ĉu Ludvik estas ŝia patro.

Denove vi povas tion kunigi kiel alternativo en unu regulo.

```prolog
filino(F,P) :-
  patrino(P,F),
  virino(F), !
  ;
  patro(P,F),
  virino(F).
```

La tranĉo estas iom komparebla kun `break` en aliaj programlingvoj kaj `commit` en datumbazoj, sed ne tute. Efektive ĝi signifas por la algoritmo: Se vi pasas ĉe `!`, memoru ĉiujn jam per unuigo ligitajn variablojn kaj respurante neniam reiru trans la `!`, vi rajtas apliki respuradon plu nur post la `!`, sed ne antaŭ ĝi. Do ĝi estas pordo, kiun oni povas trairi nur unufoje irante antaŭen, post trairo ĝi klakŝlosiĝas kiel kaĝo de kaptilo.

Espereble mi sukfcesis iom klarigi la *tranĉon*. Verŝajne vi bone komprenos ĝin, post kiam du, trifoje unu via programo kondutis strange pigre, ne trovante la esperitajn solvojn kaj vi trovinte la kaŭzon en mismetita aŭ forgesita `!` heŭrekaos. :-)

## Listoj

```prolog
?- Listo=[D,1,2,c], D is 4+5, Listo=[_,_|Resto].
Listo = [9, 1, 2, c],
D = 9,
Resto = [2, c].
```

Kion do ni ĵus faris? Ni difinis liston el kvar elementoj, kies unua estas variablo kaj la aliaj du nombroj kaj unu atomo.
Pri la variablo ni poste donis fakton ke ĝi estas la sumo el 4 kaj 5. Fine ni identigis la voston de la listo ekde la tria elemento kun la variablo `Resto`.

Vi supre jam vidis, ke ni uzas du diversajn operatorojn por apartigi la elementojn de listo: komon `,` kaj strekon `|`. Post la komo venos alia elemento dum post la streko venos cetera listo, t.e. la resto (aŭ vosto) de la listo, kiu povas ankaŭ esti malplena:

```prolog
?- [1,2,3] = [E|R].
E = 1,
R = [2, 3].

?- [1,2,3] = [E1,E2|R].
E1 = 1,
E2 = 2,
R = [3].

?- [1,2,3] = [E1,E2,E3|R].
E1 = 1,
E2 = 2,
E3 = 3,
R = [].
```

### Rikuro tra listo

Regulojn oni povas rikure difini, kio aparte estas utila ĉe listoj. Ni difinas predikaton elekto/3, kiu elektas arbitran elementon el listo kaj redonas reston de la listo sen tiu elemento.
Ni povas difini ĝin rikure tiel: redonu la unuan elementon aŭ redonu elementon el la vosto de la listo ekde la dua elemento.

```prolog
elekto(Kapo, [Kapo|Vosto], Vosto).
elekto(Elemento, [Kapo|Vosto], [Kapo|Resto]) :-
        elekto(Elemento, Vosto, Resto).
```

```prolog
?- elekto(X,[1,2,3],Resto).
X = 1,
Resto = [2, 3] ;
X = 2,
Resto = [1, 3] ;
X = 3,
Resto = [1, 2] ;
false.
```

Tio senpere funkcias ankaŭ en inversa direkto: ni donas la reston kaj variablon (aŭ atomon aŭ nombron) por unuopa elemento kaj demandas eblajn listojn estiĝantajn per enmeto de la variablo en la diversajn lokojn:

```prolog
?- elekto(X,Listo,[2,3]).
Listo = [X, 2, 3] ;
Listo = [2, X, 3] ;
Listo = [2, 3, X] ;
false.
```

Kaj kompreneble oni povas ankaŭ demandi, ĉu iu elemento
troviĝas en listo:

```prolog
?- elekto(3,[1,2,3],_Resto_).
true.

?- elekto(4,[1,2,3],_Resto_).
false.
```

Per la predikato `maplist` ni povas apliki predikaton
al ĉiuj ĝiaj elementoj:

```prolog
?- maplist(plus(3),[1,2,3],S).
S = [4, 5, 6].

?- A=99, maplist(writeln,[[A,B,C],[1,2,3],[ni,lernas,'Prologon']]).
[99,_G251,_G254]
[1,2,3]
[ni,lernas,Prologon]
A = 99.
```

...Klarigu 'aggregator'...

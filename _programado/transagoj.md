---
layout: laborfolio
title: Transagoj
---

Transagoj (foje ankaŭ nomataj transakcioj) estas operacioj de sistemo kiuj transigas ĝin de unu kohera stato en alian. Ekzemple, se en vendosistemo okazas vendo, la sistemo devas samtempe redukti la stokon je la venditaj varoj kaj registri pagon en la konto por resti kohera.

Por certigi tian ĉiumomentan koherecon, transagoj devas havi la sekvajn kvar kvalitojn.

<!-- grafiko pri ekz-o:...

tabelo stoko: pantalonoj, ĉemizoj, ĉapoj kun nombro kaj prezo
tabelo konto: numero, tempo, valoro

kontsaldo
stokvaloro
saldo

-->

### Atomeco

Transagoj devas esti atomaj, t.e. ili devas okazi komplete aŭ tute ne. En la supra ekzemplo la registro de la pago kaj la unuopaj reduktoj de la varstokoj devas okazi kune aŭ tute ne okazi, ĉar alie la valoro de la stoko kaj la valoro en la konto ne plu koherus. Konsekvence, se fiaskas unuopa suboperacio, ekzemple la stoko de unuopa varo estas elĉerpita, la sistemo devas reveni al la antaŭa kohera stato, kvazaŭ la vendo tute ne estus lanĉita.

### Kohereco

Transago devas ne konduki el kohera al nekohera stato. Ekzemple stoko post transago ne povas esti negativa. Pago devas ne esti duoble registrita. Varidentigilo devas ekzisti nur unufoje (unikeco). Stoko ĉiam devas rilati al difinita varspeco ktp.

### Izoliteco

Se okazas du transagoj paralele, la sistemo tamen devas certigi, ke ili rezultigas la saman staton kvazaŭ ili okazus unu post la alia. Do se ekzemple en du vendoj la lasta objekto de stoko, estus vendata, nepre unu el la du vendoj devus fiaski por certigi koheran staton, oni ja ne povas unu objekton vendi dufoje. Kutime tio estas atingata per tio, ke ĝenerale samtempaj transagoj rajtas paralele ŝanĝi  diversajn rikordojn, sed nur sinsekve la saman rikordon. Se tiam okazas konflikto ĉar la dua vendo devas konsti malplenan stokon, unu el la du transagoj oni devas revoki por povi fini la alian. 

<!-- 
...pli bone klarigu izolitecon?...
https://en.wikipedia.org/wiki/ACID#Isolation_failure
-->

### Persisteco

Transagoj devas esti persistaj, t.e. post kiam transago estas finita kaj nova kohera stato de la sistemo estas atingita, tiu stato devas ne perdiĝi, ekz-e pro subita foresto de elektro aŭ alia teĥnika problemo. Do la sistemo ĉiam devas certigi ke la efiko de la transago persistiĝas.

### Ekzemploj

<!-- ĉu uzi IDBTransaction...?
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction -->

|varo|prezo|stoko|
|-|-|-|
|pantalono|12,00|4|
|ĉemizo|8,50|2|
|ĉapo|9,00|3|

|pago-nro|valoro|
|-|-|
|..|..|
|1|24,00|
|2|9,00|

|konto|saldo|
|-|-|
|kuranta|33,00|
|stokvaloro|92,00|

#### Vendo A:

    - 2 pantalonoj
    - 2 ĉemizoj
    - 1 ĉapo
    - pago: 50€

#### Vendo B:

    - 1 ĉapo
    - 1 ĉemizo
    - 1 pantalono
    - pago: 29,50€

<button>Vendo A</button> <button>Vendo B</button> <button>Vendo A kaj B</button>

### principo P-I-K-A

Kiel memorhelpo por la kvar necesaj kvalitoj de transago persista-izolita-kohera-atoma, oni povas memori ke transago estu P-I-K-A.

Angle oni uzas la memorhelpon ACID (*atomic-consistent-isolated-durable*).

### Ŝlosado kaj mortŝloso

Por certigi la bezonatajn transago-kvalitojn datumbazoj ofte uzas la rimedon de ŝlosado. Kiam unu transago legas aŭ skribas datumon, ĝi estas ŝlosata ĝis la fino de la transago kontraŭ ŝanĝoj fare de aliaj transagoj. Povas eĉ okazi, ke du paralelaj transagoj ŝlosas datumojn kiujn reciproke volas ŝanĝi la konkurenca transago kaj tiel ili blokas unu la la alian. Oni nomas tiun situacion ankaŭ mortŝloson (angle *deadlock*). La datumbazo devas rekoni tiajn situaciojn kaj revoki unu el la sin blokantaj transagoj por povi daŭrigi.

Alternativa metodo sen antaŭa ŝlosado kreas eraron nur en la momento, kiam unu transago provas ŝanĝi datumon, kiun paralela transago jam modifis. Tiu metodo nomiĝas *optimisma ŝlosado*. Ĝi plirapidigas la sistemon kaj evitas mortŝloson.

## Distribuitaj transagoj

Se, ekzemple, la stokoj kaj la kontoj estas administrataj en du apartaj sistemoj oni tamen devas certigi, ke la tuto el ambaŭ sistemoj restu kohera. Por certigi la koherecon de pluraj sistemoj, tra kiuj transagoj estas plenumataj, oni parolas pri  *distribuitaj transagoj*. Oni devas decidi pri unu el du bazaj metodoj.

### Du-faza konfirmo

La sinkrona metodo funkcias per dufaza konfirmo. Oni unue demandas la partoprenantajn sistemoj pri kreado de provizora transago, ekzemple, oni rezervas vendotajn objektojn en la stoko, por malhelpi, ke ili vendiĝu kadre de alia vendo intertempe. Post kiam ĉiuj sistemoj signalis, ke la distribuita transago estas eble oni konfirmas al ĉiuj, ili fiksas la provizoran transagon kaj sendas la rezulton pri sukceso al iu centra stira instanco. Se unu el la partaj transagoj fiaskas oni devas renversi ĉiujn por reveni al la antaŭa stato. 

Tiu aliro povas kaŭzi plurajn problemojn: unuopa transago daŭras relative longe kaj ju pli distance la sistemoj estas kaj ju pli da transagoj ŝargas ilin, des pli estas risko de prokrastoj aŭ eĉ blokadoj. Cetere oni ne volas longe fari provizorajn ŝanĝojn kiel rezervo, ĉar intertempe tio povas malebligi sekvontajn transagojn ktp.

### Kompensaj transagoj

Malpli peza metodo estas uzo de kompensaj transagoj en la okazo de fiasko. Do ĉiu sistemo faras la necesajn partajn transagojn sendepende de la aliaj sistemoj, sed se io ne funkcias, la centra instanco plenumas kompensajn transagojn por renversado. Ekzemple pagregistro estas ekvilibrita per negativa pago por reekvilibrigi la konton. Redukto de la stoko estas komepnsata per malmenda remeto sur la stoko.

La ĉefa problemo de tiu metodo estas ke oni por ĉiu ebla operacio devas disponi pri inversa operacio cele al kompensado. La sistemo devas esti kapabla administri tiajn kompensajn operaciojn, ekz-e oni devas montri al la uzanto, se operacio renversiĝis. Kaj povas esti teĥnika problemo, ekz-e pri retkonekto k.a. kiu malhelpas la kompensan operacion mem. Tiam la sistemo estas malkohera kaj bezonas manan korekton.


### Distribuita sistemo kaj la KAP-teoremo

Sistemo ankaŭ povas esti distribuita ne en la senco, ke ekzistas pluraj kopioj de ĝi, disigitaj geografie, por pli rapida aliro kaj protekto kontraŭ teĥnikaj fiaskoj de unopa rulmedio.

Depende de uzo oni havas la sekvajn tri postulojn pri tia plurkopia sistemo:

1. Kuranteco: ĉiu legado redonu la plej aktualan staton. Aparte du sinsekvaj legadoj montru la saman rezulton, se ne okazis skriba ŝanĝo en unu el la kopioj intertempe.

2. Atingeblo: ĉiu peto al la sistemo sukcesu sen eraro (sed sen garantio, ke ĝi inkluzivas la plej aktualajn ŝanĝojn)

3. Partiĝotolereco: la sistemo daŭre funkciu eĉ se iu nombro de mesaĝoj en la reto perdiĝas aŭ prokrastiĝas.

La KAP-teoremo (aŭ teoremo de *Brewer*) konstatas, ke por distribuita sistemo oni ne povas atingi ĉiujn tri postulojn samtempe, sed maksimume du (aŭ kombinon de la tri eventuale malfortigitaj postuloj).

Se ekzemple mesaĝoj perdiĝas en la reto, la sistemo devas decidi, ĉu ĝi redonu eraron - rezignante pri la postulo de ĉiama atingebleco - aŭ daŭrigu surbaze de eventuale ne tute aktualaj informoj - tiel rezignante pri postulo de kuranteco. 

### BAMBA sistemo

Sistemo, kiu nepre estu partiĝotolera kaj laŭeble tre atingebla, 
sed eventuale ne tute aktuala (kuranta), sed ja tendencas al aktualeco
post ebla obstrukco oni nomas BAMBA: Baze atingebla, molstata, baldaŭe aktuala.

(Angle oni uzas la memorhelpon BASE - kontraste al ACID: *Basically available - Soft-state - Eventually consistent*)

Depende de la uzo, la malfortaĵoj de BAMBA sistemo estas akcepteblaj rekompence de la gajno de mondvasta fidinda atingebleco de la sistemo. Ekzemple en socia reto aŭ enhavproviza platformo, estas tolerebla, ke oni ne tuj vidas la lastajn mesaĝojn, la lastminutajn filmoj ktp. sed eble kun ioma prokrasto. Eĉ por vendoplatformo oni povas toleri, se post konfirmo de aĉeto la sistemo anoncas, ke tamen la varo nun estas elĉerpita kaj la aeĉeto do ne plu ebla, kondiĉe ke tio okazas nur malofte.





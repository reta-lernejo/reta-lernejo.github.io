---
layout: laborfolio
title: Projekto Reta Lernejo
js:
  - folio-0b
  - sekcio-0b
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
  <img src="/corvus.jpg" alt="Korvo" style="width: 200px; border: 1px solid gray; padding: 2px">
  <blockquote id="epigrafo" class="epigrafo">«Birdo kantas laŭ sia beko. Nu, mi amas nigrajn kantojn. &#x202F;grak-grak-grak!&#x202F;»</blockquote>
</div>

## Eliro
{: .sekcio}

- fone de la klimatdiskuto mi konstatis, ke al mi mankas baza kompreno kiel la tero funkcias
- lerneja scio pri natursciencoj ripozis dum jardekoj
- ni ne lernis kiel fiziko, kemio kaj biologio kunfunkcias kiel *sistemo* en nia planedo
- kompleksaj simuladoj de klimatmodeloj ne estas alireblaj por normalulo
- legi nur la timigajn rezultojn ne kontentigas la scivolon

## Celo
{: .sekcio}

- krei retpaĝojn pri baza scio de sciencoj
- precipe pri natursciencoj, kelkaj aliaj fakoj laŭokaze
- laŭeble montri kiel unuopaj fakoj *kune* povus klarigi la "funkciadon" de la tero

## Rimarkoj pri tradiciaj instrumetodoj
{: .sekcio}
- tradicia instruado baziĝas sur iamaj limigoj de papirusoj: tre kondensitaj formuloj klarigas imagajn modelojn
- estas malfacile krei enkape la modelojn priskribitajn per formuloj kaj ankoraŭ pli malfacile apliki ilin al la realo
- iom pli bone funkcias instrufilmetoj en Jutubo ks, sed alie ol tekstoj kaj kalkuloj ili ne estas adapteblaj al propraj bezonoj
- sed per komputiloj oni povas ja rekte krei ianivele interagajn modelojn esploreblajn
- ekzemplaj paĝoj [teoremo de pitagoro](/matematiko/pitagoro),
[fosforciklo](/biogeokemio/fosforciklo),
[ideala gaso](/fiziko/td_ideala_gaso)

## Provizora plano
{: .sekcio}

- akualigi mian propran scion pri natursciencoj
- krei retpaĝojn, kiuj ne nur tekste prezentas konceptojn sed ankaŭ iugrade realigas la modelojn per programo por ebligi eksperimentadon 
- kreitaj bazaj modeloj ebligas pluevoluadon de aplikeblo kaj ankaŭ kombinadon
- iam fine, espereble, interligi la modelojn de la fakoj fiziko, kemio kaj biokemio ... por ebligi migradon tra la konceptoj kaj doni ideon pri la sistemo Tero.
- dum la lasta jaro estis prilaborita precipe fako [kemio](/kemio)

## Karaktero
{: .sekcio}

- nivelo de gimnaziano aŭ ambicia laiko
- ne postulanta universitatan scion
- fokuso sur modeloj kaj teorioj helpantaj *kompreni* naturon
- flankenlasi praktikajn sciojn (realaj eksperimentoj ja ne eblas en retpaĝo...)
- flankenlasi tro formalajn sciojn (kalkulsistemoj, k.s. krom se ili necese subtenas la fokusan enhavon)
- klarigi prefere per interagaj grafikoj anstataŭ longaj tekstoj aŭ kalkuloj

<!--
## Serĉo pri 'ideala' aranĝo
- por *verkado*, aranĝo de interdependaj konceptoj kaj kompleteco... estas konvena la lernolibra aranĝo en fakoj kaj ĉapitroj
- sed *lernado* ideale similu vojaĝon tra pejzaĝo direktatan de scivolemo
- ekz-e estus bone elmontri la interkonekton de ĥemia ligo - bazaj elementoj de vivaĵoj - nutraĵocikloj
- nur tiel oni povas ricevi birdperspektivan komprenon kiel la sistemo Tero funkcias 
- ...kaj kial ĝi estas tia, kia ni konas ĝin: atmosfero ktp. kreita el fizikaj, ĥemiaj kaj biologiaj procezoj ktp
-->

## Teknikaj rimedoj
{: .sekcio}

- uzo de senpagaj Github-paĝoj
- enhavo estas retpaĝoj statike generitaj per Jekyll/Liquid
- baza teksto do estas en Viki-speca formato *markdown*
- tiel ne eblas servilaj programoj, do dinamika enhavo funkciu senescepte per Javoskripto
- avantaĝo estas, ke oni ne bezonas servilan administradon de datumbazoj, aktualigita softvaro, sekurecproblemoj... 
- krome eblas relative simple funkciigi la tuton loke.
- grafikoj farataj kiel vektorgrafikoj (SVG), movataj per Javoskripto
- specialaj JS-bibliotekoj por fakoj, ekz-e JsMol por 3-dimensia prezento de molekuloj, MathJax por matematikaj kaj kemiaj formuloj

<!--
- ideale antaŭpreparitaj JS-bibliotekoj reduktu la kodon en la enhavpaĝoj al alnotoj `{: ...}` kaj malmultaj kompreneblaj kodlinioj
-->
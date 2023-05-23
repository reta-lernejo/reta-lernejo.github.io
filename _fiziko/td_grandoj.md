---
layout: laborfolio
title: Grandoj termodinamikaj
chapter: 1
js:
  - folio-0c
  - sekcio-0b
  - mathjax/es5/tex-chtml
  - diagramo-0a 
  - f_gasstato-0a
  - f_pishto-0b
---

... paĝo en preparo ...

<!--

La paĝo prezentas modelon de piŝto kun ideala gaso por enkonduki bazajn grandojn de termodinamiko.
Unu grando estas tenata konstanta, dum oni aplikas premon/malpremon aŭ varmon/malvarmon. La tri aliaj grandoj montriĝas la ŝanĝojn laŭ la modelo de ideala gaso.

sistemo           izolita neizolita fermita nefermita          
konstanta grando: Q/S     T         V       p
/agoj/
premu             +p+T-V  +p-V-S    -       -
malpremu          -p-T+V  -p+V+S    -       -
varmigu           -       -         +T+V+S  +T+p+S
malvarmigu        -       -         -T-V-S  -T-p-S


FARENDA, plej bone sur aparta(j) paĝo(j):

1. klarigu rilaton inter premo, volumeno kaj laboro: dp -> dV -> W
   (altigo de premo ĉu per volumenŝanĝo/laboro, ĉu per aldono de gaso...?)
2. enkonduku temperaturon kaj varmenergion, Q -> dT -> dp -> ...
3. enkonduku entropion kiel analogon de (negativa) premo(?) en la rilato d(T*S) = Q
      koncentriĝo de energio/varmo = malalta entropio / alta temperaturo ... 
      koncentriĝo de materio estas malalta volumeno / alta premo  
4... eble: simile enkonduku ĥemian potencialon kaj kvanton?

==> Prezentu modelon de ideala gaso, en kiu unu grando povas esti fiksita (V,p,T)
    kaj alia ŝanĝita (V,T,...) kaj montriĝas la influo al la aliaj grandoj.
    (laŭ teorie, ĉiam du estas liberaj kaj du dependaj variabloj 
    ne konsiderante provizore ĥemian potencialon/reakciojn)
==> prezentu ĉiam ankaŭ la kondiĉojn de la ekstera medio (temperaturo, premo)
==> klarigu inversigeblajn kaj neinversigeblajn procezojn
==> klarigu nociojn fermita kaj izolita sistemo - eble per butonoj "fermu", "izolu"?

-->



<style>
    canvas {
        border: 2px solid cornflowerblue;
    }

    table {
        table-layout: fixed;
    }
    td:first-child {
        width: 60%;
    }
    td:nth-child(2),
    td:nth-child(3)
    {
        width: 20%;
        text-align: right
    }
</style>

<canvas id="pishto" width="300" height="300"></canvas>
konservu (x)varmon ()temperaturon ()premon ()volumenon
{: .elekto #konservo}

[premu] [malpremu] [varmigu] [malvarmigu]
{: .butonoj #ago}


<canvas id="pV_dgr" width="300" height="300"></canvas>
<canvas id="TS_dgr" width="300" height="300"></canvas>
p-V-diagramo kaj T-ΔS-diagramo

|  | ŝanĝo | entute |
| laboro W |<span id="dW"/> |<span id="W"/> |
| varminterŝanĝo Q |<span id="dQ"/>|<span id="Q"/> |
| interna energio U |<span id="dU"/>|<span id="U"/> |

<script>

const dT = 10; // paŝoj por varmigi/malvarmigi
const T_min = 200;
const T_max = 800;

const dp = 0.1e5; // paŝoj por premi/malpremi en Pa
const p_min = 0.01e5; // 1kPa t.e. centono de atm.
const p_max = 10e5; // 10-oblo de atm.

const V_min = 1e-3; // 1 l
const V_max = 5e-2; // 50 l

// nur por la diagram-akso, tio devus sufiĉi
const S_min = -29.99;
const S_max = 29.99;

const cpishto = document.getElementById("pishto");
const modelo = new Diagramo(cpishto);
const piŝto = new Piŝto(modelo,new GS());
piŝto.T_min = T_min;
piŝto.T_max = T_max;
piŝto.p_min = p_min;
piŝto.p_max = p_max;
piŝto.V_min = V_min;
piŝto.V_max = V_max;

const pV_dgr = document.getElementById("pV_dgr");
const TS_dgr = document.getElementById("TS_dgr");
const dpV = new Diagramo(pV_dgr);
const dTS = new Diagramo(TS_dgr);

//const intervalo = 50; // 100 = 100 ms
//let ripetoj;

butone((ago) => {
    console.log(ago);
    switch (ago) {
        case "ago_premu": piŝto.premu(dp); break;
        case "ago_malpremu": piŝto.premu(-dp); break;
        case "ago_varmigu": piŝto.varmigu(dT); break;
        case "ago_malvarmigu": piŝto.varmigu(-dT); break;
    }

    valoroj();
    diagramo_pentru();

    // evtl. adaptu butonojn
    buton_statoj(piŝto.konservata);
});

elekte((elekto,valoro) => {
    console.log(elekto+':'+valoro);
    // laŭ elektu ebligu certajn agojn, aliajn ne:
    piŝto.konservata = valoro;
    buton_statoj(valoro);
    piŝto.desegnu();
});

function buton_statoj(konservata) {
    const Tk = (konservata.startsWith("temp") || konservata.startsWith("varm"));
    // PLIBONIGU: lasta kondiĉoj (V) devus respekti ankoraŭ sekvan paŝon!
    ĝi("#ago_premu").disabled = !Tk || !piŝto.premu(dp,true); 
    ĝi("#ago_malpremu").disabled = !Tk || !piŝto.premu(-dp,true);
    ĝi("#ago_varmigu").disabled = Tk || !piŝto.varmigu(dT,true);
    ĝi("#ago_malvarmigu").disabled = Tk || !piŝto.varmigu(-dT,true);
}



// preparu kaj pentru komence ĉion
lanĉe(()=>{
    dgr_preparo();
    piŝto.desegnu();
    valoroj();
    buton_statoj(piŝto.konservata);
});

function dgr_preparo() {
    dpV.viŝu();
    dpV.skalo_y(0,p_max/1e5,1,2,0,"·10⁵Pa");
    dpV.skalo_x(0,V_max*1000,1,10,0,"dm³");

    dTS.viŝu();
    const _Tmin = Math.floor(T_min/101)*100;
    const _Tmax = Math.ceil(T_max/99)*100;
    dTS.skalo_y(_Tmin,_Tmax,10,100,0,"K");
    dTS.skalo_x(S_min,S_max,1,5,0,"J/K");

    diagramo_pentru();
}


function diagramo_pentru() {
    const koloro = piŝto.Tkoloro(piŝto.gaso.T);

    let k = dpV.koord_xy(piŝto.gaso.V*1000,piŝto.gaso.p/1e5);
    dpV.punkto(k.x,k.y,1,koloro);

    k = dTS.koord_xy(piŝto.gaso.S,piŝto.gaso.T);
    dTS.punkto(k.x,k.y,1,koloro);
}

function valoroj() {
    ĝi("#Q").innerHTML = nombro(piŝto.gaso.Q,3,"J");
    ĝi("#W").innerHTML = nombro(piŝto.gaso.W,3,"J");
    ĝi("#U").innerHTML = nombro(piŝto.gaso.U,3,"J");
    if (piŝto.gaso.lasta_stato) {
        ĝi("#dQ").innerHTML = nombro(piŝto.gaso.Q - piŝto.gaso.lasta_stato.Q,3,"J");
        ĝi("#dW").innerHTML = nombro(piŝto.gaso.W - piŝto.gaso.lasta_stato.W,3,"J");
        ĝi("#dU").innerHTML = nombro(piŝto.gaso.U - piŝto.gaso.lasta_stato.U,3,"J");
    }
}


</script>

En termodinamikaj aranĝoj nur kelkaj grandoj estas rekte mezureblaj: temperaturo *T*, premo *p*, volumeno *V*, maso *m*. Aliajn grandojn oni devas elkalkuli.

## premo, volumeno kaj meĥanika laboro
{: .sekcio}

Metinte gason en ujon, oni povas relative simple eltrovi ĝian volumenon. Krome oni povas mezuri la premon kiel diferencon al referenca premo, ekzemple al la aerpremo de la atmosfero, t.e. 
$$\pu{100 kPa}$$

Gaso kun premo pli alta aŭ pli malalta ol ekstera premo povas movi ekzemple piŝton kun certa areo de surfaco $$a$$ je streko $$s$$. La forto efikanta sur la piŝton tiam 
estas $$F = p \cdot a$$ kaj la volumenŝanĝo $$\Delta V = s \cdot a$$. El tio oni povas kalkuli la faritan meĥanikan laboron per $$W = F \cdot s = p \cdot \Delta V$$. 

Ĉar la interna premo adaptiĝas dum tiu movo al la ekstera, oni devas dividi la tutan strekon en multajn malgrandajn substrekojn kaj adicii la unuopaj valorojn (t.e. integrali).
Se oni desegnas la premon kaj la volumenon dum tiu movo en p-V-diagramon, la farita laboro egalas al la surfaco sub la kurbo. 

Inverse oni povas *apliki* laboron premante aŭ tirante ĉe la piŝto, por krei internan premon aŭ subpremon. La laboro kalkuliĝas same el la produko de premdiferenco kaj volumenŝanĝo, sed havos inversigitan signumon.

## etendaj kaj neetendaj grandoj
{: .sekcio}

Grandoj, kiuj grandiĝas propocio kun la grandeco de la sistemo oni nomas *etendaj* (aŭ fakece: *ekstensivaj*). La volumeno estas *etenda grando*:
se oni kunmetas du sistemojn kun volumeno $$V_1$$ kaj volumeno $$V_2$$ la volumeno de la kombinita sistemo estas la sumo $$V = V_1 + V_2$$.

La premo estas *neetenda* grando: se oni dividas sistemon, kiu havas certan premon egale en ĉiu loko, en du partojn, la du partaj sistemo havas la saman premon kiel la kuna. Tiajn grandojn ni nomas *neetendaj* (aŭ fakece: *intensivaj*).

## temperaturo, entropio kaj varmo
{: .sekcio}  

Oni cetere povas ŝanĝi la internan premon de gaso en la piŝtujo ankaŭ per ŝanĝo de temperaturo. Varmigante ĝin al pli alta temperaturo la premo altiĝas kaj malvarmigante ĝin la premo malaltiĝas.
Respektive, se oni lasas la gason libere etendiĝi aŭ maletendiĝo la premo adaptiĝas al la ekstera kaj anstataŭe la volumeno ŝanĝiĝas.

... mezuri temperaturon per termometro, varmon per kalorimetro ....

La varmenergion tiel en- aŭ elkundukitan je la sistemo oni povas, analoge al la laboro, prezenti kiel produkto de unu entenda kaj unu neetenda grandoj. La neetenda grando estas la temperaturo $$T$$. La etendan grandon oni bedaŭrinde tie ĉi ne povas mezuri sed nur elkalkuli. Oni nomas ĝin la entropio $$S$$.

... analoge kiel la volumeno indikas kiom distribuita (koncentrita aŭ malkoncentrita en iu spaco) estas materio, la entropio indikas,
kiom distribuita estas la energio (varmo) en iu sistemo. Sed entropio havas pli ol la tri dimensiojn de la spaco: ĝi estas
determinita de la enerergiporcietoj en ĉiu el la multaj eblecoj kiel la eroj de materio povas moviĝi. Oni nomas tion la gradoj de libereco:
Ekzemple molekulo el tri atomoj povas moviĝi en la tri dimensioj de la spaco, krome ĝi povas turniĝi laŭ pluraj rotaciaj aksoj, la interatomaj ligoj povas svingiĝi, la elektronoj povas okupi diversajn orbitalojn de la atomo, en ĉiu tiu grado de libereco enteniĝas certa kvanto de energio. 
La interna energio estas la sumo el ĉiuj kaj la entropio donas mezuron kiom egale distribuita la energio estas en ĉiuj gradoj de libereco.

## stataj kaj procezaj grandoj
{: .sekcio}

La grandoj premo, volumeno, temperaturo kaj entropio estas nomataj *stataj grandoj*, ĉar ili priskribas staton de termodinamika sistemo, sendepende laŭ kiu vojo tiu stato atingiĝis. 

La grandoj laboro kaj varmo estas *procezaj grandoj* ili dependas de la konkreta procezo, la vojo laŭ kiu iu ŝanĝo efektiviĝis. 

Ekzemple oni povas transiri de unu stato al alia laŭ iu kombino de temperatur-, prem, -volumen, varmkonservaj ŝanĝoj. Kiam oni atingis iun staton
priskribita de la stataj grandoj oni ne povas dedukti, laŭ kiuspecaj ŝanĝoj ĝi estis atingita. Tamen la grandaj laboro kaj varmo povas
akiri tre diversajn valorojn laŭ la trairitaj procezoj.

## taskoj
{: .sekcio}

1. Provu trovi kombinon de tri procezoj, kies kurboj en la  T-S-diagramo similas al velo (resp. la cifero 4)

2. Provu trovi kombinon de tri procezoj, kies kurboj en la p-V-diagramo similas al la spegulbildo de tiu en (1)

3. Provu trovi ciklon el kvar procezoj, kies kurboj en la T-S-diagramo similas al rektangula tuko glate kuŝanta sur la planko kaj
   en la p-V-diagramo al forfluganta tuko.

4. Provu minimumigi la entropion (sub -25 J/K) nur per premo kaj malpremo. Provu la saman nur per varmigo kaj malvarmigo.

5. De kiuj el l grandoj T, V, p kaj S dependas la interna energio de la (ideala) gaso?

6. Kiel rilatas la ŝanĝoj de interna energio ΔU al laboro ΔW kaj varminterŝanĝo ΔQ?

7. Provu trovi ciklon, kiu maksimumigas la laboron ricevitan (t.e. negativa) el la sistemo per alkonduko de varmo. 
   (Eblas ankaŭ apliki laboron aŭ elkonduki varmon dum la ciklo, sed la diferenca laboro gajnita estu plej eble granda kaj la diferenca alkondukata varmo plej eble malgranda)

<!--
5. Provu trovi ciklon, kiu gajnas varmon per apliko de laboro....

6. Provu trovi ciklon, kiu malvarmigas la gason per apliko de laboro....

-->

## fontoj
{: .fontoj}


---
layout: laborfolio
title: Grandoj termodinamikaj
chapter: 1
js:
  - folio-0c
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - diagramo-0a 
  - f_pishto-0a
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
</style>

<canvas id="karnot" width="300" height="300"></canvas>
konservu (x)varmon ()temperaturon ()premon ()volumenon
{: .elekto #konservo}

[premu] [malpremu] [varmigu] [malvarmigu]
{: .butonoj #ago}


<canvas id="pV_dgr" width="300" height="300"></canvas>
<canvas id="TS_dgr" width="300" height="300"></canvas>
p-V-diagramo kaj T-ΔS-diagramo

| konsumita laboro W |<span id="laboro"/> |
| varminterŝanĝo Q |<span id="varmo"/> |
| interna energiŝanĝo ΔU |<span id="energio"/> |

<script>

const T1 = 293.15;
let T2 = T1 + 300; // +30 .. +300

const p_max = 2.5e6;
const V_max = 2.5e-2;
const S_max = 10.5;

const karnot = document.getElementById("karnot");
const modelo = new Diagramo(karnot);

pV_dgr = document.getElementById("pV_dgr");
TS_dgr = document.getElementById("TS_dgr");
dpV = new Diagramo(pV_dgr);
dTS = new Diagramo(TS_dgr);

let piŝto = new Piŝto(modelo);


const intervalo = 50; // 100 = 100 ms
let ripetoj;

age((ago) => {
    console.log(ago);
    switch (ago) {
        case "ago_premu": break;
        case "ago_malpremu": break;
        case "varmigu": break;
        case "ago_malvarmigu": break;
    }
});

elekte((elekto,valoro) => {
    console.log(elekto+':'+valoro);
    // laŭ elektu ebligu certajn agojn, aliajn ne:
    const Tk = (valoro.startsWith("temp") || valoro.startsWith("varm"));
    ĝi("#ago_premu").disabled = !Tk;
    ĝi("#ago_malpremu").disabled = !Tk;
    ĝi("#ago_varmigu").disabled = Tk;
    ĝi("#ago_malvarmigu").disabled = Tk;
   
    //aktualigo();
});

function aktualigo() {
    piŝto.izolita = ! ĝi('#e_temperaturo_0').checked;
    const T = parseInt(ĝi('#i_temperaturo').value);
    piŝto.medio_temperaturo = T;
    piŝto.desegnu();
}

function aktualigo_info(grando) {
    let value;
    switch (grando) {
    case "volumeno":
        value = ĝi('#i_volumeno').value;
        ĝi('#v_volumeno').textContent = value;
        break;
    case "temperaturo":
        value = ĝi('#i_temperaturo').value;
        ĝi('#v_temperaturo').textContent = value;
        break;
    case "premo":
        value = ĝi('#i_premo').value;
        ĝi('#v_premo').textContent = value;
        break;                
    }
}

// pentru sen jam movi...
dgr_preparo();
piŝto.desegnu();


function dgr_preparo() {
    dpV.viŝu();
    dpV.skalo_y(0,p_max/1e5,1,5,0,"·10⁵Pa");
    dpV.skalo_x(0,V_max*1000,1,10,0,"dm³");

    dTS.viŝu();
    const T_min = Math.floor(T1/100)*100;
    const T_max = Math.ceil(T2/100)*100;
    dTS.skalo_y(0 /*T_min*/,T_max,10,50,0,"K");
    dTS.skalo_x(-1,S_max,1,1,0,"J/K");

    diagramo_paŝo();
}

/*
    const T = kciklo.gaso.temperaturo;
    const V = kciklo.gaso.volumeno;

    const h = karnot.height;
    const sk = 7; // skalfaktoro por y-koordinatoj

    // alteco de piŝto super la fundo (ĉe 360px)
    const py = h-40 - 1000*V*sk; // 1000l = 1m³, ni sk-obligas tiel, ke
        // 1mol ĉe 20°C = 24l = sk*24 px
    const y12 = h-40 - 1000*kciklo.V12*sk;
    const y34 = h-40 - 1000*kciklo.V12*sk;

    // if (py>h-50) debugger;


    function medio() {
        // medio

        // varma  kaj malvarma provizoj
        modelo.rektangulo(0,0,80,h,Tkoloro(T2));
        modelo.rektangulo(220,0,300,h,Tkoloro(T1));

        modelo.teksto_x(40,100,T2+" K");
        modelo.teksto_x(260,100,T1+" K","white");

        // medio-koloro laŭ temperaturo...
        // PLIBONIGU: pli bone kciklo havu funkcion por redoni la staton!
        let koloro = "#777";
        if (kciklo.medio() == "malvarma") {
            koloro = Tkoloro(T1);
        } else if (kciklo.medio() == "varma") {
            koloro = Tkoloro(T2);
        }
        // desegnu la medion
        modelo.rektangulo(80,0,140,h,koloro);
        // desegnu vandojn de la medio
        if (kciklo.medio() != "varma") {
            modelo.linio(80,0,80,h);
        } 
        if (kciklo.medio() != "malvarma") {
            modelo.linio(220,0,220,h);
        }
        //modelo.linio(220,20,220,h);
    }
*/

function diagramo_pentru() {
    /*
    const koloro = Tkoloro(kciklo.gaso.temperaturo);

    let k = dpV.koord_xy(kciklo.gaso.volumeno*1000,kciklo.gaso.premo()/1e5);
    dpV.punkto(k.x,k.y,1,koloro);

    k = dTS.koord_xy(kciklo.entropio(),kciklo.gaso.temperaturo);
    dTS.punkto(k.x,k.y,1,koloro);
    */
}

function diagramo_paŝo(paŝo) {
    // ioma adapto de koordinatoj ĉe la randoj
    function ka(k) {
        if (k<50) return k+12;
        if (k>250) return k-6;
        return k-4;
    }
/*
    const nro = kciklo.paŝnro(paŝo)+1;
    const koloro = Tkoloro(kciklo.gaso.temperaturo);

    let k = dpV.koord_xy(kciklo.gaso.volumeno*1000,kciklo.gaso.premo()/1e5);
    dpV.punkto(k.x,k.y,3,koloro);
    dpV.teksto_x(ka(k.x),ka(k.y),nro,koloro);

    k = dTS.koord_xy(kciklo.entropio(),kciklo.gaso.temperaturo);
    dTS.punkto(k.x,k.y,3,koloro);
    dTS.teksto_x(ka(k.x),ka(k.y),nro,koloro);
    */
}

function valoroj() {
    /*
    ĝi("#laboro").innerHTML = nombro(kciklo.suma_laboro(),3,"J");
    ĝi("#varmo").innerHTML = nombro(kciklo.suma_varmo(),3,"J");
    ĝi("#energio").innerHTML = nombro(kciklo.energiŝanĝo(),3,"J");
    */
}

function paŝu() {
    /*
    kciklo.iteracio();
    modelo_pentru();
    diagramo_pentru();
    valoroj();
    */
}


function eksperimento(inversa) {
    /*
    // eventuale haltigu antaŭan
    if (ripetoj) clearTimeout(ripetoj.p);

    // se direkto ŝanĝita, kreu novan procezon 
    if (inversa != kciklo.inversa) {
        kciklo = kreu_ciklon(inversa);
        dgr_preparo();
    }

    // cikligu
    ripetoj = ripetu(
        () => {
            paŝu();
            return true; // ni ne haltos antaŭ butonpremo [Haltu]...(idealgaso.T < d_larĝo);
        },
        intervalo
    )
    */
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

Grandoj, kiuj grandiĝas propocio kun la grandeco de la sistemo oni nomas *etendaj* (aŭ fakece: *ekstensivaj*). La volumeno estas *etenda grando*:
se oni kunmetas du sistemojn kun volumeno $$V_1$$ kaj volumeno $$V_2$$ la volumeno de la kombinita sistemo estas la sumo $$V = V_1 + V_2$$.

La premo estas *neetenda* grando: se oni dividas sistemon, kiu havas certan premon egale en ĉiu loko, en du partojn, la du partaj sistemo havas la saman premon kiel la kuna. Tiajn grandojn ni nomas *neetendaj* (aŭ fakece: *intensivaj*).

## temperaturo, entropio kaj varmo
{: .sekcio}  

Oni cetere povas ŝanĝi la internan premon de gaso en la piŝtujo ankaŭ per ŝanĝo de temperaturo. Varmigante ĝin al pli alta temperaturo la premo altiĝas kaj malvarmigante ĝin la premo malaltiĝas.
Respektive, se oni lasas la gason libere etendiĝi aŭ maletendiĝo la premo adaptiĝas al la ekstera kaj anstataŭe la volumeno ŝanĝiĝas.

... mezuri temperaturon per termometro, varmon per kalorimetro ....

La varmenergion tiel en- aŭ elkundukitan je la sistemo oni povas analoge al la laboro prezenti kiel produkto de unu entenda kaj unu neetenda grandoj. La neetenda grando estas la temperaturo $$T$$. La etendan grandon oni bedaŭrinde tie ĉi ne povas mezuri sed nur elkalkuli. Oni nomas ĝin la entropio $$S$$.

... analoge kiel la volumeno indikas kiom distribuita (koncentrita aŭ malkoncentrita en iu spaco) estas materio, la entropio indikas,
kiom distribuita estas la energio (varmo) en iu sistemo. Sed entropio havas pli ol la tri dimensiojn de la spaco: ĝi estas
determinita de la enerergiporcietoj en ĉiu el la multaj eblecoj kiel la eroj de materio povas moviĝi. Oni nomas tion la gradoj de libereco:
Ekzemple molekulo el tri atomoj povas moviĝi en la tri dimensioj de la spaco, krome ĝi povas turniĝi laŭ pluraj rotaciaj aksoj, la interatomaj ligoj povas svingiĝi, la elektronoj povas okupi diversajn orbitalojn de la atomo, en ĉiu tiu grado de libereco enteniĝas certa kvanto de energio. 
La interna energio estas la sumo el ĉiuj kaj la entropio donas mezuron kiom egale distribuita la energio estas en ĉiuj gradoj de libereco.


## fontoj
{: .fontoj}


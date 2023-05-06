---
layout: laborfolio
title: Grandoj termodinamikaj
chapter: 1
js:
  - folio-0b
  - sekcio-0b  
  - mathjax/es5/tex-chtml
  - diagramo-0a 
  - f_termodinamiko-0a
---

<!--


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

<button id="starto_motoro">Motoro</button>
<button id="starto_pumpilo">Varmpumpilo</button>
<button id="halto" disabled>Haltu</button>
ΔT: <b id="temperaturo_info">300K</b>
<input type="range" id="temperaturo" style="width: 50em; max-width: 60%" min="30" max="600" value="300" step="10" onchange="aktualigo()" oninput="aktualigo_info()">


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

let kciklo = kreu_ciklon();


const intervalo = 50; // 100 = 100 ms
let ripetoj;

ĝi('#temperaturo').value = 300;
ĝi("#halto").disabled = true;

kiam_klako("#starto_motoro",() => {
    eksperimento(false);
    ĝi("#halto").disabled = false;
    Sekcio.malfermu("motoro",true);
});

kiam_klako("#starto_pumpilo",() => {
    eksperimento(true);
    ĝi("#halto").disabled = false;
    Sekcio.malfermu("pumpilo",true);
});

kiam_klako("#halto",() => {
    if (ripetoj) clearTimeout(ripetoj.p);
});

function aktualigo() {
    T2 = T1 + parseInt(ĝi('#temperaturo').value);
    // post T-agordo laŭbezone rekreu la modelon
    if (kciklo.T_alta != T2) {
        inversa = kciklo.inversa;
        // rekreu
        kciklo = kreu_ciklon(inversa);
        dgr_preparo();
        modelo_pentru();
    }
}

function aktualigo_info() {
    const temp = ĝi('#temperaturo').value;
    ĝi('#temperaturo_info').textContent = temp + 'K';
}

// pentru sen jam movi...
modelo_pentru();
dgr_preparo();

function kreu_ciklon(inversa) {
    const kc = new KCiklo(T1,T2,inversa);
    kc.kiam_sekva = function(de,al) {
        // nova ciklo 
        if (de == "Qk_V+" && al == "Tk_V-" // motora ciklo
         || de == "Tk_V+" && al == "Qk_V-" // varmpumpa ciklo
         ) {
            // viŝu la diagramojn antaŭ venonta ciklo
            dgr_preparo();
            // rekomencu kalkuli Q kaj W
            kciklo.W = 0; kciklo.Q = 0;
        }
        // skribu numeron de la paŝo en la diagramojn
        diagramo_paŝo(al);
    }
    return kc;
}

// donas koloron al temperatur-valoroj inter T1 kaj T2;
function Tkoloro(T) {
    const h = Diagramo.kolorvaloro(T,T1*0.99,T2*1.01);
    return Diagramo.hsl2hex(h,90,45);
}

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

/**
 * Pentras la piŝton kaj medion de la Karnot-modelo
 */
function modelo_pentru() {
    modelo.viŝu(); // ĉu necesas ĉiufoje?

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

    function gasujo() {
        // ciklo-ŝaltilo
        function nazo_md(alto) {
            modelo.linio(100,alto,104,alto);
            modelo.linio(100,alto+4,104,alto);
        }
        function nazo_d(alto) {
            modelo.linio(200,alto-4,196,alto);
            modelo.linio(200,alto,196,alto);
        }

        // gasujo
        const koloro = Tkoloro(T);
        modelo.rektangulo(100,0,100,h-40,"#fff");
        modelo.rektangulo(100,py,100,h-40-py,koloro);
        modelo.linio(100,0,100,h-40);
        modelo.linio(100,h-40,200,h-40);
        modelo.linio(200,0,200,h-40);

        // altec-markoj por avanci en la ciklo al varmkonserva paŝo, t.e. medioŝanĝo al izola
        nazo_d(y12);
        nazo_md(y34);
    }

    function piŝto() {
        //modelo.linio(101,200,199,200,"#bbb",10);
        modelo.rektangulo_h3k(101,py-10,98,10,"#eee","#bbb","#999");
        modelo.rektangulo_h3k(120,py-10-80,60,80,"#eee","#bbb","#999");
    }

    medio();
    gasujo();
    piŝto()
}

function diagramo_pentru() {
    const koloro = Tkoloro(kciklo.gaso.temperaturo);

    let k = dpV.koord_xy(kciklo.gaso.volumeno*1000,kciklo.gaso.premo()/1e5);
    dpV.punkto(k.x,k.y,1,koloro);

    k = dTS.koord_xy(kciklo.entropio(),kciklo.gaso.temperaturo);
    dTS.punkto(k.x,k.y,1,koloro);
}

function diagramo_paŝo(paŝo) {
    // ioma adapto de koordinatoj ĉe la randoj
    function ka(k) {
        if (k<50) return k+12;
        if (k>250) return k-6;
        return k-4;
    }

    const nro = kciklo.paŝnro(paŝo)+1;
    const koloro = Tkoloro(kciklo.gaso.temperaturo);

    let k = dpV.koord_xy(kciklo.gaso.volumeno*1000,kciklo.gaso.premo()/1e5);
    dpV.punkto(k.x,k.y,3,koloro);
    dpV.teksto_x(ka(k.x),ka(k.y),nro,koloro);

    k = dTS.koord_xy(kciklo.entropio(),kciklo.gaso.temperaturo);
    dTS.punkto(k.x,k.y,3,koloro);
    dTS.teksto_x(ka(k.x),ka(k.y),nro,koloro);
}

function valoroj() {
    ĝi("#laboro").innerHTML = nombro(kciklo.suma_laboro(),3,"J");
    ĝi("#varmo").innerHTML = nombro(kciklo.suma_varmo(),3,"J");
    ĝi("#energio").innerHTML = nombro(kciklo.energiŝanĝo(),3,"J");
}

function paŝu() {
    kciklo.iteracio();
    modelo_pentru();
    diagramo_pentru();
    valoroj();
}


function eksperimento(inversa) {
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

## temperaturo, entropio kaj varmo
{: .sekcio}  

Oni cetere povas ŝanĝi la internan premon de gaso en la piŝtujo ankaŭ per ŝanĝo de temperaturo. Varmigante ĝin al pli alta temperaturo la premo altiĝas kaj malvarmigante ĝin la premo malaltiĝas.
Respektive, se oni lasas la gason libere etendiĝi aŭ maletendiĝo la premo adaptiĝas al la ekstera kaj anstataŭe la volumeno ŝanĝiĝas.

... mezuri temperaturon per termometro, varmon per kalorimetro ....


## fontoj
{: .fontoj}


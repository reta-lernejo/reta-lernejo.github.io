---
layout: laborfolio
title: Karnot-ciklo
chapter: 4
js:
  - folio-0b
  - sekcio-0b  
  - mathjax/es5/tex-chtml
  - diagramo-0a 
  - f_karnotciklo-0a
---

... paĝo en preparo ...

<!--
https://de.wikipedia.org/wiki/Carnot-Prozess

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

| laboro W |<span id="laboro"/> |
| varmŝanĝo Q |<span id="varmo"/> |
| interna energio U |<span id="energio_i"/> |

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
        preparo();
        modelo_pentru();
    }
}

function aktualigo_info() {
    const temp = ĝi('#temperaturo').value;
    ĝi('#temperaturo_info').textContent = temp + 'K';
}

// pentru sen jam movi...
modelo_pentru();
preparo();

function kreu_ciklon(inversa) {
    const kc = new KCiklo(T1,T2,inversa);
    kc.kiam_sekva = function(de,al) {
        // nova ciklo 
        if (de == "Qk_V+" && al == "Tk_V-" // motora ciklo
         || de == "Tk_V+" && al == "Qk_V-" // varmpumpa ciklo
         ) {
            // viŝu la diagramojn antaŭ venonta ciklo
            preparo();
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

function preparo() {
    dpV.viŝu();
    dpV.skalo_y(0,p_max/1e5,1,5,0,"·10⁵Pa");
    dpV.skalo_x(0,V_max*1000,1,10,0,"dm³");

    dTS.viŝu();
    const T_min = Math.floor(T1/100)*100;
    const T_max = Math.ceil(T2/100)*100;
    dTS.skalo_y(T_min,T_max,10,50,0,"K");
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

    // kreu novan procezon 
    kciklo = kreu_ciklon(inversa);
    preparo();

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

## funkcio kiel motoro
{: .sekcio #motoro}

### paŝo 1 - temperaturkonserva (izoterma) kunpremiĝo

Dum la temperaturo estas teanata konstante malalta la gaso kunpremiĝas per ekstera premo, 
t.e. laboro, aplikata al la gaso. La varmo estiĝanta en la gaso per kunpremiĝo estas 
transdonata al la ekstera malvarma medio. Pro la konstanta temperaturo
la produkto $$pV$$ restas konstanta, do pro la malgrandiĝanta volumeno la premo kreskas.

Ĉar temas pri ideala gaso, konstanta temperaturo signifas konstanta interna energio $$dU = 0$$. 
Konsekvence la tuta farita laboro (la surfaco sub la kurbo 1-2 en la p-V-diagramo) transformiĝos 
al varmo akceptata de la malvarma medio, egala al la surfaco  sub la kurbo 1-2 en la T-S-diagramo.[^W1]

### paŝo 2 - varmkonserva (adiabata) kunpremiĝo

La piŝtujo estas varmizolita dum la piŝto plu kunpremas la gason, kies temperaturo pro tio altiĝas. 
Pro la izolo da tuta farita laboro (la surfaco sub la kurbo 2-3 en la p-V-diagramo) altigas 
la internan energion de la gaso.

### paŝo 3 - temperaturkonserva (izoterma) etendiĝo

Ĉe temperaturo tenata konstante alta, la gaso etendiĝas pro interna premo. Pro la konstanta temperaturo 
la interna energio same restas konstanta kaj la tuta farita laboro (la surfaco sub la kurbo 3-4 
en la p-V-diagramo) estas egala al la varmo (la surfaco sub la kurbo 3-4 en la T-S-diagramo) 
transdonita de la alttemperatura ekstera medio al la gaso en la piŝtujo.

Pro la konstanta temperaturo ankaŭ la produko $$pV$$ restas konstanta. Konsekvence la premo malaltiĝas inverse proporcie al la kreskanta volumeno.

### paŝo 4 - varmkonserva (adiabata) etendiĝo

La piŝtujo estas varmizolita la gaso plu etendiĝas, kies temperaturo kaj premo pro tio malaltiĝas. 
Pro la izolo, la laboro farita de la gaso sammezure malaltigas la internan energion.


## funkcio kiel varmpumpilo
{: .sekcio #pumpilo}


### paŝo 1 - varmkonserva (adiabata) kunpremiĝo

La piŝtujo estas varmizolita dum la piŝto kunpremas la gason, kies temperaturo pro tio altiĝas. 
Pro la izolo da tuta farita laboro (la surfaco sub la kurbo 1-2 en la p-V-diagramo) altigas la 
internan energion de la gaso.

### paŝo 2 - temperaturkonserva (izoterma) kunpremiĝo

Dum la temperaturo estas teanata konstante alta la gaso kunpremiĝas per ekstera premo, 
t.e. laboro, aplikata al la gaso. La varmo estiĝanta en la gaso per kunpremiĝo estas 
transdonata al la ekstera varma medio. Tiel la temperaturo restas konstanta kaj
ankaŭ la produkto $$pV$$ restas konstanta, do pro la malgrandiĝanta volumeno la premo kreskas.

Ĉar temas pri ideala gaso, konstanta temperaturo signifas konstanta interna energio $$dU = 0$$. 
Konsekvence la tuta farita laboro (la surfaco sub la kurbo 2-3 en la p-V-diagramo) transformiĝos 
al varmo akceptata de la ekstera medio, egala al la surfaco sub la kurbo 2-3 en la T-S-diagramo.


### paŝo 3 - varmkonserva (adiabata) etendiĝo

La piŝtujo estas varmizolita la gaso nun etendiĝas dum ĝia temperaturo kaj premo malaltiĝas. 
Pro la izolo la gaso sammezure malaltigas la internan energion.

### paŝo 4 - temperaturkonserva (izoterma) etendiĝo

Ĉe temperaturo tenata konstanta, la gaso etendiĝas pro interna premo. 
La gaso ne povas malvarmiĝi sub la eksteran temperaturon, ĉar la medio
donas al ĝi tiom da varmo, ke la interna temperaturo egalas al la ekstera. 
Pro la konstanta temperaturo la interna energio same restas konstanta kaj 
la tuta farita laboro (la surfaco sub la kurbo 4-1 en la p-V-diagramo) estas
egala al la enprenata varmo (la surfaco sub la kurbo 4-1 en la T-S-diagramo).

Pro la konstanta temperaturo ankaŭ la produko $$pV$$ restas konstanta. 
Konsekvence la premo malaltiĝas inverse proporcie al la kreskanta volumeno
ĝis ĝi egalas al la ekstera premo.

## fontoj
{: .fontoj}

[^W1]: [Vikipedio: Ciklo de Carnot](https://eo.wikipedia.org/wiki/Ciklo_de_Carnot)
[^L1]: [LibreTexts: Carnot Cycle](https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Thermodynamics/Thermodynamic_Cycles/Carnot_Cycle)


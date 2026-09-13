---
layout: laborfolio
title: Forcejefiko
js:
  - folio-0c
  - kanvas-0a
  - f_gaso-0a
---

<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
</style>

## forcejefikaj gasoj en la atmosfero


- co2 ktp en ppm?
- kiom absolute en tuta atm?

fontoj:
<!-- konciza klarigo -->
- http://rabett.blogspot.com/2010/03/simplest-explanation.html

<!-- detala klarigo pri spektroj ktp. en pluraj ĉapitroj -->
- https://seos-project.eu/earthspectra/earthspectra-c03-p06.html

- https://en.wikipedia.org/wiki/Greenhouse_gas
- https://www.umweltbundesamt.de/daten/umweltzustand-trends/klima/atmosphaerische-treibhausgas-konzentrationen#lachgas
- https://www.ds.mpg.de/139645/08
- https://www.uni-flensburg.de/fileadmin/content/institute/biologie/arbeitsgruppe-christian/dokumente/projekte/der-norden-taucht-ab/03-klimawirksame-gase-und-der-treibhauseffekt-ursachen.pdf


## Etaj antenoj varmigas la atmosferon

En la aero ŝvebas XXX da etaj antenoj, kiuj aŭskultas ĉe rezonanca frekvenco estas ka ondolongo de `15 \mu m` (Hz?).
Per tiu frekvenco ĝi kaptas lumon de `15 \mu m`, tio estas ne videbla lumo, transruĝa, varmoradiado.

Tiuj antenoj konsistas nur el tri atomoj: unu karbonatomo kaj du oksigenatomo. Kiam ili kaptas lumeron je la frekvenco
de XXX, ili absorbas ĝin kaj komencas forte vibri: la meza karbonatomo moviĝas for de la akso, la tuta molekulo kurbiĝas kiel 
pafarko kaj svingas tien, reen. La elektronoj estas pli forte ligitaj al la oksigenatomoj kaj tiel per la vibrado la
pozitiva ŝargo de la centra karbonatomo kaj la negativa ŝargo de la ekstremoj estas en movado. La atomo formas dipolon.

Ĉar la karbondioksid-molekuloj estas ĉirkaŭataj de multaj aliaj aer-molekuloj: oksigenparoj, nitrogenparoj, argono, ĝi
svingiĝante puŝas ilin kaj la tuta ĉirkaŭaĵo pli forte moviĝas. Tian ĥaosan moviĝadon ni tradukas kiel temperaturo, varmo.

Ĉiujare ni produktas pli, proksimume 4000 Gigatunojn, da tiaj dipolantenoj, proksimume 4000 Gigatunojn, 
kaptantaj transruĝajn lumerojn kaj transformante tiujn en aermovojn, varmigante la atmosferon.

Sciante la la molan mason de karbono je 12g kaj de oksigeno je 28g, kaj la 
[konstanton de Avogadro](/relo-kemio/kemio/r_unuoj_grandoj), ĉu vi povas elkalkuli,
kiom da tiaj triatomaj etaj antenoj estas ellasitaj en la atmosferon ĉiujare?

<canvas id="antenoj" width="300" height="300"></canvas>

<button id="astarto">Komencu</button>
<button id="ahalto">Haltu</button>

<script>

const canvas1 = document.getElementById("antenoj");
const ctx1 = canvas1.getContext("2d");

// Por redoni ekzaktajn procentaĵojn necesus almenaŭ 2500 molekuloj
// 1 CO2, 23 Ar, 524 O2, 1952 N2
// sed tiam aŭ la atomoj aŭ la distancoj aperos tro malgrandaj
// avĝ. molekuldistanco estas proks. la 11oblo de la molekulgrandeco
// t.e. 33 °A vs. 3,3 °A
const n_CO2 = 1; // 0,04%
const n_Ar = 2; // 1%
const n_O2 = 30; // 21%
const n_N2 = 150; // 78%


// ni dividas atomradiuson
// kaj distancojn je 20 por pentri ilin
SKALO=20

aero = new Gasujo(canvas1.width,canvas1.height,5,5);

class CO2 extends Gasero {

    ekscitu(e=true) {
        this.ekscitita = e;
    }
    /**
     * desegnas CO2-molekulon ĉe pozicio p kun angulo a
     */
    pentru() {
        const p = this.pozicio();
        const p1 = ŝovo(p,{x: 0, y: -116/SKALO});
        const p2 = ŝovo(p,{x: 0, y: +116/SKALO});

        punkto(ctx1,rotacio(p1,this.a,p),66/SKALO,"red"); // O, Ar = 66pm
        punkto(ctx1,rotacio(p2,this.a,p),66/SKALO,"red"); // distanco C=O: 116pm
        punkto(ctx1,p,77/SKALO,"black"); // C, Ar = 77pm

        if (this.ekscitita) {
            // la kurbiĝa svingado havas frekvencon de 20 THz
            // en nia virtuala tempo je 10^-11 sekundo je vidata sekundo
            // t.e. 20 * 100 periodoj je vs, do ankoraŭ ne perceptebla
            // ni do prezentos la molekulon ŝmirate
            const AMPLIT = 66+Math.random()*10;
            const p1a = ŝovo(p1,{x: -AMPLIT/SKALO, y: 0});
            const p1b = ŝovo(p1,{x: +AMPLIT/SKALO, y: 0});
            punkto(ctx1,rotacio(p1a,this.a,p),66/SKALO,"#faa");
            punkto(ctx1,rotacio(p1b,this.a,p),66/SKALO,"#faa");
            const p2a = ŝovo(p2,{x: -AMPLIT/SKALO, y: 0});
            const p2b = ŝovo(p2,{x: +AMPLIT/SKALO, y: 0});
            punkto(ctx1,rotacio(p2a,this.a,p),66/SKALO,"#faa");
            punkto(ctx1,rotacio(p2b,this.a,p),66/SKALO,"#faa");
            const pa = ŝovo(p,{x: -1.5*AMPLIT/SKALO, y: 0});
            const pb = ŝovo(p,{x: +1.5*AMPLIT/SKALO, y: 0});
            punkto(ctx1,pa,77/SKALO,"#aaa"); // C, Ar = 77pm
            punkto(ctx1,pb,77/SKALO,"#aaa"); // C, Ar = 77pm
        }
    }
}

class O2 extends Gasero {
    /**
     * desegnas O2-molekulon ĉe pozicio p kun angulo a
     */
    pentru() {
        const p = this.pozicio();
        const p1 = ŝovo(p,{x: 0, y: -121/2/SKALO});
        const p2 = ŝovo(p,{x: 0, y: +121/2/SKALO});
        const kv = Math.floor(Math.random()*8);
        const koloro = `#f${kv}${kv}`;
        punkto(ctx1,rotacio(p1,this.a,p),66/SKALO,koloro);
        punkto(ctx1,rotacio(p2,this.a,p),66/SKALO,koloro);
    }
}

class Ar extends Gasero {
    /**
     * Pentras Argonatomon
     */
    pentru() {
        punkto(ctx1,this.pozicio(),106/SKALO,"#080");
    }
}

class N2 extends Gasero {
    /**
     * Pentras N2-molekulon
     */
    pentru() {
        const p = this.pozicio();

        const p1 = ŝovo(p,{x: 0, y: -109/2/SKALO});
        const p2 = ŝovo(p,{x: 0, y: +109/2/SKALO});
        const kv = Math.floor(Math.random()*8);
        const koloro = `#${kv}${kv}f`;
        punkto(ctx1,rotacio(p1,this.a,p),70/SKALO,koloro);
        punkto(ctx1,rotacio(p2,this.a,p),70/SKALO,koloro);
    }
}

class Fotono extends Gasero {
    constructor(id, pozicio, width, height, rapido, koloro) {
        super(id,pozicio,0,rapido,0);
        this.koloro = koloro;
        this.height = height;
        this.width = width;
    }
    
    pentru() {
        const x=this.x, y= this.y;
        const width = this.width, height = this.height;


        function kresto(radius,offset,a1,a2) {
            ctx1.beginPath();
            ctx1.arc(x, y + radius + offset, radius, -a1*Math.PI, -a2*Math.PI);
            ctx1.stroke();
        }

        //ctx, x, y, width, height) {
        ctx1.beginPath();
        
        // pinto
        ctx1.moveTo(x, y);
        
        // maldekstra flanko
        ctx1.bezierCurveTo(
            x - width, y + width/3, // kontrolpunkto 1 supra volbo
            x, y + height/3,        // kontrolpunkto 2 malsupra malvastiĝo
            x, y + height           // malsupra pinto
        );

        // dekstra flanko
        ctx1.bezierCurveTo(
            x, y + height/3,        // kontrolpunkto 1 malsupra malvastiĝo
            x + width, y + width/3, // kontrolpunkto 2 supra volbo
            x, y                    // malsupra pinto
        );

        ctx1.closePath();
        ctx1.filter = "blur(3px)";
        ctx1.fillStyle = this.koloro; //"rgb(255 40 40 / 80%)";
        ctx1.fill();

        ctx1.strokeStyle = this.koloro; //"rgb(255 40 40 / 80%)";

        kresto(4*height,10,0.6,0.4);
        kresto(3*height,40,0.58,0.42);
        kresto(2*height,70,0.55,0.45);
//        ctx1.beginPath();
//        ctx1.arc(x, y + 2*height + 10, 2*height, -0.7*Math.PI, -0.3*Math.PI);
//        ctx1.stroke();
//        ctx1.beginPath();
//        ctx1.arc(x, y + height + 5 + height/8, height - height/3, -0.7*Math.PI, -0.3*Math.PI);
//        ctx1.stroke();
//        ctx1.beginPath();
//        ctx1.arc(x, y + height + 5 + height/6, height - height/1.5, -0.6*Math.PI, -0.4*Math.PI);
//        ctx1.stroke();

        ctx1.filter = "none";

    }
}

function kreu_aeron() {

    for (i=0; i < n_N2; i++) {
        const x = Math.random() * (canvas1.width-30) + 15;
        const y = Math.random() * (canvas1.height-30) + 15;
        const a = Math.random() * 360;
        const z = Math.random()*8;
        aero.aldonu(new N2(`N2_${i}`,{x,y,z,a},(109/2+70)/SKALO,{x:0,y:0},28.02));
    }

    for (i=0; i < n_O2; i++) {
        const x = Math.random() * (canvas1.width-30) + 15;
        const y = Math.random() * (canvas1.height-30) + 15;
        const a = Math.random() * 360;
        const z = Math.random()*8;
        aero.aldonu(new O2(`O2_${i}`,{x,y,z,a},(121/2+66)/SKALO,{x:0,y:0},32.0));
    }

    for (i=0; i < n_Ar; i++) {
        const x = Math.random() * (canvas1.width-30) + 15;
        const y = Math.random() * (canvas1.height-30) + 15;
        const z = Math.random()*8;
        aero.aldonu(new Ar(`Ar_${i}`,{x,y,z},106/SKALO,{x:10,y:10},39.9));
    }

    for (i=0; i < n_CO2; i++) {
        const co2 = new CO2(`CO2_${i}`,{x: canvas1.width/2,y: canvas1.height/2, z:0},(116+66)/SKALO,{x:0,y:0},44.01);
        co2.ekscitu();
        aero.aldonu(co2);
    }

    const f_rapido = {x:0, y: 50};
    aero.aldonu(
        new Fotono("fotono",{x: canvas1.width/2, y: canvas1.height/2},50,100,f_rapido,"rgb(255 40 40)")
    )
}

function pentru() {
    aero.pentru();
    //fotono(ctx1,canvas1.width/2,canvas1.height/2,50,100);
}

kreu_aeron();
pentru();


</script>    


## energikapacito relative n2, o2

- molekulformo difinas kiom da energio ĝi povas konservi
- energiniveloj difinas kiajn frekvencojn de fotonoj molekulo povas akcepti (absorbi)

## verda lumo de suno vs ruĝa lumo de tero

[Spektro de nigra radianto](/fiziko/nigra_radianto.html)

Suna surfaco: 5800 K - maksimumo ĉe bluverda lumo
Tera surfaco: 300 K - maksimumo en transruĝo

## atmosferaj fenestroj (spektrobendoj) de frekvenc-tralaso vs bloko

## radia ekvilbro 

https://de.wikipedia.org/wiki/Strahlungsgleichgewicht
(kun sen albedo kaj forceja efik.)

## simula modelo



<canvas id="kampo" width="500" height="500"></canvas>

<button id="starto">Komencu</button>
<button id="halto">Haltu</button>

![simulo de radia ekvilibro (ideo)](../assets/bld/forcejsimulo.png)

## plivarmigaj kunefikoj

- ŝanĝo pro CO2 nur dekono de gradoj
- pli da vaporo en la aero (7% je unu plia 1°C)
- kunefiko de CO2 forlasanta la maron
- malaltigo de albedo pro degelanta glacio


<script>

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");

let ripetoj; // per clearTimeout(ripatoj.p) oni povas haltigi kurantan eksperimenton
const intervalo = 50; // 50 ms
const n_fotonoj = 3; // fotonoj elsendataj post ĉiu intervalo

// ni enordigos la aermolekulojn (vaporo, CO2) en ĉelojn por pli rapida konstato, 
// de kiu molekulo fotono povas absorbiĝi en
// iu loko. Ni uzos multajn malaltajn sed larĝajn ĉelojn.
const ĈA = canvas.height/50;
const ĈL = canvas.width/2;

const n_ĉeloj = 2*50;
const ĉeloj = Array.apply(null, new Array(n_ĉeloj)).map(() => new Object());

const n_h2o = 10;
const n_co2 = 10;

/**
 * Sunlumo: en ĉiu momento ni elsendos fiksitan kvanton da verdaj fotonoj en fiksita direkto
 * sed iom hazarda loko.
 * 
 * En ĉiu intervalo ni movas ilin je fiksita longo (konstanta lumrapido) al la tero, kie reflektiĝinte
 * ili ruĝiĝas.
 * 
 * Poste ili kapablas interagi kun la CO2-molekuloj, t.e. absorbiĝi dum momento kaj reelsendiĝi en hazarda
 * direkto. Ĝis iam fine ili malaperas en la spacon
 */
let verdaj = [], ruĝaj = [];

function sunlumo(n) {
    const L = canvas.width/4;
    const rapido = {x: canvas.width/80, y: canvas.height/30};

    // elsendo de novaj fotonoj
    for(i=0; i<n; i++) {
        const f = {x: Math.random()*L, y: 0};
        verdaj.push(f);
    }

    // pentro kaj movo de verdaj fotonoj
    let verdaj1 = [], ruĝaj1 = [];

    for (const f0 of verdaj) {
        const f1 = {x: f0.x+rapido.x, y: f0.y+rapido.y};
        if (f1.y < canvas.height) {
            streko(ctx,f0,f1,1,"green");
            verdaj1.push(f1);
        } else {
            // fotono reflektiĝas ĉe tersurfaco
            const faktor = (canvas.height - f0.y)/(f1.y-f0.y);
            const f2 = {x: f0.x + faktor*(f1.x-f0.x), y: canvas.height};
            streko(ctx,f0,f2,1,"green");

            f2.vx = rapido.x;
            f2.vy = -rapido.y;
            ruĝaj1.push(f2);
        }
    }

    // pentro kaj movo de ruĝaj fotonoj
    for (const r of ruĝaj) {
        if (r.y + r.vy > 0) {
            streko(ctx,{x: r.x, y: r.y},{x: r.x+r.vx, y: r.y+r.vy},1,"darkred");

            // KOREKTU: ni ne haltu en la flankoj sed reflektu
            r.x = Math.max(Math.min(r.x+r.vx, canvas.width),0);
            r.y = r.y+r.vy;

            // atingante y=0 la ruĝa fotono eskapas en la spacon
            // aliokaze ni retenas ĝin en la atmsofero
            if (r.y > 0) ruĝaj1.push(r);
        }
    }

    // aktualigu la du fotonarojn
    verdaj = verdaj1; // movitaj verdaj
    ruĝaj = ruĝaj1; // reflektitaj / movitaj ruĝaj
}


    /**
     * Kreas molekulojn de unu el la specoj A, B, AB en arbitraj lokoj 
     * @param {number} n_eroj nombro da kreendaj eroj
     * @param {number} speco speco de la eroj (ekz. -1, 0, 1) por diversspecaj
     * @param {number} xmin minimuma x-koordinato (0)
     * @param {number} ymin minimuma y-koordinato (0)
     * @param {number} xmax maksimuma x-koordinato (this.larĝo)
     * @param {number} ymax maksimuma y-koordinato (this.alto)
     */
    function kreu_erojn(n_eroj,speco=0,xmin=0,ymin=0,xmax=canvas.width,ymax=canvas.height) {
        const larĝo = xmax - xmin;
        const alto = ymax - ymin;
        const n_min = this.nombro + 1;

        // kreu erojn 
        for (let n = 0; n < n_eroj; n++) {
            // 
            //...

            // kreu unu eron
            const e = {
                id: n_min+n,
                e: false, // ne ekscitita, t.e. ne absorbis fotonon
                k: speco,
                x: xmin + Math.random()*larĝo,
                y: ymin + Math.random()*alto
            }

            // alordigu ĉiun eron al koncerna ĉelo por pli facila traktado 
            // de interagoj (se okazas interagoj; se ne, fakte sufiĉus unusola ĉelo)
            const k = ĉelo(e.x,e.y);
            if (k) {
                k[e.id] = e;
                this.nombro++;
            } else {
                throw `Neniu ĉelo por ${e.x},${e.y}!`
            }
        }
    }


    /**
     * En kiu ĉelo troviĝas pozicio (x,y)?
     */
    function ĉelo(x,y) {
        const k = Math.trunc(x/ĈL + (canvas.width/ĈL)*Math.trunc(y/ĈA));
        if (k>=ĉeloj.length) throw(`neniu ĉelo ${k} por x: ${x}, y: ${y}`);
        return ĉeloj[k];
    }

    /**
     * Redonas la ĉelpozicion (kol,lin)
     * @param {number} k la numero de la ĉelo
     */
    function ĉelpos(k) {
        const mod = canvas.width/this.ĈL;
        return { kol: k%mod, lin: Math.trunc(k/mod) };
    }

    /**
     * Traktas koliziojn kun la eksteraj vandoj. Por specialaj aranĝoj, ekz-e internaj
     * vandoj, vi povas superŝargi tiun metodon.
     * 
     * @param {object} e la traktenda ero
     * @param {number} nx nova x-koordinato
     * @param {number} ny nova y-koordinato
     */
    function kolizio(e,nx,ny) {
        const vando = {};

        // momente ni nur movas la erojn
        if (nx < 0) { // kolizio maldekstre
            e.vx = -e.vx;
            nx = -nx; // e.x - vx;
            vando.md = true;
        } else if (nx > this.larĝo) { // kolizio dekstre
            e.vx = -e.vx;
            nx = this.larĝo - (nx-this.larĝo); // e.x - vx;
            vando.d = true;
        }

        if (ny < 0) { // kolizio supre
            e.vy = -e.vy;
            ny = -ny; //e.y + e.vy;
            vando.s = true;
        } else if (ny > this.alto) { // kolizio malsupre
            e.vy = -e.vy;
            ny = this.alto - (ny-this.alto); //e.y + e.vy;
            vando.ms = true;
        }
        // movo al nx, ny, eventuale al nova ĉelo
        e.t = this.t;
        this.ĉelmovo(e,nx,ny);
        return vando;
    }



// unua pentrado
//pentro();
//eksperimento();

ĝi("#halto").disabled = true;

kiam_klako("#starto",() => {
    eksperimento();
    ĝi("#halto").disabled = false;
    ĝi("#starto").disabled = true;
});

kiam_klako("#halto",() => {
    if (ripetoj) clearTimeout(ripetoj.p);
    ĝi("#halto").disabled = true;
    ĝi("#starto").disabled = false;
});


function pentro() {
  viŝu(ctx);
  streko(ctx,{x: canvas.width/4, y:canvas.height},{x: 0, y:0});
  streko(ctx,{x: canvas.width*3/4, y:canvas.height},{x: canvas.width, y:0});

  sunlumo(n_fotonoj);
}


function paŝo() {
  //xxx.procezo();
  pentro();
  // valoroj();
}


function eksperimento() {

    //var interval = setInterval(pentru, 100);

    // preparo();
    if (ripetoj) clearTimeout(ripetoj.p);
    ripetoj = ripetu(
        () => {
            paŝo();
            return true; // ni ne haltos antaŭ butonpremo [Haltu]...(idealgaso.T < d_larĝo);
        },
        intervalo
    )
}

function daŭrigo() {
  const d_alto = d_rapidoj.getAttribute("height");
  linio(d_alto/3,dgr_r);
  linio(3/4*d_alto,dgr_r);

  ripetu(
      () => {
          paŝo();
          return true; // ni ne haltos antaŭ butonpremo [Haltu]...
      },
      intervalo
  )
}

</script>


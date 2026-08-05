---
layout: laborfolio
title: Forcejefiko
js:
  - folio-0c
  - kanvas-0a
---


## forcejefikaj gasoj en la atmosfero


- co2 ktp en ppm?
- kiom absolute en tuta atm?

fontoj:
- https://en.wikipedia.org/wiki/Greenhouse_gas
- https://www.umweltbundesamt.de/daten/umweltzustand-trends/klima/atmosphaerische-treibhausgas-konzentrationen#lachgas
- https://www.ds.mpg.de/139645/08
- https://www.uni-flensburg.de/fileadmin/content/institute/biologie/arbeitsgruppe-christian/dokumente/projekte/der-norden-taucht-ab/03-klimawirksame-gase-und-der-treibhauseffekt-ursachen.pdf


## energikapacito relative n2, o2

- molekulformo difinas kiom da energio ĝi povas konservi
- energiniveloj difinas kiajn frekvencojn de fotonoj molekulo povas akcepti (absorbi)

## verda lumo de suno vs ruĝa lumo de tero

[Spektro de nigra radianto](https://reta-lernejo.github.io/fiziko/nigra_radianto.html)

Suna surfaco: 6000 K - maksimumo ĉe bluverda lumo
Tera surfaco: 300 K - maksimuma en infraruĝo

## atmosferaj fenestroj (spektrobendoj) de frekvenc-tralaso vs bloko

## radia ekvilbro 

https://de.wikipedia.org/wiki/Strahlungsgleichgewicht
(kun sen albedo kaj forceja efik.)

## simula modelo


<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
</style>

<canvas id="kampo" width="500" height="500"></canvas>
simulado de ideala gaso

<button id="starto">Komencu</button>
<button id="halto">Haltu</button>

![simulo de radia ekvilibro (ideo)](../assets/bld/forcejsimulo.png)


<script>

const canvas = document.getElementById("kampo");
const ctx = canvas.getContext("2d");

let ripetoj; // per clearTimeout(ripatoj.p) oni povas haltigi kurantan eksperimenton
const intervalo = 50; // 50 ms
const n_fotonoj = 3;

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


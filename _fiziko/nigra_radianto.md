---
layout: laborfolio
title: Nigra radianto
chapter: 4
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
  - diagramo-0a
  - f_koloro-0a
---

... paĝo en preparo ...


<!-- 

https://en.wikipedia.org/wiki/Black_body
https://en.wikipedia.org/wiki/Planck%27s_law
https://en.wikipedia.org/wiki/Thermal_radiation
https://en.wikipedia.org/wiki/Planckian_locus
http://hyperphysics.phy-astr.gsu.edu/hbase/mod6.html#c4 
https://www.heise.de/hintergrund/Zahlen-bitte-Das-Plancksche-Wirkungsquantum-vom-Hotfix-zur-Quantenphysik-3901487.html

Derivado de la leĝo de Planck:
https://edisciplinas.usp.br/pluginfile.php/48089/course/section/16461/qsp_chapter10-plank.pdf
https://eng.libretexts.org/Bookshelves/Materials_Science/Supplemental_Modules_(Materials_Science)/Electronic_Properties/Solving_the_Ultraviolet_Catastrophe

... du termoj: unu priskribantaj la ondospecojn (laŭ frekvenco en volumero), la dua
priskribanta la energidistribuon laŭ Boltzmann-distribuo k Planck-Einstein-rilato
en termodinamiko ekvilibro.... la eblaj n en E=nhf

kiel klarigi la plank-ejnŝtejn-rilato...?
energio de unuopa oscilo 1Hz: E = h
energio proporcia al frekvenco: E = hf
n osciloj: E = nhf

kp. kineta energio: E = mv² (v=c: E = mc²)

-->

<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
</style>


<canvas id="spektro" width="500" height="500"></canvas>
spektro de nigra radianto

<b id="temperaturo_info">1000K</b>
<input type="range" id="temperaturo" style="width: 50em; max-width: 80%" min="300" max="15000" value="1000" step="100" onchange="aktualigo()" oninput="aktualigo_info()">


<script>
    
const canvas = document.getElementById("spektro");
const dgr = new Diagramo(canvas);

/*
/// konstantoj
const h = 6.62607015e-34 ;// Planka efikokvantumo en Js
const c = 2.99792458e8; // lumrapido en m/s
const kB = 1.380649e-23; // Boltzmann-konstanto en J/K

const c1 = 2*h*c*c; // *Math.PI
const c2 = h*c/kB; // faktoro por nm: 1e9
*/

function aktualigo_info() {
    const temp = ĝi('#temperaturo').value;
    ĝi('#temperaturo_info').textContent = temp + 'K';
}

function aktualigo() {
    const T = ĝi('#temperaturo').value;
    const lmin = 100, lmax=1500;
    /*
    const ss = Koloro.spektro(lmax,T)
    const smax = 10**(Math.ceil(Math.log10(ss)));
    */
    /*
    let smax = 1e15;
    if (T<600) smax=1e6;
    else if (T<800) smax=1e8;
    else if (T<1200) smax=1e10;
    else if (T<1600) smax=1e11;
    else if (T<2400) smax=1e12
    else if (T<3800) smax = 1e13;
    else if (T<6100) smax = 1e14;
    */
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    dgr.viŝu("black");
    plot(lmin,lmax,T,"white");
    radimakulo(T);
}


function plot(lmin,lmax,T,koloro="black") {
    // kalkulu spektrovaloron por ĉiu x (0..width)
    const dl = (lmax-lmin)/canvas.width;
    let S = []; //, smax = 0;
    let K = [];
    let smax = 0;
    ///debugger;
    for (let l=lmin;l<lmax;l+=dl) {
        const s = Koloro.spektro(l,T);
        // if (s>smax) smax = s;
        S.push(s);
        smax = Math.max(s,smax);
        // lumkoloro
        const k = Koloro.lumkoloro(l);
        K.push(k);
    }

    // desegnu la skalojn
    // x: ondolongo
    dgr.skalo_x(lmin,lmax,10,100,0,"nm","white");
    // x-supre: frekvenco
    dgr.skalo_x(lmin,lmax,20,200,3,"THz","white",true,Koloro.frekv);
    // y: spektro
    let ymax = 10**(Math.ceil(Math.log10(smax)));
    if (ymax<100) ymax = 100;
    dgr.skalo_y(0,ymax,ymax/100,ymax/10,1,"","white");

    // desegnu la kurbon
    sy = (canvas.height-2)/ymax;
    ///console.log("ymax: "+ymax+" sy: "+sy);    
    for (let x=0;x<canvas.width;x++) {
        const y = Math.trunc(sy*S[x]);
        // montru videblan spektron
        if (K[x] != "#000000") {
            //vlinio(x,K[x],ctx);
            dgr.linio(x,0,x,canvas.height,K[x]);
        }
        // desegnu radiecon
        // punkto(x,canvas.height-y,1,koloro,ctx);
        dgr.punkto(x,canvas.height-y,1,koloro)
        //console.log("x: "+x+" y:" +y);
    }
}

// testu lumkoloro
//console.log(Koloro.lumkoloro(500));

/*
const lmin = 100, lmax=5000;
const smax = 6e13;
plot(lmin,lmax,smax,3000,"red");
plot(lmin,lmax,smax,4000,"brown");
plot(lmin,lmax,smax,5000,"green");
plot(lmin,lmax,smax,6000,"blue");
plot(lmin,lmax,smax,7000,"violet");
*/

function radimakulo(T) {

/*
    // gammo-korekto
    const g = 0.055;

    const k = Koloro.nigra_radianto_rgb(T).map(x => {
        if (x <= 0.0031308)
            x = 12.92 * x;
        else
            x = (1+g) * x**(1/2.4) - g

        return Math.trunc(255*x);
    });     
    */
    const [r,g,b] = Koloro.nigra_radianto_rgb(T);
    const kstr = Koloro.rgb_gammo(r,g,b,0.8); // `rgb(${k[0]},${k[1]},${k[2]})`;
    console.log(kstr);
    // ankoraŭ la koloro ne ĝustas
    dgr.punkto(canvas.width-50,60,25,kstr);
}

// desegnu
aktualigo();

</script>



$$ S(\lambda) = \frac{2 \pi h c^2}{\lambda^5} \frac{1}{e^{hc / \lambda k_B T}-1} $$

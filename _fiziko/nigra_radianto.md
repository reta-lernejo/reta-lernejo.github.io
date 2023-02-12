---
layout: laborfolio
title: Nigra radianto
js:
  - folio-0b
  - sekcio-0b 
  - mathjax/es5/tex-chtml
---


<!-- http://hyperphysics.phy-astr.gsu.edu/hbase/mod6.html#c4 -->

<style>
    canvas {
        border: 2px solid cornflowerblue;
    }
</style>

<script>
    

/// konstantoj
const h = 6.62607015e-34 ;// Planka efikokvantumo en Js
const c = 2.99792458e8; // lumrapido en m/s
const kB = 1.380649e-23; // Boltzmann-konstanto en J/K

const c1 = 2*Math.PI*h*c*c;
const c2 = h*c/kB*1e9; // faktoro por nm: 1e9

/**
 * Kalkulas la spektran radion de nigra radianto
 * por specifa ondolongo l kaj temperaturo T
 * @param {number} l ondolongo en nm
 * @param {number} T temperaturo en Kelvin
 */
function spektro(l,T) {
    return c1 / Math.pow(l,5) / (Math.exp(c2/l/T)-1)
}

for (let l=1; l<100; l++) {
    console.log(l*100 +":" + spektro(l*100,2000))
}

</script>


<canvas id="spektro" width="500" height="300"></canvas>
spektro de nigra radianto

$$ S(\lambda) = \frac{2 \pi h c^2}{\lambda^5} \frac{1}{e^{hc / \lambda k_B T}-1} $$



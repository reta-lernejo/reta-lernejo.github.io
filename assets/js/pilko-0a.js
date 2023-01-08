/**
 * Simuladas saltantan elastan pilkon en ujo
 */

class Pilko2d {

    /**
     * Kreas 2-dimensian pilkon kun radiuso r kiel "torton" el n pecoj
     * @param {*} r radiuso
     * @param {*} n nombro da pecoj
     */
    constructor(r,n) {
        // ĉiu vertico havas du koordinatojn x kaj y
        this.verticoj = new Float32Array(2*n);
        let phi = 0; 
        const d = 2*Math.PI/n;
        for (let i=0; i<n; i++) {
            this.verticoj[2*i] = r * Math.cos(phi)
            this.verticoj[2*i] = r * Math.sin(phi)
            phi += d;
        }
    }
}
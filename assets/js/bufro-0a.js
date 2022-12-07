/**
 * Bufro de fiksita longeco tenanta valorojn, precipe por memori kaj averaĝi ilin.
 * La indekso aŭtomate aktualiĝas. Kiam la fino de la bufro estas atingita, la valoroj
 * denove aldoniĝas de la komenco.
 */

class Bufro {

    constructor(n) {
        this.b = new Array(n);
        this.i = 0;
        this.plena = false;
    }

    /**
     * Redonas la averaĝond e la bufro
     */
    averaĝo() {
        const sumo = this.b.reduce((v0,v) => v0+v, 0);
        const l = this.plena? this.b.length : this.i+1; 
        return sumo/l;
    }

    /**
     * Aldonas valoron al la bufro.
     * @param {number} v la aldonenda valoro
     * @param {number} i se donita la indekso, kie aldoni la valoron, se ne donita ĝi aldoniĝas en la sekva loko
     */
    val(v, i) {
        const _i = i? i%this.b.length : this.i;
        this.b[_i] = v;
        if (_i == this.b.length-1) this.plena = true;
        this.i = (_i+1)%this.b.length;
    }

    /**
     * Malplenigas la bufron por komenci novan serion da valoroj.
     * Tio necesas ekz-e por ricevi novan averaĝon post ŝanĝo de parametroj,
     * kie la averaĝoj de malnovaj kaj novaj kondicoj ne miksiĝu
     */
    malplenigu() {
        this.b = new Array(this.b.length);
        this.i = 0;
        this.plena = false;
    }

}
/*
 * algoritmo por fizika simulado de moviĝantaj eroj sub restriktoj
 * XPBD, laŭ https://matthias-research.github.io/pages/tenMinutePhysics/09-xpbd.pdf
 * kp ankaŭ https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/10-softBodies.html
 * 
 * Ĉiuj objektoj kiuj partoprenas la simuladon devas subteni tri metodojn:
 * 
 * 1) movoj: integrada paŝo:
 *   - adapto da rapidecoj laŭ akceloj, ekz-e gravito: 𝐯ᵢ = 𝐯ᵢ + ∆t*𝐠
 *   - konservo de nunaj rapidecoj: 𝐩ᵢ = 𝐱ᵢ
 *   - novaj pozicioj laŭ rapdiecoj: 𝐱ᵢ = 𝐱ᵢ + ∆t*𝐯
 *  2) restriktoj: solvo de restriktoj, pozicioj estas ĝustigitaj por plenumi la restriktojn
 *  3) rapidoj: aktualigo de rapidecoj: 𝐯ᵢ = (𝐱ᵢ − 𝐩ᵢ) / ∆t
 * 
 *  Plej simple kreu subklason, kiu realigas metodon restriktoj kaj heredas la du aliajn
 *  aldonante ankoraŭ kiel lastan paŝon aktualigon de la videbla prezento.
 */

/**
 * Vektoraj operaciojĉe kio la vektoroj estas nombroj en koordinata listo
 * [x1,y1,z1,x2,y2,z2,...xn,yn,zn]. Dudimensiaj vektoroj eblas kun aldona parametro
 */
class XV {

    /**
     * Metu nulvektoron 
     * @param {Float32Array} a koordinata listo
     * @param {number} ai indekso de la vektoro
     * @param {number} dim dimensioj (2 por dudimensia spaco)
     */
    static nulo(a, ai, dim=3) {
        ai *= dim;
        a[ai++] = 0.0;
        a[ai++] = 0.0;
        if (dim>2) a[ai] = 0.0;
    }

    /**
     * Obligu vektoron per nombro
     * @param {Float32Array} a koordinata listo
     * @param {number} ai indekso de la vektoro
     * @param {number} obl oblo je kiu multipliki
     * @param {number} dim dimensioj (2 por dudimensia spaco)
     */
    static oblo(a, ai, obl, dim=3) {
        ai *= dim;
        a[ai++] *= obl;
        a[ai++] *= obl;
        if (dim>2) a[ai] *= obl;
    }

    /**
     * Kopiu vektoron de unu indekso en listo a al alia en listo b (povas esti la sama)
     * @param {Float32Array} a koordinata listo
     * @param {number} ai indekso de la fontovektoro
     * @param {Float32Array} b koordinata listo
     * @param {number} bi indekso de la celvektoro
     * @param {number} dim dimensioj (2 por dudimensia spaco)
     */
    static kopio(a, ai, b, bi, dim=3) {
        ai *= dim; bi *= dim;
        a[ai++] = b[bi++]; 
        a[ai++] = b[bi++]; 
        if (dim>2) a[ai] = b[bi];
    }

    /**
     * Adicioj du vektorojn kaj skribu la rezulton en la indekso de la unua
     * Aldone eblas obligi la duan vektoron antaŭ adicii
     * @param {Float32Array} a koordinata listo
     * @param {number} ai indekso de la unua kaj celvektoro
     * @param {Float32Array} b koordinata listo
     * @param {number} bi indekso de la dua vektoro
     * @param {number} obl oblo je kiu multipliki la duan vektoron
     * @param {number} dim dimensioj (2 por dudimensia spaco)
     */
    static plus(a, ai, b, bi, obl=i0, dim=3) {
        ai *= dim; bi *= dim;
        a[ai++] += b[bi++] * obl; 
        a[ai++] += b[bi++] * obl; 
        if (dim>2) a[ai] += b[bi] * obl;
    }

    /**
     * Skribu la diferencon de du vektoroj al tria loko, krome eblas obligi la duan vektoron
     * @param {Float32Array} d koordinata listo por la rezulto
     * @param {number} di indekso de la celvektoro
     * @param {number} a indekso de la unua vektoro
     * @param {number} ai indekso de la unua kaj celvektoro
     * @param {Float32Array} b 
     * @param {number} bi indekso de la dua vektoro
     * @param {number} obl oblo je kiu multipliki la duan vektoron
     * @param {number} dim dimensioj (2 por dudimensia spaco)
     */
    static dif_al(d, di, a, ai, b, bi, obl=1.0, dim=3) {
        di *= dim; ai *= dim; bi *= dim;
        d[di++] = (a[ai++] - b[bi++]) * obl;
        d[di++] = (a[ai++] - b[bi++]) * obl;
        if (dim>2) d[di] = (a[ai] - b[bi]) * obl;
    }
}


class XPBDObj {
    /**
     * @param {number} eroj nombro da eroj (punktoj, verticoj...)
     * @param {number} dim dimensio (2 aŭ 3) de la vektorspaco
     */
    constructor(eroj,dim=3) {
        this.eroj = eroj;
        this.dim = dim;

        // pozicioj de la eroj
        this.poz = new Float32Array(this.dim*this.eroj);
        // nunaj pozicioj de la eroj por kompari kun la novaj post movo
        this.poz0 = new Float32Array(this.dim*this.eroj);
        // rapidoj de la eroj
        this.rpd = new Float32Array(this.dim*this.eroj);
        // inversoj de la eraj masoj
        this.imas = new Float32Array(this.dim*this.eroj);
    }

    /**
     * Movoj al novaj pozicioj laŭ akcelo, rapido kaj nuna pozicio
     * Memoru ankaŭ la nunajn poziciojn, ĉar ni bezonos ilin en la paŝo 'rapidoj'
     * La parametro akcelo provizore estu vektoro, en pli malsimplaj modeloj eble estu funkcio...
     * @param {number} sdt 
     * @param {*} akcelo vektoro de akcelo
     */
    movoj(sdt, akcelo) {
        for (let i = 0; i < this.eroj; i++) {
            // senfiniaj masoj ne moviĝu en nia modelo
            if (this.imas[i] == 0.0)
                continue;

            // adaptu la rapideco per akcelo
            XV.plus(this.rpd, i, akcelo, 0, sdt, this.dim);
            // memoru la poziciojn x en p
            XV.kopio(this.poz0, i, this.poz, i, this.dim);
            // adaptu la poziciojn laŭ rapideco
            XV.plus(this.poz, i, this.vel, i, sdt, this.dim);

            // ne permesu koordinatojn sub ebeno y=0 (grundo)
            const y = this.poz[this.dim * i + 1];
            if (y < 0.0) {
                XV.kopio(this.poz, i, this.poz0, i, this.dim);
                this.poz[this.dim * i + 1] = 0.0;
            }
        }
    }

    /**
     * Korektu poziciojn laŭ restriktoj. Tion devas realigi la
     * subklasoj, ĉar diversaj modeloj havas diversajn restriktojn.
     * @param {number} sdt 
     */
    restriktoj(sdt);

    /**
     * Korektoj de rapido-vektoroj laŭ rezutlo movo+korekto
     * @param {number} sdt 
     */
    rapidoj(sdt) {
        for (let i = 0; i < this.eroj; i++) {
            // senfiniaj masoj ne moviĝu
            if (this.imas[i] == 0.0)
                continue;

            // adaptu la rapidecon al la reala poziciŝnaĝo dum tiu ĉi paŝo
            XV.dif_al(this.vel, i, this.poz, i, this.poz0, i, 1.0/dt, this.dim);
        }

        // en sublklasoj aldonu kiel lastas paŝon aktualigon de la prezento
    };
}

class XPBD {

    /**
     * 
     * @param {*} objektoj objektoj de simulado ili devas havi metodojn int, slv, rpd (vd. supre)
     */
    constructor(objektoj) {
        this.objektoj = objektoj;
    }

    /**
     * Por ĉiu tempopaŝo la simulado uzas nombron da paŝeroj por kalkuli
     * poziciojn kaj rapidecojn konforme al la donitaj restriktoj
     * @param {*} dt tempopaŝo, ekz 1 = 1s
     * @param {*} paŝeroj nombro da subpaŝoj, ekz 60 (1/60s)
     */
    simulado(dt,paŝeroj) {
        const sdt = dt/paŝeroj; // subdividitaj temperoj

        for (let p = 0; p < paŝeroj; p++) {
            this.objektoj.forEach(o => movoj(sdt, akcelo))           
            this.objektoj.forEach(o => restriktoj(sdt));
            this.objektoj.forEach(o => rapidoj(sdt));
        }
    }

}
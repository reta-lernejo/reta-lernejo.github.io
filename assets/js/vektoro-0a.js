

class Vektoro extends Array {

    constructor(v) {
        // vi povas doni koordinatojn de la vektoro per areo
        // aŭ la longecon kiel nombro, tiam ĝi estas [0,0,...]

        if (typeof v === 'object') {
            super(...v);
        } else if (typeof v === 'number') {
            super(v);
            for (let i=0; i<v; i++) {
                this[i] = 0;
            }
        }
    }

    n_arbitra(min,max) {
        return Math.floor(Math.random()*(max-min)+min+0.51);
    }

    arbitra(min,max) {
        // kreas arbitrajn entjerajn koordinatojn inter min kaj max
        const v_arb = this.map(x => this.n_arbitra(min,max));
        return new Vektoro(v_arb);
    }

    arbitra_v(v_max) {
        // kreas arbitrajn koordinatojn, sed min=0 kaj por ĉiu koordinato vi povas doni
        // alian maksimumon
        //const vmx = (typeof v_max === 'array'? v_max : v_max.vekt);
        const v_arb = this.map((x,i) => this.n_arbitra(0,v_max[i]));
        return new Vektoro(v_arb);
    }

    /**
     * Obligas per faktoro f
     */
    oble(f) {
        const v_obl = this.map(x => f*x);
        return new Vektoro(v_obl);
    }

    plus(v) {
        //const vv = (typeof v === 'array'? v : v.vekt);
        const v_plus = this.map((x,i) => x + v[i]);
        return new Vektoro(v_plus);
    }

    minus(v) {
        return this.plus(v.oble(-1));
    }

    prod(v) {
        // skalara produto
        return this.reduce((sum,x,i) =>  sum + x*v[i], 0);
    }

    abs_2() {
        // kvadrato de absoluta vaoloro, t.e. skalara produto kun si mem
        return this.prod(this);
    }

    abs() {
        // absoluta valoro = longeco de vektoro
        return Math.sqrt(this.abs_2);
    }

}
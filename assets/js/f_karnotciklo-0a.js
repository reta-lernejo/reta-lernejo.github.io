/**
 * Simulas ciklon de Karnoto (laŭ Nicolas Léonard Sadi Carnot) kun ideala gaso.
 * La modelo konsistas el la gaso en la piŝto kaj la ekstera medio. Por tiuj ni uzas apartan klason, tiel
 * principe oni povus anstataŭigi la idealan gason per iu alia.
 * 
 * La Karnot-ciklo uzas tri diversajn mediojn: varman, malvarman kaj varmizolitan.
 */



class KCGaso {
    /**
     * KReas volumenon da ideala gaso. Se ne alie donita ni supozas heliumon (atommaso u=4).
     * @param {*} volumeno 
     * @param {*} temperaturo 
     * @param {*} premo 
     * @param {*} atommaso 
     */
    constructor(volumeno,temperaturo=KCMedio.norm_T,premo=KCMedio.norm_p,atommaso=4) {
        this.volumeno = volumeno;
        this.temperaturo = temperaturo;
        this.premo = premo;
        this.umaso = atommaso;
    }

}

class KCMedio {
    static norm_p = 1e5; // normpremo estas 1000 hPa
    static norm_T = 293.15; // normtemperaturo en K

    constructor(temperaturo=KCMedio.norm_T, premo=KCMedio.norm_p) {
        this.temperaturo = temperaturo;
        this.premo = premo;
    }
}

class KCiklo {
    constructor(gaso,T_alta,T_malalta) {
        this.gaso = gaso || new KCGaso(T_malalta);
        this.varma = new KCMedio(T_alta);
        this.malvarma = new KCMedio(T_malalta);
        //this.izolita = ???
    }
}
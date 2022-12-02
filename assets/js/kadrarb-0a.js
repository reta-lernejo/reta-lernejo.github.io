/**
 * akso-kadro-arbo ebligas efike eltrovi koliziojn de objekto kun nombro de aliaj
 */


/**
 * akso-kadro
 */
class AKadro {

    /**
     * @constructor kreas akso-orientitan kadron
     * @param {array} poz pozicio de la kadro [x,y,...]
     * @param {array} etn etendo de la kadro en ĉiu akso [x,y,...]
     */
    constructor(poz, etn) {
        this.poz = poz;
        this.etn = etn;
    }

    /**
     * Dividas la kadron en du egalajn partojn laŭ la n-a dimensio
     * @param {number} dim la ebeno (dimensio) laŭ kiu dividi (0: x, 1: y,...)
     */
    divid(dim) {
        // duonetendo
        let etn2 = [...this.etn];
        etn2[dim] /= 2;

        // duonpozicio
        let poz2 = [...this.poz];
        poz2[dim] += etn2[dim];

        // minimuma kaj maksimuma kadroj
        var Kmin = new AKArbo(this.poz, etn2);
        var Kmax = new AKArbo(poz2, etn2);
        return [Kmin,Kmax];
    }

}

class AKArbo {


    /**
     * @returns {bool} ĉu la du kadroj interkovras
     */
    static kadroj_interkovras(K1, K2) {
        // testu laŭ ĉiuj dimensioj
        for (let d = 0; d < K1.poz.length; d++) {
            if (K1.poz[d] > (K2.poz[d] + K2.etn[d])) {
                return false;
            }
            if (K2.poz[d] > (K1.poz[d] + K1.etn[d])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Kreas nodon reprezentantan akso-kadro-arbon
     * La nodo ekzistas sur la sama nombro da dimensioj, lau kiuj gi limigas, 
     * t.e limoj en du dimensioj rezultos en dudimensia AKArbo.
     * @param {object} limkadro la kadro (AKadro) de tiu ci nodo. 
     * 
     */
    constructor(limkadro) {
        // la limoj (ricevataj per divido laŭ plej granda dimensio) de la proponitaj ido-nodoj de tiu ĉi nodo
        this.idokadroj = [];
        // la ido-nodoj de tiu ci nodo, ne difinitaj antaŭ efektiva divido
        this.idonodoj;
        // la eroj apartenantaj al tiu ci nodo, ne apartenantaj al ties ĉi ido-nodoj
        this.eroj = {};

        // eroj, kiuj ŝoviĝos al ido-nodoj tuj kiam okazas divido
        this.eroj_idatendaj = {};

        // ### kalkulu idokardojn        
        // sercu la plej grandan dimension laŭ kiu dividi tiun ĉi nodon
        let maxDim = 0;
        let maxDimEtendo = 0;
        for (let d = 0; d < limkadro.etn.length; d++) {
            const dimEtendo = limkadro.etn[d];
            if (dimEtendo > maxDimEtendo) {
                maxDimEtendo = dimEtendo;
                maxDim = d;
            }
        }

        // la du kadroj (Kmin,Kmax) por dividi idojn laŭ la plej granda dimensio de tiu ĉi nodo
        this.idokadroj = limkadro.divid(maxDim);
    }


    /**
     * Aldonas novan eron al la nodo
     * @param id unika nomo de nova ero (neniam reuzu dum unu seanco)
     * @param {object} kadro AKadro, kiu donas la bordon de la nova ero
     */
    aldonu(id, kadro) {

        /**
         * @returns {bool} ĉu interkovras kun nur unu ido-nodo
         */
        function ĉu_ido(kadro) {
            var ret = false;
            for (var c = 0; c < this.this.idokadroj.length; c++) {
                if (AKArbo.kadroj_interkovras(this.idokadroj[c], kadro)) {
                    if (ret) {
                        // ne estas ido, se pli ol unu ido interkovras
                        return false;
                    }
                    ret = true;
                }
            }
            return ret
        }

        if (!this.ĉu_ido(kadro)) {
            // la ero apartenas al tiu ĉi nodo kaj ne povas konserviĝi en ido-nodo
            eroj[id] = kadro;
        } else {
            // se la ero estas plene ena de ido, ĝi apartenu al ido-nodo

            // kontrolu ĉu jam iu ero atendas por soviĝo al ido, se jes kreu ido-nodon
            for (const e in this.eroj_idatendaj) {
                // jam ekzistas ero destinita por ido-nodo:
                var eKadro = this.eroj_idatendaj[e];
                if (!this.idonodoj) {
                    // ankoraŭ ne ekzistas idoj, do kreu ido-nodojn
                    this.idonodoj = [];
                    for (let k = 0; k < this.idokadroj.length; k++) {
                        this.idonodoj.push(new AKArbo(this.idokadroj[k]));
                    }
                } else {
                    throw "programeraro, duobla kreado de idoj...!";
                }
                this.eroj_idatendaj = {};
                // realdonu idon
                this.aldonu(e, eKadro)
            }

            // ĉu tiu ĉi nodo jam dividiĝis foje?
            if (this.idonodoj) {
                // aldonu eron en la konvenan idon:
                for (var k = 0; k < this.idonodoj.length; k++) {
                    if (AKArbo.kadroj_interkovras(this.idokadroj[k], kadro)) {
                        this.idonodoj[k].aldonu(id, kadro);
                    }
                }
            } else {
                // nesufiĉe da eroj por krei idojn, do konservu por poste
                this.eroj_idatendaj[id] = kadro;
            }
        }
    }


    /**
     * Trakuras la arbon nodo pot nodo kaj redonas ĉiujn erojn interkovrajn kun la testkadro
     * @param testkadro la limoj (AKadro) de la testenda areo/objekto
     * @param propra_id se la propra id estas donita, interkovroj kun gi estas ignorataj
     * @returns Listo de kadroj indeksitaj lau la unikaj nomoj (@id)
     */
    interkovroj(testkadro,propra_id) {
        var ret = {};
        // kontrolu ĉiujn rektajn erojn de la nodo
        for (var id in this.eroj) {
            if (id != propra_id) {
                if (AKArbo.kadroj_interkovras(testkadro, this.eroj[id])) {
                    ret[id] = true;
                }
            }
        }
        // kontrolu ĉiujn idatendajn erojn
        for (var id in this.eroj_idatendaj) {
            if (id != propra_id) {
                if (AKArbo.kadroj_interkovras(testkadro, this.eroj_idatendaj[id])) {
                    ret[id] = true;
                }
            }
        }
        // kontrolu la erojn de ĉiuj id-nodoj trakure
        if (this.idonodoj) {
            for (var k = 0; k < this.idonodoj.length; k++) {
                if (AKArbo.kadroj_interkovras(this.idokadroj[k], testkadro)) {
                    Object.assign(ret, this.idonodoj[k].interkovras(testkadro, propra_id));
                }
            }
        }
        return ret;
    };
}



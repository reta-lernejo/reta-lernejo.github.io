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
 * Objekto, kiu tenas vektorojn en simpla listo [x0,y0,z0,x1,y2,z2...]
 * kaj provizas metodojn por aliri la vektorojn kaj kalkuli pri ili
 */
class XVj extends Float32Array {
    /**
     * Kreas vektorareon de ln vektoroj kun donita dimensio dim
     */
    constructor(ln,dim=3) {
        super(ln*dim);
        // this.ln = ln; ni povas kalkuli per length/this.dim!
        this.dim = dim;
    }

    /**
     * Metu nulvektoron ĉie aŭ ĉe elektitaj indeksoj
     * @param {number} i se donita indekso ekde kiu nuligi, alikaze ĉiuj
     * @param {number} m nombro da nuligendaj vektoroj; apriore 1, se ne ĉiuj
     */
    nulo(i,m=1) {
        if (typeof i === 'undefined') {
            this.fill(0);
        } else {
            this.fill(0,this.dim*i,this.dim*i+this.dim*m);
        }
    }

    /**
     * Redonas parton de la vektoroj ekde indekso i, entute m
     * (Float32Array.slice() ne ĝuste funkcias kun subklaso XVj, almenaŭ ne en FFv108!)
     */
    tranĉo(i, m) {
        let r = new Float32Array(m*this.dim);
        i *= this.dim;
        for (let j = 0; j < m*this.dim; j++) {
            r[j] = this[i+j];
        }
        return r;
    };

    /**
     * Obligu vektorojn per nombro
     * @param {number} obl oblo je kiu multipliki
     * @param {number} i indekso de la komenca vektoro, -1 = ĉiuj
     * @param {number} m nombro da vektoroj obligendaj, apriore 1, se ne ĉiuj
     */
    oblo(obl,i,m) {
        if (typeof i === 'undefined') {
            this.forEach((k,j) => {this[j] = k*obl})
        } else {
            for (let j = i*this.dim; j < i*this.dim+m*this.dim; j++) {
                this[j] *= obl;
            }
        }
    }

    /**
     * Kopiu vektorojn al alia vektorareo
     * @param {Float32Array} b celareo
     * @param {number} j indekso kien kopii
     * @param {number} i indekso de kie kopii
     * @param {number} m nombro da kopiendaj elementoj, 1 se i estas donita, alia ĉiuj
     */
    kopiu_al(b,j=0,i,m=1) {
        if (typeof i === 'undefined')
            b.set(this,j);
        else
            b.set(this.tranĉo(i,m));
    }

    /**
     * Adiciu vektoron donita kiel  [x,y,z?] al iu(j) vektoro(j) en la areo
     * Aldone eblas obligi la duan vektoron antaŭ adicii
     * @param {array} v vektoro (dua argumento)
     * @param {number} obl oblo je kiu multipliki la duan vektoron
     * @param {number} i indekso de la unua kaj celvektoro, se ne donita, adiciu al ĉiuj
     * @param {number} m nombro da vektoroj al kiuj adicii v
     */
    plus(v, obl=1.0, i, m=1) {
        const vo = v.map(x => x*obl);
        if (typeof i === 'undefined') {
            this.forEach((k,j) => {
                this[j] += vo[j%this.dim];
            })
        } else {
            for (let j = i*this.dim; j < i*this.dim+m*this.dim; j++) {
                this[j] += vo[j%this.dim];
            }
        }
    }


    /**
     * Adiciu vektorojn el alia areo al la propraj
     * Aldone eblas obligi la duan vektoron antaŭ adicii
     * @param {array} vj vektoroj (dua argumento)
     * @param {number} obl oblo je kiu multipliki la duan vektoron
     * @param {number} j indekso por la vektoroj de la dua argumento
     * @param {number} i indekso de la unua kaj celvektoro, se ne donita, adiciu al ĉiuj
     * @param {number} m nombro da vektoroj al kiuj adicii v
     */
    plus2(vj, obl=1.0, i, m=1) {
        if (typeof j === 'undefined') {
            this.forEach((k,j_) => {
                this[j_] += vj[j_] * obl;
            })
        } else {
            for (let j_ = j*this.dim; j < j_*this.dim+m*this.dim; j_++) {
                this[i] += vj[j_] * obl;
            }
        }
    }    


    /**
     * Redonu la difernecon de du vektoroj el la areo kiel novan vektoron [x,y,z?]
     * Aldone eblas obligi la rezulton
     * @param {number} i1 indekso de la unua vektoro
     * @param {number} i2 indekso de la dua vektoro
     * @param {number} obl oblo je kiu multipliki la rezulton
     */
    dif2(i1, i2, obl=1.0) {
        // this.slice donas malĝustan rezulton en FF 108!
        // const v = super.slice(i1,i1+this.dim);
        const v = this.tranĉo(i1,1);
        i2 *= this.dim;

        v.forEach((k,j) => {
            v[j] = (k - this.at(i2+j)) * obl;
        });

        return v;
    }

    /**
     * Kalkulu la diferencojn inter la unopaj vektoroj de du areoj
     * kaj skribu la rezulton al la sama indekso de tiu ĉi areo.
     * La tri areoj devas havi samajn dimensiojn.
     * Ni fidas je tio sen anticipe testi!
     * Aldone eblas obligi la rezulton.
     * @param {Float32Array} vj1 la areo por la unuaj argumentoj
     * @param {Float32Array} vj2 la areo por la unuaj argumentoj
     * @param {number} obl oblo je kiu multipliki la rezultojn
     */
    dif3(xv1, xv2, obl=1.0) {
        this.forEach((k,j) => {
            this[j] = (xv1[j] - xv2[j]) * obl;
        })
    }

    /**
     * Redonas la kvadraton de la absoluta valoro de vektoro (t.e. la kvadrato de ĝia longeco)
     * je indekso i
     * @param {number} i indekso de la vektoro
     * @returns number
     */
    abs2(i) {
        i *= this.dim;
        const v = this.tranĉo(i,1);
        return v.reduce((sumo,k) => sumo + Math.pow(k,2), 0);
    }

  
    /**
     * Redonu la kvadraton de la distanco inter du vektoroj
     * @param {number} i1 indekso de la unua vektoro
     * @param {number} i2 indekso de la dua vektoro
     */
    dist2(i1, i2) {
        const v1 = this.tranĉo(i1,1);
        const v2 = this.tranĉo(i2,1);

        return v1.reduce((sumo,k,j) => sumo + Math.pow(k-v2[j],2), 0);
    }

}


class XRDistanco {

    constructor(obj,eĝoj) {
        this.obj = obj;
        this.eĝoj = eĝoj;
        this.lng = new XVj(eĝoj.length/2,1);
        this.grd = new XVj(1,this.obj.poz.dim);

        // kalkulu kaj konservu la eĝlongojn
        for (let i=0; i<eĝoj.length; i+=2) {
            const i1 = eĝoj[i];
            const i2 = eĝoj[i+1];
    		this.lng[i/2] = Math.sqrt(this.obj.poz.dist2(i1,i2));
        }
    }

    apliku() {
        for (let i=0; i < this.eĝoj.length/2; i++) {
            const l0 = this.lng[i];
            const j1 = this.eĝoj[i];
            const j2 = this.eĝoj[i+1];

            // kalkulu nunan longecon de la eĝo kaj gradienton de restrikto
            //const sgn = i==j1? 1.0:-1.0;
            this.grd.set(this.obj.poz.dif2(j2,j1));
            const l = Math.sqrt(this.grd.abs2(0));
            if (l != 0.0)
                this.grd.oblo(1.0/l);    
            
            // kalkulu lambda
            const w1 = this.obj.imas[j1];
            const w2 = this.obj.imas[j2];
            const alpha = 0; // rigideco, poste faru adapteble!
            const lambda = (l-l0) / (w1+w2+alpha); // ni devus certigi, ke w1+w2 > 0

            // kalkulu la korektojn
            this.obj.poz.plus(this.grd,lambda*w1,j1);
            this.obj.poz.plus(this.grd,-lambda*w2,j2);
        }
    }

}

class XRVolumeno {

}

class XRImpulso {

}


class XPBDObj {
    /**
     * @param {number} eroj nombro da eroj (punktoj, verticoj...)
     * @param {number} dim dimensio (2 aŭ 3) de la vektorspaco
     */
    constructor(eroj,dim=3) {
        this.eroj = eroj;

        // pozicioj de la eroj
        this.poz = new XVj(eroj,dim);
        // nunaj pozicioj de la eroj por kompari kun la novaj post movo
        this.poz0 = new XVj(eroj,dim);
        // rapidoj de la eroj
        this.rpd = new XVj(eroj,dim);
        // inversoj de la eraj masoj
        this.imas = new XVj(eroj,dim);
        // restriktoj
        this.restr = [];
    }

    /**
     * Movoj al novaj pozicioj laŭ akcelo, rapido kaj nuna pozicio
     * Memoru ankaŭ la nunajn poziciojn, ĉar ni bezonos ilin en la paŝo 'rapidoj'
     * La parametro akcelo provizore estu vektoro, en pli malsimplaj modeloj eble estu funkcio...
     * @param {number} sdt 
     * @param {*} akcelo vektoro de akcelo
     */
    movoj(sdt, akcelo) {
        /*
            // senfiniaj masoj ne moviĝu en nia modelo
            if (this.imas[i] == 0.0)
                continue;
                */

        // adaptu la rapidecon per akcelo
        this.rpd.plus(akcelo,sdt);
        // memoru la poziciojn x en p
        this.poz0.set(this.poz);
        // adaptu la poziciojn laŭ rapideco
        this.poz.plus2(this.rpd,sdt);

            /*
            // ne permesu koordinatojn sub ebeno y=0 (grundo)
            const y = this.poz[this.dim * i + 1];
            if (y < 0.0) {
                XV.kopio(this.poz, i, this.poz0, i, this.dim);
                this.poz[this.dim * i + 1] = 0.0;
            }
            */
        
    }

    /**
     * Korektu poziciojn laŭ restriktoj. Tion devas realigi la
     * subklasoj, ĉar diversaj modeloj havas diversajn restriktojn.
     * @param {number} sdt 
     */
    restriktoj(sdt) {
        this.restr.forEach(R => {
            // restriktoj povas rilati al eĝoj, pecoj ktp.
            // anstataŭ al unuopaj eroj, kiel realigi tion?
            // do necesas, scii la rilaton inter restrikto kaj ties elementoj (verticoj, eĝoj,...)
            // kaj trakuri ci-lastajn anst. erojn...
            /*
            for (let i = 0; i < this.eroj; i++) {
                // ∆𝐱𝑖 = λ𝑤𝑖 ∇𝐶𝑖
                const korekto = R.lambda(i,...) * this.imas[i] * R.gradiento(i);
                XV.plus(this.poz, i, korekto, 0, this.dim);
            }
            */
            R.apliku()
        });
    }

    /**
     * Korektoj de rapido-vektoroj laŭ rezutlo movo+korekto
     * @param {number} sdt 
     */
    rapidoj(sdt) {
        /*
            // senfiniaj masoj ne moviĝu
            if (this.imas[i] == 0.0)
                continue;
                */

        // adaptu la rapidecon al la reala poziciŝanĝo dum tiu ĉi paŝo
        this.rpd.dif3(this.poz,this.poz0,1.0/sdt);      

        // en sublklasoj aldonu kiel lastas paŝon aktualigon de la prezento
    };
}

class XPBD {

    /**
     * 
     * @param {*} objektoj objektoj de simulado ili devas havi metodojn int, slv, rpd (vd. supre)
     */
    constructor(objektoj,akcelo) {
        this.objektoj = objektoj;
        this.akcelo = akcelo;
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
            this.objektoj.forEach(o => o.movoj(sdt, this.akcelo))           
            this.objektoj.forEach(o => o.restriktoj(sdt));
            this.objektoj.forEach(o => o.rapidoj(sdt));
        }
    }

}
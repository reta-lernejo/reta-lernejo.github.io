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
 * Rotacio dum kolizioj...:
 * http://gfs.khmeyberg.de/0607/0607Klasse11aPh/DezentralerStoss.pdf
 * https://www.uni-bremen.de/fileadmin/user_upload/fachbereiche/fb1/fb1/Physika/Versuche/Mechanik/Anleitung/m12_drehimpuls_09_11_12.pdf
 */

const debugging = false;

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
        // this.ln = ln; ni povas kalkuli per length/this.dim! aŭ uzi XPBDObj.eroj
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
    tranĉo(i, m=1) {
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
    oblo(obl,i,m=1) {
        if (typeof i === 'undefined') {
            this.forEach((k,j) => {this[j] = k*obl})
        } else {
            for (let j = i*this.dim; j < i*this.dim+m*this.dim; j++) {
                this[j] *= obl;
            }
        }
    }

    /**
     * Obligu vektorojn per nombro el alia areo ĉe sama indekso
     * @param {Float32Array} xvj areo de faktoroj
     * @param {number} i indekso de la komenca vektoro, -1 = ĉiuj
     * @param {number} m nombro da vektoroj obligendaj, apriore 1, se ne ĉiuj
     */
    obl2(xvj,i,m) {
        if (typeof i === 'undefined') {
            i == 0;
            m == this.length/this.dim;
        }
        for (let i_ = i; i_ < i+m; i_++) {
            const f = xvj[i_];
            for (j = 0; j<this.dim; j++) {
                this[i_+j] *= f;
            }
        }
    }


    /**
     * Dividu vektorojn per nombro el alia areo ĉe sama indekso
     * @param {Float32Array} xvj areo de faktoroj
     * @param {number} i indekso de la komenca vektoro, -1 = ĉiuj
     * @param {number} m nombro da vektoroj obligendaj, apriore 1, se ne ĉiuj
     */
    div2(xvj,i,m) {
        if (typeof i === 'undefined') {
            i == 0;
            m == this.length/this.dim;
        }
        for (let i_ = i; i_ < i+m; i_++) {
            const f = xvj[i_];
            for (j = 0; j<this.dim; j++) {
                this[i_+j] /= f;
            }
        }
    }    


    /**
     * Metas vektorojn v ĉe pozicio i
     */
    metu(v,i) {
        this.set(v,i*this.dim);
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
            for (let j_ = j*this.dim; j_ < j*this.dim+m*this.dim; j_++) {
                this[i] += vj[j_] * obl;
            }
        }
    }   
    

    /**
     * Redonu la diferencon de vektoroj el la areo kun alia vektoron [x,y,z?]
     * Aldone eblas obligi la rezulton
     * @param {number} i indekso de la unua vektoro
     * @param {number} m tiom da vektoroj komence de i
     * @param {number} obl oblo je kiu multipliki la rezulton
     */
    dif1(v, obl=1.0, i, m=1) {
        if (typeof i === 'undefined') {
            this.forEach((k,i_) => {
                this[i_] = (k - v[i_%this.dim]) * obl;
            })
        } else {
            for (let j_ = i*this.dim; j_ < (i+m); j_++) {
                this[j_] = (this[j_] - v[j_%this.dim]) * obl;
            }
        }
    }
    


    /**
     * Redonu la diferencon de du vektoroj el la areo kiel novan vektoron [x,y,z?]
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

    /**
     * Redonas la skalaran produkton de du vektoroj en la areo
     * @param {number} i1 indekso de la unua vektoro
     * @param {number} i2 indekso de la dua vektoro
     */
    prod(i1, i2) {
        i1 *= this.dim;
        i2 *= this.dim;
        let r = 0;
        for (let j = i1; j<i1+this.dim; j++) {
            r += this[j]*this[i2+j];
        }
        return r;
    }


    /**
     * Sumo de skalaraj produktoj de vektorojn el areo kun alia vektoro
     * @param {array} v vektoro (dua argumento)
     * @param {number} i indekso de la unua kaj celvektoro, se ne donita, multipliku al ĉiuj
     * @param {number} m nombro da vektoroj al kiuj multipliki v
     */
    prod2(v, i, m=1) {
        let sumo = 0;
        if (typeof i === 'undefined') {
            this.forEach((k,j_) => {
                sumo += this[j_]*v[j_%v.length];
            })
        } else {
            for (let j_ = i*this.dim; j_ < (i+m)*this.dim; j_++) {
                sumo += this[j_]*v[j_%v.length];
            }
        }
        return sumo;
    }        


    /**
     * Redonas la vektorprodukton (krucprodukton) de du vektoroj, ĉe dim=2 t.e. nombro
     * ĉe dim=3 vektoro [x,y,z]
     * @param {number} i1 indekso de la unua vektoro
     * @param {number} i2 indekso de la dua vektoro
     */
    kruc(i1, i2) {
        i1 *= this.dim; 
        i2 *= this.dim;
        if (this.dim == 2) {
            return this[i1] * this[i2+1] - this[i1+1] * this[i2]
        } else if (this.dim == 3) {
            return [
                this[i1+1] * this[i2+2] - this[i1+2] * this[i2+1],
                this[i1+2] * this[i2]   - this[i1]   * this[i2+2],
                this[i1]   * this[i2+1] - this[i1+1] * this[i2]       
            ];
        }
    }

    /**
     * Redonas ortogonalan 2D-vektoron sur vektoro i1->i2
     */
    ort2(i1,i2) {
        const v = this.dif2(i2,i1);
        return [-v[1],v[0]];
    }
}

/**
 * Traktas koliziojn kun la grundo
 */
class XRGrundo {

    constructor(obj) {
        this.obj = obj;
        //this.alpha = alpha
    }

    apliku() {
        for (let i=0; i<this.obj.eroj; i++) {
            const v = this.obj.poz.tranĉo(i);
            const y = v[1];
            if (y<0) {
                // plenelasta puŝo: spegulu la poziciojn ĉe la grundo
                // poste ni eble subtenu ankaŭ gradojn de elasteco (vd. alpha ĉe aliaj restriktoj)
                v[1] = -v[1];
                const v0 = this.obj.poz0.tranĉo(i);
                v0[1] = -v0[1];

                // krome ni supozas frotadon ĉe la grundo,
                // kiu donas puŝon al la kontraŭa x-direkto
                v[0] = v0[0] + (v[0]-v0[0])/2;
                if (this.obj.poz.dim==3) v[2] = v0[2] + (v[2]-v0[2])/2;

                this.obj.poz.metu(v,i);
                this.obj.poz0.metu(v0,i);
            }
        }
    }
}


/**
 * Traktas koliziojn kun la flankoj ([min<=x<=max)
 * Ni momente ne subtenas z-koordinatojn per ĝi
 * Pli bone subtenu ĉiu ajn ebenon kiel limigo donita per x,y,z?,a
 */
 class XRFlanko {

    constructor(obj,minx=0,maxx=100) {
        this.obj = obj;
        this.minx = minx;
        this.maxx = maxx;
        //this.alpha = alpha
    }

    apliku() {
        for (let i=0; i<this.obj.eroj; i++) {
            const v = this.obj.poz.tranĉo(i);
            const x = v[0];
            let bx;
            if (x<this.minx) {
                bx = this.minx;
            } else if (x>this.maxx) {
                bx = this.maxx;
            } else {
                continue
            }

            // plenelasta puŝo: spegulu la poziciojn ĉe la muro
            // poste ni eble subtenu ankaŭ gradojn de elasteco (vd. alpha ĉe aliaj restriktoj)
            v[0] = bx + bx-v[0];
            const v0 = this.obj.poz0.tranĉo(i);
            v0[0] = bx + bx-v0[0];

            // krome ni supozas frotadon ĉe la flanko,
            // kiu donas puŝon al la kontraŭa x-direkto
            v[1] = v0[1] + (v[1]-v0[1])/2;
            if (this.obj.poz.dim==3) v[2] = v0[2] + (v[2]-v0[2])/2;            

            this.obj.poz.metu(v,i);
            this.obj.poz0.metu(v0,i);
        }
    }
}


class XRDistanco {

    constructor(obj,eĝoj,alpha=0.01) {
        this.obj = obj;
        this.eĝoj = eĝoj;
        this.l0 = new XVj(eĝoj.length/2,1);
        this.grd = new XVj(1,this.obj.poz.dim);
        this.alpha = alpha;

        // kalkulu kaj konservu la eĝlongojn
        for (let i=0; i<eĝoj.length; i+=2) {
            const i1 = eĝoj[i];
            const i2 = eĝoj[i+1];
    		this.l0[i/2] = Math.sqrt(this.obj.poz.dist2(i1,i2));
        }
    }

    apliku(dt) {
        for (let i=0; i < this.eĝoj.length; i+=2) {
            const l0 = this.l0[i/2];
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
            const at = this.alpha/dt/dt; // rigideco, poste faru adapteble!
            const lambda = (l-l0) / (w1+w2+at); // ni devus certigi, ke w1+w2 > 0

            // kalkulu la korektojn
            //console.debug(`<${j1}-${j2}> l: ${l}, l0: ${l0}, lambda: ${lambda}, grd: [${this.grd.join(',')}]`)
            this.obj.poz.plus(this.grd,lambda*w1,j1);
            this.obj.poz.plus(this.grd,-lambda*w2,j2);
        }
    }

}

class XRAreo {

    constructor(obj,trioj,alpha=0.01) {
        this.obj = obj;
        this.alpha = alpha;
        this.trioj = trioj;
        this.A0 = new XVj(trioj.length/3,1);

        const poz = this.obj.poz;
        const tmp = new XVj(2,poz.dim);
        //this.grd = new XVj(3,poz.dim);

        // kalkulu kaj konservu la areojn de la triangluoj

        for (let i=0; i<trioj.length; i+=3) {
            const i1 = trioj[i];
            const i2 = trioj[i+1];
            const i3 = trioj[i+2];
            // la duono de la vektorprodukto de du flankoj de la triangulo
            // donas la areon, ni ŝparas duonigi kaj uzas la duoblon de surfacareo
            tmp.metu(poz.dif2(i2,i1),0);
            tmp.metu(poz.dif2(i3,i1),1);
    		this.A0[i/3] = tmp.kruc(0,1);
        }
    }

    apliku(dt) {
        const poz = this.obj.poz;
        const tmp = new XVj(2,poz.dim);
        let stop=false;

        function abs2(v) {
            return Math.pow(v[0],2) + Math.pow(v[1],2);
        }

        for (let i=0; i<this.trioj.length; i+=3) {
            const A0 = this.A0[i/3];
            const i1 = this.trioj[i];
            const i2 = this.trioj[i+1];
            const i3 = this.trioj[i+2];

            // kalkulu nunan areon (duoblon) de la trianguloj 
            tmp.metu(poz.dif2(i2,i1),0);
            tmp.metu(poz.dif2(i3,i1),1);
    		const A = tmp.kruc(0,1);

            // la gradientovektroj estas la normvektoroj super la eĝoj de la triangulo
            const n1 = poz.ort2(i2,i3);
            const n2 = poz.ort2(i3,i1);
            const n3 = poz.ort2(i1,i2);
            
            // kalkulu lambda
            const w1 = this.obj.imas[i1];
            const w2 = this.obj.imas[i2];
            const w3 = this.obj.imas[i3];
            const at = this.alpha/dt/dt; // rigideco, poste faru adapteble!
            const lambda = -(A-A0) / 
                (w1*abs2(n1) + w2*abs2(n2) + w3*abs2(n3) + at); // ni devus certigi, ke w1+w2+3 > 0


            // kalkulu la korektojn
            //console.debug(`<${j1}-${j2}> l: ${l}, l0: ${l0}, lambda: ${lambda}, grd: [${this.grd.join(',')}]`)
            poz.plus(n1,lambda*w1,i1);
            poz.plus(n2,lambda*w2,i2);
            poz.plus(n3,lambda*w3,i3);

            if (Math.abs(A-A0)>10) {
                console.debug(`<${i1}-${i2}-${i3}> A-A0: ${A-A0} lbd: ${lambda} n..:${n1} ${n2} ${n3}`);
                stop=true;
                // rekontrolu areon
                /*
                tmp.metu(poz.dif2(i2,i1),0);
                tmp.metu(poz.dif2(i3,i1),1);
                const A1 = tmp.kruc(0,1);

                if (Math.abs(A1-A0)>10) debugger;
                */
            }            
        }
        //if (stop) debugger;
    }
}

/*
class XRVolumeno {

}

class XRImpulso {

}
*/

/**
 * Restrikto pri maksuma energiperdo je alpha
 */
class XREnergio {

    constructor(obj,alpha=0.01) {
        this.obj = obj;
        this.alpha = alpha;

        // ni kalkulu la originan energion
        this.E0 = this.obj.Epot(this.obj.akcelo) + this.obj.Ekin();
    }

    apliku(dt) {
        // ni kalkulu la nunan energion
        const epot = this.obj.Epot(this.obj.akcelo);
        const ekin = this.obj.Ekin();
        const E =  epot + ekin;
        if (debugging) console.log(`E(pot|kin): ${epot/1000+ekin/1000} (${epot/1000}|${ekin/1000})`);
        const at = this.alpha*dt;
        // se ni perdis tro da energio ni obligu ĉiujn rapidecojn de la objekto
        // por altigi la kinetan energion, tiel konservante (1-at)-oblon da energio
        if (E/this.E0 < (1-at) || E > this.E0) {
            const E1 = this.E0*(1-at); // - epot;
            const lambda = Math.sqrt((E1-E)/E+1);
            this.obj.rpd.oblo(lambda);

            // kontrolu la ŝanĝitan energion
            if (debugging) {
                const ekin1 = this.obj.Ekin();
                console.log(`>>>E(pot|kin): ${epot/1000+ekin1/1000} (${epot/1000}|${ekin1/1000})`);
                // kontrolu/sencimigu
                if (epot + ekin1 > this.E0*1.01) debugger;    
            }
        }
    }
}

class XPBDObj {
    /**
     * @param {number} eroj nombro da eroj (punktoj, verticoj...)
     * @param {number} dim dimensio (2 aŭ 3) de la vektorspaco
     */
    constructor(eroj,akcelo,dim=3) {
        this.eroj = eroj;
        this.origino = new XVj(1,dim); // [0,0,0?], uzata por Epot, 
                                       // ŝanĝu se vi volas post kreo de objekto!

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
        this.restrE = [];

        // komenca energio
        this.akcelo = akcelo;
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
            R.apliku(sdt)
        });
    }

    /**
     * Korektoj de rapido-vektoroj laŭ rezutlo movo+korekto
     * @param {number} sdt 
     */
    rapidoj(sdt, akcelo) {
        /*
            // senfiniaj masoj ne moviĝu
            if (this.imas[i] == 0.0)
                continue;
                */

        // adaptu la rapidecon al la reala poziciŝanĝo dum tiu ĉi paŝo
        this.rpd.dif3(this.poz,this.poz0,1.0/sdt);

        /*
        // kontrolu la energion, kiu devus konserviĝi dum ni ne interŝanĝas
        // impulson kun aliaj movataj objektoj
        const epot = this.Epot(akcelo)/1000;
        const ekin = this.Ekin()/1000;
        console.log(`E(pot|kin): ${epot+ekin} (${epot}|${ekin})`);
        //if (epot<ekin) debugger;
        */
    };


    /**
     * Korektu poziciojn laŭ restriktoj. Tion devas realigi la
     * subklasoj, ĉar diversaj modeloj havas diversajn restriktojn.
     * @param {number} sdt 
     */
    Erestriktoj(sdt) {
        this.restrE.forEach(R => {
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
            R.apliku(sdt)
        });
    }


    /**
     * Redonas la suman potencialan energion de la eroj 
     * rilate al referencpunkto kaj konstanta akcelo (kutime la gravito)
     * @param {*} akcelo vektoro de gravito aŭ alia akcelo per potencialo
     * @param {*} refpt referencpunkto, per kies distanco la energio de la eroj kalkuliĝas
     * @returns 
     */
    Epot(akcelo) {
        function prod(v1,v2,obl) {
            return obl * v1.reduce((s,k,i) => s += k*v2[i]);
        }

        let epot = 0;
        let d = new XVj(this.eroj,this.poz.dim);

        // distancoj de eroj al origino
        this.poz.kopiu_al(d);
        d.dif1(this.origino,-1.0);
        // multobligu per la masoj
        d.div2(this.imas);
        // sumo de skalarproduktoj
        return d.prod2(akcelo); // ,0,1); por sencimigo!
    }

    /**
     * Redonas la kinetan energion el la sumo de kinetaj energioj de la eroj
     * @returns 
     */
    Ekin() {
        let ekin = 0;
        for (let i=0; i<this.eroj; i++) {
            // por sencimigo:
            //if (i>0) break;

            const m = 1/this.imas[i];
            const v2 = this.rpd.abs2(i);
            ekin += m/2 * v2;
            //if (isNaN(ekin)) debugger;
        }

        return ekin;
    }
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
            this.objektoj.forEach(o => o.movoj(sdt, this.akcelo));
            this.objektoj.forEach(o => o.restriktoj(sdt)); // apliku restriktojn pri loko
            this.objektoj.forEach(o => o.rapidoj(sdt,this.akcelo));
            this.objektoj.forEach(o => o.Erestriktoj(sdt)); // apliku restriktojn pri energio
        }
    }

}
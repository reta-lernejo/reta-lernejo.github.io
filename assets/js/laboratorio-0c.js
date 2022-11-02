
class LabSVG {
    
    constructor(svg) {
        this.svg = svg;
    }

    /**
     * Trovas SVG-elementon per CSS-elektilo
     */
    trovu(elektilo) {
        return this.svg.querySelector(elektilo)
    }

    /** 
     * Ŝovas elementon uzante atributon transform al nova pozicio (dx,dy)
     */
    ŝovu(elm, x, y=0) {
        if (x || y)
            this.atr(elm, {transform: `translate(${x} ${y})`});
    }

    /**
     * desegnu simbolon id ĉe (x,y) 
     */
    /*
    simbol_uzo(id,x,y) {
        const use = this.kreu("use", {
            href: "#"+id,
            x: x,
            y: y
        });
        this.svg.append(use);
    } */   

    /**
     * redonas elementon defs (kreante ĝins se ankoraŭ mankas)
     */
    difinoj() {
        let defs = this.svg.querySelector("defs");
        if (!defs) {
            defs = Lab.e("defs");
            this.svg.prepend(defs);
        }
        return defs;
    }
}

class LabIlo {
    constructor(id) {
        this.id = id;
    }
}

class LabUjo extends LabIlo {
    constructor(id) {
        super(id);
    }
}


class LabGlaso extends LabUjo {

    /**
     * Kreas glason sen enhavo
     * @param id {string} unika rekonilo
     * @param w {number} larĝeco, apriore 100
     * @param h {number} alteco, apriore 300
     */
    constructor(id, w=100, h=200) {
        super(id);
        this.larĝo = w;
        this.alto = h;

        const g = Lab.e("g", { id: `_glaso_${id}`, class: "ujo glaso" });
        // komencante en la supra maldekstra angulo kontraŭ horloĝa direkto...
        const bordo = `M${-w/20},${-h} Q0,${-h} 0,${-h+5} L0,${-w/20} Q0,8 ${w/2},8 Q${w},8 ${w},-5 L${w},${-h+5} Q${w},${-h} ${w+w/20},${-h} Z`;

        const ujo = Lab.e("path",{
            d: bordo,
            class: "vitro"
        });
        /*
        const enhavo = Lab.e("rect", {
            x: 0, y: -200, width: 100, height: 200,
            class: "likvo"
        });
        */
        const ombro = Lab.e("ellipse",{
            cx: .6*w, cy: 5, rx: .6*w, ry: 8,
            class: "ombro"
        });
        g.append(ombro,ujo);
        this.g = g;
    }

    /**
     * Aldonas aŭ anstataŭas enhavon.
     * @param {object|number} enh SVG-elemento reprezentanta la enhavon aŭ nombro donante procentaĵon de pleneco 
     * @param {boolean} aldone JEs/ne forigu antaŭan enhavon
     * 
     */
    enhavo(enh,aldone) {
        const glaso_id = `_glaso_${this.id}`;
        const enh_id = `_glaso_${this.id}_enhavo`;

        let nova_enh = enh;
        if (typeof enh === "number") {
            this.enh_alto = this.alto*enh;
            /*
            nova_enh = Lab.e("rect",{
                width: 100,
                y: -this.enh_alto,
                // rx: "50%", ry: 5,
                height: this.enh_alto,
                class: "likvo"
            });
            */

            //const bordo = `M-5,${-h} Q0,${-h} 0,${-h+5} L0,-5 Q0,0 5,1 Q${w/2},8 ${w-5},1 Q${w},0 ${w},-5 L${w},${-h+5} Q${w},${-h} ${w+5},${-h} Z`;

            const w = this.larĝo;
            const h = this.enh_alto
            nova_enh = Lab.e("path",{
                //d: `M0,${-h} L${w},${-h} L${w},-5 Q${w},0 ${w-5},1 Q${w/2},8 5,1 Q0,0 0,-5 Z`,
                d: `M0,${-h} L0,${-w/20} Q0,8 ${w/2},8 Q${w},8 ${w},${-w/20} L${w},${-h} Z`,
                class: "likvo"
            });
        };

        const c_id = `_clp_glaso_${this.id}`;

        const malnova_enh = this.g.querySelector('#'+enh_id);
        if (malnova_enh && aldone) {
            // aldnou novan al malnova enhavo
            malnova_enh.append(nova_enh);
        // kreu novan enhavon
        } else {
            if (malnova_enh) malnova_enh.remove(); // forigu evtl. malnovan enhavon
            const bordo = this.g.querySelector("path").getAttribute("d");
            const limigo = Lab.limigo(c_id, 
                Lab.e("path", {d: bordo})
            );
            const ge = Lab.e("g", {
                id: enh_id,
                "clip-path": `url(#${c_id})`
            });
    
            ge.append(nova_enh);
            const ujo = this.g.querySelector(".vitro");
            //this.g.prepend(limigo,ge);
            this.g.prepend(limigo);
            this.g.insertBefore(ge,ujo);      
        }
    }

    /** 
     * Redonas mezpunkton de surfaco kiel {id,x,y}
     */
    surfaco() {
        return {
            id: `_glaso_${this.id}_enhavo`,
            x: this.larĝo/2,
            y: -this.enh_alto
        }
    }

    /**
     * Redonas la limigon de la enhavo, kiel ĉe path.d, ekz-e por limigi falaĵon
     * @param {string} elektilo CSS-pad-elektilo por trovi la enhavon (se iel manipulita)
     */
    enhavlimigo(elektilo = "path.likvo") {
        return this.g.querySelector(elektilo).getAttribute("d");
    }
}

class LabProvtubo extends LabGlaso {
    /**
     * Kreas provtubon sen enhavo
     * @param id {string} unika rekonilo
     * @param w {number} larĝeco, apriore 100
     * @param h {number} alteco, apriore 300
     */
    constructor(id, w=25, h=150) {
        super(id,w,h);
    }
}

class LabGutbotelo extends LabUjo {

    #pinto;

    /**
     * Kreas gutbotelon 
     * @param {string} etikedo
     * @param {number} pleno enhavpleneco 0..100
     * @param {number} klino angulo, je kiu la botelo estu klinita
     * 
     */    
    constructor(id,etikedo,pleno=0,klino=0) {
        super(id);
        const g = Lab.e("g", { class: "ujo gutbotelo" });

        // bordo de la vitrujo (kaj do ankaŭ limo de enhavo)
        const bordo = "M0,-100 L0,-4 Q0,0 4,0 Q20,3 36,0 Q40,0 40,-4 L40,-100 Z";
        let tf = '';
        const a = (klino+360)%360; // tolerante negativajn angulojn
        if (a == 0) {
            const ombro = Lab.e("ellipse",{
                cx: 25, rx: 25, ry: 5,
                class: "ombro"
            });
            g.append(ombro);
        } else if (a<90) {
            const tx = 40-40*pleno/100;
            tf = `rotate(${a} ${tx} ${-pleno})`;
        } else if (a<180) {
            const tx = 40-40*pleno/100;
            tf = `rotate(${a} ${tx} ${-pleno}) translate(0 ${100-2*pleno})`;
        } else if (a<270) {
            const tx = 40*pleno/100;
            tf = `rotate(${a} ${tx} ${-pleno}) translate(0 ${100-2*pleno})`;
        } else {
            const tx = 40*pleno/100;
            tf = `rotate(${a} ${tx} ${-pleno})`;
        }

        // konstruu la ujon
        const ujo = Lab.e("path",{
            d: bordo,
            class: "vitro"
        });
        // kovrilo, ni aldonas strekon por pinto, por
        // poste (post ĉiaj transformoj...) scii kie aperu gutoj
        const kovrilo = Lab.e("polyline",{
            points: "-2,-100 -2,-105 10,-108 18,-130 22,-130 30,-108 42,-105 42,-100 30,-99.5 20,-99.3 10,-99.5 -2,-100",
            class: "plasto"
        });
        const pinto = Lab.e("line",{
            id: `_gutbotelo_${id}_pinto`,
            x1: 18, x2: 22, y1: -130, y2: -130
        });
        // surskribo
        const surskribo = Lab.e("text", {
            x: 20, y: -90,
            "text-anchor": "middle",
            }
        );
        for (const t of etikedo.split(/\n/)) {
            surskribo.append(Lab.e("tspan",{
                x: 20, dy: 10
            },t))
        }
        const papero = //Lab.rkrekt(36,24,3,1,2,-90);
            Lab.e("rect", {
                width: 36,
                height: 24,
                y: -90,
                x: 2,
                rx: "50%",
                ry: 1,
                class: "etikedo"
            });
        //Lab.a(papero,{class: "etikedo"});

        g.append(ujo,pinto,kovrilo,papero,surskribo);
        if (tf) Lab.a(g,{transform: tf});

        // aldonu enhavon        
        let enhavo = '', limigo;
        if (pleno) {
            const c_id = `_clp_${id}`;
            limigo = Lab.limigo(c_id, 
                Lab.e("path",{
                    d: bordo,
                    transform: tf
                })
            );

            // likva enhavo, ĝi ne ekzakte respondas
            // al la volumeno de cilindro, aparte por
            // oblikvaj anguloj, sed proksimumo eble sufiĉas
            // aliokaze oni devus ekzakte elkalkuli la
            // altecon de la likvaĵo en la botelo depende
            // de klino, kio estus sufiĉe ambicia entrepreno :-)
            enhavo = Lab.e("path",
            {
                d: `M-110,80 L-110,${-pleno} L110,${-pleno} L110,80 Z`,
                //d: `M-10,10 L-10,${-pleno} L110,${-pleno} L110,10 Z`,
                "clip-path": `url(#${c_id})`,
                class: "likvo"
            });
        }
        //g.append(clip,cenh,ujo,kovrilo,surskribo);
        const u = Lab.e("g", {id: `_gutbotelo_${id}`}); u.append(limigo,enhavo,g);

        this.g = u;
        this.pleno = pleno;
        this.klino = a;
    }

    /**
     * Redonas la element-rekonilon (id) kaj la relativajn koordinatojn de la pinto
     */
    pinto() {
        // alternative ni povus transdoni la ujo-grupon forlasante la pinto-elementon, 
        // la ujo momente ne havas .id
        return {
            id: `_gutbotelo_${this.id}_pinto`,
            x:20,
            y:-130
        };
    }
}

class LabKonusFlakono extends LabUjo {

    /**
     * Kreas konusan flakonon (Erlenmeyer)
     * @param {string} id unika nomo
     * @param {number} ml enhavo en ml (0..150)
     * @param {number} w larĝo
     * @param {number} h alteco
     */
    constructor(id,pleno=0,w=100,h=200) {
        super(id);
        this.ml = pleno;

        this.g = Lab.e("g",{
            class: "ujo konusflakono",
            id: id
        });

        // ujo
        const kol = 20;
        const bordo = `M${w/2-kol},${-h} L${w/2-kol},${-h+2*kol} L0,-12 Q-1,5 ${w/2},5 `
            + `Q${w+1},5 ${w},-12 L${w/2+kol},${-h+2*kol} L${w/2+kol},${-h} Z`
        const ujo = Lab.e("path",{
            d: bordo,
            class: "vitro"
        });

        // skalo
        const streko = "q5,2 30,2"
        const skalo = Lab.e("path", {
            d: `M14,${-this.enhavalto(25)}q5,1 15,1 `
             + `M12,${-this.enhavalto(50)}q5,1 25,1 `
             + `M16,${-this.enhavalto(75)}q5,1 15,1 `
             + `M14.5,${-this.enhavalto(100)}q5,1 30,1`,
            fill: "none"
        }) 

        // enhavo
        if (pleno>-1) {
            const c_id = `_clp_${id}`;
            const limigo = Lab.limigo(c_id, 
                Lab.e("path",{
                    d: bordo
                })
            );

            const eh = this.enhavalto(pleno);
            const enhavo = Lab.e("rect",{        
                y: -eh, height: eh+8, width: w,
                ry: 1, rx: "50%",
                "clip-path": `url(#${c_id})`,
                class: "likvo"
            });

            this.g.append(limigo,enhavo);
        }

        this.g.append(ujo,skalo);
    }

    /**
     * Metas la enhavon al ml
     */
    enhavo(ml) {
        this.ml = 0;
        this.enfluo(ml);
    }

    /**
     * Redonas la altecon de enhavo depende de volumeno 
     * Ni provizore ne komplikas per la konusstumpa volumeno-formulo, sed uzas tre simpligitan
     */    
    enhavalto(ml) {
        return 11/15*ml;
    }

    /**
     * Redonas mezpunktion de la surfaco en relativaj koordinatoj
     */
    surfaco() {
        const enh = this.g.querySelector(".likvo");
        return ({
            id: this.id,
            x: enh.getAttribute("x")+enh.getAttribute("width")/2, 
            y: enh.getAttribute("y")
        });
    }

    /**
     * Aldonas volumenon en ml al la enhavo
     * @param {number} ml 
     */
    enfluo(ml) {
        //console.log(`flakono ${this.id}: ${this.ml} + ${ml}`);

        this.ml += ml;
        const eh = this.enhavalto(this.ml);
        const enh = this.g.querySelector(".likvo");
        Lab.a(enh,{ 
            y: -eh, height: eh+8
        });
    }
}

class LabBureto  extends LabUjo {

    /**
     * Kreas bureton
     * @param {string} id unika il-nomo
     * @param {number} ml volumeno elfluita en ml, 0 estas la plej supra streko, 50 la plej malsupra, -1 malplena
     */
    constructor(id,ml=0) {
        const h=300;
        super(id);
        this.ml = ml;
        this.nulo = h-20; // y-pozicio de skalo=0 mezurite de ellaso

        // ujo    
        const bordo = //`M0,${-h} L0,-50 L40,-50 L40,${-h} Z`
                // maldekstra flanko
            `M8,${-h} L8,-75 L15,-60 L15,-50 L14,-50 L14,-40 L15,-40 L15,-20 L18,-5 L18,0 L22,0`
                // dekstra flanko
            + `L22,-5 L25,-20 L25,-40 L26,-40 L26,-50 L25,-50 L25,-60 L32,-75 L32,${-h} Z`
        
        this.g = Lab.e("g",{
            id: id,
            class: "ujo bureto"
        });
        const ujo = Lab.e("path",{
            d: bordo,
            class: "vitro"
        });

        // skalo
        /*
        let strekoj = '';
        for (let i = 0; i<=50; i++) {
            const y = -h+20 + 4*i;
            const l = 20 - 5*Math.sign(i%5) - 5*Math.sign(i%10);
            strekoj += `M8,${y} l${l},0`;
        }
        const skalo = Lab.e("path",{
            d: strekoj,
            class: "skalo"
        });*/
        const skalo = Lab.skalo("bureto_ml",0,50,4,1,5,10,10);
        Lab.a(skalo, {
            transform: `translate(0,${20-h})`
        });

        // krano malfermita kaj fermita
        this.fermita = true;
        this.krano_fermita = `M10,-50 L30,-50 L32,-48 L40,-48 L40,-42 L32,-42 L30,-40 L10,-40 Z`;
        this.krano_malfermita = `M10,-50 L30,-50 L32,-48 L34,-48 L36,-55 L39,-55 L40,-45 `
            + `L39,-35 L36,-35 L34,-42 L32,-42 L30,-40 L10,-40 Z`;

        const krano = Lab.e("path",{
            class: "krano",
            d: this.krano_fermita
        });

        // enhavo
        if (ml>=0) {           
            const c_id = `_clp_${id}`;
            const limigo = Lab.limigo(c_id, 
                Lab.e("path",{
                    d: bordo
                })
            );

            // likva enhavo, ĝi ne ekzakte respondas
            // al la volumeno de cilindro, aparte por
            // oblikvaj anguloj, sed proksimumo eble sufiĉas
            // aliokaze oni devus ekzakte elkalkuli la
            // altecon de la likvaĵo en la botelo depende
            // de klino, kio estus sufiĉe ambicia entrepreno :-)
            const enhavo = Lab.e("rect",
            {
                x: 8,
                y: -this.nulo + 4*ml,
                width: 24,
                height: this.nulo -4*ml, // 0-streko - elfluitaj ml
                class: "likvo",
                "clip-path": `url(#${c_id})`,
            });
            this.g.append(limigo,enhavo);
        }

        this.g.append(krano,ujo,skalo);
    }

    /**
     * Redonas la element-rekonilon (id) kaj la relativajn koordinatojn de la pinto
     */
    pinto() {
        // alternative ni povus transdoni la ujo-grupon forlasante la pinto-elementon, 
        // la ujo momente ne havas .id
        return {
            id: this.id,
            x:20,
            y:0
        };
    }

    /**
     * Redonas la kranon kiel SVGElement
     */
    krano() {
        return this.g.querySelector(".krano");
    }

    /**
     * Redonas la ujon kiel SVGElement
     */
    ujo() {
        return this.g.querySelector(".vitro");
    }

    /**
     * Metas/remetas la enhavon al ml, 50ml = 0-linio
     */
    enhavo(ml=50) {
        this.ml = -1;
        this.elfluo(1);
    }

    /**
     * Reduktas la enhavon
     * @param {number} ml tiom da ml la enhavo reduktiĝas
     */
    elfluo(ml=1) {
        if (this.ml<60) {
            //console.log(`bureto ${this.id}: ${this.ml} - ${ml}`);
            this.ml += ml; // sume elfluinta volumeno en ml

            const enh = this.g.querySelector(".likvo");
            Lab.a(enh, {
                y: -this.nulo + 4*this.ml,
                height: this.nulo -4*this.ml
            });
        }
    }

    /**
     * Malfermu kranon
     */
    malfermu() {
        const krano = this.g.querySelector(".krano");
        Lab.a(krano,{
            d: this.krano_malfermita
        });
        this.fermita = false;
    }

    /**
     * Fermu kranon
     */
    fermu() {
        const krano = this.g.querySelector(".krano");
        Lab.a(krano,{
            d: this.krano_fermita
        });
        this.fermita = true;
    }
}

class LabFalaĵo {
    /**
     * Kreas falaĵon (gutoj, precipito ks). Erojn de falaĵo transdonu kiel objekto 
     * {id: referencilo, n: nombro, daŭro: mezdaŭro, aperdaŭro, x0, supro: komenca supro, alteco: komenca alteco, 
     * faldistanco, falaĵalto, fine, klasoj, videblo, poste: finreago},
     *   x0: komenca x-koordinato (ekz-e por gutoj)
     *   alto: alteco de distribuo mezurite de la supro
     *   faldistanco: faldistanco, se ne donita ĝisgrunde
     *   falaĵalto: vario/alteco de falaĵo surgrunde
     *   fine: fina stato (freeze|remove)
     * donu pezajn malgrandajn erojn unue, due la pli grandajn nubecajn!
     * @param {string} id unika rekonilo referencanta eron en <defs>
     * @param {string} cls klasnomo de falaĵo, ekz-e por doni koloron, travideblecon ks
     * @param {string} ero1 ero speco unu (difinenda per Laboratorio.ero_smb())
     * @param {string} ero2 ero speco du (difinenda per Laboratorio.ero_smb())
     * @param {string} bordo pado por limigo (alternative al rektangulo w x h)
     * @param {number} w larĝeco, apriore 100
     * @param {number} h alteco, apriore 100
     */
    constructor(id,cls="precipito",ero1,ero2,bordo,w=100,h=100) {
        const c_id = `_clp_${id}`;

        const e = Lab.e("g", {
            id: id
        });
        const g = Lab.e("g",{
            class: cls
        });

        // limigu enhavon se estas donita aŭ bordo aŭ w+h
        let lim;
        if (bordo) {
            lim = Lab.limigo(c_id, Lab.e("path", {d: bordo}))
        } else if (w&&h) {
            lim = Lab.limigo(c_id, Lab.e("rect",{y: -h, width: w, height: h}));
        }
        if (lim) {
            Lab.a(g,{
                "clip-path": `url(#${c_id})`
            });    
            e.append(lim);    
        }

        function eroj(e_) {   
            for (let e=0; e<e_.n; e++) {
                const y = -(e_.supro - Math.random()*e_.alto);
                const x = (e_.x0||0) + e/e_.n*w + Math.random()*w/ero1.n;
                const videbl = !("v" in e_)? 1.0 : e_.videblo; // videbla, se ne alie difinita
                const u = Lab.e("use",{
                    href: `#${e_.id}`,
                    x: x, y: y,
                    "fill-opacity": videbl,
                    class: e_.klasoj
                });
                if (e_.falaĵalto || e_.faldistanco) {
                    const f_alto = (!("faldistanco" in e_)? -y : e_.faldistanco) - (Math.random()*e_.falaĵalto||0);
                    // kreu falanimacion
                    const daŭro = e_.daŭro || 0.1;
                    const aperdaŭro = e_.aperdaŭro || 0.1;

                    const f = Lab.falo(f_alto,0,0,
                        daŭro/2 + Math.random()*daŭro, 1,
                        //fina stato
                        e_.fine, e_.poste);
                    const a = Lab.apero(aperdaŭro);
                    u.append(a,f); // aldonu animaciojn de apero kaj falo 
                }
                // arbitre aldonu komence aŭ fine por eviti
                // ordon de maldekstre dekstren
                Math.random()<0.5? g.prepend(u) : g.append(u);
            }      
        }

        // pli bone ne aŭtomate aldonu likvaĵon, sed
        // kreu aparte laŭbezone! NEcesas anstatŭe transdoni
        // objekton por likvo aŭ g, al kiu aldoni...
        //if (w&&h) g.append(Lab.likvo("likvo",w,h));
        eroj(ero1);
        if (ero2) eroj(ero2);

        e.append(g);
        this.g = e;
    }
}

class LabBastono extends LabIlo {

    /**
     * Kreas vitran bastonon
     * @param {string} id identigilo (nomo) de la bastono
     * @param {number} w larĝo
     * @param {number} h alto
     * @param {number} klino klinangulo
     */
    constructor(id,w=5,h=200,klino=4) {
        super(id);
        this.g = Lab.e("g", {
            id: id,
            class: "vitro"});
            
        const r = Lab.e("rect",{
            width: w,
            height: h,
            y: -h,
            rx: w/2
        });
        if (klino) {
            Lab.a(r,{
                transform: `rotate(${klino})`
            });
        };
        this.g.append(r);
    }
}


class LabSondilo extends LabIlo {

    /**
     * Kreas bastonon kun pinto por mezuri ion (temperaturo, pH...)
     * @param {string} id identigilo (nomo) de la bastono
     * @param {number} w larĝo
     * @param {number} h alto
     * @param {number} klino klinangulo
     */
    constructor(id,w=5,h=200,klino=4,teksto='') {
        super(id);
        this.g = Lab.e("g", {
            id: id,
            class: "sondilo"});
          
        // mezurbastono
        const r = Lab.e("rect",{
            class: "bastono",
            width: w,
            height: h,
            y: -h,
            rx: w/2
        });
        if (klino) {
            Lab.a(r,{
                transform: `rotate(${klino})`
            });
        };

        // monitoreto
        const mon = Lab.e("g",{
            transform: `translate(-75 ${-h})`,
            class: "monitoro"
        });
        const kadro = Lab.e("rect",{
            width: 60, height: 30,
            rx: 5
        });
        const tx = Lab.e("text",{
            x: 5, y: 15,
            class: "valoro"
        },teksto);
        mon.append(kadro,tx);

        this.g.append(r,mon);
    }

    /**
     * Aktualigas la montritan valoron en la monitoro
     */
    valoro(val) {
        const tx = this.g.querySelector("text");
        tx.textContent = val;
    }
}


class LabPHIndikilo extends LabIlo {
    /** 
     * Kreas indikilon pri pH-valoro ks 
     * @param {string} id identigilo (nomo) de la indikilo
     * @param {number} r radiuso de la ronda indikilo
     * @param {number} min minimuma malgranda pH-valoro 
     * @param {number} max maksimuma malgranda pH-valoro 
     */
    constructor(id,r,min=1,max=14) {
        super(id);
        this.g = Lab.e("g", {id: id, class: "indikilo"});
        const c = Lab.e("circle",{r: r});

        const angulo = 360/(max-min+1);
        const r2 = r/2;
        const alpha = angulo/180 * Math.PI; // angulo de sektoro
        const phi = (angulo-90)/180 * Math.PI; // desktrea angulo de unua sektoro, 
                                            // -90°, ĉar 0° ĉe ni estu supre kaj ne dekstre!
        const x1 = r * Math.cos(phi);
        const y1 = r * Math.sin(phi);
        const x2 = r2 * Math.cos(phi);
        const y2 = r2 * Math.sin(phi);
        const td = r2 + (r-r2)/2;

        function sektoro(val,n) {
            const h = LabPHIndikilo.pH_koloro(val);
            return Lab.e("path", {
                d: `M0,${-r} A${r} ${r} 0 0 1 ${x1} ${y1} L${x2},${y2} A${r2} ${r2} 0 0 0 0 ${-r2} Z`,
                //style: `fill: ${v.koloro}`,
                fill: `hsl(${h} 70% 50%)`,
                transform: `rotate(${n*angulo})`
            });
        }

        function teksto(val,n) {
            return Lab.e("text", {
                x: td * Math.cos(phi - alpha/2 + n*alpha),
                y: td * Math.sin(phi - alpha/2 + n*alpha)
            }, val);
        }

        const papero = Lab.e("path", {
            class: "papero",
            // M0,50 C50,50 20,55 100,55 L95,52 L96,51 L91,50 L90,48 C30,50 50,45 0,50
            d: `M-5,${r} C${r},${r} ${r*2/5},${11/10*r} ${2*r},${11/10*r} L${.95*2*r},${r+2} L${2*r-4},${r+1} L${.91*2*r},${r} L${.9*2*r},${r-2} C${r*3/5},${r} ${r},${.9*r} -5,${r}`
        });

        const makulo = Lab.e("ellipse",{
            class: "makulo",
            cx: .8*2*r, cy: r+1.5,  
            rx: r/5, ry: 3,
            fill: "none"
        });

        const surskribo = Lab.e("text",{class: "etikedo"},"pH");

        const vj = Array.from(Array(max-min+1).keys());
        const sektoroj =  vj.map((n) => sektoro(min+n,n));
        const tekstoj = vj.map((n) => teksto(min+n,n));
        
        this.g.append(papero,makulo,c,...sektoroj,...tekstoj,surskribo);
    }

    /**
     * Redonas kolovaloron por pH-valoro. Tiu kolovaloro estu uzata kiel unua argumento h de hsl(h,s,l)
     */
    static pH_koloro(pH) {
        return (pH <= 7?
            Math.round((320 + pH*20) % 360):
            Math.round((140 + (pH-7)*20) % 360));
    }

    /**
     * Kreas etendiĝantan makulon laŭ koloro de certa pH-valoro
     */
    makulo(pH,nevidebla) {
        const h = LabPHIndikilo.pH_koloro(pH);
        const makulo = this.g.querySelector("ellipse.makulo");
        Lab.a(makulo,{  
            fill: `hsl(${h},70%,50%)`,
            "fill-opacity": 0
        });
        // lanĉu la animacion de apero...
        let apero = makulo.querySelector("animate");
        if (apero) apero.remove();
        if (!nevidebla) {
            apero = Lab.apero(5,0.7); 
            makulo.append(apero);
                /*
            Lab.a(apero,{
                values: "0;.7"
            });*/
            apero.beginElement();    
        } /*else {
            //apero.remove();
            
            Lab.a(apero,{
                values: "0;0",
                begin: "indefinite",
            });
            
        }*/
    }
}

class LabDiagramo extends LabIlo {

    /**
     * Kreas 2D-diagramonon por montri mezurvalorojn.
     * Parametroj por la aksoj estas donitaj kiel objekto {nomo: aksonomo, mrg: marĝeno, min, max, 
     *  i1, i2, i3: skalintervaloj, log}
     * intervalo: 1 por ĉiu x unu streko, 5 por ĉiu kvina ktp. (provizore ignorata)
     * 
     * @param {string} id unika nomo
     * @param {object} X parametroj por x-akso
     * @param {object} Y parametroj por y-akso
     * @param {number} w larĝo
     * @param {number} h alto
     */
    constructor(id,X,Y,w=300,h=200) {
        super(id);
        this.g = Lab.e("g",{
            id: id,
            class: "diagramo"
        });
        const r = Lab.e("rect",{
            class: "fono",
            width: w,
            height: h,
            y: -h,
            rx: 2
        });

        // skaloj
        this.X = X;
        this.Y = Y;
        this.h = h;
        this.w = w;

        const l = 5; // plia ŝovo pro longeco de strekoj
        const xi = (w - 2*X.mrg)/(X.max-X.min);
        const yi = (h - 2*Y.mrg)/(Y.max-Y.min);
        const x = Lab.skalo(`${id}_x`,X.min,X.max,xi,X.i1,X.i2,X.i3);
        const y = Lab.skalo(`${id}_y`,Y.min,Y.max,yi,Y.i1,Y.i2,Y.i3);
        Lab.a(x,{
            transform: `translate(${X.mrg} ${-Y.mrg-l}) rotate(-90) scale(-1 1)`
        });
        Lab.a(y,{
            transform: `translate(${X.mrg+l} ${-h+Y.mrg}) scale(-1 1)`
        });

        // nomo de la aksoj
        const xe = Lab.e("text",{
            class: "etikedo x",
            x: this.w - X.mrg/2,
            y: -Y.mrg
        }, X.nomo);
        const ye = Lab.e("text",{
            class: "etikedo y",
            x: X.mrg/2,
            y: -h + Y.mrg/2
        }, Y.nomo);

        this.g.append(r,x,y,xe,ye);
    }

    /**
     * Aldonas punkton ĉe koordinatoj (x,y) de la mezurspaco
     * @param {number} x x-koordinato
     * @param {number} y y-koordinato
     * @param {number} h kolorvaloro por hsl-funckio
     */
    punkto(x,y,h) {
        // punkto ekster la diagramspaco?
        if (x<this.X.min || x>this.X.max || y<this.Y.min || y>this.Y.max) return;

        let punktoj = this.g.querySelector(".punktoj");
        if (! punktoj) {
            punktoj = Lab.e("g",{
                class: "punktoj"
            });
            this.g.append(punktoj);
        }

        // unuo
        const xi = (this.w-2*this.X.mrg)/(this.X.max-this.X.min);
        const yi = (this.h-2*this.Y.mrg)/(this.Y.max-this.Y.min);

        // punkt-koordinatoj en la diagramo
        const px = this.X.mrg + x*xi;
        const py = this.Y.mrg + y*yi;

        const pt = Lab.e("rect",{
            class: "punkto",
            x: px,
            y: -py,
            width: 3,
            height: 3,
            rx: .5
        });
        if (h !== undefined) {
            Lab.a(pt,{
                fill: `hsl(${h} 70% 50%)`
            })
        }
        punktoj.append(pt);
        return pt;
    }

    /**
     * Forigas la antaŭe aldonitajn punktojn el la diagramo
     */
    viŝu() {
        const punktoj = this.g.querySelector(".punktoj");
        if (punktoj) punktoj.remove();
    }
}

class Lab {

    /** Kreas SVG-elementon kun atributoj
     * @param nomo elementnomo, ekz-e 'div'
     * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
     */
    static e(nomo, atributoj, teksto) {
        const ns = "http://www.w3.org/2000/svg";
        const el = document.createElementNS(ns, nomo);
        if (atributoj) {
            for (const [atr,val] of Object.entries(atributoj)) {
                el.setAttribute(atr,val);
            }
        };
        if (teksto) el.textContent = teksto;
        return el;
    }

    /**
     * Aldonas aŭ ŝanĝas atributojn de SVG-DOM-elemento
     * 
     * @param elemento la DOM-elemento 
     * @param atributoj objekto kies kampoj estas la atributnomoj kaj ties valoroj
     * @returns 
     */
    static a(elemento, atributoj) {
        if (atributoj) {
            for (const [atr,val] of Object.entries(atributoj)) {
                elemento.setAttribute(atr,val);
            }
        };
        return elemento;
    }


    /** 
     * Desegnas rektangulon kun rondigitaj anguloj kaj kurbaj flankoj
     * @param {number} w larĝo
     * @param {number} h alteco
     * @param {number} a angulgrandeco
     * @param {number} d kurba devio de flankoj
     * @param {number} x x-koordinato (maldekstre)
     * @param {number} y y-koordinato (supre)
     */
    /*
     static rkrekt(w,h,a,d,x=0,y=0) {
        return Lab.e("path",{
            d: `M${x+a},${y} Q${x+w/2},${y-d} ${x+w-a},${y} Q${x+w},${y} ${x+w},${y+a} ` // supra linio
             + `L${x+w},${y+h-a} Q${x+w},${y+h} ${x+w-a},${y+h}`  // dekstra linio
             + `Q${x+w/2},${y+h+d} ${x+a},${y+h} Q${x},${y+h} ${x},${y+h-a}`  // malsupra linio
             + `L${x},${y+a} Q${x},${y} ${x+a},${y}` // maldekstra linio
        });
    }
    */
    

    /** 
     * Desegnas nur malsupre rondigitan rektangulon
     * @param {number} w larĝo
     * @param {number} h alteco
     * @param {number} a angulgrandeco
     * @param {number} x x-koordinato (maldekstre)
     * @param {number} y y-koordinato (supre)
     */
    /*
     static r_rekt(w,h,a,x=0,y=0) {
        return Lab.e("path",{
            d: `M${x},${y} L${x+w},${y} ` // supra linio
             + `L${x+w},${y+h-a} Q${x+w},${y+h} ${x+w-a},${y+h}`  // dekstra linio
             + `L${x+a},${y+h} Q${x},${y+h} ${x},${y+h-a}`  // malsupra linio
             + `L${x},${y+a} Z` // maldekstra linio
        });
    }
    */

    /** 
     * Desegnas rektangulon rondigitan malsupre konvekse kaj supre konkave
     * @param {number} w larĝo
     * @param {number} h alteco
     * @param {number} a angulgrandeco malsupre
     * @param {number} u angulgrandeco supre
     * @param {number} x x-koordinato (maldekstre)
     * @param {number} y y-koordinato (supre)
     */
    /*
    static rurekt(w,h,a,u,x=0,y=0) {
        return Lab.e("path",{
            d: `M${x},${y-u} Q${x},${y} ${x+u},${y} L${x+w-u},${y} Q${x+w},${y} ${x+w},${y-u}` // supra linio
             + `L${x+w},${y+h-a} Q${x+w},${y+h} ${x+w-a},${y+h}`  // dekstra linio
             + `L${x+a},${y+h} Q${x},${y+h} ${x},${y+h-a}`  // malsupra linio
             + `L${x},${y+a} Z` // maldekstra linio
        });
    }
    */

    /**
     * Kreas kaj redonas clipPath-elementon
     */
    static limigo(c_id,limFiguro) {
        const clip = Lab.e("clipPath",{
            id: c_id,
            clipPathUnits: "userSpaceOnUse"
        });
        clip.append(limFiguro);
        return clip;
    }

    /** 
     * Kreas movanimacion por falo de falaĵoj ks
     * @param {number} dy vojo de falo vertikale
     * @param {number} dx horizontala komponento de falo
     * @param {number} vx vario de horizontala pozicio
     * @param {number} d daŭro en sekundoj
     * @param {number} rp maksimuma ripetoj (kun hazardo)
     * @param {string} fn konduto ĉe fino (freeze|remove)
     */
    static falo(dy, dx=0, vx=0, d=10, rp=1, fn="freeze", poste) {
        const f = Lab.e("animateMotion", {
            dur: d+'s',
            repeatCount: rp>1?Math.floor(Math.random()*rp):1,
            fill: fn,
            begin: "indefinite", // voku poste beginelement() por lanĉi!
            path: `M0,0 L${dx},${dy}`, // momente ni ignoras vx
            // per keyTimes, keyPoint ni povas ekz-e ankoraŭ akceli!
           //onend: (ev)=>poste(ev)
        });
        if (poste) f.addEventListener("endEvent",poste);
        return f;
    }

    /** 
     * Kreas iom-post-ioman aperon per kresko de fill-opacity 
     * @param {number} d daŭro en sekundoj
     * @param {number} max maksimuma opakeco
     */
    static apero(d,max=1.0) {
        const a = Lab.e("animate", {
            attributeName: "fill-opacity",
            values: `0.0;${max}`,
            dur: d+"s",
            repeatCount: 1,
            fill: "freeze"
        });
        return a;
    }

    /**
     * Kreas likvan enhavon, aldonebla en glason...
     */
    static likvo(cls="likvo",w=100,h=100) {
        return Lab.e("rect",{
            width: 100,
            y: -h,
            height: h,
            class: cls
        });
    }

    /**
     * Kreas falaĵon (gutoj, precipito ks). Erojn de precipito transdonu kiel objekto 
     * {id: referencilo, klasoj, n: nombro, s: supro, a: alteco, fd: faldistanco, af: falaĵalteco}, 
     * a: alteco de distribuo mezurite de la supro
     * fd: faldistanco, se ne donita ĝisgrunde
     * af: vario de falaĵo surgrunde
     * donu pezajn malgrandajn erojn unue, due la pli grandajn nubecajn!
     * @param {string} id unika rekonilo
     * @param {string} cls klasnomo de falaĵo, ekz-e por doni koloron, travideblecon ks
     * @param {string} ero1 ero speco unu (difinenda per Laboratorio.ero_smb())
     * @param {string} ero2 ero speco du (difinenda per Laboratorio.ero_smb())
     * @param {string} bordo pado por limigo (alternative al rektangulo w x h)
     * @param {number} w larĝeco, apriore 100
     * @param {number} h alteco, apriore 100
     */
    static falaĵo(id,cls="precipito",ero1,ero2,bordo,w=100,h=100) {
        return new LabFalaĵo(id,cls,ero1,ero2,bordo,w,h).g;
    }

    /**
     * Kreas glason kun enhavo
     * @param id {string} unika rekonilo
     * @param w {number} larĝeco, apriore 100
     * @param h {number} alteco, apriore 300
     * @param enhavo {object} aŭ nombro donate procentaĵon de pleneco aŭ SVG-objekto reprezentanta la enhavon
     */
    static glaso(id="glaso", enhavo, w=100, h=200) {
        const glaso = new LabGlaso(id, w, h);
        if (enhavo) glaso.enhavo(enhavo);
        return glaso;
    }


    /**
     * Kreas provtubon kun enhavo
     * @param id {string} unika rekonilo
     * @param w {number} larĝeco, apriore 100
     * @param h {number} alteco, apriore 300
     * @param enhavo {object} aŭ nombro donate procentaĵon de pleneco aŭ SVG-objekto reprezentanta la enhavon
     */
    static provtubo(id="glaso", enhavo, w=25, h=150) {
        const tubo = new LabProvtubo(id, w, h);
        if (enhavo) tubo.enhavo(enhavo);
        return tubo;
    }

    /**
     * Kreas gutbotelon 
     * @param {string} etikedo
     * @param {number} pleno enhavpleneco 0..100
     * @param {number} angulo angulo, je kiu la botelo estu turnita
     * 
     */
    static gutbotelo(id,etikedo,pleno=0,angulo=0) {
        return new LabGutbotelo(id,etikedo,pleno,angulo);
    }

    /**
     * Kreas bureton
     * @param {string} id unika nomo
     * @param {number} ml volumeno elfluita en ml, 0 estas la plej supra streko, 50 la plej malsupra, -1 malplena
     */
    static bureto(id,ml=0) {
        return new LabBureto(id,ml);
    }

     /**
     * Kreas konusan flakonon (Erlenmeyer)
     * @param {string} id unika nomo
     * @param {number} ml enhavo en ml (0..150)
     * @param {number} w larĝo
     * @param {number} h alteco
     */
    static konusflakono(id,pleno=0,w=100,h=200) {
        return new LabKonusFlakono(id,pleno,w,h);
    }

    /** 
     * Kreas pH-indikilon 
     * @param {string} id identigilo (nomo) de la indikilo
     * @param {number} r radiuso de la ronda indikilo
     * @param {number} min minimuma malgranda pH-valoro 
     * @param {number} max maksimuma malgranda pH-valoro 
     */
    static indikilo(id="indikilo",r=50,min=1,max=14) {
        return new LabPHIndikilo(id,r,min,max); 
    }

     /**
     * Kreas vitran bastonon
     * @param {string} id identigilo (nomo) de la bastono
     * @param {number} w larĝo
     * @param {number} h alto
     */
    static bastono(id,w=5,h=200) {
        return new LabBastono(id,w,h);
    }

     /**
     * Kreas sondilon
     * @param {string} id identigilo (nomo) de la sondilo
     * @param {number} w larĝo
     * @param {number} h alto
     * @param {number} klino klinangulo
     * @param {string} teksto la unuo + valoro monrenda sur la monitoreto
     */
    static sondilo(id,w=5,h=200,klino=0,teksto='') {
        return new LabSondilo(id,w,h,klino,teksto);
    }

    /**
     * Kreas 2D-diagramonon por montri mezurvalorojn.
     * Parametroj por la aksoj estas donitaj kiel objekto {id,min,max,int:intervalo,log}
     * intervalo: 1 por ĉiu x unu streko, 5 por ĉiu kvina ktp. (provizore ignorata)
     * 
     * @param {string} id unika nomo
     * @param {object} x_akso parametroj por x-akso
     * @param {object} y_akso parametroj por y-akso
     * @param {number} w larĝo
     * @param {number} h alto
     */
    static diagramo(id,x_akso,y_akso,w=300,h=200) {
        return new LabDiagramo(id,x_akso,y_akso,w,h);
    }

    /** 
     * Desegnas butonon
     */
    static butono(teksto,x,y,w,h,r=3) {
        const g= Lab.e("g", {
            class: "butono"
        });
        const c = Lab.e("rect", {
            x:x, y:y, width: w, height: h,
            rx: r
        });
        const t = Lab.e("text",{
            x: x+3, y: y+h/2
        },teksto);
        g.append(c,t);
        return g;
    }

    /**
     * Kreas gradienton
     * @param {object} ecoj la ecoj de la gradiento mem (konforme kun SVG linearGradient aŭ raidalGradient) 
     * @param {array} haltoj listo de haltoj en la formo {klaso,procento,opako,koloro}
     */
    static gradiento(ecoj,etapoj,ronda=false) {
        let grd;
        if (ronda) grd = Lab.e("radialGradient",ecoj)
        else grd = Lab.e("linearGradient",ecoj);
        const etpj = etapoj.map((e) => {
            const stp = Lab.e("stop",{
                offset: e.procento,
                "stop-opacity": e.opako
            });
            if (e.klaso) Lab.a(stp,{"class": e.klaso});
            if (e.koloro) Lab.a(stp,{"stop-color": e.koloro});
            return stp;
        });
        grd.append(...etpj);
        return grd;
    }

    /**
     * Kreas vertikalan skalon (por horizontala poste rotaciu je 90°)
     * @param {string} id 
     * @param {number} min minimuma valoro
     * @param {number} max maksimuma valoro
     * @param {number} di distanco inter du apudaj valoroj (x, x+i1)
     * @param {number} i1 plej malgranda paŝintervalo (mallongaj strekoj)
     * @param {number} i2 intervalo por mezlongaj strekoj
     * @param {number} i3 intervalo por longaj strekoj
     * @param {number} len longeco de streketo, kvinoj 1.5*len, dekoj: 2*len
     * @param {number} log bazo de la logritma skalo (momente ignorata): 1 = lineara, 2 = log2, Math.E = ln, 10 = log10
     */
    static skalo(id,min,max,di,i1=1,i2=5,i3=10,len=4,log=1) {
        // strekoj de la skalo
        let strekoj = '';
        for (let i = 0; i<=(max-min); i+=i1) {
            const y = di*i;
            const l = 2*len - len/2*Math.sign((min+i)%i2) - len/2*Math.sign((min+i)%i3);
            strekoj += `M8,${y} l${l},0`;
        }
        return Lab.e("path",{
            id: id,
            d: strekoj,
            class: "skalo"
        });
    }
 
}


class Laboratorio extends LabSVG {
    constructor(svg,f_id,f_w,f_h) {
        super(svg);
        this.aranĝo = Lab.e("g", {
            id: "lab_aranĝo"
        });

        if (f_id) {
            const fono = Lab.e("rect", {
                class: "lab_fono",
                width: f_w,
                height: f_h,
                rx: 4,
                id: f_id
            });
            //Lab.rrekt(f_w,f_h,4);
            //fono.id = f_id;
            this.aranĝo.append(fono);
        }

        this.svg.append(this.aranĝo);
        
        // vitro
        this.difinoj().append(
            Lab.gradiento(
            { id: "vitro", x1: "1.5%", x2: "98.5%"},
            [
                {procento:  "0%", koloro: "#00A", opako: ".5"},
                {procento:  "7%", koloro: "#09F", opako: ".2"},
                {procento:  "8%", koloro: "#fff", opako: ".5"},
                {procento: "55%", koloro: "#222", opako: "0.2"},
                //{procento: "60%", koloro: "#111", opako: "0"},
                {procento: "93%", koloro: "#000", opako: ".4"},
                {procento: "94%", koloro: "#114", opako: ".2"}
            ])
        )

        // vitro konusa
        this.difinoj().append(
            Lab.gradiento(
            { id: "vitro_konusa", gradientTransform: "skewX(5)" },
            [
                {procento:  "0%", koloro: "#fff", opako: ".5"},
                {procento: "55%", koloro: "#222", opako: "0.2"},
                //{procento: "60%", koloro: "#111", opako: "0"},
                {procento: "100%", koloro: "#000", opako: ".4"},
            ])
        )

        // ombroj
        this.difinoj().append(
            Lab.gradiento(
            {
                id: "r_gradiento_ombro",
                fx: "60%",
                fy: "10%"
            },
            [
                {procento: "0%", koloro: "#000", opako: ".25"},
                {procento: "60%", koloro: "#000", opako: ".6"},
                {procento: "100%", koloro: "#000", opako: "0"}
            ], true)
        );

        this.lokoj = {};
        this.iloj = {};
    }

    /**
     * Redonas la rekonilon 'id' de io. Se ne estas objekto estas supozeble jam tiu id
     */
    #id(io) {
        if ((typeof io === 'object') && ('id' in io)) return io.id
        else if (typeof io === 'string' || typeof io === 'number') return io;
        throw ('Donita varariablo estas nek ilo/loko kun .id nek identigilo mem!');
    }

    /**
     * Registru novan lokon
     * @param {*} loko 
     */
    nova_loko(loko) {
        this.lokoj[loko.id] = loko;
        return loko.id;
    }

    /**
     * Registru novan ilon
     * @param {*} ilo 
     */
    nova_ilo(ilo) {
        this.iloj[ilo.id] = ilo;
        // aldonu al desegno
        this.aranĝo.append(ilo.g);        
        return ilo.id;
    }

    /**
     * Kreas butonon
     */
    butono(teksto,x,y,w,h,r=3) {
        const btn = Lab.butono(teksto,x,y,w,h,r);
        this.aranĝo.append(btn);
        return btn;
    }


    /**
     * Okupas lokon per ilo, plendante se jam estas okupita
     * @param {string} _loko 
     * @param {string} _ilo 
     */
    #okupu(_loko,_ilo) {
        if (this.okupita(_loko)) {
            throw "Loko ${_loko} jam estas okupita!"
        } else {
            this.lokoj[_loko]._ilo = _ilo;
            this.iloj[_ilo]._loko = _loko;

            // ŝovu la ilon al tiu loko
            const l = this.lokoj[_loko];
            const i = this.iloj[_ilo];
            const X = l.x||0;
            const Y = l.y||0;
            Lab.a(i.g, {
                transform: `translate(${X} ${Y})`
            });
        }
    }

    /**
     * Forigas ilon de loko (sen aktualigi la desegnon, por ŝovi ilon al nova loko poste voku #okupu!)
     * @param {*} _loko 
     * @param {*} _ilo 
     */
    #malokupu(_loko,_ilo) {
        this.lokoj[_loko]._ilo = undefined
    }

    /**
     * Difinas reagon de ilo al klako
     * @param {*} ilo 
     * @param {function} reago 
     */
    klak_reago(ilo,reago) {
        const i = (typeof ilo === "object")? ilo : this.iloj[_ilo];
        const e = i instanceof SVGElement? i : i.g;
        e.addEventListener("click", (event) =>
        {
            reago(i,event);
        });
        e.classList.add("tuŝebla");
    }

    /**
     * Kontrolas, ĉu iu loko estas jam okupita
     */
    okupita(_loko) {
        return (typeof this.lokoj[_loko]._ilo !== 'undefined');
    }

    /** Metas novajn ilon en la aranĝon de la laboratorio,
     * @param {object} ilo la ilo, kreita per ujo() k.s.
     * @param {number} x x-koordinato (0=malsdesktre)
     * @param {number} y y-koordinato (0=supre)
     */
    metu(ilo,loko) {
        // ĉu loko estas nomo aŭ objekto?
        // se objekto ni registras ĝin nun
        let _loko = loko;
        if (typeof loko === "object") _loko = this.nova_loko(loko);

        // ĉu ilo estas nomo aŭ objekto?
        // se objekto ni registras ĝin nun
        let _ilo = ilo;
        if (typeof ilo === "object") _ilo = this.nova_ilo(ilo);

        this.#okupu(_loko,_ilo);
    }

    /**
     * Movas ilon de unu al alia loko, se refaru estas 'true' ni forigas kaj rekreas la objekton
     * per nova ilo (necesa ekz. se ni klinas, malplenigas botelon k.s.)
     * @param {*} ilo
     * @param {string} loko_al
     * @param {boolean} refaru
     * @param {object} nova_ilo
     */
    movu(ilo,loko_al,nova_ilo) {
        // ni povas okupi nur malplenan lokon
        if (this.okupita(loko_al)) {
            throw `Loko ${loko_al} estas jam okupita!`;
        }

        let _ilo = this.#id(ilo);
        const loko_de = this.iloj[_ilo]._loko;

        if (nova_ilo) {
            // forigu malnovan ilon de la desegno
            this.iloj[_ilo].g.remove();
            _ilo = this.nova_ilo(nova_ilo);
        };

        this.#malokupu(loko_de,_ilo);
        this.#okupu(loko_al,_ilo);
    }

     /**
     * Kreas eron kiel simbolo uzeble poste, ekz-e kiel falaĵo (guto, precipitero...)
     */
    ero_smb(id,r,cls="ero") {
        const dif = this.difinoj();

        // aldonu aprioran gradienton por blankaj eroj, se mankas ankoraŭ
        // PLIBONIGU: tiel ni povas ŝanĝi koloron nur per ŝanĝo de la klaso
        // alternative permesu krei individuajn gradientojn por unuopaj eroj!
        if (! dif.querySelector("#gradiento_precipito")) {
            dif.append(
            Lab.gradiento(
                {id: "gradiento_precipito"},
                [
                    { klaso: "p_blanka", procento: "20%", opako: "0.6"},
                    { klaso: "p_blanka", procento: "100%", opako: "0"}
                ],
                true)
            );
        }

        dif.append(Lab.e("circle",{
          id: id,
          r: r,
          class: cls,
          fill: "url(#gradiento_precipito)"
        }));
    }

    /**
     * Kreas gutojn de antaŭdifinita speco inter du punktoj
     * @param {string} gutoj_id unika nomo por la gutoj
     * @param {string} ero_id gutspeco antaŭe difinita per ero_smb()
     * @param {number} n nombro da gutoj
     * @param {object} fonto koordiatoj de fonto {id,x,y}, komparu pinto() de kelkaj objektoj
     * @param {object} celo koordinatoj de celo {id,x,y}, komparu surfaco() de kelkaj objektoj
     * @param {function} fine funkcio vokenda en la fino
     */
    gutoj(gutoj_id,ero_id,n,fonto,celo,fine) {
          // por verŝgutoj ni bezonas la pinton de la bureto kaj la surfacon de la flakonenhavo
      // PLIUBONIGU:
      // aldonu tiun logikon en Laboratorio donante al ĝi du objektojn resp. la
      // rezultojn de .pinto() kaj .surfaco()
      const fnt_g = this.iloj[fonto.id].g;
      const fnt = this.svgKoord(fnt_g,fonto.x,fonto.y);
      const cel_g = this.iloj[celo.id].g;
      const cel = this.svgKoord(cel_g,celo.x,celo.y);

      const verŝo = Lab.falaĵo(gutoj_id,"guto",
        // ero 1
        {
          id: ero_id, n: n,
          alto: 3, falaĵalto: 2,
          x0: fnt.x,
          supro: -fnt.y, // KOREKTU -y -> +y?
          daŭro: 1,  // daŭro: 1s
          faldistanco: cel.y - fnt.y, // vertikala falo!
          poste: (ev) => {
            const gutoj = document.getElementById(gutoj_id);
            if (gutoj) { // povas okazi ĉe paraleleco, ke la evento okazas pluroble
                // sed ni certigas per tiu ekzistotesto, ke ni vokas nur unfoje la fin-agon!
              gutoj.remove();
              if (fine) fine(ev);
            }
          }
        },
        // nulaj ceteraj parametroj de falaĵo!
        null,null,0,0);

      this.aranĝo.append(verŝo);
      for (const a of verŝo.querySelectorAll("animateMotion")) {
            a.beginElement();
      };
    }


    /**
     * Redonu transformmatricon por certa elemento en la aranĝo
     * @param {*} elemento 
     * @returns 
     */
    CTM(elemento) {    
        // vd. https://stackoverflow.com/questions/72738584/svg-getctm-not-returning-expected-x-y-values
        const ma = document.getElementById('lab_aranĝo').getCTM();
        const me = elemento.getCTM();
        return ma.inverse().multiply(me);
    }
    
    /**
     * Redonu SVG-koordinatojn de punkto ene de SVG-elemento kiel absolutaj koordinatoj en la aranĝo
     * t.e. apliku ĉujn transfromojn, de tiu elemento kaj ĉiaj gepatroj ĝis #lab_aranĝo
     * @param {*} elemento
     * @param {number} x 
     * @param {number} y 
     * @returns 
     */
    svgKoord(elemento,x, y) {
        // vd. komplikaĵojn, specifajn informojn kaj alternativojn en
        // https://stackoverflow.com/questions/10623809/get-bounding-box-of-element-accounting-for-its-transform
        // https://www.w3.org/TR/SVG11/coords.html
        // https://stackoverflow.com/questions/17817790/how-do-i-get-the-global-coordinates-of-a-grouped-svg-element
        // https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/
        const pt = new DOMPointReadOnly(x,y);       
        const ctm = this.CTM(elemento);
        return pt.matrixTransform(ctm);        
    }

}
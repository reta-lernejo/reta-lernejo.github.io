/**
 * Traktas SVG-grafikon faritan per la programo yED kiel mapon kun vojmontrilo,
 * kiun oni povas trairi simile al migrovojo. Ĉar la informo, kiuj eĝoj interligas
 * kiujn nodojn pli malpli perdiĝas en la eksporto (restus nur analizi la geometrion mem)
 * ni ekstraktas tiujn el la originala graphml-dosiero en la sekva formo:
 * const edges = {
  "e0": ["n1", "n2" ],
  "e1": ["n2", "n3" ],
  "e10": ["n9", "n2" ],...} // cd. relo-biokemio/pro/trf/graphml2model.pl
  Vi devas transdoni tiun eĝaron por krei mapon. Ĉion ceteran ni ekstraktas el la
  SVG-grafiko mem. Por tio ĉiu nodo havu aributon "href" kun loka URLo kiel legosigno.
  La nodoj por la vojmontrilo havu la URL-ojn #nun, #maldekstren, #dekstren kaj #rondvojo
  por povi distingi ilin de la stacioj en la mapo. Ni ŝovos la ŝildojn de la vojmontrilo
  al svg/defs kaj remetas ilin poste laŭ la aktuala pozicio per use-elementoj en la bildon.

  Ni evitas ĉiel ajn postuli mane aldoni iujn elmentojn sed provas fari la necesajn manipulojn
  per la skripto por faciligi la laboron de la desgnado.
 */

const xlink = 'http://www.w3.org/1999/xlink';

class YedMap {

    constructor(svg_elemento, eĝoj, je_stacio) {
        // svg_elemento povas doniĝi kiel Node aŭ Node.id
        this.svg = svg_elemento;
        if (typeof svg_elemento === 'string') {
            this.svg = document.getElementById(svg_elemento);
        }
        this.eghoj = eĝoj;
        this.nodoj = [];
        this.je_stacio = je_stacio;
    }

    preparu(start_url,rondvojo) {
        this.rondvojo = rondvojo;
        this.rv_pos = 0;

        const defs = this.svg.querySelector("defs");

        // trovu kaj preparu la nodojn en la mapo distingante staciojn de vojmontriloj 
        for (const n of this.svg.querySelectorAll("g[id]")) {
            const id = n.id;
            if (id.startsWith('y.node')) {
                // ni ekstraktas url + text
                let url = '', text = [], x = 0, y = 0, w = 0;
                // eltrovu la url en elmento a - per ĝi ni alternative identigos la nodojn
                const a = n.querySelector("a");
                if (a) {
                    url = a.getAttribute("xlink:href");
                }
                // eltrovu la pozicion de la unua text-elemento
                const t = n.querySelector("text");
                if (t) {
                    x = t.getAttribute("x");
                    y = t.getAttribute("y");
                    w = t.getBBox().width;
                }
                // distingi inter stacioj kaj vojmontriloj
                if (url == '#nun' || url == '#dekstren' || url == '#maldekstren' || url == '#vojmontrilo' ) {
                    // memoru la detalojn de la nodo
                    // vojmontrilojn ŝovu al def
                    if (url != '#nun') {
                        // ni ne plu bezonas la (unuan) text-elementon ene, ĉar ni anstataŭigis ĝin
                        // per unuopaj en g/use...
                        t.remove();
                        // ŝovu al defs
                        defs.append(n);
                    }
                    this.nodoj[id] = {tip: 'montrilo', url: url, x: x, y: y, w: w};
                } else if (url != '#nun') {
                    // memoru la nodon kun url, teksto por posta pli facila traktado
                    for (const t of n.querySelectorAll("text")) {
                        text.push(t.textContent);
                    }
                    this.nodoj[id] = {tip: 'stacio', url: url, teksto: text};    
                }
            }
        }

        // reagoj al klakoj sur nodo
        for (const a of this.svg.querySelectorAll("a")) {
            a.addEventListener("click",(event) => {
                event.preventDefault();               
                const href = event.currentTarget.getAttributeNS(xlink, 'href') 
                    || event.currentTarget.getAttribute("href");
                this.iru_al_url(href);
            })
        }

        // iru al komenco de la migrado
        this.iru_al_url(start_url);
    }

    url_nodo(url) {
        for (const [id,info] of Object.entries(this.nodoj)) {
            if (info.url == url) {
                return id;
            }
        }
    }

    url_nodo_info(url) {
        const id = this.url_nodo(url);
        return this.nodoj[id];
    }

    metu_tekston_url(url,teksto) {
        const id = this.url_nodo(url);
        if (id) {
            const n = document.getElementById(id);
            const tn = n.querySelector("text");
            if (tn) {
                tn.textContent = teksto.join('\n');
            }
        }
    }


    /**
     * Iru al la stacio identigitan per nodo_id, aktualigas
     * la ŝildojn de la vojmontrilo akorde
     */
    iru_al(nodo_id) {

        // kien ni iras en la mapo?
        const nun = this.nodoj[nodo_id];
        console.log('@'+JSON.stringify(nun));

        this.metu_tekston_url('#nun',nun.teksto);

        // ni supozas nodo_id = y.node.NN
        const idP = nodo_id.split('.');
        if (idP[1] == 'node') {

            const nn = "n"+idP[2];
            // por ĉiuj eĝoj elirantaj de la nuna nodo, ni
            // trovu la celon
            this.vm_malplenigu();
            let vm_n = 0;

            for (const e of Object.values(this.eghoj)) {
                if (e[0] == nn) {
                    const celnodo = "y.node."+e[1].substring(1);
                    const celo = this.nodoj[celnodo];
                    console.log(" --> "+JSON.stringify(celo));
                    this.vm_aktualigu(vm_n,celo,nodo_id);
                    vm_n++;
                }
            }
        }
    }

    iru_al_url(url) {
        if (je_stacio) je_stacio(url);
        const n = this.url_nodo(url);
        this.iru_al(n);
    }

    svg_attr(obj,atributoj) {
        for (const [atr,val] of Object.entries(atributoj)) {
            obj.setAttribute(atr,val);
        }    
    }

    sur_rondvojo(nun,celo) {
        for (let i=this.rv_pos; i<this.rondvojo.length-1; i++) {
            if (nun.url == this.rondvojo[i] && celo.url == this.rondvojo[i+1]) {
                // aktualigu la pozicion
                this.rv_pos = (i == this.rondvojo.length-2 
                    && this.rondvojo[0] == this.rondvojo[this.rondvojo.length-1])? 0 : i;
                return true;
            }
        }
    }

    /**
     * Kreas vojmontrilon
     * @param {*} url: #maldekstren | #dekstren | #rondvojo
     * @param {*} celo - la celnodo
     */
    vm_kreu(vm_n,vm_url,pos,celo) {
        const ns = "http://www.w3.org/2000/svg";
        const g = this.svg.querySelector(":scope>g"); // la ĉefa grupo

        const a_var = 4; // max. 4° oblikve!
        // const vm_url = ['#dekstren','#maldekstren'][Math.trunc(arbitra*vm_n)%2];
        const vm_id = this.url_nodo(vm_url);
        if (vm_id) {
            //this.metu_tekston_url(vm_url,teksto);
            const info = this.nodoj[vm_id];
            const ŝovo = pos.y0 + vm_n*pos.dy - info.y;
            // console.log(`n: ${vm_n} y0: ${y0} dy: ${dy} y: ${info.y} ŝ: ${ŝovo}`);

            // kreu vojmontrilon kiel g-elemento kun use- (referencante al defs) kaj a-elementoj
            const vm = document.createElementNS(ns,"g");            
            const alpha = Math.trunc(a_var*pos.arbitra); 
                //alternative normaldistribue: 
                // Math.trunc(5*7*(Math.exp(Math.sin(vm_n+nn)**2/-2)-0.8)); 
            const cx = Math.trunc(info.x + info.w/2) || info.x;
            let tf = `rotate(${alpha} ${cx} ${info.y})`;
            if (ŝovo) tf += ` translate(0 ${ŝovo})`;
            console.log("tf: "+tf);
            this.svg_attr(vm, {
                "class": "vm",
                "text-rendering": "geometricPrecision",
                "font-family": "sans-serif",
                "transform": tf
            }); 
            const u = document.createElementNS(ns,"use");
            const a = document.createElementNS(ns,"a");
            const t = document.createElementNS(ns,"text");
            this.svg_attr(a, {
                href: celo.url
            });

            // ĉar novkreitaj ni devas realdoni la klak-reagon
            a.addEventListener("click",(event) => {
                event.preventDefault();               
                const href = event.currentTarget.getAttributeNS(xlink, 'href') 
                    || event.currentTarget.getAttribute("href");
                this.iru_al_url(href);
            })
            // la surskribo   
            this.svg_attr(t, {
                    x: info.x,
                    y: info.y,
                    transform: "matrix(1,0,0,1,58,-32)"
                });
            t.textContent = celo.teksto;
            u.setAttribute("href","#"+vm_id);
            a.append(t); vm.append(u,a); g.append(vm);
        }
    }

    vm_malplenigu() {
        // forigu ĉiujn unuopajn vojmontrilojn
        //for (const use of this.svg.querySelectorAll(":scope>g use")) use.remove();
        for (const g of this.svg.querySelectorAll(".vm")) g.remove();
    }

    vm_aktualigu(vm_n,celo,nodo_id) {
        // por posta poziciado ni bezonas
        // la plej supran kaj distancon inter vojmontriloj 
        const nn = nodo_id.split('.')[2];
        const yd = this.url_nodo_info('#dekstren').y;
        const ym = this.url_nodo_info('#maldekstren').y;
        const pos = {
            dy: Math.abs(ym - yd),
            y0: Math.min(ym,yd),
            arbitra: Math.sin(vm_n+nn) // -1..1
               // uzante Math.sin(vm_n+nn) kiel pseŭdo-arbitran nombron
               // ni certigas ĉiam saman aspekton de vojmontriloj en unu stacio!
        }

        // se la eĝo troviĝas sur rondvojo ni uzas la rondvojo-ŝildon
        const nun = this.nodoj[nodo_id];
        const rv = this.sur_rondvojo(nun,celo);

        const vm_url = rv? '#rondvojo' : ['#dekstren','#maldekstren'][Math.trunc((pos.arbitra+1))%2];
        this.vm_kreu(vm_n,vm_url,pos,celo);
    }
}
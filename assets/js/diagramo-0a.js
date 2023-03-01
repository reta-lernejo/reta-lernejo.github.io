class Diagramo {

    /**
     * Kreas desegnoareon por diagramo
     * @param {HTMLElement} canvas HTML-kanvas-elemento por desegni la diagramon 
     */
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
    }

    /**
     * Viŝas la tutan areon por redesegni la diagramon
     */
    viŝu(koloro) {
        if (koloro) {
            this.ctx.fillStyle = koloro;
            this.ctx.fillRect(0, 0,  this.ctx.canvas.width, this.ctx.canvas.height);        
        } else {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    }

    /**
     * Desegnas linion en la diagramo
     * @param {number} x0 x-valoro de komenca punkto
     * @param {number} y0 y-valoro de komenca punkto
     * @param {number} x1 x-valoro de fina punkto
     * @param {number} y1 y-valoro de fina punkto
     * @param {string} koloro linia koloro (angla nomo aŭ HTML-kolor-kodo, "black", se ne donita)
     */
    linio(x0,y0,x1,y1,koloro="black") {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.strokeStyle = koloro;
        this.ctx.stroke(); 
    }


    /**
     * Desegnas punkton, t.e. plenigitan cirklon, en la diagramo
     * @param {number} x x-valoro de la centro
     * @param {number} y y-valoro de la centro
     * @param {number} r radiuso de la punkto (cirklo)
     * @param {string} koloro cirkla koloro (angla nomo aŭ HTML-kolor-kodo, "black", se ne donita)
     */
    punkto(x,y,r=1,koloro="black") {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.fillStyle = koloro;
        this.ctx.fill();
    }

    /**
     * Skribas horizontale centrigitan tekston
     * @param {number} x x-valoro de la centro
     * @param {number} y y-valoro de la centro
     * @param {string} teksto teksto skribenda
     */
    teksto_x(x,y,teksto,koloro="black") {
        this.ctx.font = "12px sanserif";
        this.ctx.fillStyle = koloro;
        const m = this.ctx.measureText(teksto);
        this.ctx.fillText(teksto,x-m.width/2,y);
    }

    /**
     * Skribas vertikale centrigitan tekston
     * @param {number} x x-valoro de la centro
     * @param {number} y y-valoro de la centro
     * @param {string} teksto teksto skribenda
     */
    teksto_y(x,y,teksto,koloro="black") {
        this.ctx.font = "12px sanserif";
        this.ctx.fillStyle = koloro;
        //const m = this.ctx.measureText(teksto);
        this.ctx.fillText(teksto,x,y+6); // 12px/2 = 6
    }
    
    /**
     * Desegnas skalon ĉe la x-akso
     * @param {number} start valoro ĉe la maldekstra rando de la diagramo
     * @param {number} stop valoro ĉe la dekstra rando de la diagramo
     * @param {number} istrek intervalo por strekoj (estu negativa se start>stop)
     * @param {number} inmb intervalo por nombroj
     * @param {number} prec precizeco de nombroj, ĉe pli longaj uziĝas eksponenta prezento
     * @param {string} unuo mezurunuo skribita ĉe la akso
     */
    skalo_x(start,stop,istrek,inmb,prec=1,unuo,koloro="black",supre=false,xfunc) {
        const w = this.ctx.canvas.width;
        const h = supre? 0 : this.ctx.canvas.height;
        const s = supre? 1: -1;
        const cx = (x) => (x-start)*w/(stop-start);
        const inter = (v,v1,v2,d=0) => v >= Math.min(v1,v2)+d && v <= Math.max(v1,v2)-d;
        const xstart = Math.ceil(start/istrek)*istrek
        let x = xstart;
        while (inter(x,start,stop)) {
            const cif = !(x%inmb);
            let len = cif? 10:4;
            const xx = cx(x);
            this.linio(xx,h,xx,h+s*len,koloro);
            if (cif && inter(x,start,stop,Math.abs(istrek)/2)) {
                const cy = supre? h+len+2+12 : h-len-2;
                const cx = xfunc? xfunc(x) : x; 
                const n = prec? cx.toPrecision(prec) : cx;
                this.teksto_x(xx,cy,n,koloro)
            }
            x += istrek;
        }
        // skribu la unuon
        const ty = supre? h+4+12 : h-6;
        this.teksto_x(w-12,ty,unuo,koloro);
    }

    /**
     * Desegnas skalon ĉe la y-akso
     * @param {number} min minimuma valoro
     * @param {number} max maksimuma valoro
     * @param {number} istrek intervalo por strekoj
     * @param {number} inmb intervalo por ciferoj 
     * @param {number} prec precizeco de nombroj, ĉe pli longaj uziĝas eksponenta prezento
     * @param {string} unuo mezurunuo skribita ĉe la akso
     */
    skalo_y(min,max,istrek,inmb,prec=1,unuo,koloro="black") {
        const w = this.ctx.canvas.width;
        const h = this.ctx.canvas.height;
        const cy = (y) => h - (y-min)*h/(max-min);
        let y = min;
        while (y <= max) {
            const cif = !(y%inmb);
            const len = cif? 10:4;
            const yy = cy(y);
            this.linio(0,yy,len,yy,koloro);
            if (cif && y>min && y<max) {
                const n = prec? y.toPrecision(prec) : x;
                this.teksto_y(len,yy,n,koloro)
            }
            y += istrek;
        }
        // skribu la unuon
        this.teksto_y(10,10,unuo,koloro);
    }
}
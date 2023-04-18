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
     * @param {number} ll linilarĝo
     */
    linio(x0,y0,x1,y1,koloro="black",ll=1) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.strokeStyle = koloro;
        this.ctx.lineWidth = ll;
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
     * Desegnas koloran, senrandan rektangulon
     * @param {number} x koordinato de dekstra rando
     * @param {number} y koordinato de supra rando
     * @param {number} w larĝo
     * @param {number} h alto
     * @param {string} koloro 
     */
    rektangulo(x,y,w,h,koloro="gray") {
        this.ctx.beginPath();
        this.ctx.fillStyle = koloro;
        this.ctx.fillRect(x, y, w, h);
    }


    /**
     * Desegnas koloran, senrandan rektangulon kun kolorgradiento (horizontala)
     * @param {number} x koordinato de dekstra rando
     * @param {number} y koordinato de supra rando
     * @param {number} w larĝo
     * @param {number} h alto
     * @param {string} k1 koloro maldekstra 
     * @param {string} km koloro meza
     * @param {string} k2 koloro dekstra
     */
    rektangulo_h3k(x,y,w,h,k1="black",km="white",k2="black") {
        this.ctx.beginPath();
        //const gradient = this.ctx.createLinearGradient(x,0,x+w,0);
        const gradient = this.ctx.createLinearGradient(x,0,x+w,0);
        gradient.addColorStop(0,k1);
        gradient.addColorStop(0.5,km);
        gradient.addColorStop(1,k2);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, w, h);
    }

    /**
     * Desegnas koloran, senrandan rektangulon kun kolorgradiento (cirkla)
     *
     * por havi alian koloron ĉe ciu angulo, oni devas kombini plurajn gradientojn, vd.
     * https://stackoverflow.com/questions/62808328/gradients-at-each-vertex-of-a-triangle-with-html5-canvas 
     * @param {number} x koordinato de dekstra rando
     * @param {number} y koordinato de supra rando
     * @param {number} w larĝo
     * @param {number} h alto
     * @param {string} km koloro meza
     * @param {string} ka koloro angula (eble sama sed travidebla)
     */
    rektangulo_gr(x,y,w,h,km="#FFFFFFFF",ka="FFFFFF00") {
        this.ctx.beginPath();
        //const gradient = this.ctx.createLinearGradient(x,0,x+w,0);
        const gradient = this.ctx.createRadialGradient(
            x+w/2, y+h/2, 0,
            x+w/2, y+h/2, Math.sqrt(w*w+h*h)/2);
        gradient.addColorStop(0,km);
        gradient.addColorStop(1,ka);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(x, y, w, h);
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
        this.X = {min: start, max: stop};
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
        this.Y = {min: min, max: max};
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
                const n = prec? y.toPrecision(prec) : y;
                this.teksto_y(len,yy,n,koloro)
            }
            y += istrek;
        }
        // skribu la unuon
        this.teksto_y(10,10,unuo,koloro);
    }

    /**
     * Kalkulas la skalajn koordinatojn al pikseloj de la desegnoareo.
     * Tio funkcias nur, se vi antaŭe vokis skalo_x kaj skalo_y aŭ
     * mane donis ekstremojn en this.X, this.Y
     * @param {*} X koordinato laŭ x-skalo
     * @param {*} Y koordinato laŭ y-skalo
     */
    koord_xy(X,Y) {
        const cx = this.ctx.canvas.width * (X - this.X.min) / (this.X.max - this.X.min);
        const cy = this.ctx.canvas.height - this.ctx.canvas.height * (Y -this.Y.min) / (this.Y.max - this.Y.min);
        return {x: cx, y: cy};
    }


    /**
     * Redonas kolorvaloron, tiu kolorvaloro estu uzata kiel unua argumento h de hsl(h,s,l)
     * @param {number} valoro la valoro, kiun traduki al kolorvaloro
     * @param {number} vbluo valoro (minimuma) kiu redonu bluon (h=240)
     * @param {number} vruĝo valoro (maksimuma) kiu redonu ruĝon (h=0)
     */
    static kolorvaloro(valoro,vbluo,vruĝo) {
        return 240 - 240*(valoro-vbluo)/(vruĝo-vbluo);
    }

    /**
     * Kalkulas deksesuman kolorindikon el h/s/l-valoroj
     * @param {*} h kolorvaloro (0..360)
     * @param {*} s kolorsatureco (0..100)
     * @param {*} l heleco (0..100)
     * @returns 
     */
    static hsl2hex(h,s,l) {
        s /= 100;
        l /= 100;
      
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0, 
            b = 0; 
      
        if (0 <= h && h < 60) {
          r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
          r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
          r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
          r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
          r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
          r = c; g = 0; b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);
      
        // Prepend 0s, if necessary
        if (r.length == 1)
          r = "0" + r;
        if (g.length == 1)
          g = "0" + g;
        if (b.length == 1)
          b = "0" + b;
      
        return "#" + r + g + b;
    }
}
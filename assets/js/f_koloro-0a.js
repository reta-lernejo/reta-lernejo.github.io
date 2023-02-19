class Koloro {
    // vd. http://www.midnightkite.com/color.html por superrigardo

    /*
    *      CIE koloroj x,y,z
    *      por ondlongoj de 380nm ĝis 780nm en paŝoj de 5nm
    */

    static xyz_380_780 = [
            [0.0014, 0, 0.0065],
            [0.0022, 0.0001, 0.0105],
            [0.0042, 0.0001, 0.0201],
            [0.0076, 0.0002, 0.0362],
            [0.0143, 0.0004, 0.0679],
            [0.0232, 0.0006, 0.1102],
            [0.0435, 0.0012, 0.2074],
            [0.0776, 0.0022, 0.3713],
            [0.1344, 0.0040, 0.6456],
            [0.2148, 0.0073, 1.0391],
            [0.2839, 0.0116, 1.3856],
            [0.3285, 0.0168, 1.6230],
            [0.3483, 0.0230, 1.7471],
            [0.3481, 0.0298, 1.7826],
            [0.3362, 0.0380, 1.7721],
            [0.3187, 0.0480, 1.7441],
            [0.2908, 0.0600, 1.6692],
            [0.2511, 0.0739, 1.5281],
            [0.1954, 0.0910, 1.2876],
            [0.1421, 0.1126, 1.0419],
            [0.0956, 0.1390, 0.8130],
            [0.0580, 0.1693, 0.6162],
            [0.0320, 0.2080, 0.4652],
            [0.0147, 0.2586, 0.3533],
            [0.0049, 0.3230, 0.2720],
            [0.0024, 0.4073, 0.2123],
            [0.0093, 0.5030, 0.1582],
            [0.0291, 0.6082, 0.1117],
            [0.0633, 0.7100, 0.0782],
            [0.1096, 0.7932, 0.0573],
            [0.1655, 0.8620, 0.0422],
            [0.2257, 0.9149, 0.0298],
            [0.2904, 0.9540, 0.0203],
            [0.3597, 0.9803, 0.0134],
            [0.4334, 0.9950, 0.0087],
            [0.5121, 1.0000, 0.0057],
            [0.5945, 0.9950, 0.0039],
            [0.6784, 0.9786, 0.0027],
            [0.7621, 0.9520, 0.0021],
            [0.8425, 0.9154, 0.0018],
            [0.9163, 0.8700, 0.0017],
            [0.9786, 0.8163, 0.0014],
            [1.0263, 0.7570, 0.0011],
            [1.0567, 0.6949, 0.0010],
            [1.0622, 0.6310, 0.0008],
            [1.0456, 0.5668, 0.0006],
            [1.0026, 0.5030, 0.0003],
            [0.9384, 0.4412, 0.0002],
            [0.8544, 0.3810, 0.0002],
            [0.7514, 0.3210, 0.0001],
            [0.6424, 0.2650, 0],
            [0.5419, 0.2170, 0],
            [0.4479, 0.1750, 0],
            [0.3608, 0.1382, 0],
            [0.2835, 0.1070, 0],
            [0.2187, 0.0816, 0],
            [0.1649, 0.0610, 0],
            [0.1212, 0.0446, 0],
            [0.0874, 0.0320, 0],
            [0.0636, 0.0232, 0],
            [0.0468, 0.0170, 0],
            [0.0329, 0.0119, 0],
            [0.0227, 0.0082, 0],
            [0.0158, 0.0057, 0],
            [0.0114, 0.0041, 0],
            [0.0081, 0.0029, 0],
            [0.0058, 0.0021, 0],
            [0.0041, 0.0015, 0],
            [0.0029, 0.0010, 0],
            [0.0020, 0.0007, 0],
            [0.0014, 0.0005, 0],
            [0.0010, 0.0004, 0],
            [0.0007, 0.0002, 0],
            [0.0005, 0.0002, 0],
            [0.0003, 0.0001, 0],
            [0.0002, 0.0001, 0],
            [0.0002, 0.0001, 0],
            [0.0001, 0, 0],
            [0.0001, 0, 0],
            [0.0001, 0, 0],
            [0, 0, 0]
    ];

    /**
     * Kalkulas la spektran radion de nigra radianto
     * por specifa ondolongo l kaj temperaturo T
     * @param {number} ol ondolongo en nm
     * @param {number} T temperaturo en Kelvin
     */
    static spektro(ol,T) {
        // konstantoj
        const h = 6.62607015e-34 ;// Planka efikokvantumo en Js
        const c = 2.99792458e8; // lumrapido en m/s
        const kB = 1.380649e-23; // Boltzmann-konstanto en J/K

        const c1 = 2*Math.PI*h*c*c; // *Math.PI
        const c2 = h*c/kB; // faktoro por nm: 1e9

        const l = ol*1e-9;
        return c1 / (Math.pow(l,5)*(Math.exp(c2/l/T)-1))
    }

    /**
     * Koloro de nigra radianto depende de temperaturo en XYZ-spaco 
     * laŭ Dan Bruton (astro@sfasu.edu)
     * http://www.physics.sfasu.edu/astro/color/blackbodyc.txt
     * 
     * PLIBONIGU: sub 1000K la ruĝo malheliĝu ĝis 0 ĉe 750K
     * 
     * @param {number} T temperaturo en Kelvin
     */
    static nigra_radianto_xyz(T) {
        const nbj = Koloro.xyz_380_780.length;

        // kuru tra bendoj de onolongoj
        // kaj integrigu la kolorojn per la trapezoida metodo
        let XX = 0.0, YY = 0.0, ZZ = 0.0;
        for (let bendo=0; bendo<nbj; bendo++) {
            // propre pezigi la finpunktojn
            const pezo = ((bendo==0) || (bendo==nbj-1))? 0.5 : 1.0;
            const ol = 380.0 + bendo * 5.0; // ondolono en nm
            // spektroformulo de nigra radianto laŭ Planck
            // const S = c1*(1 / pow(ol,5)) / (exp(c2/(ol*T))-1);
            const S = Koloro.spektro(ol,T);
            // simpla integrado tra la bendoj 
            XX = XX + pezo * S * Koloro.xyz_380_780[bendo][0];
            YY = YY + pezo * S * Koloro.xyz_380_780[bendo][1];
            ZZ = ZZ + pezo * S * Koloro.xyz_380_780[bendo][2];
        } 

        // redonu renormigigtajn la kolorvalorojn
        const dm = Math.max(XX,YY,ZZ);
        if (dm>0) return [XX/dm,YY/dm,ZZ/dm];
        return [0,0,0];
    } 


    /**
     * Koloro de nigra radianto depende de temperaturo en RGB-spaco 
     * laŭ Dan Bruton (astro@sfasu.edu)
     * http://www.physics.sfasu.edu/astro/color/blackbodyc.txt
     * 
     * @param {number} T temperaturo en Kelvin
     */
    static nigra_radianto_rgb(T) {
        if (T<750) {
            return [0,0,0]
        } else if (T<1000) {
            return [(T-750)/(1000-750),0,0]
        } else {
            const [x,y,z] = Koloro.nigra_radianto_xyz(T);
            return Koloro.xyz2rgb(x,y,z);    
        }
    }


    /**
     * Redonas la koloron kiel RGB-valoro respondan al la ondolongo de videbla lumo
     * La paĝo https://aty.sdsu.edu/explain/optics/rendering.html prezentas pli
     * bonajn prezentojn de la spektro.
     * 
     * @param {number} ol ondolongo en nm [380..780]
     */
    static lumkoloro(ol) {
        // http://www.midnightkite.com/color.html
        // http://www.physics.sfasu.edu/astro/color/spectra.html, Dan Bruton (astro@tamu.edu)
        const gammo = 0.8;

        if (ol<380 || ol>780) return "#000000";

        let r=0, g=0, b=1;
        if (ol>=380 && ol<= 440) {
            r = (440-ol)/(440-380);
        } else if (ol<=490) {
            g = (ol-440)/(490-440);
        } else if (ol<=510) {
            g = 1;
            b = (510-ol)/(510-490);
        } else if (ol<580) {
            r = (ol-510)/(580-510);
            g = 1;
            b = 0;
        } else if (ol<645) {
            r = 1;
            g = (645-ol)/(645-580);
            b = 0;
        } else if (ol<780) {
            r = 1;
            b = 0;
        }

        // inteseco falas proksime de vidlimoj
        let sss = 1;
        if (ol>700) {
            sss = 0.3 + 0.7*(780-ol)/(780-700);
        } else if (ol<420) {
            sss = 0.3 + 0.7*(ol-380)/(420-380);
        }

        return Koloro.rgb_gammo(sss*r,sss*g,sss*b,
            gammo);
    }



    /**
     * Traduki kolorojn el la kolorspaco XYZ al RGB-spaco
     */
    static xyz2rgb(X, Y, Z) {

        // kolorkoordinatoj por ruĝa, verda, blua kaj blanka
        const Xruĝa = 0.64, Yruĝa = 0.33;
        const Xverda = 0.29, Yverda = 0.60;
        const Xblua = 0.15, Yblua = 0.06;
        const Zruĝa = 1.0 - (Xruĝa+Yruĝa);
        const Zverda = 1.0 - (Xverda+Yverda);
        const Zblua = 1.0 - (Xblua+Yblua);

        const denom =
            (Xruĝa*Yverda-Xverda*Yruĝa)*Zblua
            + (Xblua*Yruĝa-Xruĝa*Yblua)*Zverda
            + (Xverda*Yblua-Xblua*Yverda)*Zruĝa;

        let r = (
            (X*Yverda-Xverda*Y)*Zblua
            + (Xverda*Yblua-Xblua*Yverda)*Z
            + (Xblua*Y-X*Yblua)*Zverda
            )/denom;
        
        let g = (
            (Xruĝa*Y-X*Yruĝa)*Zblua
            + (Xblua*Yruĝa-Xruĝa*Yblua)*Z
            + (X*Yblua-Xblua*Y)*Zruĝa
            )/denom;
        
        let b = (
            (Xruĝa*Yverda-Xverda*Yruĝa)*Z
            + (X*Yruĝa-Xruĝa*Y)*Zverda
            + (Xverda*Y-X*Yverda)*Zruĝa
            )/denom;

        if (r < 0.0) r = 0.0;
        if (r > 1.0) r = 1.0;
        if (g < 0.0) g = 0.0;
        if (g > 1.0) g = 1.0;
        if (b < 0.0) b = 0.0;
        if (b > 1.0) b = 1.0;

        return [r,g,b]
    }


    /**
     * Aplikas gammo-korekton al rgb-koloro kaj ankaŭ skalas de 1 al 255
     * redonante la koloron kiel deksesuma kodo
     */
    static rgb_gammo(r,g,b,gammo) {
        const [R,G,B] = [r,g,b].map((c) => {
            // gammokorekto
            const cv = c**gammo;
            // skalo 255
            return Math.round(255*cv);
        })
        return Koloro.rgb2hex(R,G,B);    
    }

    /**
     * Konvertas kolorvalorojn r,g,b al deksesuma kodo
     * ekz-e 255,128,0 al #ff8000
     */
    static rgb2hex(r,g,b) {
        const c2h = (c) => {
            const h = c.toString(16);
            return h.length == 1 ? "0"+h:h;
        }
        return "#" + c2h(r) + c2h(g) + c2h(b);
    }


}
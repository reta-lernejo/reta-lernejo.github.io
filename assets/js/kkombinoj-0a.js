const kkombinoj = {
    // kombinaĵoj/jonoj kun H,O
    H2:  { a: "H2", l: { h1: "3-h2" } }, // l: angulo, ligtipo, celatomo
    "H^+":  { j: "H+" }, 
    O2:  { a: "O2", l: { o1: "3=o2" }, e: { o1: "7:y:", o2: "1:5:" } }, // e-paroj de unua O: ĉe horloĝ-ciferoj 7 kaj 11 (y), de dua O: ĉe ciferoj 1 kaj 5
    H2O: { a: "OH2", l: { o: "dme-h1 mA-h2" }, e: { o: "Z:ma:" } }, // anguloj de H: dme = 180°-51,5° A = +105°, anguloj de e-paroj: mZ = -42° a = +85°
    "OH^-": { a: "OH", l: { o: "3-h" }, e: { o: "0:6:9:"}, s: { _: "-", o: "-"} },

    // kombinaĵoj/jonoj kun N
    N2:  { a: "N2", l: { n1: "3#n2" }, e: { n1: "9:", n2: "3:" } },
    NH3: { a: "NH3", l: { n: "1-h1 3-h2 5-h3" }, e: {n: "9:" }},

    // kombinaĵoj/jonoj kun C
    C: { a: "C", e: { c: "0.3.6.9." } },
    CO2: { a: "CO2", l: { c: "3=o2 9=o1" }, e: { o1: "7:y:", o2: "1:5:" } }, 
    CO: { a: "CO", l: { c: "3#o" }, e: { c: "9:", o: "3:" }, s: { c: "-", o: "+" } },
    CH4: { a: "CH4", l: { c: "0-h1 3-h2 6-h3 9-h4"} }, // l: pli mallonge eble: "-% h1 h2 h3 h4"

    // kombinaĵoj / jonoj kun Fe
    Fe: { a: "Fe" },
    "Fe^2+": { j: "Fe2+" },
    Fe2O3: { j: ["O2-","Fe3+","O2-","Fe3+","O2-"], e: { o1: "0:3:6:9:", o2: "0:3:6:9:", o3: "0:3:6:9:" } },
    Fe3O4: { j: ["O2-","Fe3+","O2-","Fe2+","O2-","Fe3+","O2-"], e: { o1: "0:3:6:9:", o2: "0:3:6:9:", o3: "0:3:6:9:", o4: "0:3:6:9:" } },
    "Fe(OH)3": { a: "Fe", 
        g: { "OH": { a: "OH", on: "-2 +1" } }, 
        l: { fe: "0-OH 4-OH 8-OH" }, 
        on: "+3"
    },
    FeO: { j: ["O2-","Fe2+"], e: { o: "0:3:6:9:"} },

    // kombinaĵoj/jonoj kun S
    H2S: { a: "SH2", l: { s: "1A-h1 k-h2" }, e: { s: "x:2:" } },
    SO2: { a: "SO2", l: { s: "4=o1 8=o2" }, e: { s: "0:", o1: "2:6:", o2: "6:x:" } },

    
    // https://en.wikipedia.org/wiki/Glucose#/media/File:Alpha_glucose_views.svg
    /*
    C6H12O6: { a: "C6H12O6", l: {  
    c1: "0-h1 3-h2 6-c2 9-o1",
    o1: "9-h3",
    c2: "3==o6 5-h4 7--c3",
    c3: "y-h5 5--c4 7-o2",
    o2: "9-h6",
    c4: "0-o3 3--c5 6-h7",
    o3: "3-h8",
    c5: "0-h9 1--c6 6-o4",
    o4: "3-h10",
    c6: "1-h11 5-o5 y==o6",
    o5: "3-h12"
    } }*/

    // malgrandaj organikaj kombinaĵoj
    C6H12O6: { a: "C6O",  // glukozo
        g: { 
            "OH": { a: "OH", on: "-2 +1" } 
        }, 
        l: { 
            c1: "x-o 2>OH 6-c2", 
            c2: "4>OH 8-c3",
            c3: "6<OH x-c4",
            c4: "8>OH 0-c5",
            c5: "x<c6 2-o",
            c6: "0-OH" }, 
        on: "+1 0 0 0 0 -1 -2" 
    }
}
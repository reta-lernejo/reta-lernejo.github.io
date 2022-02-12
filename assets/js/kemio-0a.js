

const elemento = function() {

    const elementoj = [
        'hidrogeno (H)',
        'heliumo (He)',
        'litio (Li)',
        'berilio (Be)',
        'boro (B)',
        'karbono (C)',
        'azoto (N)',
        'oksigeno (O)',
        'fluoro (F)',
        'neono (Ne)',
        'natrio (Na)',
        'magnezio (Mg)',
        'aluminio (Al)',
        'silicio (Si)',
        'fosforo (P)',
        'sulfuro (S)',
        'kloro (Cl)',
        'argono (Ar)',
        'kalio (K)',
        'kalcio (Ca)',
        'skandio (Sc)',
        'titano (Ti)',
        'vanado (V)',
        'kromo (Cr)',
        'mangano (Mn)',
        'fero (Fe)',
        'kobalto (Co)',
        'nikelo (Ni)',
        'kupro (Cu)',
        'zinko (Zn)',
        'galiumo (Ga)',
        'germaniumo (Ge)',
        'arseno (As)',
        'seleno (Se)',
        'bromo (Br)',
        'kriptono (Kr)',
        'rubidio (Rb)',
        'stroncio (Sr)',
        'itrio (Y)',
        'zirkonio (Zr)',
        'niobo (Nb)',
        'molibdeno (Mo)',
        'teknecio (Tc)',
        'rutenio (Ru)',
        'rodio (Rh)',
        'paladio (Pd)',
        'arĝento (Ag)',
        'kadmio (Cd)',
        'indio (In)',
        'stano (Sn)',
        'antimono (Sb)',
        'teluro (Te)',
        'jodo (I)',
        'ksenono (Xe)',
        'cezio (Cs)',
        'bario (Ba)',
        'lantano (La)',
        'cerio (Ce)',
        'prazeodimo (Pr)',
        'neodimo (Nd)',
        'prometio (Pm)',
        'samario (Sm)',
        'eŭropio (Eu)',
        'gadolinio (Gd)',
        'terbio (Tb)',
        'disprozio (Dy)',
        'holmio (Ho)',
        'erbio (Er)',
        'tulio (Tm)',
        'iterbio (Yb)',
        'lutecio (Lu)',
        'hafnio (Hf)',
        'tantalo (Ta)',
        'volframo (W)',
        'renio (Re)',
        'osmio (Os)',
        'iridio (Ir)',
        'plateno (Pt)',
        'oro (Au)',
        'hidrargo (Hg)',
        'talio (Tl)',
        'plumbo (Pb)',
        'bismuto (Bi)',
        'polonio (Po)',
        'astato (At)',
        'radono (Rn)',
        'franciumo (Fr)',
        'radiumo (Ra)',
        'aktiniumo (Ac)',
        'torio (Th)',
        'protaktinio (Pa)',
        'uranio (U)',
        'neptunio (Np)',
        'plutonio (Pu)',
        'americio (Am)',
        'kuriumo (Cm)',
        'berkelio (Bk)',
        'kaliforniumo (Cf)',
        'ejnŝtejnio (Es)',
        'fermio (Fm)',
        'mendelevio (Md)',
        'nobelio (No)',
        'laŭrencio (Lr)',
        'ruterfordio (Rf)',
        'dubnio (Db)',
        'seborgio (Sg)',
        'borio (Bh)',
        'hasio (Hs)',
        'mejtnerio (Mt)',
        'darmŝtatio (Ds)',
        'rentgenio (Rg)',
        'kopernicio (Cn)',
        'nihonio (Nh)',
        'flerovio (Fl)',
        'moskovio (Mc)',
        'livermorio (Lv)',
        'teneso (Ts)',
        'oganesono (Og)'
        ];

    function nomo(nro) { return elementoj[nro-1].split(' ')[0] };
    function nomo_mlg(nro) { return elementoj[nro-1] };
    function mallongigo (nro) {
        const m = elementoj[nro-1].split(' ')[1];
        return m.slice(1,-1);
    };

    return {
        nomo: nomo,
        nomo_mlg: nomo_mlg,
        mallongigo: mallongigo
    }
}();

const atommodelo = function () {
    function subŝeloIteraciilo() {
        let nivelo = 1;
        let n = 1;

        // trakuras laŭ kreskanta energinivelo (n+l) la
        // subŝeloj priskribitajn per kvantumnombroj n kaj l
        const ssIterator = {

            next: function() {
                // aktuala subŝelo
                const l = nivelo - n;  // energio: n + l = nivelo
                const result = {value:  [n,l], done: (nivelo>8  )};

                if ( n < Math.min(nivelo,7) ) {
                    n++;
                } else {
                    // sekva energinivelo
                    nivelo++;
                    // l: [0..n-1], do n: [(nivelo+1)/2]..nivelo
                    n = Math.trunc(nivelo/2)+1;
                }
                return result;
            }
        };
        return ssIterator;
    }

    return {
        subŝeloIteraciilo: subŝeloIteraciilo
    }
}();
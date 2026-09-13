---
layout: laborfolio
title: Antenolongoj
js:
  - folio-0c
---

<!--
https://www.hamuniverse.com/randomwireantennalengths.html
https://udel.edu/~mm/ham/randomWire/
https://udel.edu/~mm/ham/randomWire/endfed.py

-->

Kiam oni konstruas antenon per longa drato oni evitu longojn kiuj estas duobloj de la dezirataj ondolongoj. 
La minimuma longo estu kvarono de la plej longa ondolongo, kiun oni volas ricevi. Ĉe dipolo ambaŭ flankoj estu
samlongaj (do kune almenaŭ duono de la ondolongo).

Oni povas kalkuli malbonajn longojn por pluraj bendoj. La bonaj longoj estas meze de la malbonaj intervaloj.

Bendoj, kiujn vi volas ricevi:

[] 6m [] 10m [] 12m [] 15m [] 17m [] 20m [] 30m [] 40m [] 60m [] 80m [] 160m
{: .elekto #bendoj}

<script>

// adaptita el https://udel.edu/~mm/ham/randomWire/endfed.py
// https://www.eham.net/article/23802

// ondolongo en drato el eksperimentoj: 300/f * 0,95

const amatorbendoj_ekstra_MHz = { // bendintervaloj, USA Extra
    160: [1.8,     2],
     80: [3.5,     4],
     60: [5.335,   5.405],
     40: [7,       7.3],
     30: [10.1,   10.15],
     20: [14,     14.35],
     17: [18.068, 18.168],
     15: [21,     21.45],
     12: [24.89,  24.99],
     10: [28,     29.7],
      6: [50,     54]
}

const amatorbendoj_cw_MHz = { // bendintervaloj, CW.  160m and 6m, diversaj modulacioj
    160: [1.8,     2],
     80: [3.5,     3.6],
     60: [5.335,   5.405],
     40: [7,       7.125],
     30: [10.1,   10.15],
     20: [14,     14.15],
     17: [18.068, 18.11],
     15: [21,     21.2],
     12: [24.89,  24.93],
     10: [28,     28.3],
      6: [50,     54]
}

const obloj = 2; // ni konsideras maksimume la duonon de la maksuma ondolongo
                 // alie donu 4


elekte((elekto,valoro) => {
  console.log(elekto+':'+valoro);
  let elektitaj_bendoj = []
  ĉiuj('#bendoj input').forEach((b) => {
    //console.log(b.value+": "+b.checked);
    if (b.checked) {
        elektitaj_bendoj.push(parseInt(b.value));
    }
  })
  if (elektitaj_bendoj.length)
    kalkulo(elektitaj_bendoj.reverse());
});

function kalkulo(elektitaj_bendoj) {
    const bazlongo = 300 * .95 / 4; // kvaronondolongo de 1MHz ĉe lumrapido, reduktita per .95
    const plej_longa = elektitaj_bendoj[0];
    const min_l = bazlongo/amatorbendoj_cw_MHz[plej_longa][0];
    maxksl = obloj*min_l; // maksimuma dratlongo konsiderenda
    console.log("min l:"+min_l+" maks l:"+maks_l);

/*

np.arrange: Return evenly spaced values within a given interval: start, stop, step

    e1_ft, e0_ft = 468/band_MHz # Band edge lengths, it's all based on this!
    i = 1 + np.arange(max_ft//e0_ft) // Count 1/2 wavelengths.
    return np.array([i*e0_ft, i*e1_ft]).T // Two columns lo,hi band lengths.
*/

}

/*
    prog, bands_m, cw, metric, fullwave = cli(argv)
    hamBands_MHz = hamBandsCw_MHz if cw else hamBandsExtra_MHz
    bands_MHz = np.array([hamBands_MHz[i] for i in bands_m]) # Band edge freqs.

// 468/2 = 234 => 300 * .95 / 4
    min_ft = 234/bands_MHz[0][0] # Min length is 1/4 wavelength at lowest freq.
    scale = 4 if fullwave else 2 # Full or half wavelength.
    max_ft = scale*min_ft        # Max wire length to consider.

    all_ft = []
    for band_MHz in bands_MHz:
        all_ft.extend(high_V(band_MHz, max_ft))

    title = 'High Voltage Lengths for %s m' % str(bands_m)[1:-1]
    graph(title, np.array(all_ft), metric, min_ft)



def high_V(band_MHz, max_ft):
    '''Resonant frequencies have highest voltages at ends of antennas.
    Input:
      band_kHz (float[]): kHz, np.array of min and max frequencies.
      max_ft (float): ft, length for largest wavelength considered.
    Output:
      [float[]]: list of 2-elt numpy arrays of band edge min, max in MHz.
    '''

    e1_ft, e0_ft = 468/band_MHz # Band edge lengths, it's all based on this!
    i = 1 + np.arange(max_ft//e0_ft) // Count 1/2 wavelengths.
    return np.array([i*e0_ft, i*e1_ft]).T // Two columns lo,hi band lengths.    


function _arg() {

    prog = os.path.basename(argv[0])
    argv = argv[1:]
    cw = fullwave = metric = False
    bands = []
    i = 0
    while i < len(argv):
        if argv[i] == '-c': # Use CW sub-bands.
            cw = True
        elif argv[i] == '-f': # Fullwave calculations.
            fullwave = True
        elif argv[i] == '-m': # Output lengths in meters.
            metric = True
        else: # Integer ham band.
            try:
                band = int(argv[i])
            except ValueError:
                usage(prog)
            if not band in hamBandsExtra_MHz:
                usage(prog)
            bands.append(int(argv[i]))
        i += 1
    if len(bands) == 0: # User didn't specify any bands.
        usage(prog)
    bands.sort(reverse=True) # Sort bands, high to low.
    return prog, bands, cw, metric, fullwave
}    

def graph(title, edges_ft, metric, min_ft):
    '''Plot a red box for each span of resonant frequencies.
    '''

    if metric:
        cvt = 12/39.37 # Convert feet to meters.
        min_ft *= cvt # Not really feet anymore!
        edges_ft *= cvt

    plt.figure(figsize=(8, 1.25), dpi=120)
    plt.title(title, fontsize=10)
    plt.xlabel('Wire Length (%s)' % ('m' if metric else 'ft'))
    plt.yticks([]) # Don't label y axis.
    plt.ylim(0,1)  # Arbitrary values for rectangle heights.
    plt.grid(True)

    for e in edges_ft:
        plt.fill([e[0],e[0],e[1],e[1]], [0,1,1,0], 'r') # Xs, Ys, red.
    plt.xlim(min_ft, edges_ft[0][1]) # Min,max wire lengths.
    plt.tight_layout()
    plt.show()

*/

</script>

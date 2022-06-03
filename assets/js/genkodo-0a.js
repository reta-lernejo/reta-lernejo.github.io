
  // vd. https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables
  const kodonoj=[
    ['UAG','⏹','','fino'],
    ['UGA','⏹','','fino'],
    ['UAA','⏹','','fino'],
    ['AUG','⏵','','starto'],
    ['UUU','F','Phe','fenilalanino'],
    ['UUC','F','Phe','fenilalanino'],
    ['UUA','L','Leu','leŭcino'],
    ['UUG','L','Leu','leŭcino'],
    ['CUU','L','Leu','leŭcino'],
    ['CUC','L','Leu','leŭcino'],
    ['CUA','L','Leu','leŭcino'],
    ['CUG','L','Leu','leŭcino'],
    ['AUU','I','Ile','izoleŭcino'],
    ['AUC','I','Ile','izoleŭcino'],
    ['AUA','I','Ile','izoleŭcino'],
    ['AUG','M','Met','metionino'],
    ['GUU','V','Val','valino'],
    ['GUC','V','Val','valino'],
    ['GUA','V','Val','valino'],
    ['GUG','V','Val','valino'],
    ['UCU','S','Ser','serino'],
    ['UCC','S','Ser','serino'],
    ['UCA','S','Ser','serino'],
    ['UCG','S','Ser','serino'],
    ['CCU','P','Pro','prolino'],
    ['CCC','P','Pro','prolino'],
    ['CCA','P','Pro','prolino'],
    ['CCG','P','Pro','prolino'],
    ['ACU','T','Thr','treonino'],
    ['ACC','T','Thr','treonino'],
    ['ACA','T','Thr','treonino'],
    ['ACG','T','Thr','treonino'],
    ['GCU','A','Ala','alanino'],
    ['GCC','A','Ala','alanino'],
    ['GCA','A','Ala','alanino'],
    ['GCG','A','Ala','alanino'],
    ['UAU','Y','Tyr','tirozino'],
    ['UAC','Y','Tyr','tirozino'],
    ['CAU','H','His','histidino'],
    ['CAC','H','His','histidino'],
    ['CAA','Q','Gln','glutamino'],
    ['CAG','Q','Gln','glutamino'],
    ['AAU','N','Asn','asparagino'],
    ['AAC','N','Asn','asparagino'],
    ['AAA','K','Lys','lizino'],
    ['AAG','K','Lys','lizino'],
    ['GAU','D','Asp','asparaginacido'],
    ['GAC','D','Asp','asparaginacido'],
    ['GAA','E','Glu','glutaminacido'],
    ['GAG','E','Glu','glutaminacido'],
    ['UGU','C','Cys','cisteino'],
    ['UGC','C','Cys','cisteino'],
    ['UGG','W','Trp','triptofano'],
    ['CGU','R','Arg','arginino'],
    ['CGC','R','Arg','arginino'],
    ['CGA','R','Arg','arginino'],
    ['CGG','R','Arg','arginino'],
    ['AGU','S','Ser','serino'],
    ['AGC','S','Ser','serino'],
    ['AGA','R','Arg','arginino'],
    ['AGG','R','Arg','arginino'],
    ['GGU','G','Gly','glicino'],
    ['GGC','G','Gly','glicino'],
    ['GGA','G','Gly','glicino'],
    ['GGG','G','Gly','glicino']
  ];

class Genkodo {

  
    /**
     * Redonas informojn pri aminacido, kies unulitera mallongigo estas L:
     * ekz-e aminacido('R') redonas ['R','Arg','arginino']
     */
    aminacido(L) {
      for (let k of kodonoj) {
        if ( k[1] == L ) return k.slice(1);
      }
    }
  
    /**
     * Redonas ĉiujn aminacidojn, kies RNA-kodo estas donita kiel argumento.
     * ekz-e aa_koditaj('AUG') redonas [ ['⏵','','starto'],['M','Met','metionino'] ]
     */
    aa_koditaj(kod) {
      let aa = [];
      for (let k of kodonoj) {
        if ( k[0] == kod ) aa.push(k.slice(1));
      }
      return aa;
    }
  
    /**
     * Redonas ĉiujn RNA-triopojn, kiuj kodas la aminacidon, kies
     * unulitera mallongigo estas donita kiel argumento, ekz-e
     * trioj('F') redonas ['UUU','UUC'].
     */
    trioj(L) {
      let tj = [];
      for (let k of kodonoj) {
        if ( k[1] == L ) tj.push(k[0]);
      }
      return tj;
    }

}
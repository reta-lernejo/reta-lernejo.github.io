## Reta Lernejo

### Celo de la projekto

La projekto celas krei retpaĝaron, vidu ĉe [reta-lernejo.github.io](https://reta-lernejo.github.io/) por komprenigi bazajn konceptojn de diversaj fakoj sur gimnazia / popolscienca nivelo. 
Nia ambicio estas ankaŭ elmontri kiel aferoj de diversaj fakoj estas interligitaj. 

Cetere ni *ne* celas rekrei statikajn informapaĝojn de lernolibro aŭ Vikipedio, nek universitatnivelan instruadon de teoremoj, kalkulmetodoj ktp, sed la enhavo prefere estu klarigite per laŭeble simplaj interagaj elementoj kiuj laŭokaze interne uzas la regulojn kaj kalkulojn de la koncepto, tiel ke lernanto povas iom esplori tiujn konceptojn per malgrandaj grafikaj modeloj prefere ol legi multajn  regulojn kaj sciigojn. 

Ni ja konscias, ke tiu ambicio estas limigita per la elektita teknika bazo, kiu necesigas krei ĉiujn retpaĝojn sen servila parto, do pure el formatita teksto (*markdown*) kun enplektitaj grafikoj (SVG) kaj Javoskripto por la dinamikaj interagoj. Do nur simplaj modeloj eblas, sed ja ne ampleksaj simuladoj kiel en superkomputiloj :-)  

Se vi volas kontribui, vi povas anonci tion plej
simple kreante peton sub ["Issues"](https://github.com/reta-lernejo/reta-lernejo.github.io/issues).

### Rigardi la paĝojn loke

La paĝoj estas generitaj per la generilo *Jekyll* en la varianto de *Github*-paĝoj. Tiu generilo baziĝas sur la lingvo *Ruby*, kiun vi ne devas lerni, sed ja devas instali ĉe vi, se vi volas loke rigardi kaj eble prilabori la retpaĝojn:

- instalu Ruby (interpretilo) kaj Ruby-gems (pakaĵilo) laŭ la maniero de via operaciumo
- instalu la pakaĵojn difinitajn en `Gemfile`, ekz-e en Linukso per `sudo gem update --system && bundle install`

Poste vi povas lanĉi la retpaĝojn loke per la skripto `./jekyll-serve.sh`. Vi povas enrigardi por vidi, kion ĝi faras. Nun, por rigardi la paĝojn, vi stiros vian retumilon al `http://localhost:4000`. Se vi ŝanĝas kaj konservas paĝon loke, la generilo tuj refreŝigas ĝin.
---
layout: page
title: TLS (Transport-Nivela Sekureco)
---

* Enhavo
{:toc}

## Kio estas TLS (frua nomo SSL)?

[TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) estas protokolo, kiu kombiniĝas kun aliaj interretaj protokoloj por sekurigi ties interkomunikadon.

TLS estas tre kompleksa protokolo, kaj tial ofte ekestas specifaj problemoj en la komunikado inter du sistemoj uzantaj diversajn variaĵojn de ĝi, kiuj estas malfacile solveblaj sen baza kompreno de la TLS-protokolo. En la malsupraj alineoj ni iom detaligas la konsiderindajn aspektojn.

## La kombinoj de interretaj protokoloj kun TLS

La varioj de interretprotokoloj kun enplektita TLS rekoniĝas kutime per aldona "S" en la nomo kaj eventuale per alia retpordo. 

*Retpordoj* estas numeroj, kiuj estas uzataj de komunikantaj sistemoj por distingi diversaj servojn sur la sama sistemo. La tiel nomataj [bonkonataj retpordoj](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports) estas interkonsentitaj pordnumeroj por specifaj servoj. Iu servilo povas difini alian numeron ol la bonkonatan, sed aparte por publikaj servoj oni uzas la bonkonatajn, ĉar tiam oni scias, kiun pordon frapi ekzemple por ricevi aŭ sendi retpoŝtojn.

La protokolkombinoj sekurigitaj dekomence per TLS kutime havas alian retpordon ol la nesekurigita. Ekzemple la ordinara protokolo por legi retpaĝojn en Tut-Tera-Teksaĵo havas la bonkonatan retpordon 80 dum la sekurigita vario havas 443.

Sed ofte al la protokolo aldoniĝis komando STARTTLS (ĉe HTTP oni uzas redirekton al retpordo 443 anstataŭe) per kiu oni, komencinte nesekurigitan komunikadon, povas transiri al sekurigita. En tiu okazo ordinare estas uzata la normala bonkonata retpordo. 

Alie, per la aparta TLS-retpordo la komunikantoj unue faras la TLS-manpremon kaj nur se tiu sukcesis komencas la respektivan interretprotokolon.

### Tut-Tera Teksaĵo

En la Tut-Tera Teksaĵo oni uzas HTTP+TLS = [HTTPS](https://en.wikipedia.org/wiki/HTTPS).

Retpordoj:
- HTTP: 80
- HTTPS: 443

### Retpoŝtoj

Da retpoŝtaj protokoloj estas tuta kolekto. La plej kutimaj estas IMAP - por servo de poŝtfakoj, SMTP por simpla forsendo, POP3 por simpla ricevo.

Sekurigitaj varioj do estas IMAP+TLS = [IMAPS](https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol#Security)

Retpordoj:
- IMAP: 143
- IMAPS: 993

Sende SMTP+TLS = [SMTPS](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol#Security_extensions).

Retpordoj:
- SMTP: 25
- SMTPS: 465 kaj 587

Riceve POP3+TLS = [POP3S](https://en.wikipedia.org/wiki/Post_Office_Protocol#STARTTLS)

Retpordoj:
- POP3: 110
- POP3S: 995

### Dosiertanssendo

FTP+TLS = [FTPS](https://en.wikipedia.org/wiki/File_Transfer_Protocol#FTPS) (Ne konfuzu kun 
[SFTP](https://en.wikipedia.org/wiki/File_Transfer_Protocol#SSH_File_Transfer_Protocol), kio estas FTP surbaze de 
[SSH-protokolo](https://en.wikipedia.org/wiki/Secure_Shell). La SSH-protokolo havas plurajn komunaĵojn kun TLS sed ni lasos ĝin flanke tie ĉi)

Retpordoj:
- FTP: 21 (konekto) kaj 20 (transsendo)
- FTPS: 990 (konekto) kaj 989 (transsendo)


## La eldonoj de la protokolo

La TLS-protokolo evoluiĝis dum la tempo de la frua [SSLv1](https://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_1.0,_2.0,_and_3.0) en 1994, trans SSLv2 kaj SSLv3 al 
[TLSv1.0](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_1.0), 
[TLSv1.1](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_1.1), [TLSv1.2](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_1.2) kaj 
[TLSv1.3](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_1.3) en 2018. Aktuale (en 2021) nur la lastaj du eldonoj (TLS 1.2 kaj 1.3) estas plu konsiderataj sufiĉe sekuraj. Iuj pli malnovaj kaj ne aktualigitaj sistemoj tamen eventuale plu uzas SSLv3 ĝis TLSv1.1.

## La bibliotekoj

Programo, kiu volas uzi TLS por sekurigi sian komunikadon bezonas abundan kolekton de algoritmoj, kiuj estas realigitaj en integreblaj funkciaroj, alinome bibliotekoj. 

Ekzistas pli ol manpleno da [TLS-bibliotekoj](https://en.wikipedia.org/wiki/Comparison_of_TLS_implementations), el kiuj la plej konata kaj vaste uzata estas 
[OpenSSL](https://en.wikipedia.org/wiki/OpenSSL).

Se en iu sistemo estas instalita OpenSSL ĝi kunhavas kutime ankaŭ komandlinian programon [openssl](https://wiki.openssl.org/index.php/Command_Line_Utilities), kiun oni povas uzi por plenumi plurajn taskojn i.a. por legi, enrigradi kaj transformi TLS-atestilojn, krei tiajn atestilojn kaj peti subskribon ĉe atesta aŭtoritato.

## La du protokol-fazoj

La protokolo TLS funkcias en du precipaj fazoj. La unuan oni nomas metafore *manpremo* 
(angle: [TLS-*handshake*](https://en.wikipedia.org/wiki/Transport_Layer_Security#TLS_handshake) ). Ĝi servas por identigi sin kaj interkonsenti pri la ĉifraj algoritmoj uzotaj dum la dua fazo. La dua fazo estas la efektiva komunikado uzante la sekurigatan interretan protokolon kaj ĉifrante ties enhavon.

En la unua fazo estas uzata nesimetria ĉifrado, t.e. la ĉifrado okazas per paro de ŝlosilo, unu el kiu estas privata (t.e. sekreta) kaj la alia publika. Se la kliento sendas informon al la servilo, ĝi uzas la publikan ŝlosilon por ĉifri kaj la servilo uzas sian privatan ŝlosilon por malĉifri. La esenca trajto de tiu metodo estas, ke la sendanto ne devas koni la sekretan ŝlosilon por protekti sian mesaĝon - sed nur la flanko havante tiun, povas malĉifri kaj tiel legi la mesaĝon.

En la dua fazo estas uzata simetria ĉifrado, t.e. ambaŭ flankoj uzas komunan ŝlosilon konatan al ambaŭ por ĉifri kaj malĉifri la mesaĝojn. La avantaĝo de simetra ĉifrado estas ĝia rapideco. Tamen ĝi estas malpli sekura, tial la du flankoj en ĉiu manpremo komence de komunikado interkonsentas pri simetria ŝlosilo, kiun ili poste forĵetas. Tiel, divenita aŭ kompromita ŝlosilo povus servi al subaŭskultanto nur por kunlegi unu komunikadon, sed ne la venontan. 

## La atestiloĉeno

Atestiloj (angle: [certificate](https://en.wikipedia.org/wiki/Transport_Layer_Security#Digital_certificates) ) servas por pruvi la identecon de komunika sistemo, do de la servilo aŭ la kliento. Temas pri publika elektronika dokumento, kiu enhavas informojn pri la sistemo (ties oficiala nomo aŭ IP), la respondeca organizo, la tempoperiodo de valideco kaj subskribon. Atestilo ĉiam venas pare kun privata (sekreta) ŝlosilo kaj ili fakte atestas la posedon de tiu ŝlosilo.

Por esti valida, la atestilo devas havi almenaŭ tri informojn: la identecon de la sistemo (DNS-nomo aŭ IP), validecperiodon inkluzivante la nunan tempon kaj validan subskribon.

Principe oni povus mem subskribi atestilon, sed tia subskribo ne havas grandan aŭtoritaton kaj tiun metodon oni do uzas nur por kreado kaj testado de novaj servoj. Por *oficialaj* servoj oni bezonas atestilon, kiu estas subskribita de atesta aŭtoritato (angle: [Certificate authority - CA](https://en.wikipedia.org/wiki/Certificate_authority) ). Ĝi eldonas propran atestilon, per kiu oni povas kontroli subskribon. Programoj uzas do liston de fidindaj CA kaj fidas nur al servilaj atestiloj kiuj estas subskribitaj de tiuj.

Fakte estas tiom da CA, ke oni kutime ne konservas la kompletan liston, sed ekzistas kelkaj malmultaj radikaj atestaj aŭtoritatoj (angle: [RootCA](https://en.wikipedia.org/wiki/Root_certificate) ), kiuj per sia atestilo subskribas siavice la atestilojn de la CA.

Do efektive oni havas ordinare atestilan ĉenon de tri atestiloj: Tiun de la uzota servo, tiun de la atesta aŭtoritato kaj tiun de la radika atesta aŭtoritato. La klienta programo petas komence sendi tiujn tri kaj kontrolas laŭvice:

- ĉu la servila atestilo estas valida laŭtempe kaj konformas kun la uzata servilo (nomo aŭ IP)
- ĉu ĝi estas subskribita de atesta aŭtoritato kaj ĉu ties atestilo siavice estas valida
- ĉu la aŭtoritata atestilo estas subskribita de fidinda radika atesta aŭtoritato kaj ties atestilo estas valida.

Nur tiam ĝi daŭrigas la komunikadon. Se vi uzas retpaĝon, vi povas mem kontroli la atestilan ĉenon. Por tio la retumiloj kutime montras malgrandan seruro-vinjeton, apud la retadreso, kiun vi povas alklaki por legi ĉiujn rilatajn informojn per dialogfenestro, en kiu ie kaŝiĝas butono "vidi la atestilojn". Kaj tie estas listigitaj informoj almenaŭ pri *ricevinto* (angle: *subject*) kaj eldoninto (angle: *issuer*) de la uzata atestilo. La reston de la ĉeno foje oni ricevas sub detaloj aŭ per alklakebla ligo de la eldoninto-nomo. Foje estas iom pli malfacile kontroli la tutan ĉenon.

Oni povas ricevi ĝin kiel
[PEM-dosiero](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail), teksta formato per kiu oni povas ekzemple sendi atestilon en la normala teksto de retpoŝto, uzante retumilon Fajrovulpo aŭ per openssl-komando:

`openssl s_client -connect <servilo-nomo>:<pordo> -showcerts > <servilo>.pem`

ekzemple por Reta Vortaro:

`openssl s_client -connect retavortaro.de:443 -showcerts > revo.pem`

Kiel jam menciite oni povas ankaŭ identigi klienton per atestilo. Tio estas uzata ĉe apartaj servoj, kiuj ne estas publikaj, sed uzeblaj nur de limigita klientaro. Kvankam la servilo mem situas en publika reto, ĝi tuj finas la komunikadon, se la kliento ne povas identigi sin per fidata atestilo. Tian komunikadon, kiam ambaŭ flankoj devas identigi sin, oni nomas reciproka (angle: *mutual*, vidu [mTLS](https://en.wikipedia.org/wiki/Mutual_authentication#mTLS) )

Apud la formato PEM estas uzata ankaŭ binara formato 
[PKCS#12](https://en.wikipedia.org/wiki/PKCS_12), mallonge p12 au pfx. Oni povas transformi inter PEM kaj PKCS#12 per OpenSSL. Klientan identigilon por importi en la propran retumilon ofte oni ricevas kiel dosiero `<mia-atestilo>.p12`. Alirante la dialogon *propraj atestiloj* en la agordo oni trovas butonon *importi*, per kiu oni konatigas tian klientan atestilon al retumilo.

Atestilojn oni cetere kutime ne *mendas*, ĉar ja temas pri paro de sekreta ŝlosilo kaj la koncerna atestilo. Do se oni volas ekipi propran servilon per atestilo oni devas unue krei tian paron loke en la servilo kaj poste oni petas subskribon per tiel nomata atestilo-subskribo-peto (angle: *Certificate signing request*,
[CSR](https://en.wikipedia.org/wiki/Certificate_signing_request) )

Oni povas per OpenSSL-komandoj krei kaj la paron kaj la subskribopeton. Ĉar oni devas doni plurajn parametrojn kaj indikojn por bonorde fari tion, ni ne detaligas la procedon tie ĉi. Vi trovos multajn retpaĝojn kiuj priskribas tion paŝon post paŝo. 

Ĉar multaj ne ŝatas fari tian laboron mem, ili tamen *mendas* la atestilon ĉe sia rekta retprovizanto, kiuj aŭtomatigis tiun procedon. Oni devas konscii, ke la provizanto do ankaŭ scias la sekretan ŝlosilon, sed oni ja ĉiuokaze devas instali ĝin en protektita loko de la servilo, al kiu la provizanto havas aliron, do oni devas fidi la provizanton!

Kutime subskribo de atestilo per CA kostas monon, sed ekzistas intertempe senpaga CA [Let's encrypt](https://en.wikipedia.org/wiki/Let%27s_Encrypt). Ties subskriboj validas nur 90 tagojn, poste oni bezonas refreŝigi la atestilon kaj subskribon, sed ekzistas programo [certbot](https://certbot.eff.org/), kiu aŭtomatigas la kreadon de unua atestilo, la agordon de la propra retservo kaj regulan refreŝigon.

## La ĉifro-algoritmoj

Komunikado per TLS ĉiam bezonas kvar 
[algoritmojn](https://en.wikipedia.org/wiki/Transport_Layer_Security#Algorithms)

1. La algoritmo por ŝlosilointerŝanĝo, ekzemple
    [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)), 
    [ECDH](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman)
2. La algoritmo por identigo per atestilo, ekzemple
    [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem)), 
    [DSA](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm),
    [PSK](https://en.wikipedia.org/wiki/Pre-shared_key)
3. La algoritmo por la simetria ĉifrado (dua fazo)
    ekzemple [3DES](https://en.wikipedia.org/wiki/Triple_DES), 
    [IDEA](https://en.wikipedia.org/wiki/International_Data_Encryption_Algorithm), 
    [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
4. La algoritmo por protekti komunikerojn kontraŭ ŝanĝoj (haketfunkcio), 
    ekzemple [MD5](https://en.wikipedia.org/wiki/MD5), 
    [SHA](https://en.wikipedia.org/wiki/Secure_Hash_Algorithms)

La kombino de la kvar algoritmoj estas nomata *ĉifraro* (angle: *cypher suite*) kaj interkonsentita inter kliento kaj servilo dum la TLS-manpremo (unua fazo). Ofte parametro, kiel la longeco de la ŝlosilo (en bitoj) difinas la rapidecon kaj sekurecon de la ĉifrado kaj do estas indikitaj kune kun la nomoj de la algoritmoj.

En TLSv1.2 ĉifraro ekzemple povas nomiĝi:
`TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`, kion vi legu kiel:

- protokolo: TLS
- ŝlosilinterŝanĝa algoritmo: ECDHE, t.e. efemera Diffie-Hellman kun elipsa kurbo
- identigoalgoritmo: RSA, t.e. Rivest–Shamir–Adleman
- ĉifroalgoritmo AES kun ŝlosillongeco 128-bita kaj GCM
- haketfuncio SHA kun longeco 256-bita

En TLSv1.3 la ŝlosilinterŝanĝo estas limigita al nura (EC)DHE kaj oni ne plu skribas la unuajn du algoritmojn en la nomon de la ĉifraro.

Do se vi ekzemple uzas la supran komandon por peti la atestilo-ĉenon de Reta Vortaro vi ricevas depende de la klientokapablo jenan informon, pri kiuj algoritmoj ambaŭ flankoj interkonsentis por la seanco:

```
No client certificate CA names sent
Peer signing digest: SHA256
Peer signature type: RSA-PSS
...
---
New, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384
Server public key is 2048 bit
```

La ŝlosilo (identigoalgoritmo) do estas de la tipo RSA kun longeco de 2048 bitoj. 

Por la simetria ĉifrado estas uzata TLS en la eldono 1.3 kun AES kiel ĉifroalgoritmo, slosilo-longeco 256 bitoj. La senditaj datumblokoj estas protektitaj per algoritmo SHA kun 384 bitoj da longeco kontraŭ manipulado (ĉu intenca aŭ arbitra).

Krome la algoritmo [GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode) estas uzata por ĉenigi la unuopajn datumblokojn kaj protekti tiel plie kontraŭ ŝlosildiveno, perdo aŭ aldono de unuopaj blokoj en la vico.

Por vidi, kiujn ĉifrarojn OpenSSL, instalita en la propra kliento-komputilo, subtenas, servas la komando `openssl ciphers`.

Por ekscii, ĉiujn ĉifrarojn el tiuj, pri kiuj la servilo konsentus komuniki, oni devus elprovi ĉiujn el tiuj kaj poste rigardi la rezulton. Ekzistas skripto `sslscan`, kiu helpas fari tion. Uzu ĝin modeste, ĉar ne ĉiu servilo ŝatas esti tiel testata. Prefere testu nur servilojn, kiuj estas la viaj aŭ akiru konsenton de la posedanto.

## La elipsaj kurboj

La avantaĝo de [elipsaj kurboj](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Fast_reduction_(NIST_curves)) estas, ke mallongaj ŝlosiloj jam donas akcepteblan sekurecon kaj tiel ĉifrado funkcias pli rapide. Uzadon de elipsa kurbo vi rekonas per `EC` en la nomo de algoritmo.

Ioma malfacilaĵo estas, ke ekzistas pluraj specoj da tiaj kurboj kaj servilo kaj kliento devas interkonsenti ne nur pri la longeco de la ŝlosilo, sed ankaŭ pri la uzota elipsa kurbo. Malofte - uzante diversajn bibliotekojn - povas okazi, ke malsukcesas tia interkonsento.

Pro diversaj ecoj, parametroj kaj kalkulalgoritmoj de tiaj kurboj, la TLS-bibliotekoj povas uzi nur iujn apartajn. Nuntempe la avantaĝa kaj fidata [kurbo25519](https://en.wikipedia.org/wiki/Curve25519) estas preferata, dum la antaŭe kutima P-256 ne plu estas fidata, ĉar oni trovis ke la kreinta NIST enkonstruis kelkajn malfortaĵojn en iujn siajn algoritmojn por povi perforte rompi sekretan komunikadon.


## Tipaj problemoj ĉe TLS kaj kiel analizi ilin

Tipe problemoj ĉe uzado de TLS okazas, ĉar kliento kaj servilo ne agnoskas siajn atestestilojn aŭ ĉar ili uzas diversajn bilbiotekojn kun diversa gamo de subtenitaj eldonoj, ĉifro-algoritmoj kaj ties parametroj.

### Se la kliento ne agnoskas la atestilon de la servilo

Por agnoski atestilon kutime estas kontrolataj du aferoj:
- ĉu la atestiloĉeno estas valida kaj fidata de la kliento (ekzemple la retumilo)
- ĉu la atestilo estas ankoraŭ valida laŭ sia tempolimo

Por kontroli la atestilon de la servilo detale, vi povas uzi krom grafikan retumilon unu el la jam menciitaj komandoj: `openssl`, `sslscan`. 

Se la kliento ankaŭ sendas atestilon, estas eble pli malfacile kontroli tiun: se temas pri retumilo ni supre priskribis, kie vidi tiujn PKCS#12-atestilojn sub agordo de atestiloj. Se temas pri alia kliento (retpoŝto, komando-programo ktp.) vi devas unue eltrovi, kie en via sistemo estas instalitaj viaj propraj ŝlosiloj kaj atestiloj (ekzemple en Linukso ofte sub `/etc/ssl`) kaj kiamaniere la uzata programo scias, kiun atestilon kaj ŝlosilon uzi - povas esti agordo-dosiero, pad-indiko en la komandlinio ks.) Ofte komandliniaj programoj provizas ankaŭ ŝaltilon (`-v` k.a.) por iom inspekti, kio okazas. Foje tio helpas.

### Se la TLS-manpremo malsukcesas

Se ambaŭ kliento kaj servilo estas same aktualaj kaj vaste uzataj sistemoj, kutime la manpremo funkcias. Sed se unu el ili estas speciale argordita, povas okazi problemoj:

- ambaŭ ne povas konsenti pri protokolo, ekz-e se la servilo nur subtenas plu TLSv1.3 kaj la kliento estas iom malnova kaj ankoraŭ ne havas ĝin
- se la permesataj algoritmoj en unu flanko estas aparte limigitaj, sed la alia flanko ne ofertas iun el tiuj ĉifraroj
- se la parametroj uzataj por aparta tia algoritmo ne koheras inter ambaŭ flankoj. Ekzemple povus esti, ke la elipsaj kurboj, kujn scias unu flanko, ne subteniĝas de la alia flanko aŭ la bit-longeco-parametroj estas limigitaj tiel, ke ne troviĝas komuna longeco.

Por eltrovi, kio estas la problemo, ekzistas diversaj kapablaj iloj. Prefere vi komencu per `sslscan`, kiu montras komunajn protokolojn, ĉifrarojn kaj kurbojn. Se tio ne sufiĉas, vi povas subaŭskulti la retkomunikadon per `tcpdump` aŭ `wireshark`. Necesas unue limigi, kion ili subaŭskultas al specifa retinterfaco, retprotokolo kaj retpordo kaj poste lanĉi la komunikadon kaj detale enrigardi, kio okazis dum komunikado pakaĵon post pakaĵo - povas kolektiĝi tre multe da informoj kaj necesas iom da sperto kiel legi ilin. Mi ne detaligas tie ĉi.










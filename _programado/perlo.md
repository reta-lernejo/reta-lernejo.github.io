---
layout: page
title: Perlo
---

* Enhavo
{:toc}

## Konciza enkonduko

### Historia foneto

[Perl](http://www.perl.com/) = Praktika Ekstrakta kaj Raporta Lingvo (anlge *Practical Extraction and Report Language*)

Kreita ekde 1986 de *Larry Wall* el programeto por administri agordojn de plura Vax- kaj Sun-komputiloj.
Antaŭaj nomoj estis "Gloria" kaj "Pearl".

Tiutempe oni programis administrajn taskoj per ŝelo kaj komandliniaj komandoj kiel `awk`, `sed` (kio
kondukis al malfacila kaj erariga sintakso) aŭ programis en C, kio postulis kompiladon.

Perlo sintezas la utilon de `C`, `sh`, `awk`, `sed` en unu lingvo.

### Avantaĝoj 

- oni rapide kreas utilaĵon
- estas en multaj sistemoj jam instalita aŭ facile instalebla
- ekzistas multaj funkciaroj (moduloj) aparte por uniksaj medioj kaj retaplikaĵoj
- regulesprimoj kiel kerna funkcio estas parto de la sintakso, kio ebligas efikan traktadond de strukturitaj tekstoj

### Malavantaĝoj

- ĉe grandaj projektoj la kolekto da skriptoj fariĝas malfacile regebla
- la fontteksto estas enrigardebla de ĉiu uzanto, kio ne ĉiam estas dezirata
- ĝi favoras rapidan kaj malpuran programadan stilon, kio ofte rezultas en malfacile legeblaj kaj flegeblaj skriptoj
- ĝi subtenas tre diversajn alirojn esprimi algoritmon, kio povas rezulti en flikaĵa kodo


### Saluton mondo!

Vi povas doni programon kiel argumenton rekte sur la komandlinio. Do provu:
```bash
  $ perl -e 'print "Hello World!\n";'
```

Kiel skripto preparu dosieron `saluton.pl` kun tiu enhavo:
```perl
  #!/usr/bin/perl
  print "Hello World!\n";
```

kaj lanĉu en Unikso

```bash
$ chmod u+x saluton.pl
$ ./saluton.pl
```

aŭ diverssisteme

```bash
$ perl saluton.pl
```

### Esprimoj kaj operacisimboloj

Esprimojn oni formas el variabloj, konstantoj kaj operacisimboloj
simile kiel en la programlingvo C:

#### nombraj operacioj

```
  =      valorizo
  +      adicio
  -      subtraho
  *      multipliko
  /      divido
  %      resto ĉe entjera divido (modulo)
  **     potenco
  <<     bitŝovo maldekstren
  >>     bitŝovo dekstren
  ++     alkremento (antaŭe aŭ poste)
  --     dekremento (antaŭe aŭ poste)
  +=     altigo
  -=     malaltigo
  /=     divido per
  *=     multipliko per
  <=>    komparo: 1,0,-1 se >,=,<
```

#### logikaj operacioj

```
  ||     logika aŭo
  &&     logika kajo
  !      logika negacio (neo)
```

#### signaraj operacioj

```
  .      ĉenigo de signaroj
  .=	 alpendigo de signaro
  x      ripeto de signaro
  cmp    kiel <=> sed por signaroj
  ? :    ĉu ...? jes... : ne ... (kiel en C)
```

#### komparo de nombroj

```
  ==     sama
  !=     malsama
  <      pli malgranda ol
  >      pli granda ol
  <=     pli malgranda aŭ egala
  >=     pli granda aŭ egala
```

#### komparo de signaroj

```
  eq     sama
  ne     malsama
  lt     pli malgranda ol (alfabete)
  gt     pli granda ol (alfabete)
  le     pli malgranda aŭ egala (alfabete)
  ge     pli granda aŭ egala (alfabete)
```

#### Kontrola demando

Kial la sekva skripto redonas la valoron 'malĝuste'?
Kion oni devas ŝanĝi por ricevi 'ĝuste'?

```perl
  $var = 'jes';
  print ($var = 'ne') ? 'malĝuste' : 'ĝuste';
```

### Datumstrukturoj 

#### Skalaroj

Skalaroj (aŭ simplaj tipoj) reprezentas nombrojn aŭ signarojn:

```perl
  $a = 12;
  $b = 3.004
  $c = 'Ludoviko';
  $d = "$c Zamenhof'";
  print "\$a=$a\n\$b=$b\n\$c=$c\n\$d=$d\n";
```

#### Indicitaj listoj

Ili reprezentas listojn de valoroj, kiujn oni adresas
per nombra indico

```perl
  $a[0]=12; $a[1]='Ludoviko'; $a[6]='Zamenhof';
  @b = ('blua','flava','verda');
  # elskribu @a kaj @b (anstataŭ 'foreach' eblas ankaŭ nura 'for')
  foreach $x (@a) { print $x };
  for ($n = 0; $n < @b; $n++) { print $b[$n] };
```

#### Asociaj aŭ haketaj listoj

Ĉe asociaj listoj oni adresas la unuopajn valorojn
per signaroj (ŝlosilvortoj). Pro rapideco ili interne
estas haketitaj (pro tio la nomo)

```perl
  %jaroj = ('Petro' => 15, 'Patro' => 46);
  $jaroj{'Karino'} = 12;
  $jaroj{'Manjo'} = 26;
  $jaroj{'Avino'} = 103;
  # eligi la jarojn per 'foreach'
  foreach $iu (sort keys (%jaroj)) {
    print "$iu ist ".$jaroj{$iu}."\n";
  };
  # eligi la jarojn per 'each'
  while (($iu,$kiom) = each(%jaroj)) {
    print "$iu havas $kiom da jaroj.\n";
  };
```

#### Utilaj sistemvariabloj

|mallonga nomo| longa nomo | klarigo
|$_       |$ARG               | apriora variablo / bufro
|$1-$9    |                   | eroj de la lasta serĉo
|$&       |$MATCH             | trovita signaro de lasta serĉo
|$`       |$PREMATCH          | signaro antaŭ la trovita
|$'       |$POSTMATCH         | signaro post la trovita
|$.       |$INPUT_LINE_NUMBER | lininombro de legata dosiero
|$/       |$INPUT_RECORD_SEPARATOR | Signaro legata kiel "nova linio"
|$|       |$AUTO_FLUSH        | 1 = nebufrita eligo, 0 = bufrita (apriora)
|$\       |$OUTPUT_RECORD_SEPARATOR| Signaro skribita kiel "nova linio"
|$0       |$PROGRAM_NAME      |Voknomo de la programo
|$ARGV    |                   |Nomo de la aktuala dosiero uzante <>  
|@ARGV    |                   |Argumentaro de la komandlinio
|%ENV     |                   |Mediovariabloj

>
Pliajn vi trovas en la dokumentaro pri Perlo.

#### *Tasketo:*

Provu skribi skripton, kiu redonas ĉiujn mediovariablojn kun siaj nomoj. 
Se vi spertas skribu ĝin kiel CGI-skripton!

### Sintakselementoj

```perl
  # ...                                   # komento
  { ... }                                 # kodbloko
  sub MiaFunkcio {...}                    # funkcio
  while (...) { ... }                     # dum-maŝo
  until (...) { ... }                     # ĝis-maŝo
  do { ... } while (...)                  # dum-maŝo kun fina testo
  do {... } until (...)                   # ĝis-maŝo kun fina testo
  if (..) {..} elsif (..) {..} else {..}  # se-alie-se-alie-bloko
  unless (..) {...}                       # se-ne-bloko
  for (..,..,..) {...}                    # por-maŝo
  foreach $ele (@arr)                     # por-ĉiu-elemento-maŝo
  ($key,$val) = each (%hash)              # ĉiu-funkcio
```

#### Traktado de signaroj

```perl
  '...'                   # Signaro sen interpreto de eskapsignoj kaj variabloj
  "..."                   # Signaro kun interpretado de eskapsignoj kaj variabloj
  .                       # Ĉenigo de signaroj
  substr('hallo',2,3)     # Parta signaro
  $str = join(',',@arr)   # Kunigo de ĉiuj listeroj en unu signaro
  @arr = split(',',$str)  # Dismeto de signaro al listo je komoj
```

pliajn vidu en la dokumentaro de Perlo.

#### Serĉo kaj anstataŭigo, regulesprimoj

Operacioj kun regulesprimoj:

```perl
  =~        # regulesprimo (x troviĝu en y)
  !~        # negacia regulesprimo (x ne troviĝu en y)
  m/.../    # serĉo kun regulesprimo, koncize: /.../
  s/../../  # Serĉo kaj anstataŭigo per regulesprimo
  tr/../../ # Serĉo kaj anstataŭigo de unuopaj signoj
```

Flagoj por m// kaj s///:

```perl
  i         # Ne distingu minusklojn kaj majusklojn
  s         # Traktu plurajn liniojn kiel unu signaro
  g         # ripetu la serĉo ĝis fino
  e         # La anstaŭigaĵo ne estas signaro sed Perl-esprimo
```

Apartaj signoj por regulesprimoj:

```perl
  .      # ĉiu ajn signo
  +      # 1- aŭ plurfoja okazo
  ?      # 0- aŭ 1-foja okazo
  *      # 0- aŭ plurfoja okazo
  [...]  # permesataj signoj
  [^..]  # malpermesataj signoj 
  -      # signo-intervalo en [...], ekz-e [a-zĉĝĥĵŝŭ]
  ^      # komenco
  $      # fino
  {.,.}  # intervalo de okazoj, ekz-e 1 ĝis 6 okazoj: {1,6}
  \      # eskapsigno, ekz-e \n,\t,\033,\x1B
  |      # alternativoj, ekz-e (nova|juna)
  ()     # grupo poste alirebla per la variabloj $1-$9
  \b     # vortlimo
  \B     # nevort-limo
```

antaŭdifinitaj signo-aroj:

```perl
  \w    # vortsignoj (askio): [A-Za-z0-9_]
  \W    # ĉiuj aliaj: [^A-Za-z0-9_]
  \s    # spacoj: [ \t\n\r]
  \S    # ĉiuj aliaj: [^ \t\n\r]
  \d    # ciferoj: [0-9]
  \D    # ĉiuj aliaj: [^0-9]
```

*Tasketoj:*

- anstataŭigu duciferajn jarnombrojn en datoj per kvarciferaj
- nombru ĉiujn vortojn en teksto
- forigu ĉiujn etikedoj `<...>` en HTML-teksto

### Trakto de dosieroj

Ekzemplo:

```perl
# legi kaj skribi la enhavon de dosiero
open IN, "pado/al/dosiero.txt";
while (<IN>) { print };
close IN;
```

Apartaĵoj:
```
  # Terminalaj pseŭdo-dosieroj por legi kaj skribi
  STDIN                  Enigoj
  STDOUT                 Eligoj
  STDERR                 Eraroj
```

#### Legu ĉiujn

Legu kaj skribu la enhavon de ĉiuj dosieroj donitaj sur la komandlinio plu la terminalan enigon:

```perl
  while (<>) {
      print;
  }
```

#### Variaĵoj por malfermi dosieron
```perl
  open IN,  "<enigo"    # malfermu por legi
  open OUT, ">eligo"    # malfermu por skribi
  open OUT, ">>eligo"   # alpendigu skribante
  open OUT, "|komando"  # sendu eligon al komando
  open IN,  "komando|"  # legu el la eligo de komando
```

#### Legado de dosieroenhavo
```perl
  $line = <IN>           # Legu unu linion el IN
  @lines = <IN>          # LEgu ĉiujn liniojn kiel listo
 
  # pridemando de dosieroj
  -e                     # dosiero ekzistas
  -z                     # dosiero estas senenhava (malplena)
  -s                     # dosiergrandeco
  -f                     # ordinara doisero
  -d                     # dosierujo

  # funkcioj por dosierujoj
  opendir                # malfermi dosierujon
  readdir                # legi la enhavon de dosierujo
  closedir               # fermi dosierujon post legado
```

pliajn trovu en la dokumentaro de Perlo.

#### *Taskoj:*

- Verku skripton, kiu legas la enhavon de soero en skalaro.
- Verku skripton, kiu trakuras dosierujon kaj skribas la nomojn de HTML-doserioj (kiuj havas la finaĵon .htm aŭ .html)
- Verku CGI-skripton, kiu legas CGI-parametrojn kaj eligas ilin kiel HTML.


#### Uzo de komandoj (ŝelo)

Ekzemploj:

```perl
# rekta voko - Vindozo
$de = 'c:\x.txt';
$al = 'c:\tmp';
$msg = `copy $de $al`;
$msg = qx("copy $de $al");
print $msg;

# rekta voko - Unikso
$de = './x.txt';
$al = './tmp';
$msg = `cp $de $al`;
$msg = qx("cp $de $al");
print $msg;

# per dukto - Vindozo
open DIR,"dir c:\\tmp |";
while (<DIR>) { print; };
close DIR;

# per dukto - Unikso
open DIR,"ls /tmp |";
while (<DIR>) { print; };
close DIR;
```

#### Uzu de datumbazo per DBI (datumbaza interfaco)

Ekzemplo:
```perl
#!/usr/bin/perl
use DBI;

# Konektiĝi al datumbazo
$dbh = DBI->connect("dbi:Oracle:mydb","scott","tiger", 
	{RaiseError => 1, AutoCommit => 0}) 
		or die "Ne eblas konektiĝi kun mydb: $DBI::errstr\n";

# SQL-komando - rekta voko
$dbh->do("alter session set nls_numeric_characters = '.,'");

# Enmeti plurajn rikordojn en tabelon
$sth = $dbh->prepare("insert into mytable(key,value) values(?,?)") 
	or die "La preparo de SQL-komendo malsukcesis: $DBI::errstr\n";
for($i=1; $i<10; $i++) {
	$sth->execute("Pi * $i", 3.14 * $i) 
		or die "La SQL-komando malsukcesis: $DBI::errstr\n";
}
$dbh->commit();

# Retrovi rikordojn
$sth = $dbh->prepare("select key, value from mytable where key like 'Pi%'")
	or die "La preparo de SQL-Statement malsukcesis: $DBI::errstr\n";
$rc = $sth->execute
	or die "La SQL-komando malsukcesis: $DBI::errstr\n";

print "Demando enhavas $sth->{NUM_OF_FIELDS} kolumnojn.\n\n";
print "Kolumnoj: ".join(", ",@{$sth->{NAME}})."\n";

while (($key, $value) = $sth->fetchrow_array) {
          print "$key = $value\n";
      }
      die $sth->errstr if ($sth->err);

# Fermi la datumbazon
$dbh->disconnect();
```

#### La sencimigilo de Perlo

Voki kun sencimigilo: `perl -d`

Gravaj komandoj:
```
  h     Montru helpon
  n     Plenumu la sekvan kodlinion
  l     Montru la sekvan kodlinion
  s     Eniru en (sub)funkcion
  p xx  Kalkulu kaj eligu esprimon 
  b nn  MEtu interrompon en linio nn
  c nn  Daŭrigu la progrramon ĝis linio nn au la sekva interrompo
  q     Finu la sencimigilon
```


### Gravaj funkcioj laŭ kategorio

#### Funkcioj por skalaroj kaj signaroj 

```
  chomp, chop, chr, crypt, hex, index, lc, lcfirst,
  length, oct, ord, pack, q/STRING/, qq/STRING/,
  reverse, rindex, sprintf, substr, tr///, uc, ucfirst,
  y///
```

#### Regulesprimoj

```
  m//, pos, quotemeta, s///, split, study
```

#### Nombraj fu8nkcioj

```
  abs, atan2, cos, exp, hex, int, log, oct, rand, sin,
  sqrt, srand
```

#### Listo-funkcioj

```
  pop, push, shift, splice, unshift
  grep, join, map, qw/STRING/, reverse, sort, unpack
```

#### Funkcioj por asociaj listoj

```
  delete, each, exists, keys, values
```

#### Funkcioj por enigo kaj eligo

```
  binmode, close, closedir, dbmclose, dbmopen, die,
  eof, fileno, flock, format, getc, print, printf,
  read, readdir, rewinddir, seek, seekdir, select,
  syscall, sysread, sysseek, syswrite, tell, telldir,
  truncate, warn, write
```

### Funkcioj por duumaj datumoj, bufroj kaj rikordoj

```
  pack, read, syscall, sysread, syswrite, unpack, vec
```

#### Funkcioj por dosierreprezentiloj, dosieroj kaj dosierujoj

```
  -X, chdir, chmod, chown, chroot, fcntl, glob, ioctl,
  link, lstat, mkdir, open, opendir, readlink, rename,
  rmdir, stat, symlink, umask, unlink, utime
```

#### Funkcioj por kontaktoskatoloj

```
  accept, bind, connect, getpeername, getsockname,
  getsockopt, listen, recv, send, setsockopt, shutdown,
  socket, socketpair
```

#### Funkcioj por reto kaj protokoloj

```
  endprotoent, endservent, gethostbyaddr,
  gethostbyname, gethostent, getnetbyaddr,
  getnetbyname, getnetent, getprotobyname,
  getprotobynumber, getprotoent, getservbyname,
  getservbyport, getservent, sethostent, setnetent,
  setprotoent, setservent           
```
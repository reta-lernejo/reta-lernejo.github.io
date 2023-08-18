import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const DEBUG = false;
const SHADERCODE = true; // log shader code

export class Tereno {

    constructor(html_elemento,larĝo,alto) {        
        //############### sceno + kamerao
        this.bildigo = new THREE.WebGLRenderer();
        this.bildigo.setSize( larĝo, alto );
        document.getElementById(html_elemento).appendChild( this.bildigo.domElement );

        this.sceno = new THREE.Scene();
        const rigardo = 1.5; // -/+-koordinato por la larĝo de ortografia kamerao, estu pli granda ol 1.0!
        this.kamerao = new THREE.OrthographicCamera( -rigardo, rigardo, rigardo, -rigardo, 1, 1000 );
        this.orbito = new OrbitControls( this.kamerao, this.bildigo.domElement );
        //const kamerao = new THREE.OrthographicCamera( LARĜO/- 2, LARĜO/2, ALTO/2, ALTO/- 2, 1, 1000 );
        //const kamerao = new THREE.PerspectiveCamera( 25, LARĜO / ALTO, 0.1, 1000 );
        this.kamerao.position.set( -100, 20, -100);
        this.orbito.update();

        //kamerao.position.y = 0.4;
        this.sceno.add( this.kamerao );

        // media lumo
        const mlumo = new THREE.AmbientLight( 0xc0c0c0 ); // blanketa lumo
        this.sceno.add( mlumo );
    }

    direktlumo(x,y,z) {
        const dlumo = new THREE.DirectionalLight(0xfcffe0, 0.9);
        dlumo.position.set(x,y,z);
        this.sceno.add(dlumo);
        //dlumo.target.updateMatrixWorld();
        return dlumo;
    } 

    ebeno(y, koloro = 0xff0000, dy = 0) {

        const geometrio = new THREE.BufferGeometry();

        const v = new Float32Array([
            -1.0, y-dy,  1.0,
            1.0, y,  1.0,
            1.0, y, -1.0,
            -1.0, y-dy, -1.0]);

        const i = [
            0, 1, 2,
            0, 2, 3
        ];

        geometrio.setIndex( i );
        geometrio.setAttribute( 'position', new THREE.BufferAttribute( v, 3 ) );

        const materialo = new THREE.MeshBasicMaterial( { color: koloro });
        materialo.side = THREE.DoubleSide;
        const krado = new THREE.Mesh( geometrio, materialo); // dratoj|materialo );

        this.sceno.add(krado);
        return krado;
    }

    tavolo(y, koloro = 0xff0000, dy = 0) {

        const geometrio = new THREE.BoxGeometry(2,dy,2);
/*
        const v = new Float32Array([
            -1.0, y-dy,  1.0,
            1.0, y,  1.0,
            1.0, y, -1.0,
            -1.0, y-dy, -1.0]);

        const i = [
            0, 1, 2,
            0, 2, 3
        ];

        geometrio.setIndex( i );
        geometrio.setAttribute( 'position', new THREE.BufferAttribute( v, 3 ) );
        */

        const materialo = new THREE.MeshBasicMaterial( { color: koloro });
        materialo.side = THREE.DoubleSide;
        const krado = new THREE.Mesh( geometrio, materialo); // dratoj|materialo );

        this.sceno.add(krado);
        return krado;
    }


    /**
     * tavolo kun profilo donita kiel altmapo
     **/
    tavolo2(altmapo,koloro,x=1,y=1,z=1,nx=1,ny=1,nz=1) {

        // plibone rekte donu la teksturon, tiel ni povas reuzi ĝin aliloke
        const tx_altoj = new THREE.TextureLoader().load(altmapo);
        const krado = new TerenKahelo(x,y,z,nx,nz,tx_altoj,koloro);
        this.sceno.add(krado);

        return krado;
    }

    /**
     * y: ses malkreskantaj y-koordinatoj laŭ zigzaga linio: supre angulo - supra mezo - flanko meznivela - mezo meznivela - malsupra angulo - malsupra mezo
     **/
    pejzaĝo(altmapo, kolormapo, flankmapo) {

        // ĉu oni povas plibonigi fermante la flankojn?
        // vd. ekz-e https://discourse.threejs.org/t/displacement-map-terrain-close-sides/30683/2

        const tx_altoj = new THREE.TextureLoader().load(altmapo);
        const tx_koloroj = new THREE.TextureLoader().load(kolormapo);
        const tx_flankoj = new THREE.TextureLoader().load(flankmapo);
        tx_flankoj.rotation = Math.PI/2;

/*
        const geometrio = new THREE.PlaneGeometry( 2,2,100,100 );
        geometrio.rotateX(-Math.PI * 0.5).rotateY(Math.PI * 0.5);

        const materialo = new THREE.MeshLambertMaterial({ map: tx_koloroj, 
            displacementMap: tx_altoj, displacementScale: 0.25 }); //, normalMapType: THREE.ObjectSpaceNormalMap }); // , color: koloro

        //materialo.color.setHex(koloro);
        // materialo.normalScale.set( 0.01, 0.01 );
        materialo.side = THREE.DoubleSide;
        if (DEBUG) {
            materialo.wireframe = true;
        }
        if (SHADERCODE) {
            materialo.onBeforeCompile = 
                (shader) => console.debug(shader.vertexShader);
        }
        const krado = new THREE.Mesh( geometrio, materialo ); //materialo); // dratoj|materialo );
*/

        const krado = new TerenKahelo(2,.01,2,100,100,tx_altoj,tx_koloroj,tx_flankoj);

        this.sceno.add(krado);

    /*
        if (DEBUG) {
            // por sencimigo montru ankaŭ la eĝojn
            const dgeo = new THREE.EdgesGeometry( geometrio ); // or WireframeGeometry( geometry )
            //const dmat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
            const dmat = new THREE.LineDashedMaterial( {
                color: 0xffffff,
                linewidth: 2,
                scale: 1,
                dashSize: 3,
                gapSize: 4,
            } );
            const drat = new THREE.LineSegments( dgeo, dmat );
            sceno.add( drat );
        }
        */

        return krado;
    }

    pejzaĝo2(altmapo, kolormapo, flankmapo) {

        // ĉu oni povas plibonigi fermante la flankojn?
        // vd. ekz-e https://discourse.threejs.org/t/displacement-map-terrain-close-sides/30683/2

        const tx_altoj = new THREE.TextureLoader().load(altmapo);
        const tx_koloroj = new THREE.TextureLoader().load(kolormapo);
        const tx_flankoj = new THREE.TextureLoader().load(flankmapo);

        const geometrio = new THREE.BoxGeometry(2,1,2,100,10,100);

        const supro = new THREE.MeshLambertMaterial({ map: tx_koloroj, 
            displacementMap: tx_altoj, displacementScale: 0.25,
            normalMap: tx_altoj, normalScale: new THREE.Vector2(0.1,0.1) }); // , color: koloro
        const flanko = new THREE.MeshBasicMaterial({ map: tx_flankoj });
        const malsupro = new THREE.MeshBasicMaterial({ color: 0x080808 });

        /*
        const c1 = new THREE.MeshBasicMaterial({ color: "red" });
        const c2 = new THREE.MeshBasicMaterial({ color: "blue" });
        const c3 = new THREE.MeshBasicMaterial({ color: "green" });
        const c4 = new THREE.MeshBasicMaterial({ color: "yellow" });
        const c5 = new THREE.MeshBasicMaterial({ color: "white" });
        const c6 = new THREE.MeshBasicMaterial({ color: "orange" });
        */

        /* ordo de la materialoj: 
           1. maldekstre, malantaŭe, 
           2. dekstre antaŭe
           3. supre
           4. malsupre
           5. dekstre malantaŭe
           6. maldekstre antaŭe
        */
        const krado = new THREE.Mesh( geometrio, [flanko,flanko,supro,malsupro,flanko,flanko] ); 
            //materialo); // dratoj|materialo );

        //const krado = new TerenKahelo(2,0.3,2,100,100,tx_altoj,tx_koloroj);

        this.sceno.add(krado);

    /*
        if (DEBUG) {
            // por sencimigo montru ankaŭ la eĝojn
            const dgeo = new THREE.EdgesGeometry( geometrio ); // or WireframeGeometry( geometry )
            //const dmat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
            const dmat = new THREE.LineDashedMaterial( {
                color: 0xffffff,
                linewidth: 2,
                scale: 1,
                dashSize: 3,
                gapSize: 4,
            } );
            const drat = new THREE.LineSegments( dgeo, dmat );
            sceno.add( drat );
        }
        */

        return krado;
    }    

    nuboj(alto, larĝo, ymin=0, ymax=1, radiuso=1,n_eroj=10) {
        const map = new THREE.TextureLoader().load( '/tero/inc/nubo.png' );
        const material = new THREE.SpriteMaterial( { map: map } );

        for (let n=0; n<n_eroj; n++) {
            const nubo = new THREE.Sprite( material );
            // KOREKTU: momente tio estos rektangula, ni devas apliki ekvacion de cirklo (r*sin(alfa)/r*cos(alfa))
            // por x kaj z, alfa arbitre inter 0..2*Pi, r arbitre inter 0 kaj radiuso
            const x = THREE.MathUtils.randFloatSpread( radiuso/2 );
            const y = THREE.MathUtils.randFloat(ymin, ymax);
            const z = THREE.MathUtils.randFloatSpread( radiuso/2 );
            nubo.scale.set(larĝo,alto,larĝo);
            nubo.translateX(x);
            nubo.translateY(y);
            nubo.translateZ(z);
            this.sceno.add( nubo );    
        }
    }

    // vd. https://redstapler.co/three-js-realistic-rain-tutorial/
    precipito(ymin=0,ymax=1,radiuso=1,n_eroj=1000) {
        const precipito = new Precipito(ymin,ymax,radiuso,n_eroj);
        this.sceno.add(precipito.objekto);
        return precipito;
    }

    animacio() {
    	requestAnimationFrame( this.animacio.bind(this) );
        // movu iujn aferojn...
        if (this.ŝanĝoj) this.ŝanĝoj();
        // rebildigu
        this.bildigo.render(this.sceno, this.kamerao);
    }
    
}


/**
 * Kreas kahelon de tereno, kun profilo supra kaj kolormapo
 */
// el https://codesandbox.io/s/youthful-meadow-0swsm?file=/src/js/TerrainCutout.js

// Ni ankoraŭ ne povas tiel meti tavoliĝon ĉe la flankoj, verŝajne ni devos aldoni ĉirkaŭan randon por
// tio en la kolor-teksturo (kio postulas etendi la UV-koordinatojn trans la supra surfaco
// kaj uzi nigran koloron en displacementMap tie...?
// paĝoj kun konsideroj:
// https://discourse.threejs.org/t/displacement-map-creates-gaps-on-the-edges-of-a-mesh/44458
class TerenKahelo extends THREE.Mesh {
    constructor(width, height, depth, segW, segD, heightMap, color, side) {
      super();
  
      this.geometry = new THREE.BoxGeometry(width, height, depth, segW, 1, segD);
      let pos = this.geometry.attributes.position;
      let nor = this.geometry.attributes.normal;
      let enableDisplacement = [];
      for (let i = 0; i < pos.count; i++) {
        enableDisplacement.push(
          Math.sign(pos.getY(i)), // se y>0, punkto povas leviĝi kun la tereno
          Math.sign(nor.getY(i)) // se Y-koordinato de la normalo >0 necesas rekalkuli ĝin
        );
        //re-kalkulu UV (por terenleviĝo)
        let u = (pos.getX(i) + width * 0.5) / width;
        let v = 1 - (pos.getZ(i) + depth * 0.5) / depth;
        this.geometry.attributes.uv.setXY(i, u, v);
      }
      // uzu apartan atributon por enableDisplacement
      this.geometry.setAttribute(
        "enableDisp",
        new THREE.Float32BufferAttribute(enableDisplacement, 2)
      );
      // materialo
      const supro = new THREE.MeshStandardMaterial({
        //wireframe: true,
        //side: DoubleSide,
        color: typeof color === "number"? color : null,
        map: typeof color === "object"? color : null,
        displacementMap: heightMap,
        displacementScale: 0.25,
        displacementBias: -0.25,
        normalMap: heightMap,
        normalScale: new THREE.Vector2(0.25,0.25),
        // uzo de aparta 'shader' por la tereno, kiu respektas la agordon de enableDisp
        onBeforeCompile: (shader) => {
          shader.vertexShader = `
            attribute vec2 enableDisp;
            
            ${shader.vertexShader}
          `.replace(
            `#include <displacementmap_vertex>`,
            `
            #ifdef USE_DISPLACEMENTMAP
              if (enableDisp.x > 0.) {
                
                vec3 vUp = vec3(0, 1, 0);
  
                vec3 v0 = normalize( vUp ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
                transformed += v0;
                
                if(enableDisp.y > 0.) {
                  float txl = 1. / 256.;
  
                  vec3 v1 = normalize( vUp ) * ( texture2D( displacementMap, vDisplacementMapUv + vec2(txl, 0.) ).x * displacementScale + displacementBias );
                  v1.xz = vec2(txl, 0.) * 20.;
                  vec3 v2 = normalize( vUp ) * ( texture2D( displacementMap, vDisplacementMapUv + vec2(0., txl) ).x * displacementScale + displacementBias );
                  v2.xz = -vec2(0., txl) * 20.;
  
                  vec3 n = normalize(cross(v1 - v0, v2 - v0));
                  vNormal = normalMatrix * n;
                }              
              }
            #endif
            `
          );
          //console.log(shader.vertexShader);
        }
      });

      // const flanko = new THREE.MeshStandardMaterial({transparent: true});
      this.material = [null,null,supro,null,null,null];
      //this.material = supro;
    }
}


export class Precipito {
    constructor(ymin=0,ymax=1,radiuso=1,koloro=0xaaaaaa,n_eroj=1000) {
        const p_eroj = []; new Float32Array(n_eroj);
        this.ymin = ymin;
        this.ymax = ymax;

        for (let i=0;i<n_eroj;i++) {
            // KOREKTU: momente tio estos rektangula, ni devas apliki ekvacion de cirklo (r*sin(alfa)/r*cos(alfa))
            // por x kaj z, alfa arbitre inter 0..2*Pi, r arbitre inter 0 kaj radiuso
            const x = THREE.MathUtils.randFloatSpread( radiuso/2 );
            const y = THREE.MathUtils.randFloat(ymin, ymax);
            const z = THREE.MathUtils.randFloatSpread( radiuso/2 );
            p_eroj.push( x, y, z );
        }

        const p_geom = new THREE.BufferGeometry();
        p_geom.setAttribute( 'position', new THREE.Float32BufferAttribute( p_eroj, 3 ) );

        const p_mat = new THREE.PointsMaterial({
            color: koloro,
            //vertexColors: THREE.VertexColors, 
            size: 1,
            transparent: false
        });
        this.objekto = new THREE.Points(p_geom,p_mat);
    }

    animacio() {
        const geom = this.objekto.geometry;
        const punktoj = geom.getAttribute('position');
        const eroj = punktoj.array;
        for (let i=0; i<eroj.length; i++) {
            if (i%3 == 1) {
                const y = eroj[i] - .01;
                eroj[i] = (y>this.ymin)? y : this.ymax;
            }
        }
        geom.setAttribute( 'position', punktoj);
        geom.rotateY(0,0.001);
    }
}

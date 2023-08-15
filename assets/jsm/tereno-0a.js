import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const DEBUG = false;

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
        this.kamerao.position.set( -100, 20, 100);
        this.orbito.update();

        //kamerao.position.y = 0.4;
        this.sceno.add( this.kamerao );
    }

    direktlumo() {
        const dlumo = new THREE.DirectionalLight(0xfcffe0, 9.9);
        dlumo.position.z = 30;
        dlumo.position.y = 10;
        this.sceno.add(dlumo);
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


    /**
     * y: ses malkreskantaj y-koordinatoj laŭ zigzaga linio: supre angulo - supra mezo - flanko meznivela - mezo meznivela - malsupra angulo - malsupra mezo
     **/
    pejzaĝo(altmapo, kolormapo) {

        const tx_altoj = new THREE.TextureLoader().load(altmapo);
        const tx_koloroj = new THREE.TextureLoader().load(kolormapo);
/*
        const texture = Promise.all([
            new THREE.TextureLoader().load(altmapo), 
            new THREE.TextureLoader().load(kolormapo)], 
            (resolve, reject) => { resolve(texture); }
        ).then(txt2 => {
            */

            const geometrio = new THREE.PlaneGeometry( 2,2,100,100 );
            geometrio.rotateX(-Math.PI * 0.5).rotateY(Math.PI * 0.5);

            const materialo = new THREE.MeshLambertMaterial({ map: tx_koloroj, 
                displacementMap: tx_altoj, displacementScale: 0.25 }); //, normalMapType: THREE.ObjectSpaceNormalMap }); // , color: koloro

            //materialo.color.setHex(koloro);
            // materialo.normalScale.set( 0.01, 0.01 );
            materialo.side = THREE.DoubleSide;
            if (DEBUG) materialo.wireframe = true;
            const krado = new THREE.Mesh( geometrio, materialo ); //materialo); // dratoj|materialo );

            this.sceno.add(krado);
/*
        });
*/
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

        // return krado;
    }

    // vd. https://redstapler.co/three-js-realistic-rain-tutorial/
    precipito(ymin=0,ymax=1,radiuso=1,n_eroj=1000) {
        const p_eroj = []; new Float32Array(n_eroj);
        for (let i=0;i<n_eroj;i++) {
            // KOREKTU: momente tio estos rektangula, ni devas pliki ekvacion de cirklo (r*sin(alfa)/r*cos(alfa))
            // por x kaj z, alfa arbitre inter 0..2*Pi, r arbitre inter 0 kaj radiuso
            const x = THREE.MathUtils.randFloatSpread( radiuso/2 );
            const y = THREE.MathUtils.randFloat(ymin, ymax);
            const z = THREE.MathUtils.randFloatSpread( radiuso/2 );
            p_eroj.push( x, y, z );
        }

        const p_geom = new THREE.BufferGeometry();
        p_geom.setAttribute( 'position', new THREE.Float32BufferAttribute( p_eroj, 3 ) );

        const p_mat = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            //vertexColors: THREE.VertexColors, 
            size: 1,
            transparent: false
        });
        const precipito = new THREE.Points(p_geom,p_mat);
        this.sceno.add(precipito);

        return precipito;
    }
}
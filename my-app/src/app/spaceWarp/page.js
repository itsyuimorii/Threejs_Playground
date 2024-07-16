'use client';
import * as THREE from 'three';

const spaceWarp = () => {
    let scene, camera, renderer;

    function init() {
        //create scene object
        scene = new THREE.Scene();

        //setup camera with facing upward
        acgoTmera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 1;
        camera.rotation.x = Math.PI / 2;

        //setup renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);

        animate();
    }
    //rendering loop
    function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    init();
    return (
        <div>
            <h1>Space Warp</h1>
        </div>
    );
}

export default spaceWarp;
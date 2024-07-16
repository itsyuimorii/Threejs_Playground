'use client';
import * as THREE from 'three';
import { useEffect } from 'react';

const SpaceWarp = () => {
    useEffect(() => {
        let scene, camera, renderer, stars, starGeo;

        function init() {
            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 1;
            camera.rotation.x = Math.PI / 2;

            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            starGeo = new THREE.BufferGeometry();
            let positions = [];
            let velocities = [];
            let accelerations = [];

            for (let i = 0; i < 6000; i++) {
                let x = Math.random() * 600 - 300;
                let y = Math.random() * 600 - 300;
                let z = Math.random() * 600 - 300;

                positions.push(x, y, z);
                velocities.push(0);
                accelerations.push(0.02);
            }

            starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            starGeo.userData = { velocities, accelerations };

            let sprite = new THREE.TextureLoader().load('/images/star.png');
            let starMaterial = new THREE.PointsMaterial({
                color: 0xaaaaaa,
                size: 0.7,
                map: sprite
            });

            stars = new THREE.Points(starGeo, starMaterial);
            scene.add(stars);

            window.addEventListener("resize", onWindowResize, false);

            animate();
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            let positions = starGeo.attributes.position.array;
            let velocities = starGeo.userData.velocities;
            let accelerations = starGeo.userData.accelerations;

            for (let i = 0; i < positions.length; i += 3) {
                velocities[i / 3] += accelerations[i / 3];
                positions[i + 1] -= velocities[i / 3];

                if (positions[i + 1] < -200) {
                    positions[i + 1] = 200;
                    velocities[i / 3] = 0;
                }
            }

            starGeo.attributes.position.needsUpdate = true;
            stars.rotation.y += 0.002;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        if (typeof window !== 'undefined') {
            init();
        }
    }, []);

    return (
        <div>
            <h1>Space Warp</h1>
        </div>
    );
}

export default SpaceWarp;

import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

//camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);
camera.position.z = 10;

//scene
const scene = new THREE.Scene();
const loader = new GLTFLoader();
let key;
loader.load('/Model/scene.gltf',
    function (gltf) {
        key = gltf.scene;
        scene.add(key);
        key.position.set(-1, 0, 0);
        key.rotation.set(1, 0, 0);
    },
    function (xhr) { },
    function (error) { }
);

//renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3d').appendChild(renderer.domElement);

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const toplight = new THREE.DirectionalLight(0xffffff, 1);
toplight.position.set(500, 500, 500);
scene.add(toplight);

//reRender3d
const reRender3d = () => {
    requestAnimationFrame(reRender3d);
    renderer.render(scene, camera);
};
reRender3d();

let arrPositionModel = [
    {
        id: 'banner',
        position: { x: -1, y: 0, z: 0 },
        rotation: { x: 1, y: 0, z: 0 }
    },
    {
        id: 'about',
        position: { x: 7, y: 0, z: -1 },
        rotation: { x: 0.5, y: 0, z: 0 }
    },
    {
        id: 'exp',
        position: { x: -1, y: 0, z: -1 },
        rotation: { x: 1, y: 0, z: 0 },
    },
    {
        id: 'contact',
        position: { x: 8, y: 0, z: -1 },
        rotation: { x: 1, y: -0.5, z: 0.5 },
    },
    {
        id: 'project',
        position: { x: -1, y: -6, z: -10 },
        rotation: { x: 1, y: 0, z: 0 },
    },
];

const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(key.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(key.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        });
    }
};

window.addEventListener('scroll', () => {
    if (key) {
        modelMove();
    }
});

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    if (key) {
        modelMove();
    }
});

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
});

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link =>
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
    })
);

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
    }
});

//loader
document.addEventListener('DOMContentLoaded', () => {
    // Show loader for minimum 1.5 seconds
    setTimeout(() => {
        const loader = document.querySelector('.loader-wrapper');
        loader.classList.add('fade-out');

        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

//project
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Optional: Add hover sound effect
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add hover sound if desired
            // new Audio('hover-sound.mp3').play();
        });
    });
});
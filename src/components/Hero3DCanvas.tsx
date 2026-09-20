import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  interactive?: boolean;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredPulse, setHoveredPulse] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Groups
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Core (Icosahedron wireframe + inner glowing sphere)
    const innerGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#081226"),
      roughness: 0.2,
      metalness: 0.8,
      emissive: new THREE.Color("#00ffc6"),
      emissiveIntensity: 0.18,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    masterGroup.add(innerCore);

    // Outer crystalline wireframe lattice
    const outerGeo = new THREE.IcosahedronGeometry(1.85, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#00e5ff"),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerLattice = new THREE.Mesh(outerGeo, wireMat);
    masterGroup.add(outerLattice);

    // Secondary subtle purple lattice
    const purpleGeo = new THREE.DodecahedronGeometry(2.2, 1);
    const purpleMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#8b5cf6"),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const purpleLattice = new THREE.Mesh(purpleGeo, purpleMat);
    masterGroup.add(purpleLattice);

    // 2. Orbital Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#00ffc6"),
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const ringGeo1 = new THREE.RingGeometry(2.7, 2.73, 64);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    masterGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3b82f6"),
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const ringGeo2 = new THREE.RingGeometry(3.1, 3.125, 64);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.25;
    ring2.rotation.y = -Math.PI * 0.35;
    masterGroup.add(ring2);

    // 3. Neural Synaptic Nodes & Connecting Line Segments
    const nodeCount = 38;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGroup = new THREE.Group();
    masterGroup.add(nodeGroup);

    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#ffffff") });
    const cyanNodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#00ffc6") });
    const purpleNodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#a855f7") });

    for (let i = 0; i < nodeCount; i++) {
      const radius = 1.85 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const pos = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);

      const mat = i % 3 === 0 ? cyanNodeMat : i % 3 === 1 ? purpleNodeMat : nodeMat;
      const nodeMesh = new THREE.Mesh(nodeGeo, mat);
      nodeMesh.position.copy(pos);
      nodeGroup.add(nodeMesh);
    }

    // Connect close nodes with lines
    const linePairs: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.4) {
          linePairs.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePairs, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: new THREE.Color("#00e5ff"),
      transparent: true,
      opacity: 0.22,
    });
    const neuralLines = new THREE.LineSegments(linesGeo, linesMat);
    masterGroup.add(neuralLines);

    // 4. Floating Particles (Data Dust)
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color("#38bdf8"),
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffc6, 3.5, 15);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2.5, 15);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    // Mouse Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * 0.45;
      targetMouseY = y * 0.45;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouseX = x * 0.45;
        targetMouseY = y * 0.45;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    setIsLoaded(true);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const speedFactor = prefersReducedMotion ? 0.1 : 1.0;

      // Parallax lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      masterGroup.rotation.y = elapsedTime * 0.18 * speedFactor + currentMouseX;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.15 * speedFactor) * 0.1 + currentMouseY;

      outerLattice.rotation.y = -elapsedTime * 0.12 * speedFactor;
      outerLattice.rotation.z = elapsedTime * 0.08 * speedFactor;

      purpleLattice.rotation.x = elapsedTime * 0.1 * speedFactor;
      purpleLattice.rotation.y = -elapsedTime * 0.15 * speedFactor;

      ring1.rotation.z = elapsedTime * 0.25 * speedFactor;
      ring2.rotation.z = -elapsedTime * 0.2 * speedFactor;

      // Breathing scale effect
      const breathe = 1 + Math.sin(elapsedTime * 1.6) * 0.025;
      innerCore.scale.set(breathe, breathe, breathe);

      // Rotate background particles slowly
      particles.rotation.y = elapsedTime * 0.02 * speedFactor;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      wireMat.dispose();
      purpleGeo.dispose();
      purpleMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      cyanNodeMat.dispose();
      purpleNodeMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[560px] flex items-center justify-center select-none touch-pan-y"
      onMouseEnter={() => setHoveredPulse(true)}
      onMouseLeave={() => setHoveredPulse(false)}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#07090e]/80 backdrop-blur-sm z-10 transition-opacity duration-500">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
            <span className="text-xs font-mono tracking-wider text-cyan-400/80 uppercase">
              Initializing 3D Neural Core...
            </span>
          </div>
        </div>
      )}

      {/* Floating 3D Interaction Badge */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[11px] font-mono text-slate-400">
          Interactive Neural Core • Move mouse to parallax
        </span>
      </div>
    </div>
  );
};

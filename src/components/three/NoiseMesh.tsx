import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

export const NoiseMesh = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.6, 32);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xc9a96a, wireframe: true, roughness: 0.6, metalness: 0.7, transparent: true, opacity: 0.55,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const light = new THREE.PointLight(0xffd6a0, 2.5);
    light.position.set(4, 4, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x222222));

    const noise = createNoise3D();
    const positionAttr = geo.attributes.position;
    const original = positionAttr.array.slice();

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) - 0.5;
      mouse.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(mount);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = performance.now() * 0.0003;
      for (let i = 0; i < positionAttr.count; i++) {
        const ox = (original as Float32Array)[i * 3];
        const oy = (original as Float32Array)[i * 3 + 1];
        const oz = (original as Float32Array)[i * 3 + 2];
        const n = noise(ox * 0.8 + t, oy * 0.8 + t, oz * 0.8);
        const f = 1 + n * 0.18;
        positionAttr.setXYZ(i, ox * f, oy * f, oz * f);
      }
      positionAttr.needsUpdate = true;
      mesh.rotation.x += (mouse.y * 0.5 - mesh.rotation.x) * 0.04;
      mesh.rotation.y += (mouse.x * 0.5 - mesh.rotation.y) * 0.04 + 0.001;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

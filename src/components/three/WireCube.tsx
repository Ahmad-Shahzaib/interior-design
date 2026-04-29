import { useEffect, useRef } from "react";
import * as THREE from "three";

export const WireCube = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(3, 2.5, 4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geo = new THREE.BoxGeometry(2, 1.5, 2.4);
    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xc9a96a }));
    scene.add(line);

    let raf = 0; let visible = true;
    const io = new IntersectionObserver(([e]) => visible = e.isIntersecting, { threshold: 0.05 });
    io.observe(mount);
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      line.rotation.y += 0.004;
      line.rotation.x += 0.001;
      renderer.render(scene, camera);
    };
    tick();
    const onR = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onR);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", onR);
      geo.dispose(); edges.dispose(); renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={ref} className="w-full h-full" />;
};

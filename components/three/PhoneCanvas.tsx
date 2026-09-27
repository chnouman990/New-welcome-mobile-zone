"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import Phone, { PHONE } from "./Phone";
import { phoneFinish, phoneIntro, phoneTarget, pointer } from "@/lib/stage";

const damp = THREE.MathUtils.damp;

function Rig() {
  const group = useRef<THREE.Group>(null);
  const color = useMemo(() => new THREE.Color(phoneFinish.color), []);
  const targetColor = useMemo(() => new THREE.Color(), []);
  const camera = useThree((s) => s.camera);
  const getViewport = useThree((s) => s.viewport.getCurrentViewport);
  const smoothPointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 20);
    const vp = getViewport(camera, [0, 0, 0]);
    const t = state.clock.elapsedTime;

    const sp = smoothPointer.current;
    sp.x = damp(sp.x, pointer.x, 3, dt);
    sp.y = damp(sp.y, pointer.y, 3, dt);

    const f = phoneTarget.float;
    const tx = (phoneTarget.x * vp.width) / 2;
    const ty = (phoneTarget.y + phoneIntro.y) * (vp.height / 2) + Math.sin(t * 1.1) * 0.06 * f;
    // Phone height fills ~64% of the viewport at scale 1, capped so it never overflows narrow screens.
    const fit = Math.min((vp.height * 0.64) / PHONE.h, (vp.width * 0.62) / PHONE.w);
    const s = fit * phoneTarget.scale * phoneIntro.scale;

    const lambda = 5;
    g.position.x = damp(g.position.x, tx, lambda, dt);
    g.position.y = damp(g.position.y, ty, lambda, dt);
    g.rotation.x = damp(g.rotation.x, phoneTarget.rx - sp.y * 0.12 * f + Math.sin(t * 0.7) * 0.03 * f, lambda, dt);
    g.rotation.y = damp(g.rotation.y, phoneTarget.ry + phoneIntro.ry + sp.x * 0.22 * f, lambda, dt);
    g.rotation.z = damp(g.rotation.z, phoneTarget.rz + Math.sin(t * 0.9) * 0.02 * f, lambda, dt);
    const sc = damp(g.scale.x, s, lambda, dt);
    g.scale.setScalar(sc);

    targetColor.set(phoneFinish.color);
    color.lerp(targetColor, 1 - Math.exp(-4 * dt));
  });

  return <Phone ref={group} color={color} />;
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={2.2} />
      <directionalLight position={[-6, -2, -4]} intensity={1.4} color="#6f8dff" />
      <pointLight position={[0, 0, -5]} intensity={20} color="#3b63ff" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -6]} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={2.4} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 2.5, 1]} />
        <Lightformer form="rect" intensity={2} position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 1.5, 1]} color="#9fb6ff" />
        <Lightformer form="ring" intensity={4} position={[2, 3, 6]} scale={2} />
        <Lightformer form="rect" intensity={1} position={[0, -6, 0]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} color="#0d3fd6" />
      </Environment>
    </>
  );
}

/**
 * Full-screen, click-through WebGL layer holding the 3D phone.
 * It stays fixed while the page scrolls; GSAP timelines move the phone around.
 */
export default function PhoneCanvas({ visible }: { visible: boolean }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    // Wait for web fonts so the lock-screen texture is painted with the brand typeface.
    document.fonts.ready.then(() => setReady(true));
    return () => window.removeEventListener("pointermove", move);
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 11], fov: 28 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <Lights />
      <Rig />
    </Canvas>
  );
}

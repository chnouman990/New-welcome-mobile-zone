"use client";

import { forwardRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { createBackTexture, createScreenTexture } from "./screenTexture";

// Real-world proportions of a modern 6.7" Android phone (≈ 77 × 164 × 8 mm).
export const PHONE = { w: 1.54, h: 3.28, d: 0.17, r: 0.24 };

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - r);
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + h);
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  return s;
}

/** ShapeGeometry with UVs normalised to 0…1 so textures stretch over the shape. */
function flatShape(w: number, h: number, r: number) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 32);
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) + w / 2) / w, (pos.getY(i) + h / 2) / h);
  }
  uv.needsUpdate = true;
  return g;
}

function slab(w: number, h: number, r: number, depth: number, bevel: number) {
  const g = new THREE.ExtrudeGeometry(roundedRect(w - bevel * 2, h - bevel * 2, Math.max(r - bevel, 0.01)), {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 10,
    curveSegments: 32,
  });
  g.translate(0, 0, -depth / 2);
  g.computeVertexNormals();
  return g;
}

type PhoneProps = { color: THREE.Color };

const Phone = forwardRef<THREE.Group, PhoneProps>(function Phone({ color }, ref) {
  const { w, h, d, r } = PHONE;
  const bevel = 0.045;
  const screenInset = 0.075;
  const sw = w - screenInset * 2;
  const sh = h - screenInset * 2;

  const geo = useMemo(
    () => ({
      body: slab(w, h, r, d - bevel * 2, bevel),
      glass: flatShape(w - 0.03, h - 0.03, r - 0.015),
      screen: flatShape(sw, sh, r - screenInset),
      island: slab(0.5, 1.12, 0.25, 0.02, 0.022),
    }),
    [w, h, d, r, sw, sh],
  );

  const tex = useMemo(() => ({ screen: createScreenTexture(sw / sh), back: createBackTexture() }), [sw, sh]);

  const mats = useMemo(() => {
    const back = new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.32,
      metalness: 0.15,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
    });
    const frame = new THREE.MeshStandardMaterial({ color: "#c7cfdf", metalness: 1, roughness: 0.22 });
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#020306",
      roughness: 0.06,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
    });
    const screen = new THREE.MeshStandardMaterial({
      color: "#000000",
      emissive: "#ffffff",
      emissiveMap: tex.screen,
      emissiveIntensity: 1,
      roughness: 0.12,
      metalness: 0,
      toneMapped: false,
    });
    const lensRing = new THREE.MeshStandardMaterial({ color: "#d9dfea", metalness: 1, roughness: 0.18 });
    const lensGlass = new THREE.MeshPhysicalMaterial({
      color: "#05060a",
      roughness: 0.02,
      metalness: 0.2,
      clearcoat: 1,
    });
    const lensCore = new THREE.MeshStandardMaterial({
      color: "#0b1030",
      emissive: "#2a3fa8",
      emissiveIntensity: 0.35,
      roughness: 0.1,
    });
    const flash = new THREE.MeshStandardMaterial({ color: "#fff4d6", emissive: "#fff4d6", emissiveIntensity: 0.25 });
    const print = new THREE.MeshBasicMaterial({ map: tex.back, transparent: true, opacity: 0.55, depthWrite: false });
    const black = new THREE.MeshBasicMaterial({ color: "#000000" });
    return { back, frame, glass, screen, lensRing, lensGlass, lensCore, flash, print, black };
    // colour is animated in-place by the parent, not recreated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tex]);

  // Keep the back glass colour in sync with the colour object the parent animates.
  useEffect(() => {
    mats.back.color = color;
  }, [color, mats]);

  useEffect(
    () => () => {
      Object.values(geo).forEach((g) => g.dispose());
      Object.values(mats).forEach((m) => m.dispose());
      tex.screen.dispose();
      tex.back.dispose();
    },
    [geo, mats, tex],
  );

  const front = d / 2;
  const backZ = -d / 2;
  // Mirrored because it is seen from behind: +x appears top-left when the phone is flipped.
  const islandX = w / 2 - 0.1 - 0.25;
  const islandY = h / 2 - 0.1 - 0.56;

  return (
    <group ref={ref}>
      {/* Body: caps use the back glass material, sides are the metal frame */}
      <mesh geometry={geo.body} material={[mats.back, mats.frame]} />

      {/* Front glass + display */}
      <mesh geometry={geo.glass} material={mats.glass} position={[0, 0, front + 0.001]} />
      <mesh geometry={geo.screen} material={mats.screen} position={[0, 0, front + 0.002]} />
      <mesh material={mats.black} position={[0, sh / 2 - 0.11, front + 0.003]}>
        <circleGeometry args={[0.045, 32]} />
      </mesh>

      {/* Side buttons */}
      <RoundedBox args={[0.03, 0.42, 0.07]} radius={0.012} position={[w / 2 + 0.004, 0.7, 0]} material={mats.frame} />
      <RoundedBox args={[0.03, 0.22, 0.07]} radius={0.012} position={[w / 2 + 0.004, 0.18, 0]} material={mats.frame} />

      {/* Back: camera island */}
      <group position={[islandX, islandY, backZ]} rotation={[0, Math.PI, 0]}>
        <mesh geometry={geo.island} material={mats.back} position={[0, 0, 0.02]} />
        {[0.32, 0, -0.32].map((y, i) => (
          <group key={i} position={[0, y, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh material={mats.lensRing}>
              <cylinderGeometry args={[0.15, 0.155, 0.045, 48]} />
            </mesh>
            <mesh material={mats.lensGlass} position={[0, 0.004, 0]}>
              <cylinderGeometry args={[0.122, 0.122, 0.045, 48]} />
            </mesh>
            <mesh material={mats.lensCore} position={[0, 0.028, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.004, 32]} />
            </mesh>
          </group>
        ))}
      </group>
      <mesh material={mats.flash} position={[islandX - 0.42, islandY + 0.34, backZ - 0.003]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.055, 32]} />
      </mesh>
      <mesh material={mats.print} position={[0, -h / 2 + 0.45, backZ - 0.002]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.72, 0.18]} />
      </mesh>
    </group>
  );
});

export default Phone;

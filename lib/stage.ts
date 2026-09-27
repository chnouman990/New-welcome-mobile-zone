/**
 * Tiny shared state between the DOM (GSAP scroll timelines) and the 3D scene.
 * GSAP writes to these plain objects; the render loop reads and eases towards them.
 * Positions are in viewport fractions: x = -1 (left edge) … 1 (right edge), y likewise.
 */
export const phoneTarget = {
  x: 0,
  y: 0,
  rx: 0,
  ry: 0,
  rz: 0,
  scale: 1,
  float: 1,
};

/** Entrance offsets, animated back to zero once the preloader finishes. */
export const phoneIntro = {
  y: -1.8,
  ry: -Math.PI * 1.25,
  scale: 0.55,
};

export const phoneFinish = {
  color: "#0d3fd6",
};

export const pointer = { x: 0, y: 0 };

type Listener = () => void;
const introListeners = new Set<Listener>();
let introFinished = false;

export function onIntroDone(fn: Listener) {
  if (introFinished) {
    fn();
    return () => {};
  }
  introListeners.add(fn);
  return () => introListeners.delete(fn);
}

export function markIntroDone() {
  if (introFinished) return;
  introFinished = true;
  introListeners.forEach((fn) => fn());
  introListeners.clear();
}

export const phoneColors = [
  { name: "Zone Blue", value: "#0d3fd6" },
  { name: "Midnight", value: "#141a26" },
  { name: "Glacier", value: "#cfd8e6" },
  { name: "Lilac", value: "#7c5ce0" },
  { name: "Jade", value: "#1f6f68" },
];

import * as THREE from "three";

function fontFamily(varName: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return v ? `${v}, ${fallback}` : fallback;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function setStretch(ctx: CanvasRenderingContext2D, value: CanvasFontStretch) {
  // Archivo is a variable font with a width axis; "expanded" matches the wide logo type.
  if ("fontStretch" in ctx) ctx.fontStretch = value;
}

function drawMark(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.translate(cx, cy);
  ctx.rotate((18 * Math.PI) / 180);
  const s = r / 48;
  ctx.strokeStyle = "#0d3fd6";
  ctx.lineWidth = 6 * s;
  roundRect(ctx, -19 * s, -30 * s, 38 * s, 60 * s, 9 * s);
  ctx.stroke();
  ctx.fillStyle = "#0d3fd6";
  roundRect(ctx, -9 * s, 19 * s, 18 * s, 4 * s, 2 * s);
  ctx.fill();
  ctx.restore();
}

/** Paints the phone's lock screen: a "Welcome" wallpaper with shop notifications. */
export function createScreenTexture(aspect: number) {
  const W = 1000;
  const H = Math.round(W / aspect);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const display = fontFamily("--font-archivo", "Arial Black, sans-serif");
  const body = fontFamily("--font-manrope", "Arial, sans-serif");

  // Wallpaper
  const bg = ctx.createLinearGradient(0, 0, W * 0.4, H);
  bg.addColorStop(0, "#0a2fa6");
  bg.addColorStop(0.45, "#0d3fd6");
  bg.addColorStop(1, "#050d2e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const blob = (x: number, y: number, r: number, c: string) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, c);
    g.addColorStop(1, "rgba(13,63,214,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  };
  blob(W * 0.85, H * 0.28, W * 0.9, "rgba(120,150,255,0.55)");
  blob(W * 0.05, H * 0.7, W * 0.8, "rgba(40,20,160,0.6)");
  blob(W * 0.6, H * 0.95, W * 0.7, "rgba(0,0,0,0.5)");

  // Flowing contour lines
  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  for (let i = 0; i < 22; i++) {
    ctx.beginPath();
    const oy = H * 0.3 + i * 38;
    for (let x = -20; x <= W + 20; x += 20) {
      const y = oy + Math.sin(x / 170 + i * 0.35) * 60 + Math.cos(x / 90 - i * 0.2) * 18;
      if (x === -20) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();

  // Status bar
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 38px ${body}`;
  ctx.textBaseline = "middle";
  ctx.fillText("12:30", 70, 86);
  // signal bars
  for (let i = 0; i < 4; i++) {
    const h = 10 + i * 7;
    roundRect(ctx, W - 250 + i * 14, 100 - h, 9, h, 2);
    ctx.fill();
  }
  ctx.font = `700 30px ${body}`;
  ctx.fillText("5G", W - 185, 86);
  // battery
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  roundRect(ctx, W - 132, 70, 62, 32, 8);
  ctx.stroke();
  roundRect(ctx, W - 127, 75, 42, 22, 5);
  ctx.fill();
  roundRect(ctx, W - 66, 80, 5, 12, 2);
  ctx.fill();

  // Date + clock
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  ctx.textAlign = "center";
  ctx.font = `600 40px ${body}`;
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText(dateStr, W / 2, 300);
  ctx.font = `800 250px ${display}`;
  ctx.fillStyle = "#ffffff";
  ctx.fillText("12:30", W / 2, 470);

  // Brand block
  drawMark(ctx, W / 2, H * 0.47, 92);
  ctx.font = `900 132px ${display}`;
  setStretch(ctx, "expanded");
  ctx.fillText("WELCOME", W / 2, H * 0.47 + 190);
  ctx.font = `600 34px ${body}`;
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  setStretch(ctx, "normal");
  ctx.fillText("M O B I L E   Z O N E", W / 2, H * 0.47 + 275);

  // Notifications
  const note = (y: number, title: string, text: string, time: string) => {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.16)";
    roundRect(ctx, 50, y, W - 100, 170, 44);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 2;
    ctx.stroke();
    drawMark(ctx, 130, y + 85, 42);
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = `700 34px ${body}`;
    ctx.fillText(title, 196, y + 60);
    ctx.font = `500 31px ${body}`;
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText(text, 196, y + 112);
    ctx.textAlign = "right";
    ctx.font = `500 26px ${body}`;
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText(time, W - 90, y + 60);
    ctx.restore();
  };
  note(H - 560, "New Welcome", "Your order is ready at Dubai Plaza", "now");
  note(H - 370, "New arrivals", "Fresh Android sets just landed", "2m");

  // Home indicator
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  roundRect(ctx, W / 2 - 130, H - 60, 260, 12, 6);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** Subtle shop wordmark printed on the back glass. */
export function createBackTexture() {
  const W = 512;
  const H = 128;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const display = fontFamily("--font-archivo", "Arial Black, sans-serif");
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 64px ${display}`;
  setStretch(ctx, "expanded");
  ctx.fillText("WELCOME", W / 2, H / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

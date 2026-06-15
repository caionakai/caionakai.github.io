const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector("#score");
const bestEl = document.querySelector("#best");
const overlay = document.querySelector("#overlay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");

const W = canvas.width;
const H = canvas.height;
const groundH = 92;
const playableTop = 34;
const playableBottom = H - groundH - 34;
const pipeConfig = {
  startGap: 230,
  minGap: birdSafeGap(),
  shrinkPerPoint: 1.45,
  maxCenterStep: 112,
  edgePadding: 24
};
const bird = { x: 226, y: 280, r: 22, vy: 0, rot: 0 };
const state = {
  running: false,
  paused: false,
  over: false,
  score: 0,
  best: Number(localStorage.getItem("skylineFlutterBest") || 0),
  pipes: [],
  sparks: [],
  clouds: [],
  time: 0,
  speed: 3.35,
  spawnTimer: 0,
  lastGapY: 286
};

bestEl.textContent = state.best;

for (let i = 0; i < 9; i += 1) {
  state.clouds.push({
    x: Math.random() * W,
    y: 52 + Math.random() * 230,
    s: 0.55 + Math.random() * 1.5,
    a: 0.16 + Math.random() * 0.2
  });
}

function reset() {
  state.running = true;
  state.paused = false;
  state.over = false;
  state.score = 0;
  state.pipes = [];
  state.sparks = [];
  state.speed = 3.35;
  state.spawnTimer = 0;
  state.lastGapY = 286;
  bird.y = 280;
  bird.vy = -6;
  bird.rot = -0.28;
  scoreEl.textContent = "0";
  overlay.classList.add("hidden");
  pauseBtn.setAttribute("aria-label", "Pause game");
  pauseBtn.firstElementChild.textContent = "II";
  addPipe(W + 120);
}

function addPipe(x = W + 80) {
  const gap = Math.max(pipeConfig.minGap, pipeConfig.startGap - state.score * pipeConfig.shrinkPerPoint);
  const minCenter = playableTop + pipeConfig.edgePadding + gap / 2;
  const maxCenter = playableBottom - pipeConfig.edgePadding - gap / 2;
  const low = Math.max(minCenter, state.lastGapY - pipeConfig.maxCenterStep);
  const high = Math.min(maxCenter, state.lastGapY + pipeConfig.maxCenterStep);
  const center = randomBetween(low, high);
  state.lastGapY = center;
  state.pipes.push({ x, w: 82, gapY: center, gap, passed: false });
}

function birdSafeGap() {
  return 188;
}

function randomBetween(min, max) {
  if (max <= min) return (min + max) / 2;
  return min + Math.random() * (max - min);
}

function flap() {
  if (!state.running || state.over) {
    reset();
    return;
  }
  if (state.paused) return;
  bird.vy = -8.8;
  bird.rot = -0.52;
  for (let i = 0; i < 9; i += 1) {
    state.sparks.push({
      x: bird.x - 20,
      y: bird.y + 8,
      vx: -1.8 - Math.random() * 2.4,
      vy: -1.4 + Math.random() * 2.8,
      life: 1,
      size: 2 + Math.random() * 4
    });
  }
}

function endGame() {
  state.over = true;
  state.running = false;
  state.best = Math.max(state.best, state.score);
  localStorage.setItem("skylineFlutterBest", String(state.best));
  bestEl.textContent = state.best;
  overlay.querySelector("h1").textContent = "Flight Over";
  overlay.querySelector("p").textContent = `Score ${state.score}. Tap, click, or press Space to launch again.`;
  startBtn.textContent = "Fly Again";
  overlay.classList.remove("hidden");
}

function togglePause() {
  if (!state.running || state.over) return;
  state.paused = !state.paused;
  pauseBtn.setAttribute("aria-label", state.paused ? "Resume game" : "Pause game");
  pauseBtn.firstElementChild.textContent = state.paused ? ">" : "II";
  if (!state.paused) requestAnimationFrame(loop);
}

function update() {
  state.time += 1;
  state.speed = Math.min(5.4, 3.35 + state.score * 0.045);
  bird.vy += 0.46;
  bird.y += bird.vy;
  bird.rot = Math.min(0.92, bird.rot + 0.045);

  state.spawnTimer -= 1;
  if (state.spawnTimer <= 0) {
    addPipe();
    state.spawnTimer = 94;
  }

  state.clouds.forEach((cloud) => {
    cloud.x -= 0.18 * cloud.s;
    if (cloud.x < -170) {
      cloud.x = W + 120;
      cloud.y = 52 + Math.random() * 230;
    }
  });

  state.pipes.forEach((pipe) => {
    pipe.x -= state.speed;
    if (!pipe.passed && pipe.x + pipe.w < bird.x) {
      pipe.passed = true;
      state.score += 1;
      scoreEl.textContent = state.score;
    }
  });
  state.pipes = state.pipes.filter((pipe) => pipe.x > -120);

  state.sparks.forEach((spark) => {
    spark.x += spark.vx;
    spark.y += spark.vy;
    spark.vy += 0.03;
    spark.life -= 0.035;
  });
  state.sparks = state.sparks.filter((spark) => spark.life > 0);

  if (bird.y - bird.r < 0 || bird.y + bird.r > H - groundH) endGame();
  for (const pipe of state.pipes) {
    if (collides(pipe)) {
      endGame();
      break;
    }
  }
}

function collides(pipe) {
  const bx = bird.x;
  const by = bird.y;
  const closestX = Math.max(pipe.x, Math.min(bx, pipe.x + pipe.w));
  const topBottom = pipe.gapY - pipe.gap / 2;
  const bottomTop = pipe.gapY + pipe.gap / 2;
  const inColumn = bx + bird.r > pipe.x && bx - bird.r < pipe.x + pipe.w;
  if (!inColumn) return false;
  const hitTop = by - bird.r < topBottom;
  const hitBottom = by + bird.r > bottomTop;
  const dx = bx - closestX;
  return hitTop || hitBottom || dx * dx < bird.r * bird.r && (by < topBottom || by > bottomTop);
}

function drawSky() {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#76c7ff");
  sky.addColorStop(0.44, "#ffd0a6");
  sky.addColorStop(0.76, "#6687b6");
  sky.addColorStop(1, "#18283d");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  const sun = ctx.createRadialGradient(770, 128, 10, 770, 128, 190);
  sun.addColorStop(0, "rgba(255,245,181,.95)");
  sun.addColorStop(0.3, "rgba(255,181,121,.38)");
  sun.addColorStop(1, "rgba(255,181,121,0)");
  ctx.fillStyle = sun;
  ctx.fillRect(540, 0, 420, 320);

  state.clouds.forEach((cloud) => drawCloud(cloud));
  drawCity();
}

function drawCloud(cloud) {
  ctx.save();
  ctx.globalAlpha = cloud.a;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(cloud.x, cloud.y, 58 * cloud.s, 17 * cloud.s, 0, 0, Math.PI * 2);
  ctx.ellipse(cloud.x + 42 * cloud.s, cloud.y + 6 * cloud.s, 50 * cloud.s, 15 * cloud.s, 0, 0, Math.PI * 2);
  ctx.ellipse(cloud.x - 34 * cloud.s, cloud.y + 8 * cloud.s, 40 * cloud.s, 13 * cloud.s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCity() {
  for (let layer = 0; layer < 3; layer += 1) {
    const base = H - groundH - layer * 24;
    const offset = -(state.time * (0.22 + layer * 0.18)) % 140;
    ctx.fillStyle = [`rgba(29,58,82,.26)`, `rgba(20,43,68,.34)`, `rgba(12,28,48,.52)`][layer];
    for (let x = offset - 90; x < W + 80; x += 70) {
      const height = 54 + ((x + layer * 31) % 86);
      ctx.fillRect(x, base - height, 48, height);
      ctx.fillRect(x + 9, base - height - 14, 30, 14);
    }
  }
}

function drawPipe(pipe) {
  const top = pipe.gapY - pipe.gap / 2;
  const bottom = pipe.gapY + pipe.gap / 2;
  drawGate(pipe.x, 0, pipe.w, top, true);
  drawGate(pipe.x, bottom, pipe.w, H - groundH - bottom, false);
}

function drawGate(x, y, w, h, top) {
  if (h <= 0) return;
  const grad = ctx.createLinearGradient(x, y, x + w, y);
  grad.addColorStop(0, "#1f8f9b");
  grad.addColorStop(0.5, "#58e3d2");
  grad.addColorStop(1, "#166d7f");
  ctx.fillStyle = grad;
  roundedRect(x, y, w, h, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,.22)";
  ctx.fillRect(x + 12, y + 8, 10, Math.max(0, h - 16));
  ctx.fillStyle = "#0e4557";
  const lipY = top ? h - 22 : y;
  roundedRect(x - 10, lipY, w + 20, 24, 8);
  ctx.fill();
  ctx.fillStyle = "#85fff0";
  ctx.fillRect(x - 5, lipY + (top ? 2 : 20), w + 10, 2);
}

function drawBird() {
  ctx.save();
  ctx.translate(bird.x, bird.y);
  ctx.rotate(bird.rot);
  ctx.fillStyle = "rgba(0,0,0,.18)";
  ctx.beginPath();
  ctx.ellipse(-3, 32, 32, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  const wing = Math.sin(state.time * 0.34) * 10;
  ctx.fillStyle = "#ff9f6f";
  ctx.beginPath();
  ctx.ellipse(-18, 4 + wing * 0.08, 17, 27, -0.9 + wing * 0.025, 0, Math.PI * 2);
  ctx.fill();

  const body = ctx.createRadialGradient(-9, -11, 4, 0, 0, 34);
  body.addColorStop(0, "#fff4b5");
  body.addColorStop(0.6, "#ffd36c");
  body.addColorStop(1, "#f28b57");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.ellipse(0, 0, 27, 23, 0.18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(12, -8, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#102033";
  ctx.beginPath();
  ctx.arc(15, -7, 3.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ff6b5d";
  ctx.beginPath();
  ctx.moveTo(23, 0);
  ctx.lineTo(44, 7);
  ctx.lineTo(23, 14);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGround() {
  const y = H - groundH;
  const ground = ctx.createLinearGradient(0, y, 0, H);
  ground.addColorStop(0, "#245468");
  ground.addColorStop(1, "#102033");
  ctx.fillStyle = ground;
  ctx.fillRect(0, y, W, groundH);
  const offset = -(state.time * state.speed) % 42;
  for (let x = offset - 42; x < W + 42; x += 42) {
    ctx.fillStyle = "#ffd36c";
    ctx.fillRect(x, y + 16, 24, 5);
    ctx.fillStyle = "rgba(255,255,255,.12)";
    ctx.fillRect(x + 2, y + 52, 36, 2);
  }
}

function drawSparks() {
  state.sparks.forEach((spark) => {
    ctx.globalAlpha = spark.life;
    ctx.fillStyle = spark.life > 0.5 ? "#fff1a3" : "#58e3d2";
    ctx.beginPath();
    ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function roundedRect(x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function draw() {
  drawSky();
  state.pipes.forEach(drawPipe);
  drawSparks();
  drawBird();
  drawGround();
  if (state.paused) {
    ctx.fillStyle = "rgba(7,12,23,.34)";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#f8fbff";
    ctx.font = "800 42px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Paused", W / 2, H / 2);
  }
}

function loop() {
  if (!state.paused) {
    if (state.running && !state.over) update();
    else state.time += 1;
    draw();
  }
  if (!state.paused) requestAnimationFrame(loop);
}

startBtn.addEventListener("click", reset);
pauseBtn.addEventListener("click", togglePause);
window.addEventListener("pointerdown", (event) => {
  if (event.target instanceof HTMLButtonElement) return;
  flap();
});
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    event.preventDefault();
    flap();
  }
  if (event.code === "KeyP") togglePause();
});

draw();
requestAnimationFrame(loop);

import PhysicsEngine from "./PhysicsEngine.js";
import Sand from "./Sand.js";
import Solid from "./Solid.js";

const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

const cols = 64;
const rows = 64;
const cellSize = 8;
const grid = Array.from({ length: rows }, () => Array(cols).fill(null));

const physics = new PhysicsEngine(grid);

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const block = grid[y][x];
            if (block) {
                ctx.fillStyle = block.color;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            } else {
                ctx.strokeStyle = "#eee";
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}

let isDrawing = false;
let lastMouseX = 0;
let lastMouseY = 0;
let lastPlaceTime = 0;
const placeInterval = 50; // milliseconds

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    updateMousePosition(e);
});

canvas.addEventListener("mousemove", (e) => {
    updateMousePosition(e);
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
});

function updateMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    lastMouseX = e.clientX - rect.left;
    lastMouseY = e.clientY - rect.top;
}

const TPS = 60;
const TICK_INTERVAL = 1000 / TPS;

let lastTick = performance.now();
let tickAccumulator = 0;

function gameLoop(currentTime) {
    const delta = currentTime - lastTick;
    lastTick = currentTime;
    tickAccumulator += delta;

    // Run fixed ticks
    while (tickAccumulator >= TICK_INTERVAL) {
        updateTick(); // apply physics, input, etc.
        tickAccumulator -= TICK_INTERVAL;
    }

    drawGrid(); // draw latest grid state
    requestAnimationFrame(gameLoop);
}

function handleUserInput() {
    if (!isDrawing) return;

    const now = performance.now();
    if (now - lastPlaceTime > placeInterval) {
        const gridX = Math.floor(lastMouseX / cellSize);
        const gridY = Math.floor(lastMouseY / cellSize);

        if (gridY >= 0 && gridY < rows && gridX >= 0 && gridX < cols && grid[gridY][gridX] === null) {
            grid[gridY][gridX] = new Sand(gridX, gridY);
            lastPlaceTime = now;
        }
    }
}

function updateTick() {
    handleUserInput(); // mouse drawing
    physics.update(); // block behavior
}

requestAnimationFrame(gameLoop);

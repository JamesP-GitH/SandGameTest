import PhysicsEngine from "./PhysicsEngine.js";
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

function loop() {
    if (isDrawing) {
        const now = performance.now();
        if (now - lastPlaceTime > placeInterval) {
            const gridX = Math.floor(lastMouseX / cellSize);
            const gridY = Math.floor(lastMouseY / cellSize);
            if (gridY >= 0 && gridY < rows && gridX >= 0 && gridX < cols && grid[gridY][gridX] === null) {
                grid[gridY][gridX] = new Solid(gridX, gridY, "sandyBrown", "solid", 0.1, 0.2, 0, 0, 0.95, 0, 2);
                lastPlaceTime = now;
            }
        }
    }

    physics.update();
    drawGrid();
    requestAnimationFrame(loop);
}

loop();

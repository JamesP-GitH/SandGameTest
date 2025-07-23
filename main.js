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

function loop() {
    physics.update();
    drawGrid();
    requestAnimationFrame(loop);
}

loop();

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();

    // Convert mouse coordinates to canvas space
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate grid coordinates
    const gridX = Math.floor(mouseX / cellSize);
    const gridY = Math.floor(mouseY / cellSize);

    // Check bounds and if the cell is empty
    if (gridY >= 0 && gridY < rows && gridX >= 0 && gridX < cols && grid[gridY][gridX] === null) {
        // Add a new solid block at the clicked position
        grid[gridY][gridX] = new Solid(gridX, gridY, "blue", "solid", 12);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gridCanvas");
    const ctx = canvas.getContext("2d");

    const gridWidth = 128;
    const gridHeight = 128;
    const cellSize = 8;

    const grid = Array.from({ length: gridHeight }, () => Array(gridWidth).fill(null));

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                ctx.strokeStyle = "#ccc";
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);

                if (grid[y][x]) {
                    ctx.fillStyle = grid[y][x];
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    }

    function addBlock(x, y, color = "blue") {
        if (grid[y][x] === null) {
            grid[y][x] = color;
        }
    }

    function applyGravity() {
        for (let y = gridHeight - 2; y >= 0; y--) {
            for (let x = 0; x < gridWidth; x++) {
                if (grid[y][x] && grid[y + 1][x] === null) {
                    grid[y + 1][x] = grid[y][x];
                    grid[y][x] = null;
                }
            }
        }
    }

    function loop() {
        applyGravity();
        drawGrid();
        requestAnimationFrame(loop);
    }

    canvas.addEventListener("click", (e) => {
        const x = Math.floor(e.offsetX / cellSize);
        const y = Math.floor(e.offsetY / cellSize);
        addBlock(x, y, "blue");
    });

    loop();
});

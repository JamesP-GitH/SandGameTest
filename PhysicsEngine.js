export default class PhysicsEngine {
    constructor(grid) {
        this.grid = grid;
    }

    update() {
        // 1. Iterate over blocks wanting to move
        // 2. Collect intended moves
        // 3. Resolve conflicting moves
        // 4. Commit moves
    }

    // Returns available x, y based on slipperyness if decide move called
    decideMove(block) {
        const { x, y } = block;

        // Try to fall straight down
        if (this.isEmpty(x, y + 1)) {
            return { x: x, y: y + 1 };
        }

        // Try sliding diagonally if slippery
        if (this.slipperyness > 0 && Math.random() < this.slipperyness) {
            const leftRight = Math.random() < 0.5 ? -1 : 1;

            // Try one random diagonal first
            if (this.isEmpty(x + leftRight, y + 1)) {
                return { x: x + leftRight, y: y + 1 };
            }
            // If that fails, try the other diagonal
            if (this.isEmpty(x - leftRight, y + 1)) {
                return { x: x - leftRight, y: y + 1 };
            }
        }
        // No move possible
        return null;
    }

    // Helper function checks if inputed coordinates are empty (null)
    isEmpty(x, y) {
        return y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length && this.grid[y][x] === null;
    }
}

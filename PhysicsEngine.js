export default class PhysicsEngine {
    constructor(grid) {
        this.grid = grid;
    }

    update() {
        // Clear update flags at start of tick
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                const block = this.grid[y][x];
                if (block) block.updated = false;
            }
        }

        // Prepare move queue and map of targets
        const moves = [];
        const claimedTargets = new Set(); // stores 'x,y' strings

        // Iterate over blocks wanting to move from bottom row up (left open for adding gravity force to check if block to move)
        for (let y = this.grid.length - 1; y >= 0; y--) {
            for (let x = 0; x < this.grid[0].length; x++) {
                const block = this.grid[y][x];
                if (!block || block.updated || block.type !== "solid") continue;

                // Check available target move locations
                const target = this.decideMove(block);

                if (target) {
                    const key = `${target.x},${target.y}`;
                    // Check for conflicts
                    if (!claimedTargets.has(key)) {
                        claimedTargets.add(key);
                        moves.push({ from: { x, y }, to: target, block });
                    }
                }

                // Mark block as processed
                block.updated = true;
            }
        }

        // Commit moves
        for (const move of moves) {
            const { from, to, block } = move;

            this.grid[from.y][from.x] = null;
            this.grid[to.y][to.x] = block;

            block.x = to.x;
            block.y = to.y;
        }
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

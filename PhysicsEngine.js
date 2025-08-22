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
                if (!block || block.updated || block.type === "gas") continue;

                // Apply gravity for acceleration
                block.velocityY += block.gravity;
                block.velocityY = Math.min(block.velocityY, 3); // cap max speed

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
        const maxFall = Math.max(1, Math.floor(block.velocityY));

        // Try falling vertically based on current velocity
        for (let dy = 1; dy <= maxFall; dy++) {
            const newY = y + dy;
            if (this.isEmpty(x, newY)) {
                return { x, y: newY };
            } else {
                // Transfer momentum if hitting a solid block
                const below = this.getBlock(x, newY);
                if (
                    below &&
                    (below.type === "solid" || below.type === "liquid") &&
                    below.velocityY === 0 &&
                    block.velocityY > below.resistance
                ) {
                    below.velocityY = block.velocityY; // transfer momentum
                    block.velocityY *= 0.7; // lose some velocity
                }
                break; // can't fall past this point
            }
        }

        // Try sliding diagonally if slippery & already falling
        if (block.velocityY > 0.5 && block.slipperyness > 0 && Math.random() < block.slipperyness) {
            const directions = [-1, 1];

            // Shuffle directions
            if (Math.random() < 0.5) directions.reverse();

            for (const dir of directions) {
                if (this.isEmpty(x + dir, y + 1)) {
                    return { x: x + dir, y: y + 1 };
                }
            }
        }

        // No move possible, stop falling
        block.velocityY = 0;

        // Liquid spreading left/right with random chance
        if (block.type === "liquid" && Math.random() < 0.5) {
            const directions = [-1, 1];

            // Shuffle directions to randomize order
            if (Math.random() < 0.5) directions.reverse();

            for (const dir of directions) {
                if (this.isEmpty(x + dir, y)) {
                    return { x: x + dir, y };
                }
            }
        }

        return null;
    }

    // Helper function checks if inputed coordinates are empty (null)
    isEmpty(x, y) {
        return y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length && this.grid[y][x] === null;
    }

    getBlock(x, y) {
        if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[0].length) {
            return null;
        }
        return this.grid[y][x];
    }
}

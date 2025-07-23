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

    decideMove(block) {
        // Contains movement logic depending on block type and properties
        const { x, y, slipperyness } = block;

        // 1. check cell below
        const isEmpty = (x, y + 1) === null;

        // 2. if empty, return that as move
    }
}

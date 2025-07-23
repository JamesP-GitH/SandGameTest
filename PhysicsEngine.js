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

    decideMove() {
        // Contains movement logic depending on block type and properties
    }
}

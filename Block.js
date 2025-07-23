export default class Block {
    constructor(x, y, blockColor, type, gravity, velocityY, submerged, updated) {
        this.x = x;
        this.y = y;
        this.blockColor = blockColor;
        this.type = type;
        this.gravity = gravity;
        this.velocityY = velocityY;
        this.submerged = submerged;
        this.updated = updated;
    }
}

export default class Block {
    constructor(x, y, color, type, gravity = 1, velocityY = 1, submerged, updated) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.type = type;
        this.gravity = gravity;
        this.velocityY = velocityY;
        this.submerged = submerged;
        this.updated = updated;
    }
}

export default class Block {
    constructor(xPosition, yPosition, blockColor, type, gravity, velocityY, submerged, updated) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.blockColor = blockColor;
        this.type = type;
        this.gravity = gravity;
        this.velocityY = velocityY;
        this.submerged = submerged;
        this.updated = updated;
    }
}

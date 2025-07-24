export default class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.velocityY = 0;
        this.updated = false;
        this.submerged = false;

        this.type = "block";
        this.color = "#000";

        this.gravity = 0;
        this.slipperyness = 0;
        this.resistance = 0;
        this.density = 1;
    }
}

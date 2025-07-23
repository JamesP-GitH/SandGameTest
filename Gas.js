import Block from "./Block.js";

export default class Gas extends Block {
    constructor(x, y, color, type, gravity, velocityY, submerged, updated, deviation) {
        super(x, y, color, type, gravity, velocityY, submerged, updated);
        this.deviation = deviation;
    }
}

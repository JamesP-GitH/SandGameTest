import Block from "./Block.js";

export default class Liquid extends Block {
    constructor(x, y, color, type, gravity, velocityY, submerged, updated, viscosity) {
        super(x, y, color, type, gravity, velocityY, submerged, updated);
        this.viscosity = viscosity;
    }
}

import Block from "./Block.js";

export default class Solid extends Block {
    constructor(x, y, color, type, gravity, velocityY, submerged, updated, slipperyness, buoyancy) {
        super(x, y, color, type, gravity, velocityY, submerged, updated);
        this.slipperyness = slipperyness;
        this.buoyancy = buoyancy;
    }
}

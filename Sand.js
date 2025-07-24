import Solid from "./Solid.js";

export default class Sand extends Solid {
    constructor(x, y) {
        super(x, y);

        this.color = "#e6d577";
        this.slipperyness = 1;
        this.resistance = 0.6;
        this.gravity = 0.3;
        this.density = 1600;
    }
}

import Solid from "./Solid.js";

export default class Sand extends Solid {
    constructor(x, y) {
        super(x, y);

        this.color = "sandyBrown";
        this.slipperyness = 1;
        this.resistance = 0.6;
        this.gravity = 0.3;
    }
}

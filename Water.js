import Liquid from "./Liquid.js";

export default class Water extends Liquid {
    constructor(x, y) {
        super(x, y);

        this.color = "deepskyblue";
        this.slipperyness = 1;
        this.resistance = 0.1;
        this.density = 1000;
    }
}

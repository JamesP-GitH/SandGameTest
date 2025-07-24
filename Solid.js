import Block from "./Block.js";

export default class Solid extends Block {
    constructor(x, y) {
        super(x, y);

        this.type = "solid";
        this.gravity = 0.2;
    }
}

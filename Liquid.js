import Block from "./Block.js";

export default class Liquid extends Block {
    constructor(x, y) {
        super(x, y);

        this.type = "liquid";
        this.gravity = 0.2;
    }
}

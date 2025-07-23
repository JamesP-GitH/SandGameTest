export default class Liquid extends Block {
    constructor(x, y, blockColor, type, gravity, velocityY, submerged, updated, viscosity) {
        super(x, y, blockColor, type, gravity, velocityY, submerged, updated);
        this.viscosity = viscosity;
    }
}

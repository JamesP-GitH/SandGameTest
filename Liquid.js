export default class Liquid extends Block {
    constructor(xPosition, yPosition, blockColor, type, gravity, velocityY, submerged, updated, viscosity) {
        super(xPosition, yPosition, blockColor, type, gravity, velocityY, submerged, updated);
        this.viscosity = viscosity;
    }
}

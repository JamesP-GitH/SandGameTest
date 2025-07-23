export default class Solid extends Block {
    constructor(xPosition, yPosition, blockColor, type, gravity, velocityY, submerged, updated, slipperyness, buoyancy) {
        super(xPosition, yPosition, blockColor, type, gravity, velocityY, submerged, updated);
        this.slipperyness = slipperyness;
        this.buoyancy = buoyancy;
    }
}

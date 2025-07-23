export default class Solid extends Block {
    constructor(x, y, blockColor, type, gravity, velocityY, submerged, updated, slipperyness, buoyancy) {
        super(x, y, blockColor, type, gravity, velocityY, submerged, updated);
        this.slipperyness = slipperyness;
        this.buoyancy = buoyancy;
    }
}

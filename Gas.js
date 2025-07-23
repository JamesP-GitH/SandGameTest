export default class Gas extends Block {
    constructor(x, y, blockColor, type, gravity, velocityY, submerged, updated, deviation) {
        super(x, y, blockColor, type, gravity, velocityY, submerged, updated);
        this.deviation = deviation;
    }
}

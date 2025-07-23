export default class Gas extends Block {
    constructor(xPosition, yPosition, blockColor, type, gravity, velocityY, submerged, updated, deviation) {
        super(xPosition, yPosition, blockColor, type, gravity, velocityY, submerged, updated);
        this.deviation = deviation;
    }
}

class Block {
    constructor(
        xPosition,
        yPosition,
        blockColor,
        type,
        gravity,
        viscosity,
        deviation,
        slipperyness,
        buoyancy,
        velocityY,
        submerged,
        updated
    ) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.blockColor = blockColor;
        this.type = type;
        this.gravity = gravity;
        this.viscosity = viscosity;
        this.deviation = deviation;
        this.slipperyness = slipperyness;
        this.buoyancy = buoyancy;
        this.velocityY = velocityY;
        this.submerged = submerged;
        this.updated = updated;
    }
}

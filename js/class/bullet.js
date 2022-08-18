import { Sprite } from "./sprite.js"

export class Bullet extends Sprite {

    constructor(x, y, sprite, velocity) {
        super(x, y, sprite)
        this.velocity = velocity
    }

    moveForward() {
        this.y -= this.velocity
    }

    setVelocity(velocity) {
        this.velocity = velocity
    }
}
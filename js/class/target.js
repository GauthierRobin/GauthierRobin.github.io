import { Sprite } from "./sprite.js"

export class Target extends Sprite {
    constructor(x, y, sprite, velocity) {
        super(x, y, sprite)
        this.velocity = velocity
        this.destroyImgs = [document.getElementById("explosion1"),
        document.getElementById("explosion2"),
        document.getElementById("explosion3"),
        document.getElementById("explosion4"),
        document.getElementById("explosion5"),
        document.getElementById("explosion6"),
        document.getElementById("explosion7")]
        this.destroy = false
        this.animeDestroy = false
        this.actualImg = 0
    }

    runDestroy(ctx, size) {
        if (!this.destroy && this.actualImg < this.destroyImgs.length) {
            ctx.drawImage(
                this.destroyImgs[this.actualImg],
                (this.x + size) - this.destroyImgs[this.actualImg].width / 2,
                (this.y + size) - this.destroyImgs[this.actualImg].height / 2,
                size, size
            )
            this.actualImg++
        } else {
            this.destroy = true
        }
    }

    moveForward() {
        this.y += this.velocity
    }

    setVelocity(velocity) {
        this.velocity = velocity
    }
}
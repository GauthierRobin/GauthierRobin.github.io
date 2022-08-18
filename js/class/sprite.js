// Sprite class
export class Sprite {
    constructor(x, y, sprite) {
        // this.x = x - sprite.width / 2
        this.x = x
        this.y = y
        this.sprite = sprite
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.drawImage(
            this.sprite,
            this.x, this.y)
    }

    getCollider() {
        // return {
        //     top: this.y,
        //     bottom: this.y + this.sprite.height,
        //     rigth: this.x + this.sprite.width / 2,
        //     left: this.x - this.sprite.width / 2
        // }
        return {
            top: this.y,
            bottom: this.y + this.sprite.height,
            rigth: this.x + this.sprite.width,
            left: this.x
        }
    }

    drawCollider(ctx) {
        let collider = this.getCollider()
        // rigth
        ctx.beginPath()
        ctx.rect(collider.rigth, this.y, 5, 5)
        ctx.rect(collider.left, this.y, 5, 5)
        ctx.rect(this.x, collider.bottom, 5, 5)
        ctx.rect(this.x, collider.top, 5, 5)
        ctx.fillStyle = "yellow"
        ctx.fill()
    }
}
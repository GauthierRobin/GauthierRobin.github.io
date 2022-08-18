import { Bullet } from "./bullet.js"

export class Player {
    constructor(game) {
        this.game = game
        // sprite params
        this.x = game.canvasW / 2
        this.y = game.canvasH - 60
        this.width = 45
        // player params
        this.velocity = 6
        this.nbLife = 3
        this.targetHit = 0
        this.score = 0
        this.sprite = document.getElementById("space-ship")
        // bullet params
        this.bullets = []
        this.bulletVelovity = 6
        this.bulletSprite = document.getElementById("bullet")
    }

    init() {
        // player params
        this.x = this.game.canvasW / 2
        this.y = this.game.canvasH - 60
        this.targetHit = 0
        this.score = 0
        // bullet params
        this.bullets = []
    }

    drawPlayer() {
        this.game.ctx.beginPath()
        this.game.ctx.drawImage(
            this.sprite,
            this.x - (this.width / 2),
            this.y,
            45, 45)
    }

    moveRigth() {
        if (!this.game.paused) {
            this.x += this.velocity
        }
    }

    moveLeft() {
        if (!this.game.paused) {
            this.x -= this.velocity
        }
    }

    shoot() {
        if (!this.game.paused) {
            this.bullets.push(new Bullet(
                this.x, this.y,
                this.bulletSprite,
                this.bulletVelovity,
            ))
        }
    }

    updateScore() {
        this.score += 5
    }

    removeLife() {
        if (this.nbLife > 0) {
            this.nbLife -= 1
        } else {
            this.game.gameOver()
        }
    }
}
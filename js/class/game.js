import { Player } from "./player.js";
import { Target } from "./target.js";
import { Ui } from "./ui.js";

export class Game {
    constructor(canvasW, canvasH, ctx) {
        // game
        this.canvasW = canvasW
        this.canvasH = canvasH
        this.ctx = ctx
        this.run = false
        this.paused = false
        this.level = 1
        this.time = 0
        this.endTime = 10
        // target
        this.targets = []
        this.maxTargets = 1
        this.targetSprite = document.getElementById("asteroid")
        this.targetVelocity = 2
        // player
        this.player = new Player(this)
        this.ui = new Ui(this)
    }

    start() {
        if (!this.run) {
            this.run = true
        }
        if (this.paused) {
            this.paused = false
        }
    }

    restart() {
        if (this.run) {
            this.player.init()
            this.targets = []
            this.maxTargets = 1
            this.targetVelocity = 2
            this.level = 1
            this.time = 0
        }
    }

    gameOver() {
        if (this.run) {
            this.restart()
            this.ui.hideUi()
            this.ui.hideStart()
            this.ui.showReset()
            this.ui.showMenu()
            document.getElementById("title-menu").innerHTML = "GAME OVER"
            this.run = false
        }
    }

    update() {
        if (!this.paused) {
            this.drawUi()

            // console.log(
            //     JSON.parse(localStorage.getItem("scores"))
            // );

            this.player.drawPlayer()

            this.checkCollision()

            // move bullets
            this.player.bullets.map((bullet, index, tableau) => {
                if (bullet.getCollider().top < 0) {
                    tableau.splice(index, 1)
                } else {
                    bullet.draw(this.ctx)
                    bullet.moveForward()
                }
            })

            // create target
            if (this.targets.length < this.maxTargets) {
                this.spawnTarget()
            }

            // move targets
            this.targets.map((target, index, tableau) => {
                if (target.getCollider().bottom > this.canvasH) {
                    tableau.splice(index, 1)

                    this.player.removeLife()
                }
                else if (target.destroy) {
                    tableau.splice(index, 1)
                }
                else if (target.animeDestroy) {
                    target.runDestroy(this.ctx, 90)
                }
                else {
                    target.draw(this.ctx)
                    target.moveForward()
                }
            })

            // if (this.formatTimer(this.time).minutes >= this.endTime) {
            //     this.gameOver()
            // }

            this.time += 40
        }
    }

    checkCollision() {
        this.player.bullets.map((bullet, bulletId, bulletsTab) => {
            const bulletCollider = bullet.getCollider()

            this.targets.map((target) => {
                const targetCollider = target.getCollider()

                if ((bulletCollider.rigth >= targetCollider.left && bulletCollider.rigth <= targetCollider.rigth || bulletCollider.left >= targetCollider.left && bulletCollider.left <= targetCollider.rigth) && bulletCollider.top <= targetCollider.bottom) {
                    bulletsTab.splice(bulletId, 1)

                    target.animeDestroy = true

                    this.player.targetHit += 1

                    this.player.updateScore()
                    this.upLevel()

                    if (this.player.targetHit % 10 === 0) {
                        this.targetVelocity += 1
                    }
                }
            })
        })
    }

    drawUi() {
        this.ui.drawScore(this.canvasW / 2 - 15, 30)
        this.ui.drawPlayerLife(10, 60)
        this.ui.drawPlayerHit(10, 30)
        this.ui.drawTimer(
            this.formatTimer(this.time),
            10, 90
        )
        this.ui.drawLevel(10, 120)
    }

    upLevel() {
        if (this.player.score % 100 === 0 && this.player.score > 0) {
            this.level++
            this.maxTargets++
        }
    }

    formatTimer(ms) {
        var minutes = Math.floor(ms / 60000)
        var seconds = ((ms % 60000) / 1000).toFixed(0)
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        return { minutes, seconds }
    }

    spawnTarget() {
        let offset = 50
        let zone = 200
        let max = this.player.x + zone
        let min = this.player.x - zone
        let x = Math.random() * (max - min) + min
        if (x > this.canvasW - offset) {
            x = this.canvasW - zone
        }
        if (x < offset) {
            x = zone
        }
        this.targets.push(
            new Target(x, -100, this.targetSprite, this.targetVelocity)
        )
    }
}

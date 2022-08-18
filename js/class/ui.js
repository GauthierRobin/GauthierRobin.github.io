export class Ui {
    constructor(game) {
        this.game = game
        this.menu = document.getElementById("menu")
        this.ui = document.getElementById("ui")
        this.difficulty = document.getElementById("difficulty-menu")
        this.reset = document.getElementById("reset")
        this.start = document.getElementById("start")
    }

    drawScore(x, y) {
        this.game.ctx.font = '20px serif'
        this.game.ctx.fillStyle = "white"
        this.game.ctx.fillText(`Score: ${this.game.player.score}`, x, y)
    }

    drawPlayerLife(x, y) {
        this.game.ctx.font = '20px serif'
        this.game.ctx.fillStyle = "white"
        this.game.ctx.fillText(`Life: ${this.game.player.nbLife}`, x, y)
    }

    drawPlayerHit(x, y) {
        this.game.ctx.font = '20px serif'
        this.game.ctx.fillStyle = "white"
        this.game.ctx.fillText(`Target hit: ${this.game.player.targetHit}`, x, y)
    }

    drawTimer(timer, x, y) {
        this.game.ctx.font = '20px serif'
        this.game.ctx.fillStyle = "white"
        this.game.ctx.fillText(`Timer: ${timer.minutes}:${timer.seconds}`, x, y)
    }

    drawLevel(x, y) {
        this.game.ctx.font = '20px serif'
        this.game.ctx.fillStyle = "white"
        this.game.ctx.fillText(`Level: ${this.game.level}`, x, y)
    }

    showMenu() {
        this.menu.classList.remove("hide-menu")
        this.menu.classList.add("show-menu")
    }

    hideMenu() {
        this.menu.classList.remove("show-menu")
        this.menu.classList.add("hide-menu")
    }

    showUi() {
        this.ui.classList.remove("hide-ui")
        this.ui.classList.add("show-ui")
    }

    hideUi() {
        this.ui.classList.remove("show-ui")
        this.ui.classList.add("hide-ui")
    }

    showDifficulty() {
        this.difficulty.classList.remove("hide")
        this.difficulty.classList.add("show")
    }

    hideDifficulty() {
        this.difficulty.classList.remove("show")
        this.difficulty.classList.add("hide")
    }

    showReset() {
        this.reset.classList.remove("hide")
        this.reset.classList.add("show")
    }

    hideReset() {
        this.reset.classList.remove("show")
        this.reset.classList.add("hide")
    }

    showStart() {
        this.start.classList.remove("hide")
        this.start.classList.add("show")
    }

    hideStart() {
        this.start.classList.remove("show")
        this.start.classList.add("hide")
    }
}
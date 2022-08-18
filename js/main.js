import { Game } from "./class/game.js"

const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
const background = document.getElementById("background")
let backgroundY = 300

ctx.canvas.height = window.innerHeight
ctx.canvas.width = 800

document.addEventListener("resize", event => {
    ctx.canvas.height = window.innerHeight
    console.log(window.innerHeight)
})

const game = new Game(canvas.width, canvas.height, ctx)

// control
document.addEventListener("keydown", event => {
    // console.log(event.keyCode)
    const key = event.key
    switch (key) {
        // right
        case "ArrowRight":
        case "Right":
            if (game.player.x < (canvas.width - game.player.width)) {
                game.player.moveRigth()
            }
            break

        // left
        case "ArrowLeft":
        case "Left":
            if (game.player.x > game.player.width) {
                game.player.moveLeft()
            }
            break

        // shoot
        case " ":
        case "Spacebar":
            game.player.shoot()
            break

        default:
            break
    }
})

//######### menu ########
// start
document.getElementById("start").addEventListener("click", event => {
    game.ui.hideMenu()
    game.ui.showUi()
    game.ui.showDifficulty()

    if (!game.run) {
        let select = document.getElementById("difficulty")
        game.player.nbLife = select.options[select.selectedIndex].value
    }

    game.start()
})

// reset
document.getElementById("reset").addEventListener("click", event => {
    document.getElementById("title-menu").innerHTML = "PewPew"

    game.ui.hideMenu()
    game.ui.showUi()

    let select = document.getElementById("difficulty")
    game.player.nbLife = select.options[select.selectedIndex].value

    game.restart()
    game.start()
})

// pause
document.getElementById("pause").addEventListener("click", event => {
    if (game.run) {
        game.paused = true
        document.getElementById("title-menu").innerHTML = "PAUSE"
        document.getElementById("start").innerHTML = "CONTINUE"
        game.ui.hideDifficulty()
        game.ui.showMenu()
        game.ui.showStart()
        game.ui.showReset()
        game.ui.hideUi()
    }
})

// game loop
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // background
    ctx.drawImage(background, 0, backgroundY)
    ctx.drawImage(background, 0, backgroundY - background.height + 1)
    ctx.drawImage(background, 0, backgroundY - background.height * 2 + 1)
    if (backgroundY > background.height + 1) {
        backgroundY = 300
    }
    backgroundY += 0.2

    // update game
    if (game.run) {
        game.update()
    }
    ctx.closePath()

}, 40)
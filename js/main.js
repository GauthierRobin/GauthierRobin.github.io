import { Game } from "./class/game.js";

const game = new Game()


game.init()

const playerControl = (player, otherPlayer) => {
    document.getElementById(`potPlayer${player.id}`).addEventListener("click", () => {
        if (player.turn && player.game.run && !player.isLaunchDe && !player.ai) {
            player.launchDe();
            document.getElementById(`potPlayer${player.id}`).src = `assets/dices/Dice${player.de}.png`
        }
    })

    document.getElementById(`player${player.id}-col1`).addEventListener("click", () => {
        if (player.turn && player.game.run && player.de !== null && player.isLaunchDe && !player.columnIsFull(0) && !player.ai) {
            setTimeout(() => {
                var diceSound = document.getElementById('diceSound');
                diceSound.volume = 0.1;
                diceSound.play();
                player.checkColumn(0, 1)
                otherPlayer.checkColumn(0, 1)
                player.setSortedGrid();
                otherPlayer.setSortedGrid();
                player.game.destroyEnemieDices(player, otherPlayer)
                player.game.ui.refreshColumnAndScore(player, 0)
                player.game.ui.refreshColumnAndScore(otherPlayer, 0)
                player.finishTurn()
            }, 200)
        }
    })

    document.getElementById(`player${player.id}-col2`).addEventListener("click", () => {
        if (player.turn && player.game.run && player.de !== null && player.isLaunchDe && !player.columnIsFull(1) && !player.ai) {
            setTimeout(() => {
                var diceSound = document.getElementById('diceSound');
                diceSound.volume = 0.1;
                diceSound.play();
                player.checkColumn(3, 2)
                otherPlayer.checkColumn(3, 2)
                player.game.destroyEnemieDices(player, otherPlayer)
                player.game.ui.refreshColumnAndScore(player, 1)
                player.game.ui.refreshColumnAndScore(otherPlayer, 1)
                player.finishTurn()
            }, 200)
        }
    })

    document.getElementById(`player${player.id}-col3`).addEventListener("click", () => {
        if (player.turn && player.game.run && player.de !== null && player.isLaunchDe && !player.columnIsFull(2) && !player.ai) {
            setTimeout(() => {
                var diceSound = document.getElementById('diceSound');
                diceSound.volume = 0.1;
                diceSound.play();
                player.checkColumn(6, 3)
                otherPlayer.checkColumn(6, 3)
                player.game.destroyEnemieDices(player, otherPlayer)
                player.game.ui.refreshColumnAndScore(player, 2)
                player.game.ui.refreshColumnAndScore(otherPlayer, 2)
                player.finishTurn()
            }, 200)
        }
    })
}

playerControl(game.player1, game.player2)
playerControl(game.player2, game.player1)

document.getElementById("quitGame").addEventListener("click", () => {
    window.location.href = window.location.origin + "/index.html"
})

document.getElementById("quit").addEventListener("click", () => {
    window.location.href = window.location.origin + "/index.html"
})

document.getElementById("resetBtn").addEventListener("click", () => {
    const oppacity = document.getElementById('oppacity');
    const buttonRules = document.getElementById('btn-rules');
    oppacity.style.display = "none";
    buttonRules.removeAttribute('disabled');
    game.reset()
})

$("#btn-rules").on('click', function () {
    var rulesBookSound = document.getElementById('rulesBookSound');
    rulesBookSound.volume = 0.1;
    rulesBookSound.play();
    const oppacity = document.getElementById('oppacity');
    const image = document.getElementById('rulesImg');
    const imageBack = document.getElementById('returnToTheGame');
    oppacity.style.display = "block";
    image.style.display = "block";
    imageBack.style.display = "block";
    image.style.animation = 'fadeIn 3s';
    imageBack.style.animation = 'fadeIn 3s';
})

$("#returnToTheGame").on('click', function () {
    var closeRulesBook = document.getElementById('closeRulesBook');
    closeRulesBook.volume = 0.1;
    closeRulesBook.play();
    const oppacity = document.getElementById('oppacity');
    const image = document.getElementById('rulesImg');
    const imageBack = document.getElementById('returnToTheGame');
    oppacity.style.display = "none";
    image.style.display = "none";
    imageBack.style.display = "none";
})

$('#lore').on('click', function () {
    var dropCoin = document.getElementById('dropCoin');
    dropCoin.volume = 0.1;
    dropCoin.play();
})


window.addEventListener('load', function () {
    var bgMusic = document.getElementById('bgAudio')
    var SeaSound = document.getElementById('SeaSound')
    SeaSound.volume = 0.02
    SeaSound.loop = "true"
    bgMusic.volume = 0.04
    bgMusic.loop = "true"
}, false)




import { Game } from "./class/game.js";

const game = new Game()
game.run = false
game.player2.ai = false

const socket = io("https://pirate-dice-serveur.herokuapp.com")

let id

setTimeout(() => {
    id = socket.id
}, 2000)

setTimeout(() => {
    game.player1.sockId = id
    console.log(game.player1.name);
    console.log(game.player2.name);
    socket.emit("joinGame", { id: id, name: game.player2.name })
}, 4000)

socket.on("sendRoomInfo", roomInfo => {
    game.init()

    game.player1.roomId = roomInfo.roomId
    game.player2.roomId = roomInfo.roomId

    game.player1.sockId = id

    // sockId and name
    if (id !== roomInfo.player1.id) {
        game.player2.sockId = roomInfo.player1.id
        game.player2.name = roomInfo.player1.username
    }

    if (id !== roomInfo.player2.id) {
        game.player2.sockId = roomInfo.player2.id
        game.player2.name = roomInfo.player2.username
    }

    game.ui.refreshName()

    socket.emit("finishTurn", {
        roomId: roomInfo.roomId,
        player1: {
            id: game.player1.sockId,
            turn: game.player1.turn
        },
        player2: {
            id: game.player2.sockId,
            turn: game.player2.turn
        }
    })

    game.ui.load()
    game.run = true
    playerControl(game.player1, game.player2)

    console.log(roomInfo)
})

socket.on('sendGrids', infos => {
    if (infos.player1.id === game.player1.sockId) {
        game.player1.grid = infos.player1.grid
    }
    if (infos.player2.id === game.player1.sockId) {
        game.player1.grid = infos.player1.grid
    }

    if (infos.player1.id === game.player2.sockId) {
        game.player2.grid = infos.player2.grid
    }
    if (infos.player2.id === game.player2.sockId) {
        game.player2.grid = infos.player2.grid
    }

    var diceSound = document.getElementById('diceSound');
    diceSound.volume = 0.1;
    diceSound.play()

    game.ui.refreshColumnAndScore(game.player2, 0)
    game.ui.refreshColumnAndScore(game.player2, 1)
    game.ui.refreshColumnAndScore(game.player2, 2)

    game.ui.refreshColumnAndScore(game.player1, 0)
    game.ui.refreshColumnAndScore(game.player1, 1)
    game.ui.refreshColumnAndScore(game.player1, 2)
})

socket.on("gameTurn", infos => {
    if (infos.player1.id === game.player1.sockId) {
        game.player1.turn = infos.player1.turn
    }
    if (infos.player2.id === game.player1.sockId) {
        game.player1.turn = infos.player1.turn
    }

    if (infos.player1.id === game.player2.sockId) {
        game.player2.turn = infos.player2.turn
    }
    if (infos.player2.id === game.player2.sockId) {
        game.player2.turn = infos.player2.turn
    }
})

socket.on("playerFinish", () => {
    game.switchTurn()
})

socket.on("player2Quit", () => {
    game.run = false
    game.ui.endGame()
})

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

                socket.emit("updateGrids", {
                    roomId: player.roomId,
                    player1: {
                        id: player.sockId,
                        grid: player.grid
                    },
                    player2: {
                        id: otherPlayer.sockId,
                        grid: otherPlayer.grid
                    }
                })

                socket.emit("getGrids", {
                    roomId: player.roomId,
                    player1: {
                        id: player.sockId
                    },
                    player2: {
                        id: otherPlayer.sockId
                    }
                })

                player.finishTurn()

                socket.emit("finishTurn", {
                    roomId: player.roomId,
                    player1: {
                        id: player.sockId,
                        turn: player.turn
                    },
                    player2: {
                        id: otherPlayer.sockId,
                        turn: otherPlayer.turn
                    }
                })

                if (player.gridIsFull()) {
                    socket.emit("endGame", {
                        roomId: player.roomId,
                        id: player.sockId
                    })
                }
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

                socket.emit("updateGrids", {
                    roomId: player.roomId,
                    player1: {
                        id: player.sockId,
                        grid: player.grid
                    },
                    player2: {
                        id: otherPlayer.sockId,
                        grid: otherPlayer.grid
                    }
                })

                socket.emit("getGrids", {
                    roomId: player.roomId,
                    player1: {
                        id: player.sockId
                    },
                    player2: {
                        id: otherPlayer.sockId
                    }
                })

                player.finishTurn()

                socket.emit("finishTurn", {
                    roomId: player.roomId,
                    player1: {
                        id: player.sockId,
                        turn: player.turn
                    },
                    player2: {
                        id: otherPlayer.sockId,
                        turn: otherPlayer.turn
                    }
                })

                if (player.gridIsFull()) {
                    socket.emit("endGame", {
                        roomId: player.roomId,
                        id: player.sockId
                    })
                }
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

                socket.emit("updateGrids", {
                    roomId: player.roomId,
                    player1: {
                        id: player.sockId,
                        grid: player.grid
                    },
                    player2: {
                        id: otherPlayer.sockId,
                        grid: otherPlayer.grid
                    }
                })

                socket.emit("getGrids", {
                    roomId: player.roomId,
                    player1: {
                        id: player.sockId
                    },
                    player2: {
                        id: otherPlayer.sockId
                    }
                })

                player.finishTurn()

                socket.emit("finishTurn", {
                    roomId: player.roomId,
                    player1: {
                        id: player.sockId,
                        turn: player.turn
                    },
                    player2: {
                        id: otherPlayer.sockId,
                        turn: otherPlayer.turn
                    }
                })

                if (player.gridIsFull()) {
                    socket.emit("endGame", {
                        roomId: player.roomId,
                        id: player.sockId
                    })
                }
            }, 200)
        }
    })

    // document.getElementById("resetBtn").addEventListener("click", () => {
    //     game.reset()
    // })

}

document.getElementById("quitBtn").addEventListener("click", () => {
    socket.emit("playerQuit", game.player1.sockId)
    window.location.href = window.location.origin + "/index.html"
})

document.getElementById("quitGame").addEventListener("click", () => {
    socket.emit("playerQuit", game.player1.sockId)
    game.ui.endGame()
    game.run = false
})

$("#btn-rules").on('click', function () {
    var rulesBookSound = document.getElementById('rulesBookSound');
    rulesBookSound.volume = 0.1;
    rulesBookSound.play();
    const oppacity = document.getElementById('oppacity');
    const image = document.getElementById('rulesImg');
    const imageBack = document.getElementById('returnToTheGame');
    oppacity.style.display = (oppacity.style.display == "none") ? "block" : "none";
    image.style.display = (image.style.display == "none") ? "block" : "none";
    imageBack.style.display = (imageBack.style.display == "none") ? "block" : "none";
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
    oppacity.style.display = (oppacity.style.display == "block") ? "none" : "block";
    image.style.display = (image.style.display == "block") ? "none" : "block";
    imageBack.style.display = (imageBack.style.display == "block") ? "none" : "block";
})

$('#lore').on('click', function () {
    jQuery(function ($) {
        var $body = $('.case'), $style = $('#styles');
        $body.val($style.html());
        $style.html($body.val());
        return false;
    });
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
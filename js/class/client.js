import { Loader } from "./loader.js"

export class Client {
    constructor(game, local) {
        this.local = local
        this.game = game
        this.socket
        this.localUrl = "http://localhost:8080/players"
        this.servUrl = "https://pirate-dice-serveur.herokuapp.com/players"
        this.loader = new Loader()
    }

    init() {
        let serveUrl = ""
        if (this.local) {
            serveUrl = this.localUrl
        } else {
            serveUrl = this.servUrl
        }
        this.socket = io(serveUrl)

        this.socket.on("connect", () => {
            console.log("connected")

            this.receiveRoomInfo()
            this.receiveMyDice()
            this.receivePlayer2Dice()
            this.receiveMyGrid()
            this.receivePlayer2Grid()
            this.receiveDestroyMyDice()
            this.receiveDestroyEnemyDice()
            this.receiveEndGame()
            this.receivePlayerExit()
            this.receiveBonusCaseChoice()
        })
    }

    joinRoom(gameMode, playerName) {
        this.socket.emit("join room", gameMode, playerName)
    }

    getMyDice() {
        this.socket.emit("get dice", (response) => {
            $("#potPlayer1")
                .attr(
                    "src",
                    `https://ik.imagekit.io/iq52ivedsj/assets/dices/Dice${response.diceValue}.png?ik-sdk-version=javascript-1.4.3`
                )
        })
    }

    sendColumnChoice(columnId) {
        this.socket.emit("playerColumnChoice", columnId)
    }

    sendBonusChoice(bonusId) {
        this.socket.emit(
            "bonusChoice",
            {
                bonusId,
                pseudo: localStorage.getItem("pseudo"),
                password: localStorage.getItem("password")
            },

            // callback
            (response) => {
                if (response.status !== 200) {
                    this.game.player1.showErrorMsg(response.message)
                }
            })
    }

    receiveBonusCaseChoice() {
        this.socket.on("bonusCaseChoise", (playerId) => {
            this.game.player1.removeBonusChoice()

            $(`#grille${playerId} img`).each((index, element) => {
                const boxCase = $(element)

                if (boxCase.attr("data-value") !== "null") {
                    boxCase.parent().addClass("case-hover")
                    boxCase.on("click", () => {

                        this.socket.emit(
                            "playerBonusCase",
                            {
                                caseId: boxCase.attr("data-case"),
                                pseudo: localStorage.getItem("pseudo"),
                                password: localStorage.getItem("password")
                            }
                        )

                        this.game.player1.removeBonusChoice()
                    })
                }
            })
        })
    }

    receiveMyDice() {
        this.socket.on("my dice", (dice) => {
            this.game.ui.removePlayerTurn("#potPlayer1")
            $(`#potPlayer${this.game.player1.id}`).attr("src", `https://ik.imagekit.io/iq52ivedsj/assets/dices/Dice${dice}.png?ik-sdk-version=javascript-1.4.3`)
        })
    }

    receivePlayer2Dice() {
        this.socket.on("dice other player", (dice) => {
            $(`#potPlayer${this.game.player2.id}`).attr("src", `https://ik.imagekit.io/iq52ivedsj/assets/dices/Dice${dice}.png?ik-sdk-version=javascript-1.4.3`)
        })
    }

    receivePlayer2Grid() {
        this.socket.on("update other grid", (p2GridInfos) => {
            this.game.sound.play('diceSound', 0.1)
            $(`#potPlayer${this.game.player2.id}`).attr("src", "https://ik.imagekit.io/iq52ivedsj/assets/dices/choseDice_ftS4YvZbV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662986918825")
            const diceCaseImg = $(`#player${this.game.player2.id}-col${p2GridInfos.columnId}-case-${p2GridInfos.nbCase} img`)

            diceCaseImg.attr("data-value", p2GridInfos.caseValue)
            diceCaseImg.attr(
                "src",
                `https://ik.imagekit.io/iq52ivedsj/assets/dices/Dice${p2GridInfos.caseValue}.png?ik-sdk-version=javascript-1.4.3`
            )

            this.game.player2.refreshScoreColumn(p2GridInfos.columnId)
            this.game.player2.refreshTotalScore()
            this.game.ui.showPlayerTurn("#potPlayer1")
        })
    }

    receiveMyGrid() {
        this.socket.on("update my grid", (p1GridInfos) => {
            this.game.sound.play('diceSound', 0.1)
            $(`#potPlayer${this.game.player1.id}`).attr("src", "https://ik.imagekit.io/iq52ivedsj/assets/dices/choseDice_ftS4YvZbV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662986918825")
            const diceCaseImg = $(`#player${this.game.player1.id}-col${p1GridInfos.columnId}-case-${p1GridInfos.nbCase} img`)

            diceCaseImg.attr("data-value", p1GridInfos.caseValue)
            diceCaseImg.attr("src", `https://ik.imagekit.io/iq52ivedsj/assets/dices/Dice${p1GridInfos.caseValue}.png?ik-sdk-version=javascript-1.4.3`)

            this.game.player1.refreshScoreColumn(p1GridInfos.columnId)
            this.game.player1.refreshTotalScore()
        })
    }

    receiveDestroyMyDice() {
        this.socket.on("destroyMyDice", (diceInfos) => {
            console.log(diceInfos);
            const animationDuration = this.game.animation.explodeDice(
                this.game.player1.id,
                diceInfos.columnId,
                diceInfos.nbCase
            )

            setTimeout(() => {
                this.game.player1.refreshScoreColumn(diceInfos.columnId)
                this.game.player1.refreshColumn(diceInfos.columnId)
                this.game.player1.refreshTotalScore()
            }, animationDuration + 600)
        })
    }

    receiveDestroyEnemyDice() {
        this.socket.on("destroyEnemyDice", (diceInfos) => {
            const animationDuration = this.game.animation.explodeDice(
                this.game.player2.id,
                diceInfos.columnId,
                diceInfos.nbCase
            )

            setTimeout(() => {
                this.game.player2.refreshScoreColumn(diceInfos.columnId)
                this.game.player2.refreshColumn(diceInfos.columnId)
                this.game.player2.refreshTotalScore()
            }, animationDuration + 600)
        })
    }

    receiveEndGame() {
        this.socket.on("endGame", (endGameMsg) => {
            this.game.ui.showEndGame(endGameMsg)
        })
    }

    receiveRoomInfo() {
        this.socket.on("room info", roomInfo => {
            this.game.roomId = roomInfo.roomId
            this.game.player2.name = roomInfo.p2Name

            if ($("#loader").length > 0) {
                this.game.loader.remove()
                $("#game").fadeIn(400)
            }

            $(`#namePlayer${this.game.player2.id}`).text(roomInfo.p2Name)
            console.log(roomInfo)
        })
    }

    receivePlayerExit() {
        this.socket.on("playerExit", () => {
            this.game.ui.endGame(`${this.game.player2.name} rage quit`)
        })
    }

    sendExitGameOfType(typeOfEvent) {
        this.socket.emit(typeOfEvent)
    }

    sendBet(betValue) {
        this.socket.emit(
            "player bet",
            betValue,
            localStorage.getItem("pseudo"),
            localStorage.getItem("password"),

            // callback 
            (response) => {
                console.log(response)
                if (response.status === 200) {
                    this.game.ui.hideBet()
                }
            }
        )
    }
}

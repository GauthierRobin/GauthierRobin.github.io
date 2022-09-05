export class Client {
    constructor(game, local) {
        this.local = local
        this.game = game
        this.socket
        this.localUrl = "http://localhost:8080"
        this.servUrl = "https://pirate-dice-serveur.herokuapp.com"
    }

    init() {
        let serveUrl = ""
        if (this.local) {
            serveUrl = this.localUrl
        } else {
            serveUrl = this.servUrl
        }
        this.socket = io(serveUrl)

        if (this.game.multi) {
            this.socket.emit("joinMultiGame", this.game.player1.name)
        }
        else {
            this.socket.emit("joinSoloGame", this.game.player1.name)
        }

        this.receiveRoomInfo()
        this.receiveMyDice()
        this.receivePlayer2Dice()
        this.receiveMyGrid()
        this.receivePlayer2Grid()
        this.receiveDestroyMyDice()
        this.receiveDestroyEnemyDice()
        this.receiveEndGame()
        this.receivePlayerExit()
    }

    getMyDice() {
        this.socket.emit("getMyDice")
    }

    receiveMyDice() {
        this.socket.on("yourDice", (dice) => {
            $("#potPlayer2").attr("src", `assets/dices/Dice${dice}.png`)
        })
    }

    receivePlayer2Dice() {
        this.socket.on("player2Dice", (dice) => {
            $("#potPlayer1").attr("src", `assets/dices/Dice${dice}.png`)
        })
    }

    sendColumnChoice(columnId) {
        this.socket.emit("playerColumnChoice", columnId)
    }

    receivePlayer2Grid() {
        this.socket.on("player2Grid", (p2GridInfos) => {
            this.game.sound.play('diceSound', 0.1)
            $(`#potPlayer${this.game.player2.id}`).attr("src", "assets/dices/choseDice.png")
            const diceCaseImg = $(`#player1-col${p2GridInfos.columnId}-case-${p2GridInfos.nbCase} img`)

            diceCaseImg.attr("data-value", p2GridInfos.caseValue)
            diceCaseImg.attr("src", `assets/dices/Dice${p2GridInfos.caseValue}.png`)

            this.game.player2.refreshScoreColumn(p2GridInfos.columnId)
            this.game.player2.refreshTotalScore()
        })
    }

    receiveMyGrid() {
        this.socket.on("playerGrid", (p1GridInfos) => {
            this.game.sound.play('diceSound', 0.1)
            $(`#potPlayer${this.game.player1.id}`).attr("src", "assets/dices/choseDice.png")
            const diceCaseImg = $(`#player2-col${p1GridInfos.columnId}-case-${p1GridInfos.nbCase} img`)

            diceCaseImg.attr("data-value", p1GridInfos.caseValue)
            diceCaseImg.attr("src", `assets/dices/Dice${p1GridInfos.caseValue}.png`)

            this.game.player1.refreshScoreColumn(p1GridInfos.columnId)
            this.game.player1.refreshTotalScore()
        })
    }

    receiveDestroyMyDice() {
        this.socket.on("destroyMyDice", (diceInfos) => {
            const animationDuration = this.game.animation.explodeDice("2", diceInfos.columnId, diceInfos.nbCase)

            setTimeout(() => {
                this.game.player1.refreshScoreColumn(diceInfos.columnId)
                this.game.player1.refreshColumn(diceInfos.columnId)
                this.game.player1.refreshTotalScore()
            }, animationDuration + 600)
        })
    }

    receiveDestroyEnemyDice() {
        this.socket.on("destroyEnemyDice", (diceInfos) => {
            const animationDuration = this.game.animation.explodeDice("1", diceInfos.columnId, diceInfos.nbCase)

            setTimeout(() => {
                this.game.player2.refreshScoreColumn(diceInfos.columnId)
                this.game.player2.refreshColumn(diceInfos.columnId)
                this.game.player2.refreshTotalScore()
            }, animationDuration + 600)
        })
    }

    receiveEndGame() {
        this.socket.on("endGame", (endGameMsg) => {
            this.game.ui.endGame(endGameMsg)
            console.log(endGameMsg)
        })
    }

    receiveRoomInfo() {
        this.socket.on("sendRoomInfo", roomInfo => {
            this.game.roomId = roomInfo.roomId
            this.game.player2.name = roomInfo.p2Name
            $("#namePlayer1").text(roomInfo.p2Name)
            this.game.ui.load()
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
}
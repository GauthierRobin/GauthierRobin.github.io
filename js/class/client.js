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

        this.socket.emit(
            "joinGame",
            this.game.player2.name
        )

        this.receiveRoomInfo()
        this.receiveGrids()
        this.receiveGameTurn()
        this.receivePlayerFinish()
        this.receivePlayerQuit()
    }

    receiveRoomInfo() {
        this.socket.on("sendRoomInfo", roomInfo => {
            this.setRoomId(roomInfo.roomId)
            this.setSockIdAndName(
                roomInfo.player1.id,
                roomInfo.player2.id,
                roomInfo.player1.username,
                roomInfo.player2.username
            )
            this.game.ui.refreshName()
            this.sendFinishTurn()
            this.game.ui.load()
            this.game.run = true
            console.log(roomInfo)
        })
    }

    setRoomId(roomId) {
        this.game.player1.roomId = roomId
        this.game.player2.roomId = roomId
    }

    setSockIdAndName(idP1, idP2, nameP1, nameP2) {
        this.game.player1.sockId = this.socket.id

        if (this.socket.id !== idP1) {
            this.game.player2.sockId = idP1
            this.game.player2.name = nameP1
        }

        if (this.socket.id !== idP2) {
            this.game.player2.sockId = idP2
            this.game.player2.name = nameP2
        }
    }

    receiveGameTurn() {
        this.socket.on("gameTurn", infos => {
            if (infos.player1.id === this.game.player1.sockId) {
                this.game.player1.turn = infos.player1.turn
            }
            if (infos.player2.id === this.game.player1.sockId) {
                this.game.player1.turn = infos.player1.turn
            }

            if (infos.player1.id === this.game.player2.sockId) {
                this.game.player2.turn = infos.player2.turn
            }
            if (infos.player2.id === this.game.player2.sockId) {
                this.game.player2.turn = infos.player2.turn
            }
        })
    }

    receiveGrids() {
        this.socket.on("sendGrids", infos => {
            this.setGrids(
                infos.player1.id,
                infos.player2.id,
                infos.player1.grid,
                infos.player2.grid
            )

            for (let index = 0; index < 3; index++) {
                this.game.ui.refreshColumnAndScore(this.game.player1, index)
                this.game.ui.refreshColumnAndScore(this.game.player2, index)
            }

            this.game.sound.play('diceSound', 0.1)
        })
    }

    setGrids(p1Id, p2Id, p1Grid, p2Grid) {
        if (p1Id === this.game.player1.sockId) {
            this.game.player1.grid = p1Grid
        }

        if (p2Id === this.game.player1.sockId) {
            this.game.player1.grid = p1Grid
        }

        if (p1Id === this.game.player2.sockId) {
            this.game.player2.grid = p2Grid
        }

        if (p2Id === this.game.player2.sockId) {
            this.game.player2.grid = p2Grid
        }
    }

    receivePlayerFinish() {
        this.socket.on("playerFinish", () => {
            this.game.switchTurn()
        })
    }

    receivePlayerQuit() {
        this.socket.on("player2Quit", () => {
            this.game.run = false
            this.game.ui.endGame()
        })
    }

    sendEndGame() {
        this.socket.emit("endGame", {
            roomId: this.game.player1.roomId,
            id: this.game.player1.sockId
        })
    }

    sendUpdateGrids() {
        this.socket.emit("updateGrids", {
            roomId: this.game.player1.roomId,
            player1: {
                id: this.game.player1.sockId,
                grid: this.game.player1.grid
            },
            player2: {
                id: this.game.player2.sockId,
                grid: this.game.player2.grid
            }
        })
    }

    sendGetGrids() {
        this.socket.emit("getGrids", {
            roomId: this.game.player1.roomId,
            player1: {
                id: this.game.player1.sockId
            },
            player2: {
                id: this.game.player2.sockId
            }
        })
    }

    sendFinishTurn() {
        this.socket.emit("finishTurn", {
            roomId: this.game.player1.roomId,
            player1: {
                id: this.game.player1.sockId,
                turn: this.game.player1.turn
            },
            player2: {
                id: this.game.player2.sockId,
                turn: this.game.player2.turn
            }
        })
    }

    sendPlayerQuit() {
        this.socket.emit("playerQuit", this.game.player1.sockId)
    }
}
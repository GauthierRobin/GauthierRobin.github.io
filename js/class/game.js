import { Player } from "/js/class/player.js";
import { Ui } from "/js/class/ui.js";
import { Animate } from "/js/class/animation.js";
import { Client } from "./client.js";
import { Sound } from "./sound.js";

export class Game {
    constructor(multi) {
        this.player1
        this.player2
        this.ui = new Ui(this)
        this.run = true
        this.anim = null;
        this.multi = multi
        this.client
        this.sound = new Sound()
    }

    init() {
        this.sound.play('bgAudio', 0.02, true)
        this.sound.play('SeaSound', 0.04, true)

        if (this.multi) {
            this.run = false
            this.player1 = new Player(this, document.getElementById("grille2"), 2, true)
            this.player2 = new Player(this, document.getElementById("grille1"), 1, false)
            this.client = new Client(this, false) // true for local serveur, false for heroku serveur
            this.client.init()
        } else {
            this.player1 = new Player(this, document.getElementById("grille2"), 2, true)
            this.player2 = new Player(this, document.getElementById("grille1"), 1, false, true)
        }

        document.getElementById('namePlayer1').innerText = this.player1.name;
        document.getElementById('namePlayer2').innerText = this.player2.name;

        this.player1.otherPlayer = this.player2
        this.player1.drawGrille()
        this.player2.otherPlayer = this.player1
        this.player2.drawGrille()

        this.ui.init()
        this.player1.initControl()
    }

    reset() {
        this.ui.restartGame()
        this.player1.reset()
        this.player1.turn = true
        this.player2.reset()
        this.run = true
    }

    destroyEnemieDices(gamePLayer, otherPlayer) {
        let gridPlayer1 = gamePLayer.getFormatGrid()
        let gridPlayer2 = otherPlayer.getFormatGrid()
        let newGrid = []
        this.anim = new Animate(gamePLayer, otherPlayer);

        for (let nbCol = 0; nbCol < gridPlayer1.length; nbCol++) {
            gridPlayer2[nbCol].forEach((element) => {
                if (gridPlayer1[nbCol].includes(element) && element !== null) {
                    this.anim.animate(document.getElementById(`player${otherPlayer.id}-col${nbCol + 1}-case-${gridPlayer2[nbCol].indexOf(element) + 1}`));
                    newGrid.push(null)
                } else {
                    newGrid.push(element)
                }
            });
        }

        otherPlayer.grid = newGrid
        otherPlayer.setSortedGrid()
    }

    switchTurn() {
        if (this.player1.turn) {
            document.getElementById('potPlayer1').setAttribute('class', 'choice-dice clignote')
            document.getElementById('potPlayer2').setAttribute('class', 'choice-dice')
        }

        if (this.player2.turn) {
            document.getElementById('potPlayer1').setAttribute('class', 'choice-dice')
            document.getElementById('potPlayer2').setAttribute('class', 'choice-dice clignote')
        }

        this.player1.turn = !this.player1.turn
        this.player2.turn = !this.player2.turn

        if (this.player1.gridIsFull() || this.player2.gridIsFull()) {
            this.ui.endGame()
            if (this.player1.score > this.player2.score) {
                document.getElementById('end-menu').style.filter = 'drop-shadow(0 0 5rem rgb(255, 179, 0))';
            }
            if (this.player1.score < this.player2.score) {
                document.getElementById('end-menu').style.filter = 'drop-shadow(0 0 5rem rgb(255, 0, 0))';
                this.run = false
            }
        }

        if (this.player1.turn && this.player1.ai && this.run) {
            this.player1.aiTurn()
        }

        if (this.player2.turn && this.player2.ai && this.run) {
            this.player2.aiTurn()
        }

    }
} 
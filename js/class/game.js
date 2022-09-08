import { Player } from "/js/class/player.js";
import { Ui } from "/js/class/ui.js";
import { Client } from "./client.js";
import { Sound } from "./sound.js";
import { Animation } from "./animation.js"
import { Loader } from "./loader.js";

export class Game {
    constructor() {
        this.player1
        this.player2
        this.roomId
        this.ui = new Ui(this)
        this.sound = new Sound()
        this.animation = new Animation()
        this.loader = new Loader()
        this.client = new Client(this, false) // true for local serveur, false for heroku serveur
    }

    init() {
        this.player1 = new Player(this, document.getElementById("grille2"), 2)
        this.player2 = new Player(this, document.getElementById("grille1"), 1)

        this.client.init()

        this.player1.otherPlayer = this.player2
        this.player2.otherPlayer = this.player1

        this.ui.init()
        this.player1.initControl()
    }

    play(mode) {
        this.player1.setName()
        this.sound.play('bgAudio', 0.01, true)
        this.sound.play('SeaSound', 0.01, true)

        switch (mode) {
            case "solo":
                this.client.joinSolo()
                this.show()
                break;

            case "multi":
                $("#index").fadeOut(400)
                this.loader.add("En attente d'un autre joueur ...")
                this.client.joinMulti()
                break;

            default: this.client.joinSolo(); break;
        }
    }

    show() {
        $("#index").fadeOut(400)
        $("#game").fadeIn(400)
    }

    reset() {
        this.ui.restartGame()
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
    }
} 

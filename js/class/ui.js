export class Ui {
    constructor(game) {
        this.game = game
        this.endScore = document.getElementById("scoreMenu")
        this.endMenu = $("#end-menu")
        this.oppacity = document.getElementById('oppacity');

        this.buttonRules = $("#btn-rules");
        this.rule = $("#rule")
        this.ruleCloseBtn = $("#returnToTheGame")

        this.bet = $("#bet")
        this.betInput = $("#bet-form input")
        this.betBtn = $("#bet-form button")
    }

    init() {
        this.quitBtn()
        this.quitGameBtn()
        this.showRules()
        this.closeRules()
        // this.loreBtn()
        this.sendBet()
    }

    quitBtn() {
        document.getElementById("quitGame").addEventListener("click", () => {
            this.game.client.sendExitGameOfType("rageQuit")
            this.resetGame()
        })
    }

    quitGameBtn() {
        document.getElementById("quitBtn").addEventListener("click", () => {
            this.game.client.sendExitGameOfType("exitGame")
            this.resetGame()
        })
    }

    resetGame() {
        this.returnToMenu()
        this.resetGrid()
        this.resetScore()
        this.hideAndResetEndGame()
        setTimeout(() => {
            this.resetBet()
        }, 500)
    }

    returnToMenu() {
        $("#index").fadeIn(400)
        $("#game").fadeOut(400)
    }

    showRules() {
        this.buttonRules.on("click", () => {
            this.rule.fadeIn(400)
        })
    }

    closeRules() {
        this.ruleCloseBtn.on("click", () => {
            this.rule.fadeOut(400)
        })
    }

    loreBtn() {
        document.getElementById('lore').addEventListener('click', () => {
            this.game.sound.play('dropCoin', 0.1)
        })
    }

    showEndGame(endGameMsg) {
        this.displayEndGame(endGameMsg);
        this.endMenu.fadeIn(400)
    }

    hideAndResetEndGame() {
        this.endMenu.hide()
        this.endMenu.find("#scoreMenu").html("0 - 0")
    }

    displayEndGame(endGameMsg) {
        let scorePlayer = document.getElementById(`totalScore1`).innerText;
        let scoreOtherPlayer = document.getElementById(`totalScore2`).innerText;

        if (scoreOtherPlayer < scorePlayer) {
            this.endScore.innerText = `${endGameMsg}\n${scorePlayer} - ${scoreOtherPlayer}`
            document.getElementById('parchemin').style.filter = 'drop-shadow(0 0 5rem rgb(255, 179, 0))';
        }
        if (scoreOtherPlayer > scorePlayer) {
            this.endScore.innerText = `${endGameMsg}\n${scoreOtherPlayer} - ${scorePlayer}`
            document.getElementById('parchemin').style.filter = 'drop-shadow(0 0 5rem rgb(255, 0, 0))';
        }
        if (scoreOtherPlayer == scorePlayer) {
            this.endScore.innerText = `${endGameMsg}\n${scorePlayer} - ${scoreOtherPlayer}`
            document.getElementById('parchemin').style.filter = 'drop-shadow(0 0 5rem #fff)';
        }
    }

    restartGame() {
        this.game.sound.play('beginSong', 0.09)
        this.endMenu.style = ""
        this.resetGrid()
        this.resetScore()
    }

    resetGrid() {
        document.querySelectorAll(".case").forEach((element) => {
            const img = element.getElementsByTagName("img")
            img[0].src = "#"
            img[0].dataset.value = "null"
        })
    }

    resetScore() {
        document.getElementById("totalScore1").innerHTML = "0"
        document.getElementById("totalScore2").innerHTML = "0"

        document.querySelectorAll(".column-score p").forEach((element) => {
            element.innerHTML = ""
        })
    }

    sendBet() {
        this.betBtn.on("click", () => {
            const betValueStr = this.betInput.val()
            const betValueInt = parseInt(betValueStr)

            if (betValueStr === "" || betValueInt === 0) {
                this.game.client.sendBet(0)
            }

            if (typeof betValueInt === "number" && betValueInt >= 0) {
                this.game.client.sendBet(betValueInt)
            }

            else {
                console.log("Entrer votre mise");
            }
        })
    }

    hideBet() {
        this.bet.fadeOut(400)
    }

    resetBet() {
        this.bet.removeAttr("style")
            .find("label")
            .html("Mise des points")
            .removeClass("color-err")
        this.betInput.val("0")
    }

    showBetErr(errMsg) {
        this.bet.find("label")
            .html(errMsg)
            .addClass("color-err")
    }
}
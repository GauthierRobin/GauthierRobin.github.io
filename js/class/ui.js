export class Ui {
    constructor(game) {
        this.game = game
        this.endScore = document.getElementById("scoreMenu")
        this.endMenu = document.getElementById("end-menu")
        this.oppacity = document.getElementById('oppacity');
        this.buttonRules = document.getElementById('btn-rules');
    }

    init() {
        this.quitBtn()
        this.quitGameBtn()
        this.rulesBtn()
        this.returnToGameBtn()
        this.loreBtn()
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
        this.resetGrid()
        this.resetScore()
        this.resetEndMenu()
        this.returnToMenu()
    }

    returnToMenu() {
        $("#index").fadeIn(400)
        $("#game").fadeOut(400)
    }

    resetEndMenu() {
        this.endMenu.classList.add("hide-important")
        this.endScore.innerHTML = ""
        this.buttonRules.removeAttribute('disabled')
    }

    rulesBtn() {
        document.getElementById("btn-rules").addEventListener('click', () => {
            this.game.sound.play('rulesBookSound', 0.1)
            const oppacity = document.getElementById('oppacity');
            const image = document.getElementById('rulesImg');
            const imageBack = document.getElementById('returnToTheGame');
            oppacity.style.display = (oppacity.style.display == "none") ? "block" : "none";
            image.style.display = (image.style.display == "none") ? "block" : "none";
            imageBack.style.display = (imageBack.style.display == "none") ? "block" : "none";
            image.style.animation = 'fadeIn 3s';
            imageBack.style.animation = 'fadeIn 3s';
        })
    }

    returnToGameBtn() {
        document.getElementById("returnToTheGame").addEventListener('click', () => {
            this.game.sound.play('closeRulesBook', 0.1)
            const oppacity = document.getElementById('oppacity');
            const image = document.getElementById('rulesImg');
            const imageBack = document.getElementById('returnToTheGame');
            oppacity.style.display = (oppacity.style.display == "block") ? "none" : "block";
            image.style.display = (image.style.display == "block") ? "none" : "block";
            imageBack.style.display = (imageBack.style.display == "block") ? "none" : "block";
        })
    }

    loreBtn() {
        document.getElementById('lore').addEventListener('click', () => {
            this.game.sound.play('dropCoin', 0.1)
        })
    }

    endGame(endGameMsg) {
        this.displayEndGame(endGameMsg);
        this.oppacity.style.display = "block";
        this.buttonRules.setAttribute('disabled', 'true');
        this.endMenu.classList.remove("hide-important");
    }

    displayEndGame(endGameMsg) {
        let scorePlayer = document.getElementById(`totalScore2`).innerText;
        let scoreOtherPlayer = document.getElementById(`totalScore1`).innerText;

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
        let img = document.createElement('img');
        img.setAttribute('id', 'begin');
        img.src = 'assets/animationsEffect/begin.png';
        img.style.zIndex = 10;
        setInterval(() => {
            img.src = '';
        }, 1000);
        this.game.sound.play('beginSong', 0.09)
        document.getElementById('background').append(img);
        this.buttonRules.removeAttribute('disabled');
        this.oppacity.style.display = "none";
        this.endMenu.classList.add("hide")
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                document.getElementById(`player${this.game.player1.id}-col${i}-case-${j}`).classList.remove('vibrate');
                document.getElementById(`player${this.game.player2.id}-col${i}-case-${j}`).classList.remove('vibrate');
            }
        }
        this.resetGrid()
        this.resetScore()
    }

    resetGrid() {
        let cases = document.getElementsByClassName("case")

        for (let index = 0; index < cases.length; index++) {
            cases[index].firstChild.src = "#"
            cases[index].firstChild.dataset.value = "null"
        }
    }

    resetScore() {
        let score1 = document.getElementsByClassName("totalScore1")
        let score2 = document.getElementsByClassName("totalScore2")

        for (let index = 0; index < score1.length; index++) {
            score1[index].innerHTML = ""
            score2[index].innerHTML = ""
        }

        let columnScore1 = document.getElementsByClassName("columnScore1")
        let columnScore2 = document.getElementsByClassName("columnScore2")

        for (let index = 0; index < columnScore1.length; index++) {
            columnScore1[index].innerHTML = ""
            columnScore2[index].innerHTML = ""
        }
    }
}
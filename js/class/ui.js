export class Ui {
    constructor(game) {
        this.game = game
        this.endScore = document.getElementById("scoreMenu")
        this.endMenu = document.getElementById("end-menu")
        this.oppacity = document.getElementById('oppacity');
        this.buttonRules = document.getElementById('btn-rules');
    }

    endGame() {
        this.oppacity.style.display = "block";
        this.endScore.innerText = `${document.getElementById(`totalScore1`).innerText} - ${document.getElementById(`totalScore2`).innerText}`
        this.buttonRules.setAttribute('disabled', 'true');
        this.endMenu.classList.remove("hide")
    }

    restartGame() {

        let img = document.createElement('img');
        img.setAttribute('id', 'begin');
        img.src = 'assets/animationsEffect/begin.png';
        img.style.zIndex = 10;
        setInterval(() => {
            img.src = '';
        }, 1000);
        const beginSong = document.getElementById('beginSong');
        beginSong.volume = 0.09;
        beginSong.play();
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
            cases[index].innerHTML = ""
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

    refreshColumn(player, nbColumn) {
        player.getFormatGrid()[nbColumn].forEach((caseValue, caseId) => {
            if (caseValue != null) {
                document.getElementById(
                    `player${player.id}-col${nbColumn + 1}-case-${caseId + 1}`
                ).innerHTML = `<img src="assets/dices/Dice${caseValue}.png" alt=""/>`
            }
            else {
                document.getElementById(`player${player.id}-col${nbColumn + 1}-case-${caseId + 1}`).innerHTML = ""
            }
        })
    }

    refreshColumnScore(player, nbColumn) {
        let columnScore = 0

        switch (nbColumn) {
            case 0:
                if (player.grid[0] == player.grid[1] && player.grid[0] == player.grid[2] && player.grid[0] != null) {
                    columnScore = player.grid[0] * 9;
                }
                if (player.grid[0] == player.grid[1] && player.grid[0] != player.grid[2]) {
                    columnScore = player.grid[0] * 4 + player.grid[2];
                }
                if (player.grid[0] == player.grid[2] && player.grid[0] != player.grid[1]) {
                    columnScore = player.grid[0] * 4 + player.grid[1];
                }
                if (player.grid[1] == player.grid[2] && player.grid[1] != player.grid[0]) {
                    columnScore = player.grid[1] * 4 + player.grid[0];
                }
                if (player.grid[0] != player.grid[1] && player.grid[0] != player.grid[2] && player.grid[1] != player.grid[2]) {
                    columnScore = player.grid[0] + player.grid[1] + player.grid[2];
                }
                break;

            case 1:
                if (player.grid[3] == player.grid[4] && player.grid[3] == player.grid[5] && player.grid[3] != null) {
                    columnScore = player.grid[3] * 9;
                }
                if (player.grid[3] == player.grid[4] && player.grid[3] != player.grid[5]) {
                    columnScore = player.grid[3] * 4 + player.grid[2];
                }
                if (player.grid[3] == player.grid[5] && player.grid[3] != player.grid[4]) {
                    columnScore = player.grid[3] * 4 + player.grid[1];
                }
                if (player.grid[4] == player.grid[5] && player.grid[4] != player.grid[3]) {
                    columnScore = player.grid[4] * 4 + player.grid[3];
                }
                if (player.grid[3] != player.grid[4] && player.grid[3] != player.grid[5] && player.grid[4] != player.grid[5]) {
                    columnScore = player.grid[3] + player.grid[4] + player.grid[5];
                }
                break;

            case 2:
                if (player.grid[6] == player.grid[7] && player.grid[6] == player.grid[8] && player.grid[6] != null) {
                    columnScore = player.grid[6] * 9;
                }
                if (player.grid[6] == player.grid[7] && player.grid[6] != player.grid[8]) {
                    columnScore = player.grid[6] * 4 + player.grid[8];
                }
                if (player.grid[6] == player.grid[8] && player.grid[6] != player.grid[7]) {
                    columnScore = player.grid[6] * 4 + player.grid[7];
                }
                if (player.grid[7] == player.grid[8] && player.grid[7] != player.grid[6]) {
                    columnScore = player.grid[7] * 4 + player.grid[6];
                }
                if (player.grid[6] != player.grid[7] && player.grid[6] != player.grid[8] && player.grid[7] != player.grid[8]) {
                    columnScore = player.grid[6] + player.grid[7] + player.grid[8];
                }
                break;

            default:
                break;
        }

        if (columnScore >= 0) {
            document.getElementById(`totalScore${player.id}Column${nbColumn + 1}`).innerText = columnScore;
            // return columnScore;
        }
    }

    refreshTotalScore(player) {
        let score = 0;
        let col1 = 0;
        if (player.grid[0] == player.grid[1] && player.grid[0] == player.grid[2] && player.grid[0] != null) {
            col1 = player.grid[0] * 9;
        }
        if (player.grid[0] == player.grid[1] && player.grid[0] != player.grid[2]) {
            col1 = player.grid[0] * 4 + player.grid[2];
        }
        if (player.grid[0] == player.grid[2] && player.grid[0] != player.grid[1]) {
            col1 = player.grid[0] * 4 + player.grid[1];
        }
        if (player.grid[1] == player.grid[2] && player.grid[1] != player.grid[0]) {
            col1 = player.grid[1] * 4 + player.grid[0];
        }
        if (player.grid[0] != player.grid[1] && player.grid[0] != player.grid[2] && player.grid[1] != player.grid[2]) {
            col1 = player.grid[0] + player.grid[1] + player.grid[2];
        }
        let col2 = 0;
        if (player.grid[3] == player.grid[4] && player.grid[3] == player.grid[5] && player.grid[3] != null) {
            col2 = player.grid[3] * 9;
        }
        if (player.grid[3] == player.grid[4] && player.grid[3] != player.grid[5]) {
            col2 = player.grid[3] * 4 + player.grid[2];
        }
        if (player.grid[3] == player.grid[5] && player.grid[3] != player.grid[4]) {
            col2 = player.grid[3] * 4 + player.grid[1];
        }
        if (player.grid[4] == player.grid[5] && player.grid[4] != player.grid[3]) {
            col2 = player.grid[4] * 4 + player.grid[3];
        }
        if (player.grid[3] != player.grid[4] && player.grid[3] != player.grid[5] && player.grid[4] != player.grid[5]) {
            col2 = player.grid[3] + player.grid[4] + player.grid[5];
        }
        let col3 = 0;
        if (player.grid[6] == player.grid[7] && player.grid[6] == player.grid[8] && player.grid[6] != null) {
            col3 = player.grid[6] * 9;
        }
        if (player.grid[6] == player.grid[7] && player.grid[6] != player.grid[8]) {
            col3 = player.grid[6] * 4 + player.grid[8];
        }
        if (player.grid[6] == player.grid[8] && player.grid[6] != player.grid[7]) {
            col3 = player.grid[6] * 4 + player.grid[7];
        }
        if (player.grid[7] == player.grid[8] && player.grid[7] != player.grid[6]) {
            col3 = player.grid[7] * 4 + player.grid[6];
        }
        if (player.grid[6] != player.grid[7] && player.grid[6] != player.grid[8] && player.grid[7] != player.grid[8]) {
            col3 = player.grid[6] + player.grid[7] + player.grid[8];
        }
        score = col1 + col2 + col3;
        document.getElementById(`totalScore${player.id}`).innerText = score;
    }

    refreshColumnAndScore(player, nbColumn) {
        this.refreshColumn(player, nbColumn)
        this.refreshColumnScore(player, nbColumn)
        this.refreshTotalScore(player)
    }

    choiceDice(player) {
        document.getElementById(
            `potPlayer${player.id}`
        ).src = `assets/dices/choseDice.png`
    }

    load() {
        document.getElementById("loading").classList.add("hide")
        document.getElementById("background").classList.remove("hide")
    }

    refreshName() {
        document.getElementById("namePlayer1").innerText = this.game.player2.name
    }
}
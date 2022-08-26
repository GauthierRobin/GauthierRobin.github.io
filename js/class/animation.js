export class Animate {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.stop = false;

    }

    animate(balise, id) {
        if (this.stop === false) {
            setTimeout(() => {
                const bomb = document.getElementById('bomb');
                bomb.volume = 0.1;
                bomb.play();
                balise.innerHTML = (`<img class='explode' src=assets/animationsEffect/explosion.png\ alt="" />`);
                console.log(balise);
                this.stop = true;
            }, 300);
            setTimeout(() => {
                this.resetAnime(this.player1, this.player2)
            }, 1300);
        }
    }

    resetAnime(gamePLayer, otherPlayer) {
        gamePLayer.setSortedGrid();
        otherPlayer.setSortedGrid();


        for (let i = 0; i < 3; i++) {
            gamePLayer.getFormatGrid()[i].forEach((caseValue, caseId) => {
                if (caseValue != null) {
                    document.getElementById(
                        `player${gamePLayer.id}-col${i + 1}-case-${caseId + 1}`
                    ).innerHTML = `<img src="assets/dices/Dice${caseValue}.png" alt=""/>`
                }
                else {
                    document.getElementById(`player${gamePLayer.id}-col${i + 1}-case-${caseId + 1}`).innerHTML = ""
                }
            })

            otherPlayer.getFormatGrid()[i].forEach((caseValue, caseId) => {
                if (caseValue != null) {
                    document.getElementById(
                        `player${otherPlayer.id}-col${i + 1}-case-${caseId + 1}`
                    ).innerHTML = `<img src="assets/dices/Dice${caseValue}.png" alt=""/>`
                }
                else {
                    document.getElementById(`player${otherPlayer.id}-col${i + 1}-case-${caseId + 1}`).innerHTML = ""
                }
            })
            for (let j = 1; j <= 3; j++) {
                for (let k = 1; k <= 2; k++) {
                    document.getElementById(`player${k}-col${i + 1}-case-${j}`).classList.remove('explode');
                }
            }
        }
    }
}

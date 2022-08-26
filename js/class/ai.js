export class Ai {
    constructor() { }

    aiTurn() {
        this.launchDe()
        document.getElementById(`potPlayer${this.id}`).src = `assets/dices/Dice${this.de}.png`

        setTimeout(() => {
            let columnChoice = this.play()

            let indexFirstCase = 0
            if (columnChoice === 2) {
                indexFirstCase = 3
            }
            if (columnChoice === 3) {
                indexFirstCase = 6
            }
            var diceSound = document.getElementById('aiSoundDice');
            diceSound.volume = 0.2;
            diceSound.play();
            this.checkColumn(indexFirstCase, columnChoice)
            this.otherPlayer.checkColumn(indexFirstCase, columnChoice)
            this.game.destroyEnemieDices(this, this.otherPlayer)
            this.game.ui.refreshColumnAndScore(this, columnChoice - 1)
            this.game.ui.refreshColumnAndScore(this.otherPlayer, columnChoice - 1)
            this.finishTurn()
        }, 2000)
    }

    randomChoice() {
        let columnChoice = Math.round(Math.random() * (this.nbCol - 1)) + 1

        while (this.columnIsFull(columnChoice - 1)) {
            columnChoice = Math.round(Math.random() * (this.nbCol - 1)) + 1
        }

        return columnChoice
    }

    checkSameDiceEnemyGrid() {
        let choice = null

        this.otherPlayer.getFormatGrid().forEach((col, colId) => {
            if (col.includes(this.de) && this.columnIsFull(colId) === false && choice === null) {
                choice = colId + 1
            }
        });

        return choice
    }

    checkSameDiceGrid() {
        let choice = null

        this.getFormatGrid().forEach((col, colId) => {
            if (col.includes(this.de) && this.columnIsFull(colId) === false && choice === null) {
                choice = colId + 1
            }
        })

        return choice
    }

    play() {
        let sameDiceEnemy = this.checkSameDiceEnemyGrid()
        let sameDice = this.checkSameDiceGrid()
        let choice = null

        if (sameDiceEnemy !== null && sameDice !== null && choice === null) {
            let choiceStrat = Math.round(Math.random() * 1) + 1

            switch (choiceStrat) {
                case 1:
                    choice = sameDiceEnemy
                    break;
                case 2:
                    choice = sameDice
                    break;
                default:
                    break;
            }
        }

        if (sameDice !== null && choice === null) {
            choice = sameDice
        }

        if (sameDiceEnemy !== null && choice === null) {
            choice = sameDiceEnemy
        }

        if (sameDiceEnemy === null && sameDice === null && choice === null) {
            choice = this.randomChoice()
        }

        return choice
    }
}
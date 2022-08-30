import { Ai } from "/js/class/ai.js";

export class Player extends Ai {
    constructor(game, htmlTab, id, turn, ai = false) {
        super()
        this.game = game
        this.otherPlayer = null
        this.htmlTab = htmlTab
        this.score = 0;
        this.scoreColumn1 = 0;
        this.scoreColumn2 = 0;
        this.scoreColumn3 = 0;
        this.id = id
        this.name = this.generateName(this.id, this.ai);
        this.ai = ai
        this.nbCol = 3
        this.nbColCase = 3
        this.grid = [null, null, null, null, null, null, null, null, null]
        this.de = null
        this.isLaunchDe = false
        this.turn = turn
        this.win = false
        this.roomId
    }

    reset() {
        this.grid = [null, null, null, null, null, null, null, null, null]
        this.turn = false
        this.score = 0
        this.de = null
        this.isLaunchDe = false
        this.scoreColumn1 = 0
        this.scoreColumn2 = 0
        this.scoreColumn3 = 0
    }

    finishTurn() {
        this.isLaunchDe = false
        this.de = null
        this.game.switchTurn()
        this.game.ui.choiceDice(this)
    }

    drawGrille() {
        let idCase = 0
        for (let column = 1; column <= this.nbCol; column++) {
            let col = document.createElement("div")

            col.classList.add("col")
            col.id = `player${this.id}-col${column}`

            let htmlCase = `<div id="totalScore${this.id}Column${column}" class="columnScore${this.id}"></div>`
            for (let box = 0; box < this.nbColCase; box++) {

                let id = `player${this.id}-col${column}-case-${box + 1}`

                htmlCase += this.setCaseHtml(id)
                idCase++
            }
            col.innerHTML = htmlCase
            this.htmlTab.append(col)
        }
    }

    setCaseHtml(id) {
        return `<div id=${id} class="case">
                        </div>`
    }

    launchDe() {
        this.de = Math.round(Math.random() * 5) + 1
        this.isLaunchDe = true
    }

    getFormatGrid() {
        let formatGrid = []
        let cmpt = 0
        for (let index = 0; index < this.nbCol; index++) {
            formatGrid.push(this.grid.slice(
                cmpt,
                cmpt + this.nbCol
            ))
            cmpt += this.nbCol
        }
        return formatGrid
    }

    setSortedGrid() {
        let newGrid = []
        this.getFormatGrid().forEach(col => {
            let nbNullBox = 0

            col.forEach(box => {
                if (typeof box === "number") {
                    newGrid.push(box)
                } else {
                    nbNullBox++
                }
            })

            for (let nullBox = 0; nullBox < nbNullBox; nullBox++) {
                newGrid.push(null)
            }
        });
        this.grid = newGrid
    }

    gridIsFull() {
        return !this.grid.includes(null)
    }

    columnIsFull(nbCol) {
        return !this.getFormatGrid()[nbCol].includes(null)
    }

    checkColumn(numCase) {
        if ((this.grid[numCase] == null) && (this.grid[numCase + 1] == null) && (this.grid[numCase + 2] == null)) {
            this.grid[numCase] = this.de;
            this.de = null;
        }

        if ((this.grid[numCase] != null) && (this.grid[numCase + 1] == null) && (this.grid[numCase + 2] == null)) {
            this.grid[numCase + 1] = this.de;
            this.de = null;
        }

        if ((this.grid[numCase] != null) && (this.grid[numCase + 1] != null) && (this.grid[numCase + 2] == null)) {
            this.grid[numCase + 2] = this.de;
            this.de = null;
        }
        switch (numCase) {
            case 1: this.scoreColumn1 = this.evalGrid(0, 1); break;
            case 2: this.scoreColumn2 = this.evalGrid(3, 2); break;
            case 3: this.scoreColumn3 = this.evalGrid(6, 3); break;
        }
    }

    checkVibrateClass(id, col) {
        for (let cell = 1; cell <= 3; cell++) {
            let VibrateClass = document.getElementById(`player${id}-col${col}-case-${cell}`).getAttribute('class');
            if (VibrateClass === 'vibrate') {
                document.getElementById(`player${id}-col${col}-case-${cell}`).classList.remove('vibrate');
                document.getElementById(`player${id}-col${col}-case-${cell}`).classList.add('vibrate');
            }
            else {
                document.getElementById(`player${id}-col${col}-case-${cell}`).classList.add('vibrate');
            }
        }
    }

    evalGrid(beginCase) {
        let scoreColumn = 0;
        if (this.grid[beginCase] == this.grid[beginCase + 1] && this.grid[beginCase] == this.grid[beginCase + 2] && this.grid[beginCase] != null) {
            scoreColumn = this.grid[beginCase] * 9;
        }
        if (this.grid[beginCase] == this.grid[beginCase + 1] && this.grid[0] != this.grid[beginCase + 2]) {
            scoreColumn = this.grid[beginCase] * 4 + this.grid[beginCase + 2];
        }
        if (this.grid[beginCase] == this.grid[beginCase + 2] && this.grid[beginCase] != this.grid[beginCase + 1]) {
            scoreColumn = this.grid[beginCase] * 4 + this.grid[beginCase + 1];
        }
        if (this.grid[beginCase + 1] == this.grid[beginCase + 2] && this.grid[beginCase + 1] != this.grid[beginCase]) {
            scoreColumn = this.grid[beginCase + 1] * 4 + this.grid[beginCase];
        }
        if (this.grid[beginCase] != this.grid[beginCase + 1] && this.grid[beginCase] != this.grid[beginCase + 2] && this.grid[beginCase + 1] != this.grid[beginCase + 2]) {
            scoreColumn = this.grid[beginCase] + this.grid[beginCase + 1] + this.grid[beginCase + 2];
        }
        return scoreColumn;
    }

    generateName(id, ai) {
        const name = ["Jackson", "Bobby", "Molly", "Rascass", "Mortane", "Barbasse", "Edward", "Morgane", "Shanks"];
        if (id == 2 && !ai) {
            return name[Math.round(Math.random() * 10)];
        }
        if (id == 1 && ai) {
        }
        var url = window.location.href;
        let namePlayer = decodeURI(url.split('=')[1]);
        return namePlayer;
    }

    initControl() {
        this.controlChoiceDice()
        this.controlColumn()
    }

    controlChoiceDice() {
        document.getElementById(`potPlayer${this.id}`).addEventListener("click", () => {
            if (this.turn && this.game.run && !this.isLaunchDe && !this.ai) {
                this.launchDe();
                document.getElementById(`potPlayer${this.id}`).src = `assets/dices/Dice${this.de}.png`
            }
        })
    }

    controlColumn() {
        let columnId = [0, 3, 6]
        for (let index = 0; index < this.nbCol; index++) {
            document.getElementById(`player${this.id}-col${index + 1}`).addEventListener("click", () => {
                if (this.turn && this.game.run && this.de !== null && this.isLaunchDe && !this.columnIsFull(index) && !this.ai) {
                    setTimeout(() => {
                        this.game.sound.play('diceSound', 0.1)

                        this.checkColumn(columnId[index])
                        this.otherPlayer.checkColumn(columnId[index])

                        this.setSortedGrid()
                        this.otherPlayer.setSortedGrid();

                        this.game.destroyEnemieDices(this, this.otherPlayer)

                        this.game.ui.refreshColumnAndScore(this, index)
                        this.game.ui.refreshColumnAndScore(this.otherPlayer, index)

                        if (this.game.multi) {
                            this.game.client.sendUpdateGrids()
                            this.game.client.sendGetGrids()
                        }

                        this.finishTurn()

                        if (this.game.multi) {
                            this.game.client.sendFinishTurn()
                        }

                        if (this.game.multi && this.gridIsFull()) {
                            this.game.client.sendEndGame()
                        }
                    }, 200)
                }
            })
        }
    }
}
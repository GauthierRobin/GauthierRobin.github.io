import { Ai } from "/js/class/ai.js";

export class Player extends Ai {
    constructor(game, htmlTab, id, ai = false) {
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
        this.turn = false
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

    checkColumn(i, j) {
        if ((this.grid[i] == null) && (this.grid[i + 1] == null) && (this.grid[i + 2] == null)) {
            this.grid[i] = this.de;

            this.evalGrid();
            this.de = null;
        }

        if ((this.grid[i] != null) && (this.grid[i + 1] == null) && (this.grid[i + 2] == null)) {
            this.grid[i + 1] = this.de;

            this.evalGrid();
            this.de = null;
        }

        if ((this.grid[i] != null) && (this.grid[i + 1] != null) && (this.grid[i + 2] == null)) {
            this.grid[i + 2] = this.de;

            this.evalGrid();
            this.de = null;
        }

        if ((this.grid[i + 2] != null)) {
            return;
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

    evalGrid() {
        if (this.grid[0] == this.grid[1] && this.grid[0] == this.grid[2] && this.grid[0] != null) {
            this.checkVibrateClass(this.id, 1);
            this.scoreColumn1 = this.grid[0] * 9;
        }
        if (this.grid[0] == this.grid[1] && this.grid[0] != this.grid[2]) {
            this.scoreColumn1 = this.grid[0] * 4 + this.grid[2];
        }
        if (this.grid[0] == this.grid[2] && this.grid[0] != this.grid[1]) {
            this.scoreColumn1 = this.grid[0] * 4 + this.grid[1];
        }
        if (this.grid[1] == this.grid[2] && this.grid[1] != this.grid[0]) {
            this.scoreColumn1 = this.grid[1] * 4 + this.grid[0];
        }
        if (this.grid[0] != this.grid[1] && this.grid[0] != this.grid[2] && this.grid[1] != this.grid[2]) {
            this.scoreColumn1 = this.grid[0] + this.grid[1] + this.grid[2];
        }


        if (this.grid[3] == this.grid[4] && this.grid[3] == this.grid[5] && this.grid[3] != null) {
            this.checkVibrateClass(this.id, 2);
            this.scoreColumn2 = this.grid[3] * 9;
        }
        if (this.grid[3] == this.grid[4] && this.grid[3] != this.grid[5]) {
            this.scoreColumn2 = this.grid[3] * 4 + this.grid[5];
        }
        if (this.grid[3] == this.grid[5] && this.grid[3] != this.grid[4]) {
            this.scoreColumn2 = this.grid[3] * 4 + this.grid[4];
        }
        if (this.grid[4] == this.grid[5] && this.grid[4] != this.grid[3]) {
            this.scoreColumn2 = this.grid[4] * 4 + this.grid[3];
        }
        if (this.grid[3] != this.grid[4] && this.grid[3] != this.grid[5] && this.grid[4] != this.grid[5]) {
            this.scoreColumn2 = this.grid[3] + this.grid[4] + this.grid[5];
        }


        if (this.grid[6] == this.grid[7] && this.grid[6] == this.grid[8] && this.grid[6] != null) {
            this.checkVibrateClass(this.id, 3);
            this.scoreColumn3 = this.grid[6] * 9;
        }
        if (this.grid[6] == this.grid[7] && this.grid[6] != this.grid[8]) {
            this.scoreColumn3 = this.grid[6] * 4 + this.grid[8];
        }
        if (this.grid[6] == this.grid[8] && this.grid[6] != this.grid[7]) {
            this.scoreColumn3 = this.grid[6] * 4 + this.grid[7];
        }
        if (this.grid[7] == this.grid[8] && this.grid[7] != this.grid[6]) {
            this.scoreColumn3 = this.grid[7] * 4 + this.grid[6];
        }
        if (this.grid[6] != this.grid[7] && this.grid[6] != this.grid[8] && this.grid[7] != this.grid[8]) {
            this.scoreColumn3 = this.grid[6] + this.grid[7] + this.grid[8];
        }
        this.score = this.scoreColumn1 + this.scoreColumn2 + this.scoreColumn3;
    }

    generateName(id, ai) {
        const name = ["Jackson", "Bobby", "Molly", "Rascass", "Mortane", "Barbasse", "Edward", "Morgane", "Shanks"];
        if (id == 2 && !ai) {
            return name[Math.round(Math.random() * 7)];
        }
        if (id == 1 && ai) {
        }
        var url = window.location.href;
        let namePlayer = decodeURI(url.split('=')[1]);
        return namePlayer;
    }
}
export class Player {
    constructor(game, htmlTab, id) {
        this.game = game
        this.otherPlayer = null
        this.htmlTab = htmlTab
        this.id = id
        this.name
        this.nbCol = 3
        this.nbColCase = 3
    }

    refreshColumn(columnId) {
        this.sortColumn(columnId).forEach((dice, nbCase) => {
            let imgSrc = "#"
            let dataSet = "null"

            if (dice !== "null") {
                imgSrc = `assets/dices/Dice${dice}.png`
                dataSet = dice
            }

            const imgCase = $(`#player${this.id}-col${columnId}-case-${nbCase + 1} img`)

            imgCase.attr("data-value", dataSet)
            imgCase.attr("src", imgSrc)
        })
    }

    sortColumn(columnId) {
        let columnValue = this.getFormatColumn(columnId)
        columnValue = columnValue.filter(caseValue => caseValue !== "null")
        const nbOfNullCase = 3 - columnValue.length

        for (let index = 0; index < nbOfNullCase; index++) {
            columnValue.push("null")
        }

        return columnValue
    }

    refreshTotalScore() {
        let totalScore = 0

        for (let columnId = 1; columnId <= 3; columnId++) {
            totalScore += this.evalScoreColumn(columnId)
        }

        $(`#totalScore${this.id}`).html(totalScore)
    }

    refreshScoreColumn(columnId) {
        const scoreColumn = this.evalScoreColumn(columnId)

        if (scoreColumn > 0) {
            $(`#totalScore${this.id}Column${columnId}`).html(scoreColumn)
        } else {
            $(`#totalScore${this.id}Column${columnId}`).html("")
        }
    }

    evalScoreColumn(columnId) {
        const countDices = this.getFormatColumn(columnId).reduce((acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
        }), {})

        let totalScoreOfColumn = 0

        for (let dice in countDices) {
            if (dice !== "null") {
                const nbOfDice = countDices[dice]
                totalScoreOfColumn += parseInt(dice) * nbOfDice * nbOfDice
            }
        }

        return totalScoreOfColumn
    }

    getFormatColumn(columnId) {
        let formatColumn = []

        document.querySelectorAll(`div[id^="player${this.id}-col${columnId}-case"] img`)
            .forEach((caseImg) => {
                formatColumn.push(caseImg.dataset.value)
            })

        return formatColumn
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

    initControl() {
        this.controlChoiceDice()
        this.controlColumn()
    }

    controlChoiceDice() {
        document.getElementById(`potPlayer${this.id}`).addEventListener("click", () => {
            if (true) {
                this.game.client.getMyDice()
            }
        })
    }

    controlColumn() {
        for (let columnId = 0; columnId < this.nbCol; columnId++) {
            document.getElementById(`player${this.id}-col${columnId + 1}`).addEventListener("click", () => {
                this.game.client.sendColumnChoice(columnId)
            })
        }
    }

    setName() {
        const pseudo = localStorage.getItem("pseudo")
        if (pseudo !== null) {
            this.name = pseudo
            $(`#namePlayer${this.id}`).html(pseudo)
        }
    }
}
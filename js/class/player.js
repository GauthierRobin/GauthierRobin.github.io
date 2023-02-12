import { Inventory } from "./inventory.js"
export class Player extends Inventory {
    constructor(game, htmlTab, id) {
        super()
        this.game = game
        this.otherPlayer = null
        this.htmlTab = htmlTab
        this.id = id
        this.name
        this.nbCol = 3
        this.nbColCase = 3
    }

    refreshColumn(columnId) {
        this.sortColumn(columnId).forEach((dice, caseId) => {
            let imgSrc = "#"
            let dataSet = "null"

            if (dice !== "null") {
                imgSrc = `https://ik.imagekit.io/iq52ivedsj/assets/dices/Dice${dice}.png?ik-sdk-version=javascript-1.4.3`
                dataSet = dice
            }

            const imgCase = $(`#player${this.id}-col${columnId}-case-${caseId + 1} img`)

            imgCase.attr("data-value", dataSet)
            imgCase.attr("src", imgSrc)
        })

        this.addEffect(columnId)
    }

    sortColumn(columnId) {
        let columnValue = this.getFormatColumn(columnId).filter(caseValue => caseValue !== "null")
        columnValue = this.id === 2 ? columnValue.reverse() : columnValue

        for (let index = 3 - columnValue.length; index > 0; index--) {
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
            $(`#totalScore${this.id}Column${columnId} p`).html(scoreColumn)
        } else {
            $(`#totalScore${this.id}Column${columnId} p`).html("")
        }
    }

    evalScoreColumn(columnId) {
        const countDices = this.countDices(columnId)
        let totalScoreOfColumn = 0

        for (let dice in countDices) {
            if (dice !== "null") {
                const nbOfDice = countDices[dice]
                totalScoreOfColumn += parseInt(dice) * nbOfDice * nbOfDice
            }
        }

        return totalScoreOfColumn
    }

    countDices(columnId) {
        return this.getFormatColumn(columnId).reduce((acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
        }), {})
    }

    getFormatColumn(columnId) {
        let formatColumn = []

        document.querySelectorAll(`div[id^="player${this.id}-col${columnId}-case"] img`)
            .forEach((caseImg) => {
                formatColumn.push(caseImg.dataset.value)
            })

        return formatColumn
    }

    initControl() {
        this.controlChoiceDice()
        this.controlColumn()
        this.initInventory()
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

    addEffect(columnId) {
        const countDices = this.countDices(columnId)
        for (let element in countDices) {
            const diceCase = $(`#player${this.id}-col${columnId} img[data-value=${element}]`).parent()

            diceCase.each((index, html) => {
                const htmlCase = $(html)
                const htmlCaseId = `#${htmlCase.attr("id")}`

                if (element !== "null" && countDices[element] > 1) {
                    if (htmlCase.hasClass("vibrate")) {
                        this.game.animation.removeCssAnimation(htmlCaseId, "vibrate")
                        htmlCase.width()
                    }

                    this.game.animation.addCssAnimation(htmlCaseId, "vibrate")
                }

                else {
                    if (htmlCase.hasClass("vibrate")) {
                        this.game.animation.removeCssAnimation(htmlCaseId, "vibrate")
                    }
                }
            })
        }
    }

    remove() {
        for (let i = 1; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
                for (let k = 1; k < 3; k++) {
                    $(`#player${k}-col${i}-case-${j}`).attr('class', 'case')
                    $(`#potPlayer${k}`).attr('src', "https://ik.imagekit.io/iq52ivedsj/assets/dices/choseDice_ftS4YvZbV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662986918825")
                }
            }
        }
    }
}
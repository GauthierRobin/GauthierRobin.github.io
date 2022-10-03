import { Sound } from "./sound.js"

export class Animation extends Sound {
    constructor() {
        super()
    }

    explodeDice(playerId, columnId, caseId) {
        const delay = 700
        let time = 0
        const animationDuration = 700

        caseId.forEach(nbCase => {
            const imgCase = $(`#player${playerId}-col${columnId}-case-${nbCase} img`)

            imgCase.attr("data-value", "null")

            setTimeout(() => {
                this.overlapPlay("boom", 0.2, false)
                imgCase.attr("src", "#")
                    .attr("src", "assets/animationsEffect/explosion.png")

                setTimeout(() => {
                    imgCase.attr("class", "explode")

                }, 100)

                setTimeout(() => {
                    imgCase.attr("class", "")
                        .attr("src", "#")
                }, animationDuration)
            }, time)
            time += delay
        })

        return delay * caseId.length
    }
}
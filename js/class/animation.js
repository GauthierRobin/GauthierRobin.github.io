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
                imgCase.parent().removeClass('vibrate')
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

    addCssAnimation(selector, className) {
        $(selector).addClass(className);
    }

    removeCssAnimation(selector, className) {
        $(selector).removeClass(className);
    }

    addGridSelector(gridId, className) {
        switch (gridId) {
            case 1:
                this.removeCssAnimation("#grille2 > div", className)
                this.addCssAnimation(`#grille${gridId} > div`, className)
                break;

            case 2:
                this.removeCssAnimation("#grille1 > div", className)
                this.addCssAnimation(`#grille${gridId} > div`, className)
                break;

            default:
                break;
        }
    }
}
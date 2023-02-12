import { url_myInventory } from "../../config/url.config.js"
import { getApiData } from "../utils/xhr.js"
import { Login } from "./login.js"

export class Inventory {
    constructor() {
        this.inventoryMenu = "#inventory"
        this.inventoryItems = "#inventory-items"
        this.inventoryBtn = "#inventory-btn"
        this.inventoryClose = "#inventory-close"
        this.error = $("#inventory-msg")
        this.loginController = new Login()
    }

    initInventory() {
        this.open()
        this.close()
    }

    open() {
        $(this.inventoryBtn).on("click", () => {
            $(this.inventoryMenu).fadeIn(400)
            this.getInventory()
        })
    }

    close() {
        $(this.inventoryClose).on("click", () => {
            $(this.inventoryMenu).fadeOut(400, () => {
                $(`${this.inventoryItems} ul`).html("")
                this.removeErrorMsg()
            })
        })
    }

    getInventory() {
        const xhrOptions = {
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                "x-xsrf-token": localStorage.getItem("xsrfToken")
            },
            mode: "cors"
        }

        getApiData(url_myInventory, xhrOptions, (status, res) => {
            switch (status) {
                case 200:
                    this.addAllBonus(res)
                    this.choiceBonus()
                    break;

                case 401:
                    this.loginController.refreshToken(() => {
                        this.getInventory()
                    })
                    break;

                default:
                    console.log("inventory request error status : ", status)
                    break;
            }
        })
    }

    addAllBonus(allBonus) {
        let html = ""

        $(`${this.inventoryItems} ul`).html(html)

        allBonus.forEach(bonus => {
            html += this.addBonus(
                bonus.imgUrl,
                bonus.quantity,
                bonus.product,
                bonus.description,
                bonus.productId
            )
        })

        $(`${this.inventoryItems} ul`).append(html)
    }

    addBonus(imgLink, quantity, name, description, productId) {
        return `
            <li class="w-100 f-column-center shop-cart">
                <button type="button" class="btn btn-transparent color-white" value="${productId}">
                    <h3>${name}</h3>
                    <div>
                        <div id="item-img" class="w-100 pos-rel f-row-center">
                            <div>
                                <img class="img-res" src="${imgLink}" alt="">
                            </div>
                            <p>${quantity}</p>
                        </div>
                        <p id="description">${description}</p>
                    </div>
                </button>
            </li>
        `
    }

    choiceBonus() {
        $("#inventory-items button").each((index, element) => {
            $(element).on("click", () => {
                console.log('choice');
                this.game.client.sendBonusChoice(
                    $(element).attr("value")
                )
            })
        })
    }

    addBonusCaseControl(playerId) {
        $(`#grille${playerId} img`).each((index, element) => {
            const boxCase = $(element)

            if (boxCase.attr("data-value") !== "null") {
                boxCase.parent().addClass("case-hover")

                boxCase.on("click", () => {
                    this.game.client.sendPayerBonusCase(boxCase.attr("data-case"))
                    this.game.animation.removeCssAnimation(`#grille${playerId} > div`, "vibrate")
                    this.removeBonusCaseControl()
                })
            }
        })
    }

    removeBonusCaseControl() {
        for (let grille = 1; grille <= 2; grille++) {
            $(`#grille${grille} img`).each((index, element) => {
                $(element)
                    .off("click")
                    .parent()
                    .removeClass("case-hover")
            })
        }
    }

    showErrorMsg(message) {
        this.error.html(message)
    }

    removeErrorMsg() {
        this.error.text("");
    }
}
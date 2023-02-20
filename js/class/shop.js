import { url_shopCategory, url_basicPurchase, url_playerInfos } from "../../config/url.config.js"
import { Login } from "./login.js"
import { getApiData } from "../utils/xhr.js"

export class Shop {
    constructor() {
        this.loginController = new Login()
        // this.recoverDataPlayer()
        // this.HandlePurchaseWithBasicCoin()
    }

    showShop() {
        this.recoverDataPlayer()
        this.HandlePurchaseWithBasicCoin()
        const section = ['gold', 'skin', 'icon', 'emot', 'bonus']
        section.forEach(element => {
            this.recoverData(element)
        })

        setTimeout(() => {
            this.maDouceEtMagnifiqueFonction()
        }, 1000)
    }

    recoverData(section) {
        $.ajax({
            type: "POST",
            url: url_shopCategory,
            data: { category: section },
            dataType: "json",
            success: function (allItems) {
                allItems.forEach(item => {
                    this.addItems(item.imgUrl, item.product, item.description, item.basicPrice, item.id, section)
                })
            }.bind(this)
        })
    }

    addItems(imgLink, name, description, price, productId, section) {
        $(`#${section}`).append(`
            <button 
                name="${name}"
                style="background-image:url('${imgLink}');"
                title="${description}"
                value="${productId}"
                data-price="${price}"
                >
            </button>`)
    }

    maDouceEtMagnifiqueFonction() {
        $('#panel button').on('click', (event) => {
            $('#item').fadeOut(0)
            $('#item').fadeIn(1000)
            $('#panel button').removeClass('vibrate')
            $(event.target).addClass('vibrate')
            $('#image').css('background-image', event.target.style.backgroundImage)
            $('#item h1').html(event.target.name)
            $('#item p').html(event.target.title)
            $('#item h2').html($(event.target).attr("data-price"))
            $('#item').attr('class', event.target.value)
        });
    }

    HandlePurchaseWithBasicCoin() {
        const xhrOptions = {
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                "x-xsrf-token": localStorage.getItem("xsrfToken")
            },
            mode: "cors",
            dataType: "json"
        }

        $(`#purchase`).on("click", () => {
            const btnVal = parseInt($("#item").attr('class'))
            if (btnVal >= 3 && btnVal <= 5) {
                this.purchaseWithBasicCoin(btnVal)
            }
        })
    }

    purchaseWithBasicCoin(productId) {
        const xhrOptions = {
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                "x-xsrf-token": localStorage.getItem("xsrfToken")
            },
            mode: "cors",
            data: {
                productId: productId
            },
            dataType: "json",

        }

        getApiData(url_basicPurchase, xhrOptions, (status, res) => {
            switch (status) {
                case 200:
                    break;

                case 401:
                    this.loginController.refreshToken(() => {
                        this.purchaseWithBasicCoin(productId)
                    })
                    break;

                default:
                    console.log("purchase error : ", status)
                    break;
            }
        })

        setTimeout(() => {
            this.recoverDataPlayer()
        }, 500)
    }

    recoverDataPlayer() {
        const xhrOptions = {
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                "x-xsrf-token": localStorage.getItem("xsrfToken")
            },
            mode: "cors",
            dataType: "json"
        }

        getApiData(url_playerInfos, xhrOptions, (status, res) => {
            switch (status) {
                case 200:
                    $(`#purchase`).html(`${this.convert(res.basicCoin)}`)
                    break;

                case 401:
                    this.loginController.refreshToken(() => {
                        this.recoverDataPlayer()
                    })
                    break;

                default:
                    console.log("recover data player error : ", status)
                    break;
            }
        })
    }

    convert(number) {
        let hundred = number % 10 ** 3
        let thousand = Math.round((number - hundred) / 10 ** 3) % 10 ** 3
        let million = Math.round((number - (thousand + hundred)) / 10 ** 6) % 10 ** 3
        let billion = Math.round((number - (million + thousand + hundred)) / 10 ** 9) % 10 ** 3
        if (number > 999 && number < 999999) {
            return `${thousand} K ${hundred}`
        }
        else if (number > 999999 && number < 999999999) {
            return `${million} M ${thousand} K ${hundred}`
        }
        else if (number > 999999999) {
            return `${billion} B ${million} M ${thousand} K ${hundred}`
        }
        else {
            return `${hundred}`
        }
    }
}


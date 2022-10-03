export class Inventory {
    constructor() {
        this.inventoryMenu = "#inventory"
        this.inventoryItems = "#inventory-items"
        this.inventoryBtn = "#inventory-btn"
        this.inventoryClose = "#inventory-close"
        this.error = $("#inventory-msg")
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
            })
        })
    }

    getInventory() {
        $.ajax({
            type: "POST",
            url: "https://serve.alwaysdata.net/api/inventory/myInventory/",
            data: {
                pseudo: localStorage.getItem("pseudo"),
                password: localStorage.getItem("password"),
            },
            dataType: "json",
            success: function (response) {
                this.addAllBonus(response)
                this.choiceBonus()
            }.bind(this),
            error: (xhr, ajaxOptions, thrownError) => {
                console.log(xhr)
                console.log(thrownError)
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
                this.game.client.sendBonusChoice(
                    $(element).attr("value")
                )
            })
        })
    }

    removeBonusChoice() {
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
}
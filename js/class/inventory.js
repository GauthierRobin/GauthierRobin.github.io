export class Inventory {
    constructor() {
        this.inventoryMenu = "#inventory-menu"
        this.inventoryItems = "#inventory-items"
        this.inventoryBtn = "#inventory-btn"
        this.inventoryClose = "#inventory-close"
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
            url: "http://127.0.0.1:8080/api/inventory/myInventory",
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
            <li class="shop-cart">
                <div>
                    <img src="${imgLink}" alt="">
                    <p>${quantity}</p>
                </div>
                <p>${name}</p>
                <p>${description}</p>
                <button type="button" value="${productId}">Utiliser</button>
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
}
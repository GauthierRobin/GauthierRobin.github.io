export class Shop {
    constructor() {
        this.bonusId = "#shop-bonus"
        this.purchaseWithCoinBtn = ".shop-cart button"
    }

    showBonus() {
        $.ajax({
            type: "POST",
            url: "http://serve.alwaysdata.net/api/shop/category",
            data: { category: "Bonus" },
            dataType: "json",
            success: function (response) {
                this.addAllBonus(response)
            }.bind(this)
        })
    }

    addAllBonus(allBonus) {
        allBonus.forEach(bonus => {
            this.addBonus(
                bonus.imgUrl,
                bonus.product,
                bonus.description,
                bonus.basicPrice,
                bonus.id
            )
        })

        this.purchaseWithBasicCoin()
    }

    addBonus(imgLink, name, description, price, productId) {
        $(`${this.bonusId} ul`).append(`
            <li class="shop-cart">
                <div>
                    <img src="${imgLink}" alt="">
                    <p class="hide"></p>
                </div>
                <p>${name}</p>
                <p>${description}</p>
                <p>${price} Pièces</p>
                <button type="button" value="${productId}">Acheter</button>
            </li>
        `)
    }

    purchaseWithBasicCoin() {
        $(this.purchaseWithCoinBtn).each((index, element) => {
            $(element).on("click", () => {
                const btnVal = $(element).val()

                $.ajax({
                    type: "POST",
                    url: "https://serve.alwaysdata.net/api/shop/basicPurchase/",
                    data: {
                        pseudo: localStorage.getItem("pseudo"),
                        password: localStorage.getItem("password"),
                        productId: btnVal
                    },
                    dataType: "json",
                    success: function (response) {
                        console.log("achat validé");
                    },
                    error: (xhr, ajaxOptions, thrownError) => {
                        console.log(xhr)
                        console.log(thrownError)
                    }
                })
            })
        })
    }
}


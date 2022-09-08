export class Loader {
    constructor() { }

    add(msg) {
        let loader = document.createElement("div")
        loader.id = "loader"

        loader.innerHTML = `
            <div class="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p class="text-color-light-white">${msg}</p>
        `

        document.body.appendChild(loader)
    }

    remove() {
        $("#loader").fadeOut(400, function () {
            $("#loader").remove()
        })
    }
}

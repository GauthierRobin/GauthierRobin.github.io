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
            <p>${msg}</p>
        `

        document.querySelector("main").appendChild(loader)
    }

    remove() {
        $("#loader").fadeOut(400, function () {
            $("#loader").remove()
        })
    }
}

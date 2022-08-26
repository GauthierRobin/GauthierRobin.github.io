const resize = () => {
    let backgroundHeight = document.getElementById("fond").height

    document.getElementById("rolls").style.height = backgroundHeight + "px"
    document.getElementById("grids").style.height = backgroundHeight + "px"
}

resize()

window.addEventListener("resize", () => {
    resize()
})

document.addEventListener("load", function () {
    resize()
});

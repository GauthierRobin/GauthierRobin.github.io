import { Login } from "./class/login.js"
import { Leaderboard } from "./class/leaderBoard.js"
import { Game } from "./class/game.js"
import { Loader } from "./class/loader.js"

const resize = () => {
    let body = document.body,
        html = document.documentElement;

    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);

    document.getElementById("backg").style.height = height + "px"
}


const changeBackground = () => {
    const bg = document.getElementById('backg');
    const time = new Date().getHours() + 1;

    if (time >= 8 && time < 13) {
        bg.setAttribute('src', 'assets/bg1.png');
    }
    else if (time >= 13 && time < 18) {
        bg.setAttribute('src', 'assets/bg2.png');
    }
    else {
        bg.setAttribute('src', 'assets/bg3.png');
    }
}

window.addEventListener("resize", () => {
    resize()
})

const loader = new Loader()
loader.add("Loading ...")

window.addEventListener('load', function () {
    setTimeout(() => {
        loader.remove()
    }, 500)
    $("#index").fadeIn(400)

    var SeaSound = document.getElementById('SeaSound')
    SeaSound.volume = 0.1
    SeaSound.loop = "true"
}, false)

resize()
changeBackground()

const login = new Login()
login.autoConnect()
login.signup()
login.signin()

const leaderBoard = new Leaderboard()
leaderBoard.init()

const game = new Game()
game.init()

$('#redirectionSolo').on('click', () => {
    const pseudo = localStorage.getItem("pseudo")
    const password = localStorage.getItem("password")
    if (pseudo !== null && password !== null) {
        game.play("solo")
    } else {
        // show conect form
        console.log("Veillez vous connecter");
    }
})

$('#redirectionMulti').on('click', () => {
    const pseudo = localStorage.getItem("pseudo")
    const password = localStorage.getItem("password")
    if (pseudo !== null && password !== null) {
        game.play("multi")
    } else {
        // show conect form
        console.log("Veillez vous connecter");
    }
})

$('#new-user-btn').on('click', () => {
    $('#signin').fadeOut(400, () => {
        $('#signup').fadeIn(400)
    });
})

$("#menu-principal-btn").on("click", () => {
    $("#menu-principal").fadeIn(400)
    $("#leaderboard").fadeOut(400)
    $("#shop").fadeOut(400)
})
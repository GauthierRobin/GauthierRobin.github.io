import { Login } from "./class/login.js"
import { Leaderboard } from "./class/leaderBoard.js"
import { Game } from "./class/game.js"
import { Loader } from "./class/loader.js"
import { Shop } from "./class/shop.js"

const changeBackground = () => {
    const bg = document.getElementById('backg');
    const time = new Date().getHours() + 1;

    if (time >= 8 && time < 13) {
        bg.setAttribute('src', 'https://ik.imagekit.io/iq52ivedsj/assets/bg1_xedqZJjiY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662987064789');
    }
    else if (time >= 13 && time < 18) {
        bg.setAttribute('src', 'https://ik.imagekit.io/iq52ivedsj/assets/bg2_ILScAgZGCc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662987081708');
    }
    else {
        bg.setAttribute('src', 'https://ik.imagekit.io/iq52ivedsj/assets/bg3_WXdvDGb2b.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662987044446');
    }
}

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

changeBackground()

const login = new Login()
login.init()

const leaderBoard = new Leaderboard()
leaderBoard.init()

const shop = new Shop()
shop.showShop()

const game = new Game()
game.init()

$('#redirectionSolo').on('click', () => {
    const pseudo = localStorage.getItem("pseudo")
    const token = localStorage.getItem("xsrfToken")
    if (pseudo !== null && token !== null) {
        game.play("solo")
    } else {
        login.showConnectAndHideMenu()
        console.log("Veillez vous connecter");
    }
})

$('#redirectionMulti').on('click', () => {
    const pseudo = localStorage.getItem("pseudo")
    const token = localStorage.getItem("xsrfToken")
    if (pseudo !== null && token !== null) {
        game.play("multi")
    } else {
        login.showConnectAndHideMenu()
        console.log("Veillez vous connecter");
    }
})

/////////////////////////////////////////////////////////////
$(".menu-principal-btn").on("click", () => {
    changeBackground()
    $("#menu-principal").fadeIn(400)
    $("#leaderboard").fadeOut(400)
    $("#shop").fadeOut(400)
    $("#profile").fadeOut(400)
})

$(".shop-btn").on("click", () => {
    $('#backg').attr('src', 'https://ik.imagekit.io/mbo2hq52r/assets/wallpaper_JTNJAeMQJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664045675697');
    $("#menu-principal").fadeOut(400)
    $("#leaderboard").fadeOut(400)
    $("#shop").fadeIn(400)
    $("#profile").fadeOut(400)
})

$(".leaderboard-btn").on('click', () => {
    $('#backg').attr('src', 'https://ik.imagekit.io/mbo2hq52r/assets/wallpaper_JTNJAeMQJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664045675697');
    $("#profile").fadeOut(400)
    $("#shop").fadeOut(400)
    $("#menu-principal").fadeOut(400)
})

$('.player-info').on('click', () => {
    $('#backg').attr('src', 'https://ik.imagekit.io/mbo2hq52r/assets/wallpaper_JTNJAeMQJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664045675697');
    $("#profile").fadeIn(400)
    $("#menu-principal").fadeOut(400)
    $("#leaderboard").fadeOut(400)
    $("#shop").fadeOut(400)
})
//////////////////////////////////////////////////////////////
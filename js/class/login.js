import { url_autoconnect, url_signin, url_signup, url_refresh } from "../../config/url.config.js"
import { getApiData } from "../utils/xhr.js"

export class Login {
    constructor() {
        this.pseudo
        this.email
        this.password
    }

    init() {
        this.autoConnect()
        this.signup()
        this.signin()
        this.showSigninForm()
        this.showSignupForm()
    }

    showSigninForm() {
        $('#return-to-connect').on('click', () => {
            $('#signup').fadeOut(400, () => {
                $("#signin-error").html('')
                $('#signin').fadeIn(400)
            })
        })
    }

    showSignupForm() {
        $('#new-user-btn').on('click', () => {
            $('#signin').fadeOut(400, () => {
                $("#signup-error").html('')
                $('#signup').fadeIn(400)
            })
        })
    }

    hideConnectAndShowMenu() {
        $("#login-menu").fadeOut(400)
        $("#menu-principal").fadeIn(400)
        $("header").fadeIn(400)
    }

    showConnectAndHideMenu() {
        $("#menu-principal").fadeOut(400)
        $("header").fadeOut(400)
        $("#login-menu").fadeIn(400)
    }

    showError(selector, msg) {
        $(selector).html(msg)
    }

    refreshToken(callback) {
        const xhrOptions = {
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                "x-xsrf-token": localStorage.getItem("xsrfToken")
            },
            mode: "cors"
        }

        getApiData(url_refresh, xhrOptions, (status, res) => {
            switch (status) {
                case 200:
                    if (typeof callback === "function") {
                        callback()
                    }
                    break;

                default:
                    // to do delete cookies
                    localStorage.clear()
                    this.showConnectAndHideMenu()
                    break;
            }

        })
    }

    autoConnect() {
        const xhrOptions = {
            headers: {
                'Content-type': 'application/json; charset=utf-8',
                "x-xsrf-token": localStorage.getItem("xsrfToken")
            },
            mode: "cors"
        }

        getApiData(url_autoconnect, xhrOptions, (status, res) => {
            switch (status) {
                case 200:
                    this.hideConnectAndShowMenu()
                    break;

                case 401:
                    this.refreshToken(this.hideConnectAndShowMenu())
                    break;

                default:
                    this.showConnectAndHideMenu()
                    break;
            }
        })
    }

    async signin() {
        this.getSigninDatas()
        document.getElementById("signin-submit").addEventListener("click", async () => {
            const xhrOptions = {
                headers: { 'Content-type': 'application/json; charset=utf-8' },
                data: {
                    "pseudo": this.pseudo,
                    "password": this.password
                },
                mode: "cors",
            }

            getApiData(url_signin, xhrOptions, (status, res) => {
                switch (status) {
                    case 200:
                        localStorage.setItem("xsrfToken", res.xsrfToken)
                        localStorage.setItem("pseudo", res.pseudo)
                        this.hideConnectAndShowMenu()
                        console.log(localStorage);
                        break;

                    default:
                        if (typeof res.message !== "undefined") {
                            this.showError("#signin-error", res.message)
                        }

                        else {
                            this.showError("#signin-error", "Une erreur est survenue")
                        }
                        break;
                }
            })
        })
    }

    signup() {
        this.setSignupValues()

        document.getElementById("signup-submit").addEventListener("click", () => {
            const xhrOptions = {
                headers: { 'Content-type': 'application/json; charset=utf-8' },
                data: {
                    "pseudo": this.pseudo,
                    "email": this.email,
                    "password": this.password,
                }
            }

            getApiData(url_signup, xhrOptions, (status, res) => {
                console.log(res);
                switch (status) {
                    case 200:
                        $('#signup').fadeOut(400, () => {
                            $('#signin').fadeIn(400)
                        })
                        break;

                    default:
                        if (typeof res.message !== "undefined") {
                            this.showError("#signup-error", res.message)
                        }

                        else {
                            this.showError("#signup-error", "Une erreur est survenue")
                        }
                        break;
                }
            })
        })
    }

    getSigninDatas() {
        const form = document.getElementById("signin-form")

        form.querySelector("[name=pseudo]").addEventListener("change", (event) => {
            this.pseudo = event.target.value
        })

        form.querySelector("[name=password]").addEventListener("change", (event) => {
            this.password = event.target.value
        })
    }

    setSignupValues() {
        const form = document.getElementById("signup-form")

        form.querySelector("[name=email]").addEventListener("change", (event) => {
            this.email = event.target.value
        })

        form.querySelector("[name=pseudo]").addEventListener("change", (event) => {
            this.pseudo = event.target.value
        })

        form.querySelector("[name=password]").addEventListener("change", (event) => {
            this.password = event.target.value
        })
    }
}
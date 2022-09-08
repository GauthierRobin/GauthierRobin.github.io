export class Login {
    constructor() {
        this.pseudo
        this.email
        this.password
    }

    autoConnect() {
        const pseudo = localStorage.getItem("pseudo")
        const password = localStorage.getItem("password")

        if (pseudo !== null && password !== null) {
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8080/api/auth/autoconnect",
                data: {
                    "pseudo": pseudo,
                    "password": password
                },
                dataType: "json",
                success: function (response) {
                    $("#menu-principal h1").html(`Welcome ${response.pseudo}`)
                    $("#player-name").html(`${response.pseudo}`)
                    $("#login-menu").fadeOut(400)
                    $("#menu-principal").fadeIn(400)
                    $("header").fadeIn(400)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status)
                    console.log(xhr.responseJSON)
                    console.log(thrownError)

                    localStorage.clear()
                }
            })
        } else {
            $("#login-menu").fadeIn(400)
        }
    }

    signin() {
        this.getSigninDatas()

        document.getElementById("signin-submit").addEventListener("click", () => {
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8080/api/auth/signin",
                data: {
                    "pseudo": this.pseudo,
                    "password": this.password
                },
                dataType: "json",
                success: function (response) {
                    if (localStorage.getItem('pseudo') !== response.pseudo || localStorage.getItem('password') !== response.password) {
                        localStorage.setItem("pseudo", response.pseudo)
                        localStorage.setItem("password", response.password)
                    }

                    $("#signin").fadeOut(400)
                    $("#menu-principal").fadeIn(400)
                    $("header").fadeIn(400)
                    $("#player-name").html(`${response.pseudo}`)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status)
                    console.log(xhr.responseJSON.message)
                    console.log(thrownError)
                }
            });
        })
    }

    signup() {
        this.setSignupValues()

        document.getElementById("signup-submit").addEventListener("click", () => {
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8080/api/auth/signup",
                data: {
                    "pseudo": this.pseudo,
                    "email": this.email,
                    "password": this.password
                },
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    $('#signup').fadeOut(400, () => {
                        $('#signin').fadeIn(400)
                    });
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status)
                    console.log(xhr.responseJSON.message)
                    console.log(thrownError)
                }
            });
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
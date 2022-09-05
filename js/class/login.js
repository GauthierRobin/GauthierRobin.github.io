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
                    document.getElementById('player-name').innerHTML = `Pirate ${response.pseudo}`
                    document.getElementById('player-rating').innerHTML = `Rating ${response.rating}`
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status)
                    console.log(thrownError)
                    localStorage.clear()
                }
            })
        } else {
            document.getElementById('player-name').innerHTML = "Veuillez vous connecter"
        }
    }

    signin() {
        const datas = this.getSigninDatas()

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

                    document.getElementById('player-name').innerHTML = `Pirate ${localStorage.getItem('pseudo')}`
                    document.getElementById('player-rating').innerHTML = `Rating ${response.rating}`
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status)
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
                    console.log(response);
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
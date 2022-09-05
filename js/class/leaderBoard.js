export class Leaderboard {
    constructor() {
        this.btnId = "#leaderboard-btn"
        this.leaderboardId = "#leaderboard-page"
        this.tableId = "#leaderboard-table"
        this.closeBtnId = "#leaderboard-close-btn"
    }

    init() {
        $(this.btnId).on("click", () => {
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8080/api/rating/all",
                success: function (response) {
                    this.add(response)
                    $(this.leaderboardId).fadeIn(400)
                }.bind(this)
            })
        });

        this.closeEvent()
    }

    add(datas) {
        const table = $(this.tableId)
        let html = "<tr><th>Player</th><th>Rating</th></tr>"
        datas.forEach(data => {
            html += `<tr><td>${data.pseudo}</td><td>${data.rating}</td></tr>`
        })
        table.html(html)
    }

    closeEvent() {
        $(this.closeBtnId).on("click", () => {
            $(this.leaderboardId).fadeOut(400, () => {
                $(this.tableId).html("")
            })
        })
    }
}
$.ajax({
    type: "POST",
    url: "https://serve.alwaysdata.net/api/rating/all/",
    success: function (response) {
        console.log(response)
    },
    error: (xhr, ajaxOptions, thrownError) => {
        console.log(xhr)
        console.log(thrownError)
    }
})

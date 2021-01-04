$(document).ready(async function () {
    
    var userInfo = JSON.parse(localStorage.getItem("userInfo"))
    console.log(userInfo);

    var mood = userInfo.mood
    console.log(mood);

    var unsplashApi = `https://api.unsplash.com/search/photos/random?client_id=SZbxYpkVWzGzWeanAOAvuU8zlu0eqzAueOem0YFlS_g&query=${mood}`;

    $.ajax({
        url: unsplashApi,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var body = $(".container")
        console.log(response);
        var bg = `url(${response.results[0].urls.regular})`
        body.css("background-image", bg)
    });
})

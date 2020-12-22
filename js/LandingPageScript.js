$(document).ready(function () {
    // ***************** On PAGE LOAD

    // ***************** On EVENT - CLICK, CHANGE

    // get User Info
    const userInput = $(".formInput");
    userInput.on("submit", function (e) {
        e.preventDefault();

        var userName = $(userInput[0][0]).val();
        var userMood = $(userInput[0][1]).val();
        var userWalkTime = $(userInput[0][2]).val();

        // call mood api and get img
        var moodImg = getMoodImg(userMood);
        displayOnDOM(moodImg);
    });
    // call youtube api and generate playlist
    // call travelTime api and generate route
    // display Dashboard / player
    // redirect user to player page

    // ***************** FUNCTIONS
    // MOOD API
    async function getMoodImg(mood) {
        const TT_AccessKey = "SZbxYpkVWzGzWeanAOAvuU8zlu0eqzAueOem0YFlS_g";

        var moodURL = `https://api.unsplash.com/search/photos?query=${mood}&client_id=${TT_AccessKey}`;

        const moodImg = await $.ajax({
            url: moodURL,
        });
        return moodImg;
    }

    // SONG API
    async function makePlayList(keyWord, timeInterval) {
        const TT_YouTubeKey = "AIzaSyAH1C73Q6GGpzE9U8i87s1Du3NIVGyD7R4";
    }

    function displayOnDOM(item) {
        console.log(item);
        const imgLoc = $(".imgLoc");
        var moodImg = $("<img>");
        moodImg.attr("src", item.results[0].urls.full);
        moodImg.attr("width", 300);
        moodImg.appendTo(imgLoc);
    }
});

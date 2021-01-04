// ********************************************************
// ******************************************************** on Page Load
// ********************************************************
$(document).ready(async function () {
    var userObject = await JSON.parse(localStorage.getItem("userInfo"));
    var timeGivenInMilli = userObject["time"] * 60 * 1000;
    const allSongs = await getSongsAPI(userObject["mood"]);

    var ytId = allSongs[0]["YouTube ID"];

    ytplayer(allSongs[0]["Youtube ID"]);
});

// ********************************************************
// ******************************************************** Get allSongs
// ********************************************************
async function getSongsAPI(mood) {
    moods = ["happy", "sad", "anger", "contemplative", "calm", "energizing"];
    moodIndex = moods.indexOf(mood) + 1;

    const jsonSheet = await $.ajax({
        url: `https://spreadsheet.google.com/feeds/cells/1SorEST9_mOlFYCMDWF9ysRn75HOT4X4Q8B0KmMLyOgc/${moodIndex}/public/full?alt=json`,
        method: "get",
    });
    var jsonSheetEntries = jsonSheet["feed"]["entry"];
    var allSongs = [];
    var headers = [];
    var items = {};

    for (let i = 0; i < jsonSheetEntries.length; i++) {
        var entry = jsonSheetEntries[i];
        if (entry["gs$cell"].row == 1) {
            headers.push(entry.content.$t);
        }
        if (entry["gs$cell"].row > 1) {
            // console.log(i % headers.length);
            items[headers[i % headers.length]] = entry.content.$t;
            if (i % headers.length === headers.length - 1) {
                allSongs.push(items);
                items = {};
            }
        }
    }

    return allSongs;
}
// ********************************************************
// ******************************************************** YouTube
// ********************************************************
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
const ytplayer = function onYouTubeIframeAPIReady(videoId) {
    // var videoId = "M7lc1UVf-VE";
    console.log(videoId);

    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: videoId,
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
};

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

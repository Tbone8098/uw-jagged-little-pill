// ********************************************************
// ******************************************************** on Page Load
// ********************************************************
var songCount = 0;
var playList = [];
$(document).ready(async function () {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));

    var mood = userInfo.mood;

    var unsplashApi = `https://api.unsplash.com/search/photos/random?client_id=evk2OFv8EUpNIcRxwJfHmhBp_Z0G92ydwEIckYe1sh4&query=${mood}`;

    $.ajax({
        url: unsplashApi,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        var body = $(".container");
        console.log(response);
        var bg = `url(${response.results[0].urls.regular})`;
        body.css("background-image", bg);
    });

    var userObject = await JSON.parse(localStorage.getItem("userInfo"));
    var timeGivenInMilli = userObject["time"] * 60 * 1000;
    const allSongs = await getSongsAPI(userObject["mood"]);
    console.log(allSongs)
    await makePlayList(allSongs, timeGivenInMilli);
    console.log(playList)
    ytplayer(playList[songCount]);
});

// ********************************************************
// ******************************************************** Get allSongs
// ********************************************************
async function getSongsAPI(mood) {
    moods = ["happy", "sad", "angry", "contemplative", "calm", "energized"];
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
// ******************************************************** Create Playlist
// ********************************************************

function makePlayList(songList, timeInMilli) {
    // create new var: totalPlaylistDuration (int) time in milliseconds
    var totalPlaylistDuration = 0;

    var playListTimes = [];

    // loop (while) through length of returned array
    var songsNumAlreadyChosen = [];
    var i = 0;
    while (totalPlaylistDuration < timeInMilli) {
        // break if it has added all songs to the playlist
        if (i >= songList.length) {
            // TODO add error message saying all songs are added to playlist
            break;
        }
        // pick one at random
        var ranNum = Math.floor(Math.random() * songList.length);
        if (songsNumAlreadyChosen.indexOf(ranNum) == -1) {
            songsNumAlreadyChosen.push(ranNum);
            currentSong = songList[ranNum];
            // add to playlist
            playList.push(currentSong["YouTube ID"]);
            // get the duration in milliseconds
            console.log(currentSong)
            var durationArray = currentSong.Duration.split(":");
            var hoursInMilli = parseInt(durationArray[0]) * 60 * 60 * 1000;
            var minutesInMilli = parseInt(durationArray[1]) * 60 * 1000;
            var secondsInMilli = parseInt(durationArray[2]) * 1000;
            var duration = hoursInMilli + minutesInMilli + secondsInMilli;
            // add time to playListTimes
            playListTimes.push(duration);
            // add duration from api to totalPlaylistDuration
            totalPlaylistDuration += duration;
            i++;
        }
    }
}

// ********************************************************
// ******************************************************** Next Song
// ********************************************************
function nextSong() {
    console.log("playing next song");
    setupApi();
}

// ********************************************************
// ******************************************************** YouTube
// ********************************************************
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
const ytplayer = function onYouTubeIframeAPIReady(videoId) {
    console.log(`youtubeId: ${videoId}`);

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
    if (event.data == 0) {
        stopVideo();
        songCount++;
        nextSong();
    }
}
function stopVideo() {
    console.log("stopping video");
    player.stopVideo();
}

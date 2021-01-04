$(document).ready(async function () {
    // get mood from localstorage
    var userObject = JSON.parse(localStorage.getItem("userInfo"));
    var name = userObject["name"];
    var mood = userObject["mood"];
    var timeGiven = userObject["time"];
    console.log(`name:${name} mood:${mood} timeGiven:${timeGiven}`);
    var timeGivenInMilli = timeGiven * 60 * 1000;
    console.log(timeGivenInMilli);
    // call sheets API and get all songs for mood.
    const allSongs = await getSongsAPI(mood);
    console.log(allSongs);
    // create new var: totalPlaylistDuration (int) time in milliseconds
    var totalPlaylistDuration = 0;
    // create new var: Playlist (dict)
    var playList = [];
    var playListTimes = [];
    // loop (while) through length of returned array
    var songsNumAlreadyChosen = [];
    var i = 0;
    while (totalPlaylistDuration < timeGivenInMilli) {
        // break if it has added all songs to the playlist
        if (i >= allSongs[mood].length) {
            // TODO add error message saying all songs are added to playlist
            break;
        }
        // pick one at random
        var ranNum = Math.floor(Math.random() * allSongs[mood].length);
        if (songsNumAlreadyChosen.indexOf(ranNum) == -1) {
            songsNumAlreadyChosen.push(ranNum);
            var currentSong = allSongs[mood][ranNum];
            // add to playlist
            playList.push(currentSong.youtubeId);
            // get the duration in milliseconds
            var durationArray = currentSong.duration.split(":");
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
    console.log(totalPlaylistDuration);
    console.log(playList);
    console.log(playListTimes);

    // functions **************************
    async function getSongsAPI(mood) {
        const allSongs = await $.ajax({
            url: `https://api.sheety.co/e91f710c44d8c38d5fbfefc51481c7ee/songs/${mood}`,
            method: "get",
        });
        return allSongs;
    }
});

console.log("*********** ytplayer info ************");

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady(videoId) {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: videoId,
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
    console.log(event);
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}
function stopVideo() {
    player.stopVideo();
}

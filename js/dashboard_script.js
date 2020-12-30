$(document).ready(async function () {
    // get mood from localstorage
    var name = "Tyler";
    var mood = "happy";
    var timeGiven = 15;
    var timeGivenInMilli = timeGiven * 60 * 1000;
    console.log(timeGivenInMilli);

    // call sheets API and get all songs for mood.
    const allSongs = await getSongsAPI(mood);
    console.log(allSongs);

    // create new var: totalPlaylistDuration (int) time in milliseconds
    var totalPlaylistDuration = 0;

    // create new var: Playlist (dict)
    var playList = [];

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

            // add duration from api to totalPlaylistDuration
            totalPlaylistDuration += duration;
            i++;
        }
    }

    console.log(totalPlaylistDuration);
    console.log(playList);
});

// functions **************************
async function getSongsAPI(mood) {
    const allSongs = await $.ajax({
        url: `https://api.sheety.co/e91f710c44d8c38d5fbfefc51481c7ee/songs/${mood}`,
        method: "get",
    });

    return allSongs;
}

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}

initMap();

$(document).ready(async function () {
    // get mood from localstorage
    // call sheets API and get all songs for mood.
    var mood = "happy";
    const allSongs = await getSongsAPI(mood);
    console.log(allSongs);
    // create new var: totalPlaylistDuration (int)
    var totalPlaylistDuration = 0;
    // create new var: Playlist (dict)
    var playList = [];
    // loop (do while) through length of returned array
    var songsNumAlreadyChosen = [];
    var i = 0;
    do {
        // pick one at random
        var ranNum = Math.floor(Math.random() * allSongs[mood].length);
        if (songsNumAlreadyChosen.indexOf(ranNum) == -1) {
            var currentSong = allSongs[mood][ranNum];
            songsNumAlreadyChosen.push(ranNum);
            // add to playlist
            playList.push(currentSong.youtubeId);
            // add duration from api to totalPlaylistDuration
            var durationArray = currentSong.duration.split(":");
            var hours = parseInt(durationArray[0]);
            var minutes = parseInt(durationArray[1]);
            var seconds = parseInt(durationArray[2]);

            // var duration = parseFloat(currentSong.duration);
            // totalPlaylistDuration += duration;

            console.log(
                `this song is ${hours} hours ${minutes} minutes and ${seconds} seconds long`
            );
        }
        i++;
    } while (i < allSongs[mood].length);

    // console.log(totalPlaylistDuration);
    console.log(playList);
    // when totalPlaylistDuration > walkTime from localStorage break loop.
});

// functions **************************
async function getSongsAPI(mood) {
    const allSongs = await $.ajax({
        url: `https://api.sheety.co/e91f710c44d8c38d5fbfefc51481c7ee/songs/${mood}`,
        method: "get",
    });

    return allSongs;
}

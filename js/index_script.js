$(document).ready(function () {
    var userInput = $("#user-input");

    userInput.on("submit", function (event) {
        event.preventDefault();
        var nameInput = $("#name-input").val();
        var moodInput = $("#mood-input").val();
        var timeInput = $("#time-input").val();
        console.log(`inputs: ${nameInput} ${moodInput} ${timeInput}`);
        // check to see if info on form exists
        if (nameInput === "" || moodInput === "" || timeInput === "") {
            alert("Please enter valid information");
        } else {
            // if true then store to localstorage
            var userInfo = {
                name: nameInput,
                mood: moodInput,
                time: timeInput,
            };

            localStorage.setItem("userInfo", JSON.stringify(userInfo));

            location.href = "dashboard.html";
        }
    });
});

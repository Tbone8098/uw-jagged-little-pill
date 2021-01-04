$(document).ready(function () {
    var userInput = $("#user-input");

    userInput.on("submit", function (event) {
        event.preventDefault();
        var nameInput = $("#name-input").val();
        var moodInput = $("#mood-input").val();
        var timeInput = $("#time-input").val();
        console.log(nameInput, moodInput, timeInput);
        // check to see if info on form exists
        if (nameInput === "" || moodInput === "" || timeInput === "") {
            // else populate and display error message
            alert("Please enter valid information");
            // if true then store to localstorage
        } else {
            var userInfo = {
                name: nameInput,
                mood: moodInput,
                time: timeInput,
            };

            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            // and go to dashboard
            location.href = "dashboard.html";
        }
    });

});


$(document).ready(function () {
    var submitBtn = document.querySelector("#submitBtn");

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        // check to see if info on form exists
        console.log("click", click);
        // if true then store to localstorage
        // and go to dashboard
        // location.href = "dashboard.html";

        // else populate and display error message
    });
});

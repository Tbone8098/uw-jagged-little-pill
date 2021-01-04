$(document).ready(function () {
    var userInput = $("#user-input")
    
    userInput.on("submit", function(event){
        event.preventDefault();
        var nameInput = $("#name-input").val()
        var moodInput = $("#mood-input").val()
        var timeInput = $("#time-input").val()
        console.log(nameInput, moodInput, timeInput);
// check to see if info on form exists
        if(nameInput === "" || moodInput === "" || timeInput === ""){
            alert("Please enter valid information")
            // if true then store to localstorage
        } else {
            var userInfo = {
                name: nameInput,
                mood: moodInput,
                time: timeInput
            }

            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            // and go to dashboard
            location.href = "dashboard.html";
        }
        
    })
        // else populate and display error message
   
        var unsplashApi =`http://unsplash.com/?client_id=gSpFkJi69t9bWwKIFq80kb4KWfaf4xLwVPON1yTJD4c&query=happy&orientation=landscape&featured`
        
        $.ajax({
            url: unsplashApi,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            
          });
});
    


//get random photo
// GET /photos/random
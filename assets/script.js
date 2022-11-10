$(document).ready(function () { //constantly checks page
    $(".saveBtn").on("click", function() { //enters this function upon clicking the save button
        saveupDate.style.display = ""; //makes the saveupDate html tag appear on the web page

        if ($(this).parent().attr("id"), $(this).siblings(".description").val() != ""){ //checks to see if the time block is not empty
            if ($(this).parent().attr("id"), $(this).siblings(".description").val() == localStorage.getItem($(this).parent().attr("id"))) { //checks to see if the time block entry is the same as the stored localstorage entry
                var word = "localstorage"; //stores a string
                saveupDate.style.backgroundColor = "transparent"; //changes saveupDate background of the style to transparent
                saveupDate.style.color = "black"; //changes saveupDate text color to black
                $("#saveupDate").html("Nothing was changed in " + word + " 😐"); //lets the user know that nothing was changed to localstorage
                var element = document.getElementById("saveupDate"); //takes everything currently in saveupDate and puts it into a variable
                var originalHtml = element.innerHTML; //stores the entire innerhtml element into a variable
                var newHtml = originalHtml.replace(word, word.fontcolor("red")); //finds the variable word string inside the innerhtml element and then changes that string font to red
                element.innerHTML = newHtml; //puts the changed sentence back into the innerhtml through its variable
            }

            else if (localStorage.getItem($(this).parent().attr("id")) == null) { //checks to see if the localstorage has no value currently for that time block
                localStorage.setItem($(this).parent().attr("id"), $(this).siblings(".description").val()); //adds time block entry to localstorage
                var word = "localstorage"; //stores a string
                saveupDate.style.backgroundColor = "transparent"; //changes saveupDate background of the style to transparent
                saveupDate.style.color = "black"; //changes saveupDate text color to black
                $("#saveupDate").html("Appointment Added to " + word + " ✔️"); //lets the user know that time block entry was added to localstorage
                var element = document.getElementById("saveupDate"); //takes everything currently in saveupDate and puts it into a variable
                var originalHtml = element.innerHTML; //stores the entire innerhtml element into a variable
                var newHtml = originalHtml.replace(word, word.fontcolor("red")); //finds the variable word string inside the innerhtml element and then changes that string font to red
                element.innerHTML = newHtml; //puts the changed sentence back into the innerhtml through its variable
            }

            else { //enters this if localstorage has a value already for that time block
                localStorage.setItem($(this).parent().attr("id"), $(this).siblings(".description").val()); //changes old localstorage value for time block entry to new entry
                var word = "localstorage"; //stores a string
                saveupDate.style.backgroundColor = "transparent"; //changes saveupDate background of the style to transparent
                saveupDate.style.color = "black"; //changes saveupDate text color to black
                $("#saveupDate").html("Appointment Updated in " + word + " 🙂"); //lets the user know that the localstorage was changed to new entry from the time block
                var element = document.getElementById("saveupDate"); //takes everything currently in saveupDate and puts it into a variable
                var originalHtml = element.innerHTML; //stores the entire innerhtml element into a variable
                var newHtml = originalHtml.replace(word, word.fontcolor("red")); //finds the variable word string inside the innerhtml element and then changes that string font to red
                element.innerHTML = newHtml; //puts the changed sentence back into the innerhtml through its variable
            }
        }

        else {  //if the time block is empty then the following happens
            var word = "localstorage"; //stores a string
            saveupDate.style.backgroundColor = "transparent"; //changes saveupDate background of the style to transparent
            saveupDate.style.color = "black"; //changes saveupDate text color to black
            $("#saveupDate").html("Nothing was added to " + word + " ❌"); //lets the user know that nothing was added to localstorage
            var element = document.getElementById("saveupDate"); //takes everything currently in saveupDate and puts it into a variable
            var originalHtml = element.innerHTML; //stores the entire innerhtml element into a variable
            var newHtml = originalHtml.replace(word, word.fontcolor("red")); //finds the variable word string inside the innerhtml element and then changes that string font to red
            element.innerHTML = newHtml; //puts the changed sentence back into the innerhtml through its variable
        }
        
        setTimeout(function() { //calls a pause function
            saveupDate.style.display = "none"; //hides the saveupDate html tag on the web page
        }, 3000); //waits 3 seconds before executing the pause functionality
    })

    function timePeriod () { // when entered changes the time block background color according to where that time block lies within constraints
        $(".time-block").each(function () { //goes into each time block to check against what time it is and how to fromat it
            if (parseInt($(this).attr("id").split("time")[1]) < moment().hour()) { //checks to see if the current time block time is less than the current time (hour)
                $(this).removeClass("future"); //removes future css style
                $(this).removeClass("present"); //removes present css style
                $(this).addClass("past"); //adds past css style
            }

            else if (parseInt($(this).attr("id").split("time")[1]) === moment().hour()) { //checks to see if the current time block time is equal to the current time (hour)
                $(this).removeClass("past"); //removes past css style
                $(this).removeClass("future"); //removes future css style
                $(this).addClass("present"); //adds present css style
            }

            else { //if the current time block time is more than the current time (hour)
                $(this).removeClass("present"); //removes present css style
                $(this).removeClass("past"); //removes past css style
                $(this).addClass("future"); //adds future css style
            }
        })
    }

    timePeriod(); //calls timePeriod function to check what time it is currently (hour)

    $("#currentDay").html(moment().format("MMMM Do YYYY, h:mm a")); //displays current date and time
    $("#time9 .description").html(localStorage.getItem("time9")); //displays stored localstorage value on time9 html tag
    $("#time10 .description").html(localStorage.getItem("time10")); //displays stored localstorage value on time10 html tag
    $("#time11 .description").html(localStorage.getItem("time11")); //displays stored localstorage value on time11 html tag
    $("#time12 .description").html(localStorage.getItem("time12")); //displays stored localstorage value on time12 html tag
    $("#time13 .description").html(localStorage.getItem("time13")); //displays stored localstorage value on time13 html tag
    $("#time14 .description").html(localStorage.getItem("time14")); //displays stored localstorage value on time14 html tag
    $("#time15 .description").html(localStorage.getItem("time15")); //displays stored localstorage value on time15 html tag
    $("#time16 .description").html(localStorage.getItem("time16")); //displays stored localstorage value on time16 html tag
    $("#time17 .description").html(localStorage.getItem("time17")); //displays stored localstorage value on time171 html tag
});
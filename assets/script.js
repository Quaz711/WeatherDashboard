const api = "53d64ae4e52e8e58b122557b84ba1d1e"; //Weather api key
var storedCities = []; //Array that stores searched cities
var searchBox = document.querySelector("#search-box"); //Link to html id put into variable form to be used later on for easy access
var cityName = document.querySelector("#city-name"); //Link to html id put into variable form to be used later on for easy access
var searchedCities = document.querySelector("#searched-cities"); //Link to html id put into variable form to be used later on for easy access
var currentWeather = document.querySelector("#current-weather"); //Link to html id put into variable form to be used later on for easy access
var displayCity = document.querySelector("#display-city"); //Link to html id put into variable form to be used later on for easy access
var displayDate = document.querySelector("#display-date"); //Link to html id put into variable form to be used later on for easy access
var displayIcon = document.querySelector("#display-icon"); //Link to html id put into variable form to be used later on for easy access
var weatherContainer = document.querySelector("#weather-container"); //Link to html id put into variable form to be used later on for easy access
var tempResults = document.querySelector("#temp-results"); //Link to html id put into variable form to be used later on for easy access
var windResults = document.querySelector("#wind-results"); //Link to html id put into variable form to be used later on for easy access
var humidityResults = document.querySelector("#humidity-results"); //Link to html id put into variable form to be used later on for easy access

var submitButton = function(event) { //Function that is called when the submit button is clicked
    event.preventDefault(); //Prevents the default from happening in case user has not input a city
    var city = cityName.value.trim(); //used in case user has entered spaces before or after the city to refrain from errors from occurring
    if (city) { //Happens if a user entered a valid entry
        getWeather(city); //Calls the getWeahter function to get the weather for the entered city
        get5DayForecast(city); //Calls the get5DayForecast function to get the weather forecast for five days for the entered city
        storedCities.push(city); //Adds the searched city into the storedCities array for quick reference
        localStorage.setItem("City", JSON.stringify(storedCities));
        cityName.value = ""; //Clears the entry the user entered into the search field
    }

    else { //Happens if a user entered an invalid entry
        alert("Enter a valid city"); //Lets the user know the entry was invalid
    }
};

var previouslySearched = function(event) { //Function that is called when a user selects a city from previous searches under the previous searched list
    var selection = event.currentTarget.textContent; //Puts the selected searched city into a variable for easier functionality for proceeding functions
    getWeather(selection); //Calls the getWeahter function to get the weather for the selected city
    get5DayForecast(selection); //Calls the get5DayForecast function to get the weather forecast for five days for the selected city
};

var getWeather = function(city) { //Function that is called when user has entered or selected a city and we need to get the weather for that city
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api; //A variable that stores the data from the openweather api for the city's weather
    fetch(url).then(function(response) { //Grabs the data from the openweather api and checks to see if there is an error and stores the response into a variable
        if (response.ok) { //Happens if the response from the api call is accurate and provided usuable data
            response.json().then(function(data) { //Sends the usuable data to a proceeding function
                displayWeather(city, data); //Calls the displayWeather function and sends it the usuable data we received from the openweather api call
            });
        }

        else { //Happens if the response from the api call is inaccurate and provided unusuable data
            alert("A " + response.statusText + " error has occured"); //Lets the user know that an error has occured and that the error is
        }
    }).catch(function(error) { //If an error is thrown then this catches that error
        alert("Unable to get the weather for " + city + " because of " + error + " error"); //Lets the user know that an error has occured and that the error is
    });
};

var displayWeather = function(city, data) { //Function that is called when user has entered or selected a city and we need to display the weather for that city
    removeClass(); //Calls the removeClass function that removes the background and allows a new background to be used
    let cityCaps = city.split(" "); //Takes the city passed in and splits it up by spaces and puts it into an array
    for (let i=0; i < cityCaps.length; i++) { //For loop runs for the length of the city's array
        cityCaps[i] = cityCaps[i][0].toUpperCase() + cityCaps[i].substr(1); //Capitalizes the first letter in each word entered
    }
    
    city = cityCaps.join(" "); //Joins the city's array back togther and puts it back into a string
    weatherContainer.textContent = ""; //Clears previous searched city's displayed information
    displayCity.textContent = city; //Displays current city's name
    displayDate.textContent = moment().format("(L)"); //Displays current city's date
    displayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");  //Displays current city's weather icon from openweather's api
    tempResults.textContent = Math.round(data.main.temp) + " °F"; //Displays current city's temperature
    windResults.textContent = data.wind.speed + " MPH"; //Displays current city's wind speed
    humidityResults.textContent = data.main.humidity + "%"; //Displays current city's humidity
    var listHTML = document.createElement("li"); //Creates a HTML list in the index.html and stores it into a variable to be utilized for displaying the entered/selected city
    listHTML.className = "list-group-item"; //Gives the created HTML list a class for styling purposes
    listHTML.textContent = city; //Displays the entered/selected city so it can be easily searched again by being clicked
    listHTML.addEventListener("click", previouslySearched); //Creates an element to the city that was entered into the previously searched list so it can be clicked
    searchedCities.appendChild(listHTML); //Adds the city to the child so its part of the html
    var time = moment().tz(city).format("HH"); //Gets the time for the timezone in military hour for background

    if (!time) { //If timezone won't pull data then just grab local time
        time = moment().format("HH"); //Assign the local time to a variable to be used later on
    }
    
    var raining = false; //A boolean to see the weather condition
    var cloudy = false; //A boolean to see the weather condition
    var snowing = false; //A boolean to see the weather condition
    var clear = false; //A boolean to see the weather condition
    var thunderstorming = false; //A boolean to see the weather condition
    var drizzling = false; //A boolean to see the weather condition

    if (data.weather[0].main == "Clouds") { //Checks the weather condition in the city that was searched
        console.log("Entered Clouds"); //Console log of condition met
        raining = false; //Changes the boolean of the weather condition according to what the api returned
        cloudy = true; //Changes the boolean of the weather condition according to what the api returned
        snowing = false; //Changes the boolean of the weather condition according to what the api returned
        clear = false; //Changes the boolean of the weather condition according to what the api returned
        thunderstorming = false; //Changes the boolean of the weather condition according to what the api returned
        drizzling = false; //Changes the boolean of the weather condition according to what the api returned
    }

    else if (data.weather[0].main == "Rain") { //Checks the weather condition in the city that was searched
        console.log("Entered Rain"); //Console log of condition met
        raining = true; //Changes the boolean of the weather condition according to what the api returned
        cloudy = false; //Changes the boolean of the weather condition according to what the api returned
        snowing = false; //Changes the boolean of the weather condition according to what the api returned
        clear = false; //Changes the boolean of the weather condition according to what the api returned
        thunderstorming = false; //Changes the boolean of the weather condition according to what the api returned
        drizzling = false; //Changes the boolean of the weather condition according to what the api returned
    }

    else if (data.weather[0].main == "Snow") { //Checks the weather condition in the city that was searched
        console.log("Entered Snow"); //Console log of condition met
        raining = false; //Changes the boolean of the weather condition according to what the api returned
        cloudy = false; //Changes the boolean of the weather condition according to what the api returned
        snowing = true; //Changes the boolean of the weather condition according to what the api returned
        clear = false; //Changes the boolean of the weather condition according to what the api returned
        thunderstorming = false; //Changes the boolean of the weather condition according to what the api returned
        drizzling = false; //Changes the boolean of the weather condition according to what the api returned
    }

    else if (data.weather[0].main == "Clear") { //Checks the weather condition in the city that was searched
        console.log("Entered Clear"); //Console log of condition met
        raining = false; //Changes the boolean of the weather condition according to what the api returned
        cloudy = false; //Changes the boolean of the weather condition according to what the api returned
        snowing = false; //Changes the boolean of the weather condition according to what the api returned
        clear = true; //Changes the boolean of the weather condition according to what the api returned
        thunderstorming = false; //Changes the boolean of the weather condition according to what the api returned
        drizzling = false; //Changes the boolean of the weather condition according to what the api returned
    }

    else if (data.weather[0].main == "Drizzle") { //Checks the weather condition in the city that was searched
        console.log("Entered Drizzle"); //Console log of condition met
        raining = false; //Changes the boolean of the weather condition according to what the api returned
        cloudy = false; //Changes the boolean of the weather condition according to what the api returned
        snowing = false; //Changes the boolean of the weather condition according to what the api returned
        clear = false; //Changes the boolean of the weather condition according to what the api returned
        thunderstorming = false; //Changes the boolean of the weather condition according to what the api returned
        drizzling = true; //Changes the boolean of the weather condition according to what the api returned
    }

    else if (data.weather[0].main == "Thunderstorm") { //Checks the weather condition in the city that was searched
        console.log("Entered Thunderstorm"); //Console log of condition met
        raining = false; //Changes the boolean of the weather condition according to what the api returned
        cloudy = false; //Changes the boolean of the weather condition according to what the api returned
        snowing = false; //Changes the boolean of the weather condition according to what the api returned
        clear = false; //Changes the boolean of the weather condition according to what the api returned
        thunderstorming = true; //Changes the boolean of the weather condition according to what the api returned
        drizzling = false; //Changes the boolean of the weather condition according to what the api returned
    }

    else { //Enters if none of the weather condition in the city that was searched matched
        console.log("Entered First Else"); //Console log of condition met
        raining = false; //Changes the boolean of the weather condition according to what the api returned
        cloudy = false; //Changes the boolean of the weather condition according to what the api returned
        snowing = false; //Changes the boolean of the weather condition according to what the api returned
        clear = true; //Changes the boolean of the weather condition according to what the api returned
        thunderstorming = false; //Changes the boolean of the weather condition according to what the api returned
        drizzling = false; //Changes the boolean of the weather condition according to what the api returned
    }

    if (clear) {
        console.log("Entered Clear Is True"); //Console log of condition met
        if (time >= 6 && time < 8) { //Checks to see if condtions are met for the weather condition
            console.log("Entered Dawn"); //Console log of condition met
            document.body.classList.add("dawn"); //Calls the css class given to change the background according to the weather condition
        }
    
        if (time >= 8 && time < 18) { //Checks to see if condtions are met for the weather condition
            console.log("Entered Sunny"); //Console log of condition met
            document.body.classList.add("sunny"); //Calls the css class given to change the background according to the weather condition
        }
    
        if (time >= 18 && time < 20) { //Checks to see if condtions are met for the weather condition
            console.log("Entered Dusk"); //Console log of condition met
            document.body.classList.add("dusk"); //Calls the css class given to change the background according to the weather condition
        }
    
        if (time >= 20 || time < 6) { //Checks to see if condtions are met for the weather condition
            console.log("Entered Night"); //Console log of condition met
            document.body.classList.add("night"); //Calls the css class given to change the background according to the weather condition
        }
    }

    else { //Enters if none of the weather condition in the city that was searched matched
        console.log("Entered Second Else"); //Console log of condition met
        if (raining) { //Checks to see if condtions are true for the weather condition
            console.log("Entered Is Raining"); //Console log of condition met
            document.body.classList.add("rain"); //Calls the css class given to change the background according to the weather condition
        }
    
        else if (snowing) { //Checks to see if condtions are true for the weather condition
            console.log("Entered Is Snowing"); //Console log of condition met
            document.body.classList.add("snow"); //Calls the css class given to change the background according to the weather condition
        }
    
        else if (cloudy) { //Checks to see if condtions are true for the weather condition
            console.log("Entered Is Cloudy"); //Console log of condition met
            document.body.classList.add("cloudy"); //Calls the css class given to change the background according to the weather condition
        }

        else if (drizzling) { //Checks to see if condtions are true for the weather condition
            console.log("Entered Is Drizzling"); //Console log of condition met
            document.body.classList.add("drizzle"); //Calls the css class given to change the background according to the weather condition
        }

        else if (thunderstorming) { //Checks to see if condtions are true for the weather condition
            console.log("Entered Is Thunderstorming"); //Console log of condition met
            document.body.classList.add("thunderstorm"); //Calls the css class given to change the background according to the weather condition
        }

        else { //Enters if none of the weather condition in the city that was searched matched
            console.log("Entered Earth"); //Console log of condition met
            document.body.classList.add("earth"); //Calls the css class given to change the background according to the weather condition
        }
    }
};

var get5DayForecast = function(city) { //Function that is called when user has entered or selected a city and we need to get the five day forecast for that city
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + api; //A variable that stores the data from the openweather api for the city's five day forecast
    fetch(url).then(function(response) { //Grabs the data from the openweather api and checks to see if there is an error and stores the response into a variable
        if (response.ok) { //Happens if the response from the api call is accurate and provided usuable data
            response.json().then(function(data) { //Sends the usuable data to a proceeding function
                display5DayForecast(data.list); //Calls the display5DayForecast function and sends it the usuable data we received from the openweather api call
            });
        }

        else { //Happens if the response from the api call is inaccurate and provided unusuable data
            alert("A " + response.statusText + " error has occured"); //Lets the user know that an error has occured and that the error is
        }
    }).catch(function(error) { //If an error is thrown then this catches that error
        alert("Unable to get the weather for " + city + " because of " + error + " error"); //Lets the user know that an error has occured and that the error is
    });
};

var display5DayForecast = function(data) { //Function that is called when user has entered or selected a city and we need to display the five day forecast for that city
    for (let i=1; i<=5; i++) { //For loop runs to display the forecast on five cards
        var cardDate = document.querySelector("#date" + i); //Link to html id put into variable form to be used later on for easy access
        cardDate.textContent = moment().add(i, "days").format("L"); //Displays current forecast's date
        var cardIcon = document.querySelector("#icon" + i); //Link to html id put into variable form to be used later on for easy access
        cardIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data[i].weather[0].icon + "@2x.png"); //Displays current forecast's weather icon from openweather's api
        var cardTemp = document.querySelector("#temp" + i); //Link to html id put into variable form to be used later on for easy access
        cardTemp.textContent = Math.round(data[i-1].main.temp) + " °F"; //Displays current forecast's temperature
        var cardWind = document.querySelector("#wind" + i); //Link to html id put into variable form to be used later on for easy access
        cardWind.textContent = data[i-1].wind.speed + " MPH"; //Displays current forecast's wind speed
        var cardHumidity = document.querySelector("#humidity" + i); //Link to html id put into variable form to be used later on for easy access
        cardHumidity.textContent = data[i-1].main.humidity + "%"; //Displays current forecast's humidity
    }
};

var removeClass = function() { //Function that is called when the background needs to be removed so a new background can be used
    document.body.classList.remove("dawn", "sunny", "dusk", "night", "rain", "snow", "cloudy", "drizzle", "thunderstorm", "earth"); //Removes background so new background can be applied
};

searchBox.addEventListener("submit", submitButton); //Listens to see if a user has clicked the submit button
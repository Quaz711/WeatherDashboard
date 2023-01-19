const api = "53d64ae4e52e8e58b122557b84ba1d1e";
var searchBox = document.querySelector("#search-box");
var cityName = document.querySelector("#city-name");
var searchedCities = document.querySelector("#searched-cities");
var currentWeather = document.querySelector("#current-weather");
var displayCity = document.querySelector("#display-city");
var displayDate = document.querySelector("#display-date");
var displayIcon = document.querySelector("#d#isplay-icon");
var weatherContainer = document.querySelector("#weather-container");
var tempResults = document.querySelector("#temp-results");
var windResults = document.querySelector("#wind-results");
var humidityResults = document.querySelector("#humidity-results");
var storedCities =[];

var submitButton = function(event) {
    event.preventDefault();
    var city = cityName.value.trim();
    if (city) {
        getWeather(city);
        get5DayForecast(city);
        storedCities.push(city);
        localStorage.setItem("City", JSON.stringify(storedCities));
        cityName.value = "";
    }

    else {
        alert("Enter a valid city");
    }
};

var previouslySearched = function(event) {
    var selection = event.currentTarget.textContent;
    getWeather(selection);
    get5DayForecast(selection);
};

var getWeather = function(city) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api;
    fetch(url).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(city, data);
            });
        }

        else {
            alert("A " + response.statusText + " error has occured");
        }
    }).catch(function(error) {
        alert("Unable to get the weather for " + city + " because of " + error + " error");
    });
};

var displayWeather = function(city, data) {
    let cityCaps = city.split(" ");
    for (let i=0; i < cityCaps.length; i++) {
        cityCaps[i] = cityCaps[i][0].toUpperCase() + cityCaps[i].substr(1);
    }
    
    city = cityCaps.join(" ");
    weatherContainer.textContent = "";
    displayCity.textContent = city;
};

searchBox.addEventListener("submit", submitButton);
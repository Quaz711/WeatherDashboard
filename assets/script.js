const api = "53d64ae4e52e8e58b122557b84ba1d1e";
var storedCities =[];
var searchBox = document.querySelector("#search-box");
var cityName = document.querySelector("#city-name");
var searchedCities = document.querySelector("#searched-cities");
var currentWeather = document.querySelector("#current-weather");
var displayCity = document.querySelector("#display-city");
var displayDate = document.querySelector("#display-date");
var displayIcon = document.querySelector("#display-icon");
var weatherContainer = document.querySelector("#weather-container");
var tempResults = document.querySelector("#temp-results");
var windResults = document.querySelector("#wind-results");
var humidityResults = document.querySelector("#humidity-results");

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
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + api;
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
    displayDate.textContent = moment().format("(L)");
    displayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
    tempResults.textContent = Math.round(data.main.temp) + " °F";;
    windResults.textContent = data.wind.speed + " MPH";
    humidityResults.textContent = data.main.humidity + "%";
    var listHTML = document.createElement("li");
    listHTML.className = "list-group-item";
    listHTML.textContent = city;
    listHTML.addEventListener("click", previouslySearched);
    searchedCities.appendChild(listHTML);
};

var get5DayForecast = function(city) {
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + api;
    fetch(url).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                display5DayForecast(data.list);
            });
        }

        else {
            alert("A " + response.statusText + " error has occured");
        }
    }).catch(function(error) {
        alert("Unable to get the weather for " + city + " because of " + error + " error");
    });
};

var display5DayForecast = function(data) {
    for (let i=1; i<=5; i++) {
        var cardDate = document.querySelector("#date" + i);
        cardDate.textContent = moment().add(i, "days").format("L");
        var cardIcon = document.querySelector("#icon" + i);
        cardIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data[i].weather[0].icon + "@2x.png");
        var cardTemp = document.querySelector("#temp" + i);
        cardTemp.textContent = data[i-1].main.temp + " °F";
        var cardWind = document.querySelector("#wind" + i);
        cardWind.textContent = data[i-1].wind.speed + " MPH";
        var cardHumidity = document.querySelector("#humidity" + i);
        cardHumidity.textContent = data[i-1].main.humidity + "%";
    }
};

searchBox.addEventListener("submit", submitButton);
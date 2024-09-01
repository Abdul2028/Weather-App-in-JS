const apiKey = "fbdd1eed570ddf6bf436e5627254e861";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey + "&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on the weather condition
        if (data.weather && data.weather[0]) {
            const weatherCondition = data.weather[0].main;

            switch (weatherCondition) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "images/clear.png"; // invaid icon      
            }
        } else {
            weatherIcon.src = "images/clear.png"; // invaid icon if weather data is not available
        }
    } catch (error) {
        console.error(error);
        document.querySelector(".city").innerHTML = "Invalid City Name";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        weatherIcon.src = "images/invalid.png"; // invaid icon in case of error
    }

    document.querySelector(".weather").style.display = "block"
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
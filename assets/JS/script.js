document.addEventListener('DOMContentLoaded', function () {
    // Fetch the last searched city from local storage and update weather
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        document.getElementById('city').value = lastSearch; // Display last searched city in input field
        getCoordinates(lastSearch);
    }

    document.getElementById('submit').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally
        const cityName = document.getElementById('city').value.trim(); // Get the city name from the input field, trimming any whitespace
        if (cityName) {
            localStorage.setItem('lastSearch', cityName); // Store the search in local storage
            getCoordinates(cityName);
            displayRecommendedCities(cityName); // Display recommended cities
        }
    });
});

function displayRecommendedCities(searchedCity) {
    const recommendedCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio'];
    const list = document.getElementById('recommendedCities').querySelector('ul');
    list.innerHTML = ''; // Clear previous recommendations
    recommendedCities.forEach(city => {
        if (city.toLowerCase() !== searchedCity.toLowerCase()) {
            const li = document.createElement('li');
            li.textContent = city;
            li.classList.add('p-2', 'hover:bg-gray-100', 'cursor-pointer');
            li.addEventListener('click', () => {
                localStorage.setItem('lastSearch', city); // Store the click in local storage
                getCoordinates(city);
            });
            list.appendChild(li);
        }
    });
}

// Ensure getCoordinates and displayWeather functions are correctly implemented as per your initial setup.


function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = ''; // Clear previous results
    weatherResult.classList.remove('hidden'); // Make sure the container is visible

    const currentWeather = document.createElement('div');
    currentWeather.className = 'bg-white p-6 rounded-lg shadow-lg bg-blue-100';

    const cityName = document.createElement('h2');
    cityName.className = 'text-xl font-bold';
    cityName.textContent = `Weather for ${data.city.name}, ${data.city.country}`;
    currentWeather.appendChild(cityName);

    const temp = document.createElement('p');
    temp.className = 'text-gray-700';
    temp.textContent = `Temp: ${data.list[0].main.temp.toFixed(2)}°C`;
    currentWeather.appendChild(temp);

    // Display the weather icon for current weather
    const icon = document.createElement('img');
    icon.src = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    icon.alt = data.list[0].weather[0].description;
    currentWeather.appendChild(icon);

    weatherResult.appendChild(currentWeather);

    const forecast = document.createElement('div');
    forecast.className = 'mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4';

    for (let i = 0; i < data.list.length; i += 8) {
        const day = document.createElement('div');
        day.className = 'bg-white p-4 rounded-lg shadow-lg bg-blue-100';

        const date = new Date(data.list[i].dt * 1000);
        const dateStr = document.createElement('h4');
        dateStr.className = 'font-bold';
        dateStr.textContent = date.toLocaleDateString();
        day.appendChild(dateStr);

        const dayTemp = document.createElement('p');
        dayTemp.className = 'text-gray-700';
        dayTemp.textContent = `Temp: ${data.list[i].main.temp.toFixed(2)}°C`;
        day.appendChild(dayTemp);

        // Display the weather icon for each day in the forecast
        const dayIcon = document.createElement('img');
        dayIcon.src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        dayIcon.alt = data.list[i].weather[0].description;
        day.appendChild(dayIcon);

        forecast.appendChild(day);
    }

    weatherResult.appendChild(forecast);
}

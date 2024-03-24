document.addEventListener('DOMContentLoaded', function () {
 // Listen for the submit button click event
 document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from submitting traditionally
    const cityName = document.getElementById('city').value; // Get the city name from the input field
    if (cityName) {
        getCoordinates(cityName); // If a city name is provided, fetch its coordinates
    }
});
});

// Function to fetch coordinates for a city name
function getCoordinates(cityName) {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=cdbf7e3553654a94648c9a96256a94ce`;
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const { lat, lon } = data[0]; // Extract latitude and longitude from the response
                getWeather(lat, lon); // Fetch the weather data using the coordinates
            } else {
                displayError('City not found. Please try again.'); // Handle case where city is not found
            }
        })
        .catch(error => {
            displayError('An error occurred while fetching coordinates.'); // Handle network or other fetch errors
        });
}

// Function to fetch weather data using latitude and longitude
function getWeather(lat, lon) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=cdbf7e3553654a94648c9a96256a94ce&units=metric`;
    
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data); // Display the fetched weather data on the page
        })
        .catch(error => {
            displayError('An error occurred while fetching weather data.'); // Handle network or other fetch errors
        });
}

// Function to display weather data including the 5-day forecast
function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = ''; // Clear previous results
    weatherResult.classList.remove('hidden'); // Make sure the container is visible

    // Display city name and current weather
    const currentWeather = document.createElement('div');
    currentWeather.className = 'bg-white p-6 rounded-lg shadow-lg'

    const cityName = document.createElement('h2');
    cityName.className = 'text-xl font-bold';
    cityName.textContent = `Weather for ${data.city.name}, ${data.city.country}`;
    currentWeather.appendChild(cityName);

    const temp = document.createElement('p');
    temp.className = 'text-gray-700';
    temp.textContent = `Temp: ${data.list[0].main.temp.toFixed(2)}°C`;
    currentWeather.appendChild(temp);


    weatherResult.appendChild(forecast);
}


// Function to display errors
function displayError(message) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `<p class="text-red-500">${message}</p>`; // Display the error message in red
    weatherResult.classList.remove('hidden'); // Ensure the container is visible to show the error
}


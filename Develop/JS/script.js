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
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=cdbf7e3553654a94648c9a96256a94ce
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



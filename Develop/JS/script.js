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
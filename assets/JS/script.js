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

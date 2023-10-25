$(document).ready(function () {
	const currentDayElement = $("#currentDay");
	const currentTime = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"); //format of time
	const location = document.getElementById("locationInput").value;

	//weather//
	//day and time//
	//display current date and time
	currentDayElement.text(currentTime);
	//update time function
	function updateCurrentTime() {
		const currentTime = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A");
		currentDayElement.text(currentTime);
	}
	// Initial call to set the current date and time
	updateCurrentTime();
	// update the current date and time every second
	setInterval(updateCurrentTime, 1000);

	function getWeather() {
		const weatherApiKey = "661e7eff94c386fb32110da5f695f39b";
		const location = document.getElementById("locationInput").value;
		const limit = 1;
		const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${limit}&appid=${weatherApiKey}`;

		// Make an API request to get location coordinates
        fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the API returned any locations
            if (data.length > 0) {
                const { lat, lon } = data[0]; // Extract coordinates

                // Use the coordinates to fetch weather data
                const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;

                // Make an API request to get weather data
                fetch(weatherUrl)
                    .then(response => response.json())
                    .then(data => {
                        // Extract and display weather data by the hour
                        const weatherData = data.list;
                        // Update the "weatherData" div with the data
                        document.getElementById('weatherData').innerHTML = JSON.stringify(weatherData, null, 2);
                    })
                    .catch(error => {
                        console.warn('Error fetching weather data:', error);
                    });
            } else {
                console.warn('Location not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
			});
	}
	// Add event listener to the button
	document
		.getElementById('getSearch')
		.addEventListener('click', getWeather);
});

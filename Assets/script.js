$(document).ready(function () {
	const currentDayElement = $("#currentDay");
	const currentTime = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"); //format of time
	const location = document.getElementById("locationInput").value;
	//modal 
	var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

	//weather
	//day and time
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
		const iconCode = "10d"; //temporary iconCode
		const baseIconUrl = "https://openweathermap.org/img/wn/"; //baseURL for icon
		const iconUrl = `${baseIconUrl}${iconCode}@2x.png`; //structure to call icons
		// Make an API request to get location coordinates
		fetch(geoUrl)
			.then((response) => response.json())
			.then((data) => {
				// Check if the API returned any locations
				if (data.length > 0) {
					const { lat, lon } = data[0]; // Extract coordinates
					// Use the coordinates to fetch weather data
					const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;
					// Make an API request to get weather data
					fetch(weatherUrl)
						.then((response) => response.json())
						.then((data) => {
							// Extract and display weather data by the hour
							//structure to call icons
							const weatherData = data.list;
							console.log(weatherData);
							console.log(weatherData[0].main.temp);
							//console.log(weatherData.dt_txt)
							// Update the "weatherData" div with the data
							const weatherDiv = document.getElementById("weatherData");
							weatherDiv.innerHTML = ""
							weatherData.forEach(function ({ dt_txt, main, weather, i }) {
								const { temp } = main;
								const { icon } = weather[0];
								const weatherDayDiv = document.createElement("div");
								const tempDay = document.createElement("p");
								const weatherIcon = document.createElement("img");
								const dayTime = document.createElement("p")
								weatherIcon.src = `${baseIconUrl}${icon}@2x.png`;
								tempDay.textContent = temp;
								dayTime.textContent = dt_txt;
								console.log(dt_txt)
								weatherDayDiv.appendChild(dayTime)
								weatherDayDiv.appendChild(tempDay);
								weatherDayDiv.appendChild(weatherIcon);
								weatherDiv.appendChild(weatherDayDiv);
							});
						})
						//error protection
						.catch((error) => {
							console.warn("Error fetching weather data:", error);
						});
				} else {
					//error protection
					console.warn("Location not found.");
				}
			})
			//error protection
			.catch((error) => {
				console.error("Error fetching location data:", error);
			});
	}
 // Initialize Materialize modals


	// Add event listener to the button
	document.getElementById("getSearch").addEventListener("click", getWeather);
	
	


	var map = L.map("map").setView([51.505, -0.09], 13);
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);
	
});

$(document).ready(function () {
	const currentDayElement = $("#currentDay");
	const currentTime = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A"); //format of time
	var parksList = document.querySelector(".parksList")
	const city = document.getElementById("cityInput").value;
  	const state = document.getElementById("stateInput").value;
  	const searchInput = `${city}, ${state} USA`;
	// HB Search Results list
	var npsParksList

	var map;
	//modal
	var elems = document.querySelectorAll(".modal");
	var instances = M.Modal.init(elems);
	

	
	// HB National Park Service Lookup
	function searchParks(){
		var npsApiKey = '47lrzwNIGkA2VkzPNKaMqFeLUeXppVFFyeVjFPfW'
		//var npiQuery = 'stateCode=' + location
		//updated to stateInput.value from updated input box -RG
		npiQuery = document.getElementById("stateInput").value;
		console.log(npiQuery)
		var npsUrl = `https://developer.nps.gov/api/v1/parks?${npiQuery}&api_key=${npsApiKey}`
		console.log(npsUrl)
		fetch(npsUrl)
			.then((response) => response.json())
			.then((data) => {
				npsParksList = data.data
				console.log(npsParksList)
				populateNpsSearchResults()
			})
	}

	function populateNpsSearchResults() {

		console.log(npsParksList.length)
		console.log(parksList)
		
		for (let i = 0; i < npsParksList.length; i++) {
			const element = npsParksList[i];
			console.log(npsParksList[i].name)
			parksList.appendChild(document.createElement('li')).textContent = npsParksList[i].name
		}
		
	}

	//weather
	//day and time
	//display current date and time
	currentDayElement.text(currentTime);
	//update time function
	function updateCurrentTime() {
		const currentTime = dayjs().format("ddd, MMM D, YYYY h:mm A");
		currentDayElement.text(currentTime);
	}
	// Initial call to set the current date and time
	updateCurrentTime();
	// update the current date and time every second
	setInterval(updateCurrentTime, 1000);



	
	// Function to fetch and display weather data
	function getWeather() {
		const weatherApiKey = "661e7eff94c386fb32110da5f695f39b";
		//location = document.getElementById("locationInput").value;
		var city = document.getElementById("cityInput").value;
		var state = document.getElementById("stateInput").value;
		var location = `${city}, ${state} USA`;
		const limit = 1;
		const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=${limit}&appid=${weatherApiKey}`;
		//const iconCode = "10d"; //temporary iconCode
		const baseIconUrl = "https://openweathermap.org/img/wn/"; //baseURL for icon
		//const iconUrl = `${baseIconUrl}${iconCode}@2x.png`; //structure to call icons
		// Make an API request to get location coordinates with geoURL in order to use City, State, Country
		fetch(geoUrl)
			.then((response) => response.json())
			.then((data) => {
				// Check if the API returned any locations
				if (data.length > 0) {
					const { lat, lon } = data[0]; // Extract coordinates
					// Use the coordinates to fetch weather data
					const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=imperial`;

					// Make an API request to get weather data
					//updateMap(lat, lon);

					fetch(weatherUrl)
						.then((response) => response.json())
						.then((data) => {
							// Extract and display weather data
							const weatherData = data.list;
							console.log(weatherData);

							//console.log(weatherData[0].main.temp);
							// Update the "weatherData" div with the data
							const itemsToShow = 9;
							const itemsToShow2 = 40;
							//const weatherDiv = document.getElementById("weatherData");
							const modal = document.getElementById("weatherModal");
							const weatherDataDiv = modal.querySelector("#weatherData");
							weatherDataDiv.innerHTML = "";

							weatherData.forEach(function ({ dt_txt, main, weather, wind }, index) {
								if (index % itemsToShow === 0) {
									const { temp } = main;
									const { icon } = weather[0];
									const { description } = weather[0];
									const { humidity } = main;
									const { speed } = wind;
									

									const weatherDayDiv = document.createElement("div");
									const dateTime = document.createElement("p");
									const tempDay = document.createElement("p");
									const weatherIcon = document.createElement("img");
									const weatherDesc = document.createElement("p")
									const humidDay = document.createElement("p");
									const windSpeed = document.createElement("p")
									

									weatherIcon.src = `${baseIconUrl}${icon}.png`;
									tempDay.textContent = `${temp}° F`;
									humidDay.textContent = `Humidity: ${humidity}%`;
									windSpeed.textContent = `Wind: ${speed} mph`;
									weatherDesc.textContent = `${description}`;
									
									// Convert the dt_txt string to a Date object and format it
									const date = new Date(dt_txt);
									const options = {
										weekday: "short",
										month: "short",
										day: "numeric",
										hour12: true,
									};
									const formattedDate = new Intl.DateTimeFormat(
										"en-US",
										options
									).format(date);

									dateTime.textContent = formattedDate;

									weatherDayDiv.appendChild(dateTime);
									weatherDayDiv.appendChild(weatherIcon);
									weatherDayDiv.appendChild(weatherDesc);
									weatherDayDiv.appendChild(tempDay);
									weatherDayDiv.appendChild(humidDay);
									weatherDayDiv.appendChild(windSpeed);
									weatherDataDiv.appendChild(weatherDayDiv); // Append to modal
								}
							});
							//display the search results with the same ID "weatherData on main page"
							const secondWeatherDataDiv =
								document.getElementById("weatherData");

							// Clear the second location's previous results before adding new ones
							secondWeatherDataDiv.innerHTML = "";

							// Append the elements to main page weatherData div
							weatherData.forEach(function ({ dt_txt, main, weather, wind, }, index) {
								if (index % itemsToShow2 === 0) {
									const { temp } = main;
									const { icon } = weather[0];
									const { description } = weather[0];
									const { humidity } = main;
									const { speed } = wind;
									
									//create elements
									const weatherDayDiv = document.createElement("div");
									const dateTime = document.createElement("p");
									const tempDay = document.createElement("p");
									const tempDayC = document.createElement("p");
									const humidDay = document.createElement("p");
									const windSpeed = document.createElement("p")
									const weatherIcon = document.createElement("img");
									const weatherDesc = document.createElement("p")

									//convert temp from F to C
									function fahrenheitToCelcius(fahrenheit){
										return (fahrenheit - 32) * (5/9);
									}
									//declare temp conversion variables
									const tempFahrenheit = temp;
									const tempCelcius = fahrenheitToCelcius(tempFahrenheit);

									//content from array to append
									weatherIcon.src = `${baseIconUrl}${icon}@2x.png`;
									tempDay.textContent = `${tempFahrenheit}° F /  ${tempCelcius.toFixed(2)}° C`;
									//tempDayC.textContent = `${tempCelcius.toFixed(2)}° C`;
									humidDay.textContent = `Humidity: ${humidity}%`;
									windSpeed.textContent = `Wind: ${speed} mph`;
									weatherDesc.textContent = `${description}`;

									//date parameters to display
									const date = new Date(dt_txt);
									const options = {
										weekday: "short",
										month: "short",
										day: "numeric",
										//hour: "2-digit",
										//minute: "2-digit",
										hour12: true,
									};

									const formattedDate = new Intl.DateTimeFormat(
										"en-US",
										options
									).format(date);
									//format date
									dateTime.textContent = formattedDate;

									//append elements in order of preference
									//weatherDayDiv.appendChild(dateTime);
									weatherDayDiv.appendChild(weatherIcon);
									weatherDayDiv.appendChild(weatherDesc);
									weatherDayDiv.appendChild(humidDay);
									weatherDayDiv.appendChild(windSpeed);
									weatherDayDiv.appendChild(tempDay);
									weatherDayDiv.appendChild(tempDayC);
									

									secondWeatherDataDiv.appendChild(weatherDayDiv); // Append to the second location's weatherData div
									updateMap(lat, lon);
								}
							});
						})
						  .catch((error) => {
              // Display an error modal for weather data fetch errors
              const errorModal = document.getElementById("errorModal");
              const instance = M.Modal.init(errorModal, { dismissible: false });
              instance.open();
              console.warn("Error fetching weather data:", error);
            });
        } else {
          // Display an error modal when the location is not found
          const errorModal = document.getElementById("errorModal");
          const instance = M.Modal.init(errorModal, { dismissible: false });
          instance.open();
        }
      })
      .catch((error) => {
        // Display an error modal for other errors
        const errorModal = document.getElementById("errorModal");
        const instance = M.Modal.init(errorModal, { dismissible: false });
        instance.open();
        console.error("Error fetching location data:", error);
      });
  }

	// Function to update the Leaflet/OpenStreetMaps map with weather data
	function updateMap(lat, lon) {
		if (!map) {
			// Create the map and layers from OpenWeather
			// base layer/map
			map = L.map("weatherMap").setView([lat, lon], 10);
			openStreetMapLayer = L.tileLayer(
				"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
				{
					maxZoom: 15,
					attribution:
						'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				}
			).addTo(map);
			//weather layer precipitation
			const precipitationLayer = L.tileLayer(
				"https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=661e7eff94c386fb32110da5f695f39b",
				{
					maxZoom: 15,
					opacity: 1.0,
				}
			);
			//weather layer clouds
			const cloudLayer = L.tileLayer(
				"https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=661e7eff94c386fb32110da5f695f39b",
				{
					maxZoom: 15,
					opacity: 1.0,
				}
			);
			//weather layer temperature/heatmap
			const temperatureLayer = L.tileLayer(
				"https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=661e7eff94c386fb32110da5f695f39b",
				{
					maxZoom: 15,
					opacity: 0.3,
				}
			);
			//weather layer wind
			const windLayer = L.tileLayer(
				"https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=661e7eff94c386fb32110da5f695f39b",
				{
					maxZoom: 15,
					opacity: 1.0,
				}
			);
			//weather layer pressure
			const pressureLayer = L.tileLayer(
				"https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=661e7eff94c386fb32110da5f695f39b",
				{
					maxZoom: 15,
					opacity: 0.5,
				}
			);
			
			//declare variables to display layer options 
			const weatherLayers = L.layerGroup([
				precipitationLayer,
				cloudLayer,
				temperatureLayer,
				windLayer,
			]);

			const precip = L.layerGroup([precipitationLayer]);
			const clouds = L.layerGroup([cloudLayer]);
			const temperature = L.layerGroup([temperatureLayer]);
			const windL = L.layerGroup([windLayer]);
			const pressureL = L.layerGroup([pressureLayer]);


			const baseLayers = {
				OpenStreetMap: openStreetMapLayer,
				// Add other base layers if you have them
			};

			const overlayLayers = {
				"All Weather Layers": weatherLayers,
				Precipitation: precip,
				Clouds: clouds,
				Temperature: temperature,
				Wind: windL,
				Pressure: pressureL,

				// Add more overlay layers as needed
			};

			L.control.layers(baseLayers, overlayLayers, { collapsed:false }).addTo(map);

			map.on("baselayerchange", function (eventLayer) {
				const selectedLater = eventLayer.name;
				console.log("Selected Later: ${selectedLayer");
			});

			// Create a draggable marker and add it to the map.
			marker = L.marker([lat, lon], {
				draggable: true, // Make the marker draggable
			}).addTo(map);

			// Add a dragend event handler to update the marker's coordinates.
			marker.on("dragend", function (event) {
				var newLatLng = event.target.getLatLng();
				marker
					.getTooltip()
					.setContent("Lat: " + newLatLng.lat + ", Lon: " + newLatLng.lng);
				marker.openTooltip();
			});

			// Add a tooltip to the marker.
			marker.bindTooltip("Lat: " + lat + ", Lon: " + lon).openTooltip();
		} else {
			// Update the map's view.
			map.setView([lat, lon]);

			// Update the marker's position when moved
			marker.setLatLng([lat, lon]);

			// Update the marker's tooltip content when moved
			var newLatLng = marker.getLatLng();
			marker
				.getTooltip()
				.setContent("Lat: " + newLatLng.lat + ", Lon: " + newLatLng.lng);
			marker.openTooltip();
		}
	}

	// Add an event listener to the "Search" button to fire the search
	document.getElementById("getSearch").addEventListener("click", function () {
		// Call the getWeather function
		getWeather();

		searchParks()

		// Show the weather map
		const weatherMapDiv = document.getElementById("weatherMap");
		weatherMapDiv.style.display = "block";

		//show the 5 day forecast modal button
		const forecastbtn = document.getElementById("forecastbtn");
		forecastbtn.style.display = "block";

		//show the weatherdata
		const wdata = document.getElementById("weatherData");
		wdata.style.display = "block";

		// Get the input value from #locationInput
		var city = document.getElementById("cityInput").value;
		var state = document.getElementById("stateInput").value;
		var location = `${city}, ${state} USA`;
	});
});

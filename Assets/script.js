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
		const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={weatherApiKey}`;

		//Make API Weather request using Fetch//
		fetch(weatherUrl);
		console
			.log(weatherUrl)
			.then((res) => res.json)
			.then((date) => {
				const weatherDate = data.list;
				document.getElementById("weatherData").innerHTML = JSON.stringify(
					weatherData,
					null,
					2
				);
			})
			.catch((error) => {
				console.warn("Error fetching weather data:", error);
			});
	}
	// Add event listener to the button
	document
		.getElementById("getWeatherButton")
		.addEventListener("click", getWeather);
});

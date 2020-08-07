// 2213054 Cincinnati Location Key
// see https://developer.accuweather.com/api-flow-diagram

navigator.geolocation.getCurrentPosition((position) => {
    // Uses latitude and longitude to find location key
    let locationGeoURL = "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?&apikey=R9vyjjt7tucL6SgBngZFXeGFpXrfoYyg&q=" +
        position.coords.latitude + "%2C" + position.coords.longitude;

    getLocation(locationGeoURL);
}, () => console.log("Error getting latitude and longitude"));

function getLocation(locationGeoURL) {

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState == XMLHttpRequest.DONE) {
            let response = JSON.parse(this.responseText);
            if (response) {
                let currentConditionsURL = "https://dataservice.accuweather.com/currentconditions/v1/" + response.Key + "?apikey=R9vyjjt7tucL6SgBngZFXeGFpXrfoYyg&language=en-us&details=false"

                // Use Current Conditions API
                getCurrentConditions(currentConditionsURL);
            } else {
                console.log('query failed: ' + response.message);
            }
        }
    };
    xhr.open('GET', locationGeoURL, true);
    xhr.send();
}

function getCurrentConditions(currentConditionsURL) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        if (xhr.readyState == XMLHttpRequest.DONE) {
            let response = JSON.parse(this.responseText);
            if (response) {
                weatherIcon.src = `https://developer.accuweather.com/sites/default/files/${response[0].WeatherIcon}-s.png`;
                temperature = response[0].Temperature.Imperial.Value;
            } else {
                console.log('query failed: ' + response.message);
            }
        }
    };
    xhr.open('GET', currentConditionsURL, true);
    xhr.send();
}
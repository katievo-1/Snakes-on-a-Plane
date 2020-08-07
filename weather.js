// 2213054 Cincinnati Location Key
// see https://developer.accuweather.com/api-flow-diagram


navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        console.log("Latitude: " + position.coords.latitude + 
        " Longitude: " + position.coords.longitude);

        // Uses latitude and longitude to find location key
        let locationGeoURL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?&apikey=R9vyjjt7tucL6SgBngZFXeGFpXrfoYyg&q=" + 
        position.coords.latitude + "%2C" + position.coords.longitude;
        getLocation(locationGeoURL);
    }
    function error() {
        console.log("Error getting latitude and longitude");
    }


function getLocation(locationGeoURL) {

    let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {

                if (xhr.readyState == XMLHttpRequest.DONE) {
    		        let response = JSON.parse(this.responseText);
    		        if(response.status !== 'success') {
			            console.log('query failed: ' + response.message); // Stops working here
		    	        return
                    }
                    let currentConditionsURL = "http://dataservice.accuweather.com/currentconditions/v1/" + response.Key +"?apikey=R9vyjjt7tucL6SgBngZFXeGFpXrfoYyg&language=en-us&details=false"
                    console.log(response.Key);
                    getCurrentConditions(currentConditionsURL);
	            } // Use Current Conditions API
        };
        xhr.open('GET', locationGeoURL, true);
        xhr.send();
}

function getCurrentConditions(currentConditionsURL) {
    let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {

                if (xhr.readyState == XMLHttpRequest.DONE) {
    		        let response = JSON.parse(this.responseText);
    		        if(response.status !== 'success') {
			            console.log('query failed: ' + response.message);
		    	        return
                    }
                    console.log(response.WeatherText);
	            }
        };
        xhr.open('GET', currentConditionsURL, true);
        xhr.send();
}
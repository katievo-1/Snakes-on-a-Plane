// 2213054 Cincinnati Location Key

navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        console.log("Latitude: " + position.coords.latitude + 
        " Longitude: " + position.coords.longitude);

        let locationGeoURL = "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?&apikey=R9vyjjt7tucL6SgBngZFXeGFpXrfoYyg&q" + 
        position.coords.latitude + "%2C" + position.coords.longitude;

        let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {

                if (xhr.readyState == XMLHttpRequest.DONE) {
    		        let response = JSON.parse(this.responseText);
    		        if(response.status !== 'success') {
			            console.log('query failed: ' + response.message);
		    	        return
                    }
                    console.log(response.key);
                    return response.key
	            }
        };
        xhr.open('GET', locationGeoURL, true);
        xhr.send();
    }
    function error() {
        console.log("Error getting latitude and longitude");
    }
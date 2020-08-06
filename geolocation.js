let city = document.getElementById("city");

const locationURL = 'http://ip-api.com/json/?fields=status,message,country,countryCode,region,city,zip';

function getLocation() {

    // Fetch the location data from API

    let xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        
        if (xhr.readyState == XMLHttpRequest.DONE) {
    		let response = JSON.parse(this.responseText);
    		if(response.status !== 'success') {
			    console.log('query failed: ' + response.message);
		    	return
            }
            
            city.innerHTML = response.city + ", " + response.region;
	    }
    };
    xhr.open('GET', locationURL, true);
    xhr.send();
}

getLocation();
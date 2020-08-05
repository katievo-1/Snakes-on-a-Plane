navigator.geolocation.getCurrentPosition(success, error);
const secretWeatherKey = "72a83cad684431418e2c8f3089cf7bef";

    function success(position) {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        console.log("Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude);
        let weatherURL = "api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid="

        // Fetch the weather data from API
    
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                if(response.status !== 'success') {
                    console.log('query failed: ' + response.message);
                    return
                }
                
                console.log(response.current.weather.id);
            }
        };
        xhr.open('GET', weatherURL, true);
        xhr.setRequestHeader("secret-key", secretWeatherKey);
        xhr.send();
    }
    function error(err) {
        console.log(err)
    }
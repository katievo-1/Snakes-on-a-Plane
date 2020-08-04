let city = document.getElementById("city");

navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        city.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;
    }
    function error(err) {
        console.log(err)
    }
var directionsDisplay = new google.maps.DirectionsRenderer();

function initializeMap() {
//Тут починаємо працювати з картою
    var mapProp = {
        center: new google.maps.LatLng(50.464379, 30.519131),
        zoom: 11
    };
    var html_element = document.getElementById("googleMap");
    var map = new google.maps.Map(html_element, mapProp);
    //Карта створена і показана

    var counter = 0;
    var point = new google.maps.LatLng(50.464379, 30.519131);
    var marker = new google.maps.Marker({
        position: point,
        //map - це змінна карти створена за допомогою new
        map: map,
        icon: "assets/images/map-icon.png"
    });

    var new_parker = new google.maps.Marker({
        icon: "assets/images/home-icon.png"
    });

    google.maps.event.addListener(map, 'click', function (me) {
        var coordinates = me.latLng;

        geocodeLatLng(coordinates, function (err, address, text_address) {
            if (!err) {
                //Дізналися адресу
                console.log(address);

                $("#address").val(text_address);

                AddressCheck();




                new_parker.setMap(null);

                new_parker.setPosition(address);
                new_parker.setMap(map);

                calculateRoute(map, point, address, function (err, address) {
                    if (!err) {
                        //Дізналися адресу
                        console.log(address);

                    } else {
                        console.log("Немає дороги")
                    }
                })

            } else {
                console.log("Немає адреси")
            }
        })

    });

    $("#submit").on("click", function () {
        geocodeAddress($("#address").val(), function (err, address) {
            if (!err) {
                //Дізналися адресу
                console.log(address);

                new_parker.setMap(null);

                new_parker.setPosition(address);
                new_parker.setMap(map);

                // parker.setMap(map);
                calculateRoute(map, point, address, function (err, address) {
                    if (!err) {
                        //Дізналися адресу
                        console.log(address);

                    } else {
                        console.log("Немає дороги")
                    }
                });

            } else {
                console.log("Немає адреси");
            }
        });

    })

}

function geocodeLatLng(latlng, callback) {
    //Модуль за роботу з адресою
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[1]) {
            var address = results[1].formatted_address;
            // callback(null, address);
            console.log(address);
            callback(null, latlng, address);
        } else {
            callback(new Error("Can't find address"));
        }
    });
}

function geocodeAddress(address, callback) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            var coordinates = results[0].geometry.location;
            callback(null, coordinates);
        } else {
            callback(new Error("Can	not	find the address"));
        }
    });
}

function calculateRoute(map, A_latlng, B_latlng, callback) {

    directionsDisplay.setMap(null);
    directionsDisplay.setMap(map);

    var directionService = new google.maps.DirectionsService();
    directionService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: google.maps.TravelMode["DRIVING"]
    }, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            var leg = response.routes[0].legs[0];
            callback(null, {
                duration: leg.duration
            });
            directionsDisplay.setDirections(response);
        } else {
            callback(new Error("Cannot find	direction"));
        }
    });
}

exports.initializeMap = initializeMap;
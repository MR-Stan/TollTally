
let tollTallyApp = {

    originInputVar: "",

    destinationInputVar: "",

    frequencyIntInputVar: "",

    frequencyTypeInputVar: "",

    destinationIntInputVar: "",

    destinationTypeInputVar: "",

    // function that intially runs
    initialize: function () {


        $("#submitButton").click(function () {
            tollTallyApp.originInput();
            tollTallyApp.destinationInput();
            tollTallyApp.frequencyInput();
            tollTallyApp.durationInput();
            tollTallyApp.getGeolocationData();
            // $("#inputContainer").hide();
            // $("#calculationContainer").show();
        });
    },

    // origin input field related methods
    originInput: function () {
        if ($("#originInput").val() === "") {
            $("#originLabel").css("color", "red");
            return;
        }
        else {
            $("#originLabel").css("color", "black");
            tollTallyApp.originInputVar = $("#originInput").val().trim();
            console.log(tollTallyApp.originInputVar);
        }
    },

    // destination input field related methods
    destinationInput: function () {
        if ($("#destinationInput").val() === "") {
            $("#destinationLabel").css("color", "red");
            return;
        }
        else {
            $("#destinationLabel").css("color", "black");
            tollTallyApp.destinationInputVar = $("#destinationInput").val().trim();
            console.log(tollTallyApp.destinationInputVar);
        }
    },

    // frequency input field related methods
    frequencyInput: function () {
        if ($("#frequencyIntInput").val() === "" || $("#frequencyTypeInput").val() === "") {
            $("#frequencyLabel").css("color", "red");
            return;
        }
        else {
            $("#frequencyLabel").css("color", "black");
            tollTallyApp.frequencyIntInputVar = $("#frequencyIntInput").val().trim();
            tollTallyApp.frequencyTypeInputVar = $("#frequencyTypeInput").val().trim();
            console.log(tollTallyApp.frequencyIntInputVar);
            console.log(tollTallyApp.frequencyTypeInputVar);
        }
    },

    // total per input field related methods
    durationInput: function () {
        if ($("#durationIntInput").val() === "" || $("#durationTypeInput").val() === "") {
            $("#durationLabel").css("color", "red");
            return;
        }
        else {
            $("#durationLabel").css("color", "black");
            tollTallyApp.durationIntInputVar = $("#durationIntInput").val().trim();
            tollTallyApp.durationTypeInputVar = $("#durationTypeInput").val().trim();
            console.log(tollTallyApp.durationIntInputVar);
            console.log(tollTallyApp.durationTypeInputVar);
        }
    },

    // gmaps key AIzaSyAX-zoE2bM43iSCFsZHCgdzog3iQ31u04k

    tollGuruAPI : function () {
        $.ajax({
            url: "https://dev.tollguru.com/v1/calc/gmaps",
            method: "POST",
            dataType: "json",
            headers: "{'x-api-key': 'WKovB7gOJC47zEomeAr3l7fQRRamCWAb6Ski8tIo'}",
            success: function(data) {
                console.log(data);
            }
            
        });
    },



    // initialize the geocoder library
    geocoder : new google.maps.Geocoder(),

    //array to hold the geo address
    geoAddress : [], 


    initNavigateMap: function (mapID, panelDirectionID, startLatitude, startLongitude, endLatitude, endLongitude) {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;

        // initialize the map
        // update to jquery ***
        var map = new google.maps.Map(document.getElementById(mapID), {
            zoom: 7,
            center: { lat: startLatitude, lng: startLongitude }
        });

        // clear the direction panel
        $("#" + panelDirectionID).html("");
        directionsDisplay.setMap(map);
        // update to jquery ***
        directionsDisplay.setPanel(document.getElementById(panelDirectionID));

        //prepare the latitude and longitude data
        start = startLatitude + ", " + startLongitude;
        end = endLatitude + ", " + endLongitude;
        tollTallyApp.calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
    },

    //function to get the driving route
    calculateAndDisplayRoute: function (directionsService, directionsDisplay, start, end) {
        directionsService.route({
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        }, function (response, status) {
            console.log(response);           
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } 
            else {
                // replace with modal ***
                alert('Directions request failed due to ' + status);
            }
        });
    },

    //get geolocation based on address
    codeAddress: function (address) {
        return new Promise(function (resolve, reject) {
            tollTallyApp.geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    resolve(results);
                } else {
                    reject(Error("Geocode for address " + address + " was not successful for the following reason: " + status));
                }
            });
        });
    },

    //function to get geolocation of both addresses.
    getGeolocationData: function () {
        if ($("#originInput").val() != "" && $("#destinationInput").val() != "") {
            geoAddress = [];
            tollTallyApp.codeAddress($("#originInput").val()).then(function (response) {
                var geoData = {
                    latitude: response[0].geometry.location.lat(),
                    longitude: response[0].geometry.location.lng()
                }
                geoAddress.push(geoData);
            }).then(function () {
                return tollTallyApp.codeAddress($("#destinationInput").val()).then(function (response) {
                    var geoData2 = {
                        latitude: response[0].geometry.location.lat(),
                        longitude: response[0].geometry.location.lng()
                    }
                    geoAddress.push(geoData2);
                });

            }).then(function () {
                tollTallyApp.initNavigateMap("map", "panel-direction", geoAddress[0].latitude, geoAddress[0].longitude, geoAddress[1].latitude, geoAddress[1].longitude);
            });
        } else {
            // replace with modal ***
            alert("Please enter both addresses");
        }
    },
}


tollTallyApp.initialize();
tollTallyApp.tollGuruAPI();











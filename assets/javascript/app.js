
let appObject = {

    originInputVar: "",

    destinationInputVar: "",

    frequencyIntInputVar: "",

    frequencyTypeInputVar: "",

    destinationIntInputVar: "",

    destinationTypeInputVar: "",

    // function that intially runs
    initialize: function () {


        $("#submitButton").click(function () {
            appObject.originInput();
            appObject.destinationInput();
            appObject.frequencyInput();
            appObject.durationInput();
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
            appObject.originInputVar = $("#originInput").val().trim();
            console.log(appObject.originInputVar);
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
            appObject.destinationInputVar = $("#destinationInput").val().trim();
            console.log(appObject.destinationInputVar);
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
            appObject.frequencyIntInputVar = $("#frequencyIntInput").val().trim();
            appObject.frequencyTypeInputVar = $("#frequencyTypeInput").val().trim();
            console.log(appObject.frequencyIntInputVar);
            console.log(appObject.frequencyTypeInputVar);
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
            appObject.durationIntInputVar = $("#durationIntInput").val().trim();
            appObject.durationTypeInputVar = $("#durationTypeInput").val().trim();
            console.log(appObject.durationIntInputVar);
            console.log(appObject.durationTypeInputVar);
        }
    },

    // gmaps key AIzaSyAX-zoE2bM43iSCFsZHCgdzog3iQ31u04k

    googleAPI: function () {
        //Init the geocoder library
        var geocoder = new google.maps.Geocoder();

        //array to hold the geo address
        var geoAddress = [];

        //function framework
        bytutorialMap = {
            initNavigateMap: function (mapID, panelDirectionID, startLatitude, startLongitude, endLatitude, endLongitude) {
                var directionsDisplay = new google.maps.DirectionsRenderer;
                var directionsService = new google.maps.DirectionsService;

                //initialize the map
                var map = new google.maps.Map(document.getElementById(mapID), {
                    zoom: 7,
                    center: { lat: startLatitude, lng: startLongitude }
                });

                //clear the direction panel
                $("#" + panelDirectionID).html("");
                directionsDisplay.setMap(map);
                directionsDisplay.setPanel(document.getElementById(panelDirectionID));

                //prepare the latitude and longitude data
                start = startLatitude + ", " + startLongitude;
                end = endLatitude + ", " + endLongitude;
                bytutorialMap.calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
            },

            //function to get the driving route
            calculateAndDisplayRoute: function (directionsService, directionsDisplay, start, end) {
                directionsService.route({
                    origin: start,
                    destination: end,
                    travelMode: 'DRIVING'
                }, function (response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    } else {
                        alert('Directions request failed due to ' + status);
                    }
                });
            },

            //get geolocation based on address
            codeAddress: function (address) {
                return new Promise(function (resolve, reject) {
                    geocoder.geocode({ 'address': address }, function (results, status) {
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
                    bytutorialMap.codeAddress($("#originInput").val()).then(function (response) {
                        var geoData = {
                            latitude: response[0].geometry.location.lat(),
                            longitude: response[0].geometry.location.lng()
                        }
                        geoAddress.push(geoData);
                    }).then(function () {
                        return bytutorialMap.codeAddress($("#destinationInput").val()).then(function (response) {
                            var geoData2 = {
                                latitude: response[0].geometry.location.lat(),
                                longitude: response[0].geometry.location.lng()
                            }
                            geoAddress.push(geoData2);
                        });

                    }).then(function () {
                        bytutorialMap.initNavigateMap("map", "panel-direction", geoAddress[0].latitude, geoAddress[0].longitude, geoAddress[1].latitude, geoAddress[1].longitude);
                    });
                } else {
                    alert("Please enter both addresses");
                }
            },

            //clear entries and map display
            clearEntries: function () {
                $("#originInput, #destinationInput").val("");
                $("#map, #panel-direction").html("");
            }
        }
    }

}

appObject.initialize();
appObject.googleAPI();










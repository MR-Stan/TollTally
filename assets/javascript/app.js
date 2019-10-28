
let tollTallyApp = {

    originInputVar: "",

    destinationInputVar: "",

    frequencyIntInputVar: "",

    frequencyTypeInputVar: "",

    durationIntInputVar: "",

    durationTypeInputVar: "",

    entryChecker : 0,

    responseObject : {},

    // function that intially runs
    initialize: function () {
        $("#resultContainer").hide();
        $("#google").hide();
        tollTallyApp.autocompleteAPI();
        $("#submitButton").click(function () {
            tollTallyApp.entryChecker = 0;
            tollTallyApp.originInput();
            tollTallyApp.destinationInput();
            tollTallyApp.frequencyInput();
            tollTallyApp.durationInput();
            // checking all fields
            if (tollTallyApp.entryChecker < 4) {
                return;
            }
            else {
                tollTallyApp.getResults();
                tollTallyApp.getGeolocationData();
            }

        });
    },

    reloadPage : function () {
        window.location.reload();
    },

    // origin input field related methods
    originInput: function () {
        if ($("#originInput").val() === "") {
            $("#originLabel").css({
                "color" : "rgb(252, 105, 7)",
                // add shake animation
            });
            return;
        }
        else {
            $("#originLabel").css("color", "rgb(240, 240, 14)");
            tollTallyApp.originInputVar = $("#originInput").val().trim();
            tollTallyApp.entryChecker++;
        }
    },

    // destination input field related methods
    destinationInput: function () {
        if ($("#destinationInput").val() === "") {
            $("#destinationLabel").css({
                "color" : "rgb(252, 105, 7)",
                // add shake animation
            });
            return;
        }
        else {
            $("#destinationLabel").css("color", "rgb(240, 240, 14)");
            tollTallyApp.destinationInputVar = $("#destinationInput").val().trim();
            tollTallyApp.entryChecker++;
        }
    },

    // frequency input field related methods
    frequencyInput: function () {
        if ($("#frequencyIntInput").val() === "" || $("#frequencyTypeInput").val() === "") {
            $("#frequencyLabel").css({
                "color" : "rgb(252, 105, 7)",
                // add shake animation
            });
            return;
        }
        else {
            $("#frequencyLabel").css("color", "rgb(240, 240, 14)");
            tollTallyApp.frequencyIntInputVar = $("#frequencyIntInput").val().trim();
            tollTallyApp.frequencyTypeInputVar = $("#frequencyTypeInput").val().trim();
            tollTallyApp.entryChecker++;
        }
    },

    // total per input field related methods
    durationInput: function () {
        if ($("#durationIntInput").val() === "" || $("#durationTypeInput").val() === "") {
            $("#durationLabel").css({
                "color" : "rgb(252, 105, 7)",
                // add shake animation
            });
            return;
        }
        else {
            $("#durationLabel").css("color", "rgb(240, 240, 14)");
            tollTallyApp.durationIntInputVar = $("#durationIntInput").val().trim();
            tollTallyApp.durationTypeInputVar = $("#durationTypeInput").val().trim();
            tollTallyApp.entryChecker++;
        }
    },

    // gmaps key AIzaSyAX-zoE2bM43iSCFsZHCgdzog3iQ31u04k

    // tollGuruAPI : function () {
    //     $.ajax({
    //         url: "https://dev.tollguru.com/v1/calc/gmaps",
    //         headers: { "x-api-key": "WKovB7gOJC47zEomeAr3l7fQRRamCWAb6Ski8tIo" },
    //         data: {
    //             "from": {
    //               "address": "Main str, Dallas, TX"
    //             },
    //             "to": {
    //               "address": "Addison, TX"
    //             }
    //         },
    //         method: "POST",
    //         dataType: "json",
    //         // headers: {
    //         //     "x-api-key": "WKovB7gOJC47zEomeAr3l7fQRRamCWAb6Ski8tIo",
    //         //     //"Access-Control-Allow-Origin": "http://localhost:52330",
    //         //     // "Access-Control-Allow-Credentials": "true",
    //         //     // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //         //     // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    //         //     // "Access-Control-Expose-Headers": "Authorization"
    //         // },
    //         success: function(data) {
    //             console.log(data);
    //             alert("success");
    //         },
    //         // error: function(data) {
    //         //     console.log(data);
    //         // },
    //         beforeSend: function (xhr) {
    //             xhr.setRequestHeader ("Authorization", "Basic " + btoa("WKovB7gOJC47zEomeAr3l7fQRRamCWAb6Ski8tIo"));
    //             console.log(xhr);
    //         }
            
    //     });
    // },

    getResults : function () {
        $("#inputContainer").hide();
        $("#resultContainer").show();
        $("#confirm").text("Your trip from " + tollTallyApp.originInputVar + " to " + tollTallyApp.destinationInputVar +
         " was calculated as " + tollTallyApp.frequencyIntInputVar + " trips per " + tollTallyApp.frequencyTypeInputVar + 
         " for " + tollTallyApp.durationIntInputVar + " " + tollTallyApp.durationTypeInputVar + ".");
        $("#google").show();
        $("#panel-direction").hide();
        // calculate tolls
        $("#calculateButton").click(function () { 
            tollTallyApp.countTolls();
        });

        // reload page
        $("#resetButton").click(function () { 
            tollTallyApp.reloadPage();
        });

        // show directions
        $("#showDirectionsButton").click(function () { 
            $("#panel-direction").show();
            $("#showDirectionsButton").hide();
        });
    },

    calculateTolls : function () {

    },


    // initialize the geocoder library
    geocoder : new google.maps.Geocoder(),

    //array to hold the geo address
    geoAddress : [], 


    initNavigateMap: function (mapID, panelDirectionID, startLatitude, startLongitude, endLatitude, endLongitude) {
        var directionsDisplay = new google.maps.DirectionsRenderer({
            preserveViewport: true
        });
        var directionsService = new google.maps.DirectionsService;

        // initialize the map
        var map = new google.maps.Map(document.getElementById(mapID), {
            zoom: 10,
            center: { lat: startLatitude, lng: startLongitude }
        });

        // clear the direction panel
        $("#" + panelDirectionID).html("");
        directionsDisplay.setMap(map);
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
            tollTallyApp.responseObject = response;       
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } 
            else {
                console.log('Directions request failed due to ' + status);
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
        } 
    },

    autocompleteAPI : function () {
        let inputs = document.getElementsByClassName('query');
        let options = {types: []};
        let autocompletes = [];
    
        for (let i = 0; i < inputs.length; i++) {
            let autocomplete = new google.maps.places.Autocomplete(inputs[i], options);
            autocomplete.inputId = inputs[i].id;
            autocomplete.addListener('place_changed', fillIn);
            autocompletes.push(autocomplete);
        }
    
        function fillIn() {
            //console.log(this.inputId);
            let place = this.getPlace();
            //console.log(place. address_components[0].long_name);
        }
    },

    countTolls : function () {
        let str = "";
        let totalDistance = tollTallyApp.responseObject.routes[0].legs[0].distance.value;
        let roadDistance = totalDistance;
        
        function containsWord(str, searchValue){
            let words = str.replace(/<\/?[^>]+(>|$)/g, "");
            return words.indexOf(searchValue) > -1
          }


        // function containsWord(str, word) {
        //     return str.match(new RegExp("\\b" + word + "\\b")) != null;
        // }

        for (let i = 0; i < tollTallyApp.responseObject.routes[0].legs[0].steps.length; i++ ) {
            str = tollTallyApp.responseObject.routes[0].legs[0].steps[i].instructions.toLowerCase();
            if (containsWord(str, "toll") != true) {
            }
            else {
                roadDistance = roadDistance - tollTallyApp.responseObject.routes[0].legs[0].steps[i].distance.value;
            }
        }

        let tollDistance = totalDistance - roadDistance;

    console.log(totalDistance);
    console.log(roadDistance);
    console.log(tollDistance);
    } 
}

tollTallyApp.initialize();














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

    googleMapsApi : function() {
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&latlng=40.714224%2C-73.96145",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
                "x-rapidapi-key": "WKovB7gOJC47zEomeAr3l7fQRRamCWAb6Ski8tIo"
            }};
        
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    },
        

    // tollGuruApi : function () {
    //     $.ajax({
    //         type: "POST",
    //         url: "https://dev.tollguru.com/v1/calc/gmaps",
    //         headers: {"x-api-key": "WKovB7gOJC47zEomeAr3l7fQRRamCWAb6Ski8tIo"},
    //         data: {
    //             "from": {
    //                 "address": "Main str, Dallas, TX"
    //             },
    //             "to": {
    //                 "address": "Addison, TX"
    //             },
    //             "waypoints": [
    //                 { "address": "Plano, TX" },
    //                 { "address": "Allen, TX" }
    //             ],
    //             "vehicleType": "2AxlesAuto",
    //             "fuelPrice": "2.79",
    //             "fuelPriceCurrency": "USD",
    //             "fuelEfficiency": {
    //                 "city": 24,
    //                 "hwy": 30,
    //                 "units": "mpg"
    //             },
    //             "departure_time": 1551541566,
    //             "driver": {
    //                 "wage": 30,
    //                 "rounding": 15,
    //                 "valueOfTime": 0
    //             }
    //         }
    //     }).then(function (response) {
    //         console.log(response);
    //     }).catch(function (error) {
    //          console.log(error);
    //     });
    // },
}

appObject.initialize();
appObject.googleMapsApi();









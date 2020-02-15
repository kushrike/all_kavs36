var bulb_array = ['1', '2', '3', '4', '5'];
var a = 2;
var direction = [];

$(".start").click(function () {
    firstIlluminate();

    var callCount = 1;
    var repeater = setInterval(function () {
        if (callCount < 10) {
            illuminate();
            callCount += 1;
        } else {
            clearInterval(repeater);
            shutdown();
        }
    }, 3000);


    $.ajax({
        url: "http://localhost:5000/activateModel/",
        type: "POST",
        datatype: "text",
        contentType: "text/plain",
        data: "true",
        success: function () {
            console.log("Executed");
        }
    }).done(function (data) {
        console.log(data);
    });
});

function shutdown() {
    lastIlluminate();
    // var bulbs = {
    //     "data": direction
    // };    
    // console.log(direction);
    // console.log(bulbs);


    $.ajax({
        url: "http://localhost:5000/api/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            "message": direction
        })
    }).done(function (data) {
        console.log(data);
    });
};

function firstIlluminate() {
    $("#b3").css({
        "animation": "illuminate 2s ease-out infinite",
    });
    $("#B3").css({
        "background": "#f6eb1f"
    });
};

function lastIlluminate() {
    $("#b" + bulb_array[a]).css({
        "animation": ""
    });
    $("#B" + bulb_array[a]).css({
        "background": "#808080"
    });
}

function illuminate() {
    $("#b" + bulb_array[a]).css({
        "animation": ""
    });
    $("#B" + bulb_array[a]).css({
        "background": "#808080"
    });

    if (Math.random() <= 0.5) {
        if ($.inArray(a, [1, 2, 3, 4]) >= 0) {
            a = a - 1;
            direction.push(1);
        } else {
            a = 4;
            direction.push(0);
        }
    } else {
        if ($.inArray(a, [0, 1, 2, 3]) >= 0) {
            a = a + 1;
            direction.push(0);
        } else {
            a = 0;
            direction.push(1);
        }
    }

    $("#b" + bulb_array[a]).css({
        "animation": "illuminate 2s ease-out infinite"
    });
    $("#B" + bulb_array[a]).css({
        "background": "#f6eb1f"
    });
};
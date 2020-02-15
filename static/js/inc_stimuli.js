var createdTime, clickTime, finalTime;
var timings = [];
var c = 0;

// function randomcolor() {
//     var arr = '0123456789abcdef';
//     var a = '#';
//     for (var i = 0; i < 6; i++) {
//         a += arr[Math.round(Math.random() * 15)];
//     }
//     return a;
// }
document.getElementById("box0").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box0").style.display = "none";
    finalTime = randomsquare(0);
    timings.push(((clickTime - finalTime)/1000));
    console.log(timings);
    document.getElementById("box1").style.display = "block";
    c = c + 1;
    if(c === 7){
    document.getElementById("box0").style.display = "none";
    document.getElementById("box1").style.display = "none";
    document.getElementById("box2").style.display = "none";
    document.getElementById("box3").style.display = "none";
    document.getElementById("box4").style.display = "none";
    document.getElementById("box5").style.display = "none";
    document.getElementById("box6").style.display = "none";
    document.getElementById("box7").style.display = "none";
    document.getElementById("box8").style.display = "none";
    document.getElementById("box9").style.display = "none";
    }
    // document.getElementById("box1").style.display = "block";
}

document.getElementById("box1").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box1").style.display = "none";
    finalTime = randomsquare(1);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box2").style.display = "block";
      
}

document.getElementById("box2").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box2").style.display = "none";
    finalTime = randomsquare(2);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box3").style.display = "block";
      
}
document.getElementById("box3").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box3").style.display = "none";
    finalTime = randomsquare(3);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box4").style.display = "block";
}
document.getElementById("box4").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box4").style.display = "none";
    finalTime = randomsquare(4);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box5").style.display = "block";
      
}
document.getElementById("box5").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box5").style.display = "none";
    finalTime = randomsquare(5);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box6").style.display = "block";
      
}
document.getElementById("box6").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box6").style.display = "none";
    finalTime = randomsquare(6);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box7").style.display = "block";
      
}
document.getElementById("box7").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box7").style.display = "none";
    finalTime = randomsquare(7);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box8").style.display = "block";
      
}
document.getElementById("box8").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box8").style.display = "none";
    finalTime = randomsquare(8);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box9").style.display = "block";
      
}
document.getElementById("box9").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box9").style.display = "none";
    finalTime = randomsquare(9);
    timings.push(((clickTime - finalTime)/1000));
}


function randomsquare(c) {
    var t = Math.random() * 2000;
    console.log("yay" + c)
    setTimeout(function () {
        var bodyWidth = document.body.clientWidth - 100;
        var bodyHeight = document.body.clientHeight - 100;
        var randPosX = Math.floor((Math.random() * bodyWidth));
        var randPosY = Math.floor((Math.random() * bodyHeight));
        $('#box' + c).css('left', randPosX);
        $('#box' + c).css('top', randPosY);
        $("#box" + c).css("display", "block");
        createdTime = Date.now();
    }, t);
    return createdTime;
}
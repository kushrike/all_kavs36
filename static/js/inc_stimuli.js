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
    
    }
    // document.getElementById("box1").style.display = "block";


document.getElementById("box1").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box1").style.display = "none";
    finalTime = randomsquare(1);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box2").style.display = "block";
      c=c+1;
}

document.getElementById("box2").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box2").style.display = "none";
    finalTime = randomsquare(2);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box3").style.display = "block";
      c=c+1;
}
document.getElementById("box3").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box3").style.display = "none";
    finalTime = randomsquare(3);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box4").style.display = "block";
    c=c+1;
}
document.getElementById("box4").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box4").style.display = "none";
    finalTime = randomsquare(4);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box5").style.display = "block";
      c=c+1;
}
document.getElementById("box5").onclick = function () {
    clickTime = Date.now();
    document.getElementById("box5").style.display = "none";
    finalTime = randomsquare(5);
    timings.push(((clickTime - finalTime)/1000));
    document.getElementById("box6").style.display = "block";
      c=c+1;
}
// document.getElementById("box6").onclick = function () {
//     clickTime = Date.now();
//     document.getElementById("box6").style.display = "none";
//     finalTime = randomsquare(6);
//     timings.push(((clickTime - finalTime)/1000));
//     document.getElementById("box7").style.display = "block";
//       c=c+1;
// }
// document.getElementById("box7").onclick = function () {
//     clickTime = Date.now();
//     document.getElementById("box7").style.display = "none";
//     finalTime = randomsquare(7);
//     timings.push(((clickTime - finalTime)/1000));
//     document.getElementById("box8").style.display = "block";
//       c=c+1;
// }
// document.getElementById("box8").onclick = function () {
//     clickTime = Date.now();
//     document.getElementById("box8").style.display = "none";
//     finalTime = randomsquare(8);
//     timings.push(((clickTime - finalTime)/1000));
//     document.getElementById("box9").style.display = "block";
//       c=c+1;
// }
// document.getElementById("box9").onclick = function () {
//     clickTime = Date.now();
//     document.getElementById("box9").style.display = "none";
//     finalTime = randomsquare(9);
//     timings.push(((clickTime - finalTime)/1000));
//     c=c+1;
// }


function randomsquare(cor) {
    var t = Math.random() * 2000;
    console.log("yay" + cor)
    setTimeout(function () {
        var bodyWidth = document.body.clientWidth - 100;
        var bodyHeight = document.body.clientHeight - 100;
        var randPosX = Math.floor((Math.random() * bodyWidth));
        var randPosY = Math.floor((Math.random() * bodyHeight));
        $('#box' + cor).css('left', randPosX);
        $('#box' + cor).css('top', randPosY);
        $("#box" + cor).css("display", "block");
        createdTime = Date.now();
    }, t);

    if(cor === 5){
        console.log("YEAAAAA");
        $("#box0").remove();
        $("#box1").remove();
        $("#box2").remove();
        $("#box3").remove();
        $("#box4").remove();
        $("#box5").remove();
        $("#box6").remove();
        $("#box7").remove();
        $("#box8").remove();
        $("#box9").remove();
    
    var ctx = document.getElementById('myChart').getContext('2d');
          var chart = new Chart(ctx, {
              // The type of chart we want to create
              type: 'line',
          
              // The data for our dataset
              data: {
                  labels: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
                  datasets: [{
                      label: 'Reaction Timings',
                      backgroundColor: 'rgb(255, 99, 132)',
                      borderColor: 'rgb(255, 99, 132)',
                      data: timings
                  }]
              },
          
              // Configuration options go here
              options: {}
          });
          $("#myChart").css('width', '80%');
          $("#myChart").css('background-color', '#99ff99');
        } else {
            return createdTime;
        }
}
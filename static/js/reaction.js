var clickTime;
var createdTime;
var timings = [];


$("#box").on('click', function () {

            console.log("clicked");
            clickTime = Date.now();
            $("#box").css("display", "none");
            randomsquare();
            if ((clickTime - createdTime) > 0) {
                timings.push(((clickTime - createdTime) / 1000));
                console.log(timings);
            }

            if(timings.length >9){
              $("#textArea").append("<h3>THANKS FOR PLAYING!</h3>");
              $("#box").remove();
              createGraph(timings);
            }

            });

        function randomsquare() {
            var t = Math.random() * 2000;
            setTimeout(function () {
                var bodyWidth = document.body.clientWidth - 100;
                var bodyHeight = document.body.clientHeight - 100;
                var randPosX = Math.floor((Math.random() * bodyWidth));
                var randPosY = Math.floor((Math.random() * bodyHeight));
                $('#box').css('left', randPosX);
                $('#box').css('top', randPosY);
                $("#box").css("display", "block");
                createdTime = Date.now();
            }, t)
        }


        const OPTS = {
            fill: 'none',
            radius: 30,
            strokeWidth: { 60: 0 },
            scale: { 0: 1 },
            angle: { 'rand(-35, -70)': 0 },
            duration: 500,
            left: 0, top: 0,
            easing: 'cubic.out' };
          
          
          const circle1 = new mojs.Shape({
            ...OPTS,
            stroke: '#D4AF37' });
          
          
          const circle2 = new mojs.Shape({
            ...OPTS,
            radius: { 0: 20 },
            strokeWidth: { 40: 0 },
            stroke: 'yellow',
            delay: 'rand(75, 150)' });
          
          
          document.addEventListener('click', function (e) {
          
            circle1.
            tune({ x: e.pageX, y: e.pageY }).
            replay();
          
            circle2.
            tune({ x: e.pageX, y: e.pageY }).
            replay();
          
          });


          function createGraph(arr){
          var ctx = document.getElementById('myChart').getContext('2d');
          var chart = new Chart(ctx, {
              // The type of chart we want to create
              type: 'line',
          
              // The data for our dataset
              data: {
                  labels: ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'],
                  datasets: [{
                      label: 'Reaction Timings',
                      backgroundColor: 'rgb(255, 99, 132)',
                      borderColor: 'rgb(255, 99, 132)',
                      data: arr
                  }]
              },
          
              // Configuration options go here
              options: {}
          });
          $("#myChart").css('width', '80%');
          $("#myChart").css('background-color', '#99ff99');
        }
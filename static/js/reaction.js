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

        function randomcolor() {
            var arr = '0123456789abcdef';
            var a = '#';
            for (var i = 0; i < 6; i++) {
                a += arr[Math.round(Math.random() * 15)];
            }
            return a;
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
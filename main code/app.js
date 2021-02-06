       // Create the canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = 512;
        canvas.height = 480;
        //canvas.style.backgroundImage = "url('temporary maze.jpg')"
        document.body.appendChild(canvas);

        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = 'temporary maze.jpg';

        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            img.style.display = 'none';
          };
          

        // Trying to figure out what colour a pixel is so the non white pixels can be defined as walls

        function isNotWhite(x, y) {                  
            var pixel = ctx.getImageData(x, y, 1, 1);
            var data = pixel.data;
          
            const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;
            
            //window.alert(rgba)


            if (rgba !== "rgba(255, 255, 255, 255)") {
                return true;
            }

            else {
                return false;
            }
          }

        let colouredPixels = []

        for (i = 0; i < 512; i++) {
            for (j = 0; j < 480; j++) {

                if (isNotWhite(i, j)) {
                    colouredPixels.push([i, j]);
                }

            }
          }

          //document.getElementById("test").innerHTML = colouredPixels;

        
          

        
                // Game objects
        var hero = {
            speed: 256, // movement in pixels per second
            x: 0,
            y: 0
        };
        var monster = {
            x: 0,
            y: 0
        };
        var monstersCaught = 0;
        
        
        
                // Handle keyboard controls
        var keysDown = {};
        
        addEventListener("keydown", function (e) {
            keysDown[e.keyCode] = true;
        }, false);
        
        addEventListener("keyup", function (e) {
            delete keysDown[e.keyCode];
        }, false);
        
        
        
        
        
        
                // (NOTE: WE'LL BE USING THIS FOR RESTARTING THE GAME) Reset the game when the player catches a monster
        var reset = function () {
            hero.x = canvas.width / 2;
            hero.y = canvas.height / 2;
        
        
                    // Throw the monster somewhere on the screen randomly
            monster.x = 32 + (Math.random() * (canvas.width - 64));
            monster.y = 32 + (Math.random() * (canvas.height - 64));
        };
        
        
        
                // Update game objects
        var update = function (modifier) {

            if (38 in keysDown) { // Player holding up
                hero.y -= hero.speed * modifier;
            }
            if (40 in keysDown) { // Player holding down
                hero.y += hero.speed * modifier;
            }
            if (37 in keysDown) { // Player holding left
                hero.x -= hero.speed * modifier;
            }
            if (39 in keysDown) { // Player holding right
                hero.x += hero.speed * modifier;
            }

                    // Are they touching?
            if (
                hero.x <= (monster.x + 32)
                && monster.x <= (hero.x + 32)
                && hero.y <= (monster.y + 32)
                && monster.y <= (hero.y + 32)
            ) {
                ++monstersCaught;
                reset();
            }
        };
        
        
        
                // Draw everything
        var render = function () {
            ctx.clearRect(hero.x,hero.y,22,22)
            canvas.style.backgroundColor="grey"
            ctx.rect(hero.x, hero.y,20,20);
            ctx.rect(monster.x, monster.y,20,20);
            ctx.stroke();
 
                    // Score
            ctx.fillStyle = "white";
            ctx.font = "24px Helvetica";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
        };
        
        
        var i = 0

        var test = function(){
            if(i<10) {
            ctx.rect(i*10,i*10,10,10);
            ctx.stroke();
            }
            i++
        }
        
                // Cross-browser support for requestAnimationFrame
        var w = window;
        requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
        
        
        
                // Let's play this game!
        reset();
        setInterval(render,50);
        
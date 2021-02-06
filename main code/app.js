       // Create the canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = 512;
        canvas.height = 480;
        canvas.style.backgroundImage = "url('temporary maze.jpg')"
        document.body.appendChild(canvas);
        

        
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
        
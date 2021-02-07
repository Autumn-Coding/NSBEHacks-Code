

var container = document.getElementById("container")
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 500;
    canvas.style.backgroundImage = 'url("sand.jpg")';
    canvas.style.border = "2pt solid black"
    container.appendChild(canvas);

    var tileSide = 50;
    var gameColumns = [];
    var gameRows = [];


    for(x = 0; x <= canvas.width - tileSide; x += tileSide) {
        gameColumns.push(x)
    }
    for(y = 0; y <= canvas.height - tileSide; y += tileSide) {
        gameRows.push(y)
    }

/*
list of occupied squares (water):
on row 0: 10
on row 1: 17
on row 5: 3
on row 8: 8
on row 9: 1

*/

class WaterTile {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = "aqua";
        this.active = true;
    }

    draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x,this.y, tileSide, tileSide);
    }
}

let water = {
    x0y10: new WaterTile(gameColumns[0], gameRows[10]),
    x1y17: new WaterTile(gameColumns[1], gameRows[17]),
    x5y3: new WaterTile(gameColumns[5], gameRows[3]),
    x8y8: new WaterTile(gameColumns[8], gameRows[8]),
    x9y9: new WaterTile(gameColumns[9], gameRows[9]),
}

    var character = {
        x: gameColumns[0],
        y: gameRows[0]
    };

    var goal = {
        x: gameColumns[15],
        y: gameRows[7]
    }

    var walls = [
        {
            x: goal.x,
            y: goal.y
        },
        {
            x: gameColumns[2],
            y: gameRows[0]
        },
        {
            x: gameColumns[3],
            y: gameRows[0]
        },
        {
            x: gameColumns[4],
            y: gameRows[0]
        },
        {
            x: gameColumns[2],
            y: gameRows[0]
        },
        {
            x: gameColumns[11],
            y: gameRows[0]
        },
        {
            x: gameColumns[15],
            y: gameRows[0]
        },
        {
            x: gameColumns[16],
            y: gameRows[0]
        },
        {
            x: gameColumns[17],
            y: gameRows[0]
        },
        {
            x: gameColumns[4],
            y: gameRows[1]
        },
        {
            x: gameColumns[7],
            y: gameRows[1]
        },
        {
            x: gameColumns[8],
            y: gameRows[1]
        },
        {
            x: gameColumns[13],
            y: gameRows[1]
        },
        {
            x: gameColumns[16],
            y: gameRows[1]
        },
        {
            x: gameColumns[4],
            y: gameRows[2]
        },
        {
            x: gameColumns[7],
            y: gameRows[2]
        },
        {
            x: gameColumns[8],
            y: gameRows[2]
        },
        {
            x: gameColumns[13],
            y: gameRows[2]
        },
        {
            x: gameColumns[16],
            y: gameRows[2]
        },
        {
            x: gameColumns[1],
            y: gameRows[3]
        },
        {
            x: gameColumns[2],
            y: gameRows[3]
        },
        {
            x: gameColumns[7],
            y: gameRows[3]
        },
        {
            x: gameColumns[13],
            y: gameRows[3]
        },
        {
            x: gameColumns[2],
            y: gameRows[4]
        },
        {
            x: gameColumns[4],
            y: gameRows[4]
        },
        {
            x: gameColumns[7],
            y: gameRows[4]
        },
        {
            x: gameColumns[10],
            y: gameRows[4]
        },
        {
            x: gameColumns[12],
            y: gameRows[4]
        },
        {
            x: gameColumns[13],
            y: gameRows[4]
        },
        {
            x: gameColumns[2],
            y: gameRows[5]
        },
        {
            x: gameColumns[4],
            y: gameRows[5]
        },
        {
            x: gameColumns[6],
            y: gameRows[5]
        },
        {
            x: gameColumns[7],
            y: gameRows[5]
        },
        {
            x: gameColumns[9],
            y: gameRows[5]
        },
        {
            x: gameColumns[12],
            y: gameRows[5]
        },
        {
            x: gameColumns[16],
            y: gameRows[5]
        },
        {
            x: gameColumns[17],
            y: gameRows[5]
        },
        {
            x: gameColumns[18],
            y: gameRows[5]
        },
    ]


function updateScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(goal.x,goal.y,tileSide,tileSide);
    ctx.rect(character.x,character.y,tileSide,tileSide);
    water.x0y10.draw(ctx)
    
    for (i = 0; i < walls.length; i++) {
        ctx.fillRect(walls[i].x, walls[i].y,tileSide,tileSide);
    }
    ctx.fillRect(character.x,character.y,tileSide,tileSide);
    ctx.stroke();
    ctx.endPath();
}

function checkSpace(axis, direction) {
    var isIt = true;
    if (direction == "right") {
        if (character.x == canvas.width - tileSide || (walls.find(x => {[x.y == character.y, x.x == character.x + tileSide]}))) {
            isIt = false;
        }
    } else if (direction == "left") {
        if (character.x == 0 || (walls.find(x => {x.y == character.y, x.x == character.x - tileSide}))) {
            isIt = false;
        }
    } else if (direction == "up") {
        if (character.y == 0 || (walls.find(y => y.x == character.x) && walls.find(y => y.y == character.y - tileSide))) {
            isIt = false;
        }
    } else if (direction == "down") {
        if (character.y == canvas.height - tileSide || (walls.find(y => y.x == character.x) && walls.find(y => y.y == character.y + tileSide))) {
            isIt = false;
        }
    }

    return isIt;
}


document.addEventListener('keydown', keyPressed);

function keyPressed(e) {
    var key = e.which;
    if (key == 37) {
        var checked = checkSpace("x", "left");
        if (checked == true) {
            character.x += -tileSide;
        }
    }  else if (key == 39) {
        var checked = checkSpace("x", "right");
        if (checked == true) {
            character.x += tileSide;
        }
    }   else if (key == 38) {
        var checked = checkSpace("y", "up");
        if (checked == true) {
            character.y += -tileSide;
        }
    }   else if (key == 40) {
        var checked = checkSpace("y", "down");
        if (checked == true) {
            character.y += tileSide;
        }
    }
    updateScreen()
}


document.onload = updateScreen();
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


    for(x = tileSide; x <= canvas.width - tileSide; x += tileSide) {
        gameColumns.push(x)
    }
    for(y = tileSide; y <= canvas.height - tileSide; y += tileSide) {
        gameRows.push(y)
    }

/*
list of occupied squares (water):
on row 0: 10
on row 1: 17`
on row 5: 3
on row 8: 8
on row 9: 1

*/

class WaterTile {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = "aqua";
        this.active = true
    }

    draw(ctx) {
        ctx.rect(this.x,this.y, tileSide, tileSide)
    }
}

    var character = {
        x: gameColumns[0],
        y: gameRows[0]
    };

    var goal = {
        x: gameColumns[15],
        y: gameRows[7]
    }

function updateCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(goal.x,goal.y,tileSide,tileSide);
    ctx.rect(character.x,character.y,tileSide,tileSide);
    ctx.stroke();
    ctx.endPath();
}

function checkSpace(axis, direction) {
    if (character.axis = x) {
        if
    }
}


document.addEventListener('keydown', keyPressed);

function keyPressed(e) {
    var key = e.which;
    if (key == 37 && character.x > gameColumns[0]) {
        var checked = checkSpace(x, left);
        if (checked == true) {
            character.x += -tileSide;
        }
    }  else if (key == 39 && character.x + tileSide < canvas.width) {
        var checked = checkSpace();
        if (checked == true) {
            character.x += tileSide;
        }
    }   else if (key == 38 && character.y > gameRows[0]) {
        character.y += -tileSide;
    }   else if (key == 40 && character.y + tileSide < canvas.height) {
        character.y += tileSide;
    }
    updateCharacter()
}


document.onload = updateCharacter();
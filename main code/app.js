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

    var character = {
        x: gameColumns[0],
        y: gameRows[0]
    };

    var goal = {
        x: gameColumns[15],
        y: gameRows[7]
    }

    var walls = [{
        x: goal.x,
        y: goal.y
    }]


function updateCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(goal.x,goal.y,tileSide,tileSide);
    ctx.rect(character.x,character.y,tileSide,tileSide);
    ctx.stroke();
    ctx.endPath();
}

function checkSpace(axis, direction) {
    var isIt = true;
    if (direction == "right") {
        if (character.x == canvas.width - tileSide || (walls.find(x => x.y == character.y) && walls.find(x => x.x == character.x + tileSide))) {
            isIt = false;
        }
    } else if (direction == "left") {
        if (character.x == 0 || (walls.find(x => x.y == character.y) && walls.find(x => x.x == character.x - tileSide))) {
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
    updateCharacter()
}


document.onload = updateCharacter();
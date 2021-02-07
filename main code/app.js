var container = document.getElementById("container")
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 500;
    canvas.style.backgroundImage = 'url("sand.jpg")';
    container.appendChild(canvas);

    var character = {
        x: 0,
        y: 0
    };

    var tileSide = 20;
    var gameColumns = [];
    var gameRows = [];


    for(x = 0; x <= canvas.width - tileSide; x += tileSide) {
        gameColumns.push(x)
    }
    for(y = 0; y <= canvas.height - tileSide; y += tileSide) {
        gameRows.push(y)
    }


function updateCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(character.x,character.y,tileSide,tileSide);
    ctx.stroke();
    ctx.endPath();
}




document.addEventListener('keydown', keyPressed);

function keyPressed(e) {
    var key = e.which;
    if (key == 37 && character.x > gameColumns[0]) {
        character.x += -tileSide;
    }  else if (key == 39 && character.x + tileSide < canvas.width) {
        character.x += tileSide;
    }   else if (key == 38 && character.y > gameRows[0]) {
        character.y += -tileSide;
    }   else if (key == 40 && character.y + tileSide < canvas.height) {
        character.y += tileSide;
    }
    updateCharacter()
}


document.onload = updateCharacter();
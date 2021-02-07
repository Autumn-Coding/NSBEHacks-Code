var container = document.getElementById("container")
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 500;
    canvas.style.position = "absolute";
    canvas.style.border   = "1px solid";
    canvas.style.backgroundColor = 'grey';
    container.appendChild(canvas);

    var character = {
        x: 50,
        y: 50
    };

    var tileSize = {
        width: canvas.width/40,
        height: canvas.height/20
    }
    var columns = [];
    var rows = [];

    

function updateCharacter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(character.x,character.y,50,50);
    ctx.stroke();
    ctx.endPath();
    ctx.fillText(columns,10,10);
}




document.addEventListener('keydown', keyPressed);

function keyPressed(e) {
    var key = e.which;
    if (key == 37 && character.x > 0) {
        character.x += -50;
    }  else if (key == 39 && character.x + 50 < canvas.width) {
        character.x += 50;
    }   else if (key == 38 && character.y > 0) {
        character.y += -50;
    }   else if (key == 40 && character.y + 50 < canvas.height) {
        character.y += 50;
    }
    updateCharacter()
}


document.onload = updateCharacter();
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);


canvas.style.backgroundColor = 'grey';
var hero = {
    x: 0,
    y: 0
};

function updateHero() {
ctx.beginPath();
ctx.rect(hero.x,hero.y,10,10);
ctx.stroke();
ctx.endPath();
}

updateHero()


canvas.onkeypress = function(e) {
    var key = e.which;
    if (key == 37) {
        hero.x += -10
    }  else if (key == 39) {
        hero.x += 10
    }   else if (key == 38) {
        hero.y += 10
    }   else if (key == 40) {
        hero.y += -10
    }
    updateHero()
}
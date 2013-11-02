var canvas = document.getElementById('game'); //Get canvas

//Check & get context
var context = canvas.getContext && canvas.getContext('2d');
if(!context){
    // No 2d context found, alert the user
    alert("Please upgrade to modern browser.");
}else{
    startGame();
}


/*function startGame(){
    context.fillStyle = "#FFFF00";
    context.fillRect(50,100,380,400);

    //Second rect, semitransparent this time
    context.fillStyle = "rgba(0,0,128,0.5);";
    context.fillRect(25,50,380,400);

    var img = new Image();
    img.onload = function(){
        context.drawImage(img,0,0,37,42,100,100,37,42);
    }
    img.src = "res/sprites.png";
}*/

function startGame()
{
    SpriteSheet.load(
            {ship:{ sx: 0, sy: 0, w:37, h:42, frames:3 },
                enemy:{sx: 37, sy:0, w:42, h:42}},
            function(){
                SpriteSheet.draw(context, "ship", 0, 0);
                SpriteSheet.draw(context, "enemy", 100, 50);
                SpriteSheet.draw(context, "ship", 150, 100, 1);
            });

}



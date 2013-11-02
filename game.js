var sprites = {
    ship:{ sx: 0, sy:0, w:37, h:42, frames:1 }
};

var startGame = function(){
    Game.setBoard(0, new Starfield(20,0.4,100,true));
    Game.setBoard(1, new Starfield(50,0.6,100));
    //Game.setBoard(2, new StarShip());
    Game.setBoard(2, new Starfield(100,1.0,50));
    Game.setBoard(3, new TitleScreen("Alien Invasion",
                                     "Press Space to start game", playGame));
    
    
     
}
// Зпауск происходит по окончании загрузки документа
window.addEventListener("load", function(){
        Game.initialize("game", sprites,startGame);
});

var playGame = function(){
     Game.setBoard(3, new TitleScreen("Alien Invasion","Game started..."));
}
var Starfield = function(speed, opacity, numStars, clear)
{
    // Установка внеэкранного холста
    var starsCanvas = document.createElement("canvas");
    starsCanvas.width = Game.width;
    starsCanvas.height = Game.height;
    var starsContext = starsCanvas.getContext("2d");
    
    var offset = 0; // Сдвиг поля при скроллинге
    
    // Если установлена опция clear,
    // сделать задний план тёмным взамен прозрачного
    if (clear){
        starsContext.fillStyle = "#000";
        starsContext.fillRect(0,0,starsCanvas.width, starsCanvas.hieght);
    }
    
    // Теперь прорисуем случайное количество 2-пиксельных прямоугольников
    // на внеэкранный холст.
    starsContext.fillStyle = "#FFF";
    starsContext.globalAlpha = opacity;
    for (var i=0;i<numStars;i++){
        starsContext.fillRect(Math.floor(Math.random()*starsCanvas.width),
                              Math.floor(Math.random()*starsCanvas.height),
                              2, 2);
    }
    
    // Этот метод вызывается в каждом кадре
    // для прорисовки поля на основной холст
    this.draw = function(context){
        var intOffset = Math.floor(offset);
        var remaining = starsCanvas.height - intOffset;
        
        // Прорисовка верхней части холста
        if (intOffset > 0) {
            context.drawImage(starsCanvas, 0, remaining,
                              starsCanvas.width, intOffset,
                              0, 0,
                              starsCanvas.width, intOffset);
        }
        
        // Прорисовка верхней части холста
        if (remaining > 0){
            context.drawImage(starsCanvas, 0,0,starsCanvas.width, remaining,
                              0,intOffset, starsCanvas.width, remaining);
        }
    }
    
    this.step = function(dt){
        offset += dt * speed;
        offset = offset % starsCanvas.height;
    }
    
}

var StarShip = function()
{
    this.draw = function(){
        SpriteSheet.draw(Game.context, "ship", 100,100,0);
    };
    
    this.step = function()
    {
        
    }
}

var TitleScreen = function(title, subtitle, callback)
{
    this.step = function(dt){
        if (Game.keys['fire'] && callback) callback();
    };
    
    this.draw = function(context){
        context.fillStyle = "FFFFFF";
        context.textAlign = "center";
        
        context.font = "bold 40px bangers";
        context.fillText(title, Game.width/2, Game.height/2);
        
        context.font = "bold 20px bangers";
        context.fillText(subtitle, Game.width/2, Game.height/2 + 60)
    }
}





















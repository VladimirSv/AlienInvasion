/* SpriteSheet - класс, управляющий атласом спрайтов: загрузка, управление
 * тайлами, отрисовка. */

var Game = new function(){

    // Инициализация
    this.initialize = function(canvasElementId, sprite_data, callback){
        this.canvas = document.getElementById(canvasElementId);
        this.width = this.canvas.width;
        this.height = this.canvas.height;


        // Установка контекста для рендеринга
        this.context = this.canvas.getContext && this.canvas.getContext('2d');
        if(!this.context){return alert("Please upgrade your browser to play.");}
        
        // Обработка ввода
        this.setupInput();

        // Запус игрового цикла - start the game loop.
        this.loop();

        // Загрузка карты спрайтов и передача функции обратного вызова
        SpriteSheet.load(sprite_data, callback);
    };

    // Обработка ввода
    var KEY_CODES = {37:'left', 39:'right', 32:'fire'};
    this.keys = {};

    this.setupInput = function(){
        window.addEventListener('keydown', function(e){
            if(KEY_CODES[event.keyCode]){
                Game.keys[KEY_CODES[event.keyCode]] = true;
                e.preventDefault();
            }
        }, false);

         window.addEventListener('keyup', function(e){
            if(KEY_CODES[event.keyCode]){
                Game.keys[KEY_CODES[event.keyCode]] = false;
                e.preventDefault();
            }
        }, false);
    }

    // Игровой цикл - Game loop
    var boards = [ ];
    
    this.emptyCanvas = function()
    {
        oldFillStyle = Game.context.fillStyle;
        Game.context.fillStyle = "#000";
        Game.context.fillRect(0,0,Game.canvas.width,Game.canvas.height);
        Game.context.fillStyle = oldFillStyle;
    }
    
    this.loop = function(){
        var dt = 30 / 1000;
        Game.emptyCanvas();
        for(var i=0,len=boards.length; i<len;i++){
            if(boards[i]){
                boards[i].step(dt);
                boards[i] && boards[i].draw(Game.context); // boards[i] check keeps the code from boom 
            }
        }

        setTimeout(Game.loop, 30);
    }
    
    // Change an active game board
    this.setBoard = function(num, board){ boards[num] = board; };
    


}


var SpriteSheet = new function(){ // new делает класс синглтоном
    this.map = { };
    this.load = function(spriteData, callback){ // Загрузка карты спрайтов
        this.map = spriteData;
        this.image = new Image();
        this.image.onload = callback; // Обратный вызов по завершении загрузки
        this.image.src = "res/sprites2.png";
    };
    this.draw = function(context, sprite, x,y, frame){
        var s = this.map[sprite];
        if(!frame) frame = 0;
        context.drawImage(this.image, s.sx + frame*s.w,
                s.sy,
                s.w, s.h,
                x, y,
                // Math.floor(x), Math.floor(y),
                s.w, s.h);
    }

}

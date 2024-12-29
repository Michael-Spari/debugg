class GameOver extends DrawableObjects {
    constructor() {
        super();
        this.loadImage('img/debugger/10_game_over/game_over.png');
        this.x = -1000;
        this.y = 100;
        this.width = 500;
        this.height = 300;
    }

// draw(ctx) {
//     super.draw(ctx);    
//     ctx.fillStyle = 'black';
//     ctx.font = '50px mpluscoad';  
//     ctx.fillText('Game Over', this.x, this.y);
//     ctx.fillText('Press F5 to restart', this.x, this.y + 50);
//     }
}

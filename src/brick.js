import { detectCollision } from "./collision.js";

export default class Brick {
    constructor(game,position){
        this.image = document.getElementById('img-brick')
        this.width = 80;
        this.height = 24;
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.position = position
        this.markedForDeletion = false;

    }
    update(){
        if(detectCollision(this.game.ball,this)){
            this.game.ball.speed.y = -this.game.ball.speed.y
            this.markedForDeletion = true;
        }

    }
    draw(ctx){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }
}
import Paddle from './paddle.js';
import InputHandler from './input.js'
import Ball from './ball.js'
import Brick from './brick.js'
import { buildLevel, level1, level2, level3, level4, level5, level6, level7, level8, level9, level10 } from './levels.js'

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
}



export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.gameObjects = [];
        this.lives = 3;
        this.bricks = [];
        new InputHandler(this.paddle, this);
        this.levels = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10]
        this.currentLevel = 0
    }
    start() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.paddle, this.ball]
        this.gamestate = GAMESTATE.RUNNING


    }

    togglePause() {
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        }
        else {
            this.gamestate = GAMESTATE.PAUSED;
        }

    }
    draw(ctx) {

        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx))
        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,0.5)'
            ctx.fill()

            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Paused', this.gameWidth / 2, this.gameHeight / 2)
        }
        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()

            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Press Space to Start', this.gameWidth / 2, this.gameHeight / 2)
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,1)'
            ctx.fill()

            ctx.font = '30px Arial';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', this.gameWidth / 2, this.gameHeight / 2)
        }


    }

    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;
        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        };
        [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime))
        // Removing hit bricks
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion)



    }

}

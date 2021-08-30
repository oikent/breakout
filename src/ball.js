import { detectCollision } from './collision.js';

export default class Ball {
    constructor(game) {
        this.image = document.getElementById('img-ball')
        this.size = 15;
        this.game = game;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.reset();
    }

    reset() {
        this.position = {
            x: 10,
            y: 200
        }
        this.speed = {
            x: 4,
            y: 4
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size)
    }
    update(deltaTime) {
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        // wall left & right
        if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
            this.speed.x = -this.speed.x
        }
        // top
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y
        }

        //bottom
        if (this.position.y > this.gameHeight - this.size) {
            this.game.lives--
            this.reset()
        }
        //paddle collision
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size
        }


    }
}
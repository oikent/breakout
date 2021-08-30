export default class InputHandler {
    constructor(paddle,game) {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    paddle.moveLeft();
                    break
                case 'ArrowRight':
                    paddle.moveRight();
                    break
                case 'Escape':
                    game.togglePause();
                    break
                case 'Space':
                    game.start()
                    
                    break

            }
        });
        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    // if statment provides stutterless movement
                    if (paddle.speed < 0) paddle.stop();
                    break
                case 'ArrowRight':
                    // if statment provides stutterless movement
                    if (paddle.speed > 0) paddle.stop();
                    break

            }
        });
    }

}
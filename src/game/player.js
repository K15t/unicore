import constants from '../constants';

export default class Player {

    constructor(game) {
        this.game = game;

        this.rocketcorn = game.add.sprite(200, 200, 'rocketcorn');
        this.rocketcorn.anchor = {x:.5,y:.5};
        this.rocketcorn.angle = 20;

        // setting height modifies scale
        this.rocketcorn.height = constants.ROCKETCORN_SIZE;
        this.rocketcorn.width = constants.ROCKETCORN_SIZE;

        this.rocketcorn.scale.x *= -1
    }

    update() {
        const game = this.game;

        const keyboard = this.getKeyboardControls();
        const mouse = this.getMouseControls();



        const verticalMovement = (keyboard.down - keyboard.up) ;
        const verticalDelta = verticalMovement * constants.VERTICAL_VELOCITY;
        const newYPosition = this.rocketcorn.y + verticalDelta;

        const minPosition = 60 + constants.ROCKETCORN_SIZE / 2; // score bar is 60px high
        const maxPosition = 600 - constants.ROCKETCORN_SIZE / 2;

        console.log(verticalDelta);

        // lock to bounds
        this.rocketcorn.y = Math.max(Math.min(newYPosition, maxPosition), minPosition);

    }

    getKeyboardControls() {
        const game = this.game;
        return {
            up: (game.input.keyboard.isDown(Phaser.Keyboard.UP)||game.input.keyboard.isDown(Phaser.Keyboard.W))?1:0,
            down: (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)||game.input.keyboard.isDown(Phaser.Keyboard.S))?1:0
        };
    }
    // TODO
    getMouseControls() {
        return this.game.input.mouse.wheelDelta;
    }
}

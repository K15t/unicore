import constants from '../constants';

export default class Player {

    constructor(game) {
        this.game = game;

        this.rocketcorn = game.add.sprite(200, 200, 'rocketcorn')
        this.rocketcorn.anchor = {x:.5,y:.5}
        this.rocketcorn.angle = 20
        this.rocketcorn.scale.x = -1
    }

    update() {
        const game = this.game;

        const controls = this.getControls();
        const verticalMovement = controls.down - controls.up;
        this.rocketcorn.y += verticalMovement * constants.VERTICAL_VELOCITY;

    }

    getControls() {
        const game = this.game;
        return {
            up: (game.input.keyboard.isDown(Phaser.Keyboard.UP)||game.input.keyboard.isDown(Phaser.Keyboard.W))?1:0,
            down: (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)||game.input.keyboard.isDown(Phaser.Keyboard.S))?1:0
        };
    }
}

import constants from '../constants';

export default class World {
    constructor(game) {

        this.x = 0
        this.width = game.width
        this.height = game.height
        this.velocity = constants.START_VELOCITY

        this.background = game.add.group()
        this.background.create(0, 0, 'sky')
        this.background.create(this.width, 0, 'sky')

        console.log(this);



        // var graphics = game.add.graphics(10,10)
        // graphics.beginFill(0xff0000);
        // graphics.drawCircle(50, 50, 100);
        // graphics.endFill();
    }

    update() {
        this.moveBackground()
    }

    moveBackground() {
        if (this.background.x < -this.width) {
            this.background.x = 0
            this.x = this.background.x
        }
        this.background.x -= this.velocity
    }

    accellerate() {
        this.moveBackground()
        this.velocity += .1
    }
}

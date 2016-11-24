import Score from './score'

export default class World {
    constructor(game) {

        this.width = game.width
        this.height = game.height
        this.velocity = 1
        this.score = new Score()

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
        this.velocity += .01
    }

    moveBackground() {
        if (this.background.x < -this.width) {
            this.background.x = 0
        }
        this.background.x -= this.velocity
    }
}

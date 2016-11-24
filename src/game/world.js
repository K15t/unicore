export default class World {
    constructor(game) {

        this.width = game.width
        this.height = game.height
        this.velocity = 1
        this.score


        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#4AAAFF';
        this.background = game.add.group()

        this.background.create(0, 0, 'sky')
        this.background.create(this.width, 0, 'sky')

        this.rocketcorn = game.add.sprite(200, 200, 'rocketcorn')
        this.rocketcorn.anchor = {x:.5,y:.5}
        this.rocketcorn.angle = 20
        this.rocketcorn.scale.x *= -1


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
        }
        this.background.x -= this.velocity
    }
}

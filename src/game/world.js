export default class World {
    constructor(game) {

        this.width = game.width
        this.height = game.height
        this.velocity = 1


        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#4AAAFF';
        this.background = game.add.sprite(0, 0, 'sky')
        this.rocketcorn = game.add.sprite(100, 100, 'rocketcorn')
        this.rocketcorn.anchor = {x:.5,y:.5}
        this.rocketcorn.angle = 90
        this.rocketcorn.scale.x = -1
        this.rocketcorn.scale.y = -1


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

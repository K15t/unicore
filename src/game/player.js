import constants from '../constants';

export default class Player {

    constructor(game) {
        this.game = game;
        this.velocity = 1;
        this.y = 0
        this.moving = true
        this.trail = []

        this.coins = 0;

        this.rocketcorn = game.add.sprite(game.width/4, game.height/2, 'rocketcorn');
        this.rocketcorn.anchor = {x:.5,y:.5};
        this.rocketcorn.angle = 40;

        // setting height modifies scale
        this.rocketcorn.height = constants.ROCKETCORN_SIZE;
        this.rocketcorn.width = constants.ROCKETCORN_SIZE;

        this.rocketcorn.scale.x *= -1

        this.rocketcorn.health = 10;

        game.physics.arcade.enable(this.rocketcorn);
    }

    generateTrail() {
        let colors = [0xf28582,0xe2e04d,0x74af28,0x50b9ff,0xa797db]
        let trail = this.game.add.group()
        let trailPart = {}
        const trailHeight = (this.rocketcorn.height / 5) / colors.length
        for (var index in colors) {
            trailPart = this.game.add.graphics(0,0)
            trailPart.beginFill(colors[index])
            trailPart.drawRect(0,index*trailHeight,trailHeight,trailHeight)
            trailPart.endFill()
            trail.add(trailPart)
        }
        trail.x = this.rocketcorn.x + this.rocketcorn.width/2
        trail.y = this.rocketcorn.y
        this.trail.unshift(trail)
        if (this.trail.length > 70) {
            this.trail.pop()
        }
        for (var index in this.trail) {
            var rainbow = this.trail[index]
            rainbow.x = this.rocketcorn.x-(trailHeight*index)
        }
    }

    update(isPlaying) {
        const game = this.game;

        const keyboard = this.getKeyboardControls();
        const mouse = 0; //this.getMouseControls();

        this.generateTrail()

        let verticalMovement = (keyboard.down - keyboard.up);
        if (!verticalMovement) {
            if (!this.moving) {
                verticalMovement = this.velocity / 2
            }
            this.moving = false
        } else {
            this.moving = true
        }
        if(isPlaying) {
            this.velocity = verticalMovement * constants.VERTICAL_VELOCITY;
            const newYPosition = this.rocketcorn.y + this.velocity;

            const minPosition = game.height * .1 + constants.ROCKETCORN_SIZE / 2; // score bar is 60px high
            const maxPosition = game.height - constants.ROCKETCORN_SIZE / 2;

            // lock to bounds
            this.rocketcorn.y = Math.max(Math.min(newYPosition, maxPosition), minPosition);

            if (this.rocketcorn.invulnerability > 0) {
                const blinkAlpha = (this.rocketcorn.invulnerability) % 30;
                this.rocketcorn.alpha = blinkAlpha;
                this.rocketcorn.invulnerability -= 1;
            }
        }
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

    getSprite() {
        return this.rocketcorn;
    }
}

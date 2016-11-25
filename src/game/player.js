import constants from '../constants';

export default class Player {

    constructor(game) {
        this.game = game;
        this.velocity = 1;
        this.y = 0
        this.moving = true
        this.trail = [];
        this.trailGroup = undefined;

        this.coins = 0;

        this.generateInitialTrail();
        this.lastYPos = [];

        this.rocketcorn = game.add.sprite(game.width/4, game.height/2, 'rocketcorn');
        this.rocketcorn.anchor = {x:.5,y:.5};
        this.rocketcorn.angle = 40;

        // setting height modifies scale
        this.rocketcorn.height = constants.ROCKETCORN_SIZE;
        this.rocketcorn.width = constants.ROCKETCORN_SIZE;

        this.rocketcorn.scale.x *= -1

        this.rocketcorn.health = constants.START_LIVES;

        game.physics.arcade.enable(this.rocketcorn);

        this.rocketcorn.invulnerability = 0;
        this.rocketcorn.body.collideWorldBounds = true;
        this.rocketcorn.body.setSize(constants.ROCKETCORN_SIZE, constants.ROCKETCORN_SIZE, constants.ROCKETCORN_SIZE  * 0.65, constants.ROCKETCORN_SIZE * 0.75);
    }

    addTrail(){
        let colors = [0xf28582,0xe2e04d,0x74af28,0x50b9ff,0xa797db]

        let trail = this.game.add.group()
        let trailPart = {}
        const trailHeight = (constants.ROCKETCORN_SIZE / 5) / colors.length
        for (var index in colors) {
            trailPart = this.game.add.graphics(0, 0)
            trailPart.beginFill(colors[index])
            trailPart.drawRect(0, index * trailHeight, trailHeight, trailHeight)
            trailPart.endFill()
            trail.add(trailPart)
        }


        trail.x = 0;
        trail.y = 0;
        this.trail.unshift(trail)
        this.trailGroup = trail;
    }

    generateInitialTrail() {
        for(let i = 0; i < 70; ++i){
            this.addTrail();
        }
    }

    updateTrail() {
        this.lastYPos.unshift(this.rocketcorn.y);

        if(this.lastYPos.length > 70){
            this.lastYPos.pop();
        }


        let colors = [0xf28582,0xe2e04d,0x74af28,0x50b9ff,0xa797db]
        const trailHeight = (constants.ROCKETCORN_SIZE / 5) / colors.length


        for (var index in this.trail) {
            var rainbow = this.trail[index]
            rainbow.x = this.rocketcorn.x-(trailHeight*index)
            rainbow.y = this.lastYPos[index];
        }
    }

    update(isPlaying) {
        const game = this.game;

        this.updateTrail()

        if(this.rocketcorn.body){
            //this.rocketcorn.body.maxGravity.y = constants.GRAVITY;
            this.rocketcorn.body.gravity.y = isPlaying?constants.GRAVITY:0;
        }

        if(isPlaying) {
            let verticalMovement = this.getKeyboardControls();
            if (!verticalMovement) {
                if (!this.moving) {
                    //verticalMovement = this.rocketcorn.body.velocity.y / 2
                }
                this.moving = false
            } else {
                this.moving = true
            }

            const boost =  (this.getSprite().health > 0)?(verticalMovement * constants.VERTICAL_VELOCITY):0;

            this.rocketcorn.body.gravity.y -= boost;

            if (this.rocketcorn.invulnerability > 0) {
                const blinkAlpha = ((this.rocketcorn.invulnerability) / 20) % 2;
                const alpha =  blinkAlpha > 1 ? 1 : 0;
                this.rocketcorn.alpha = alpha;

                /*
                if(this.invulnerabilityType === 'hurt'){
                    this.rocketcorn.tint = 0xFFFF00;
                }else{
                    const tintArray = [0xf28582,0xe2e04d,0x74af28,0x50b9ff,0xa797db];
                    const tintIndexBlink = blinkAlpha * tintArray.length;
                    this.rocketcorn.tint = tintArray[tintIndexBlink];
                }
                */

                this.trail.forEach((t) => {
                    t.alpha = alpha;
                });
                this.rocketcorn.invulnerability -= 1;

            }else{
                this.rocketcorn.tint = 0xFFFFFF;
                this.rocketcorn.alpha = 1;
                this.trail.forEach((t) => {
                    t.alpha = 1;
                });
            }
        }
    }

    getKeyboardControls() {
        const game = this.game;
        const keypress = game.input.keyboard.isDown(Phaser.Keyboard.UP)||game.input.keyboard.isDown(Phaser.Keyboard.W)||game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);

        return keypress?1:0;
    }
    // TODO
    getMouseControls() {
        return this.game.input.mouse.wheelDelta;
    }

    getSprite() {
        return this.rocketcorn;
    }
}

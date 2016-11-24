import World from '../game/world'

export default class Game extends Phaser.State {

    init() {
        console.log('init game state');
    }

    preload() {
        this.game.load.image('sky', require('../assets/sky.jpg'))
        this.game.load.image('rocketcorn', require('../assets/rocketcorn.png'))
    }

    create() {
        this.world = new World(this.game)
    }

    update() {
        this.world.update()
        // TODO update systems: collision
    }

    shutdown() {

    }

}

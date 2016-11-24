import World from '../game/world'
import Score from '../game/score'
import Player from '../game/player';

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
        this.player = new Player(this.game);
        this.score = new Score(this.game)
    }

    update() {
        this.world.update();
        this.player.update();
        this.score.add(this.world.velocity*10)
        // TODO update systems: collision
    }

    shutdown() {

    }

}

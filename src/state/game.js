import World from '../game/world'
import Score from '../game/score'
import Player from '../game/player';

export default class Game extends Phaser.State {

    init() {
        console.log('init game state');
        this.interval = 0
    }

    preload() {
        this.game.load.image('sky', 'assets/images/sky.jpg')
        this.game.load.image('rocketcorn', 'assets/images/rocketcorn.png')
    }

    create() {
        this.world = new World(this.game)
        this.player = new Player(this.game);
        this.score = new Score(this.game)
    }

    update() {
        this.interval += 1
        this.player.update();
        this.world.update();

        if (this.interval % 60 == 0) {
            this.world.accellerate();
            this.score.update()
            this.score.add(this.world.velocity*10)
        }
        // TODO update systems: collision
    }

    shutdown() {

    }

}

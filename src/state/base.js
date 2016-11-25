import World from '../game/world'
import Score from '../game/score'
import Player from '../game/player';

import constants from '../constants';

export default class Base extends Phaser.State {

    init() {
        this.interval = 0;
        this.isPlaying = false;
    }

    preload() {
        this.game.load.image('sky', 'assets/images/sky.jpg')
        this.game.load.image('rocketcorn', 'assets/images/rocketcorn.png')
        this.game.load.image('obstacle', 'assets/images/obstacle.png')
        this.game.load.image('pickup', 'assets/images/coin.png')
    }

    create() {
        this.world = new World(this.game)
        this.player = new Player(this.game);
        this.score = new Score(this.game)

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.time.advancedTiming = true;
    }

    update(gameoverCallback) {
        this.interval += 1
        this.player.update(this.isPlaying, this.world.velocity);
        this.world.update(this.isPlaying);

        if (this.isPlaying) {
            if (this.interval % 60 == 0) {
                this.world.accellerate();
                this.score.update()
                this.score.add(this.world.velocity * 10)
            }

            this.checkCollisions(gameoverCallback || this.gameover);
        }
    }

    render(){
        this.game.debug.body(this.player.getSprite(), '#FFFFFF',false);
        const pickups = this.world.getPickups();
        pickups.forEach((p) => {
            this.game.debug.body(p, '#00FF00',false);
        });

        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");

    }

    checkCollisions(gameoverCallback) {
        const game = this.game;
        const playerSprite = this.player.getSprite();
        const obstacles = this.world.getObstacles();
        const pickups = this.world.getPickups();

        obstacles.forEach((obstacle) => {
            game.physics.arcade.overlap(playerSprite, obstacle, this.collideObstacle.bind(this, gameoverCallback, playerSprite));
        });

        game.physics.arcade.overlap(playerSprite, pickups, this.collidePickup.bind(this));
    }

    collideObstacle(gameoverCallback, player) {
        if(player.invulnerability <= 0) {
            if (player.health > 0) {
                player.damage(1);
                if (player.alive) {
                    player.invulnerability = 60 * constants.INVULNERABILITY_TIME;
                } else {
                    gameoverCallback.call(this);
                }
            } else {
                gameoverCallback.call(this);
            }
        }
    }

    collidePickup(player, pickup) {
        // TODO: powerups


        player.coins++;

        if(player.coins >= constants.COINS_FOR_NEW_LIFE){
            player.coins -= constants.COINS_FOR_NEW_LIFE;
            player.lives += 1;
        }

        pickup.body.destroy();
        pickup.kill();
    }

    gameover() {

    }

    shutdown() {

    }

}

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
        this.game.load.image('coin', 'assets/images/coin.png');
        constants.POWERUPS.forEach((pu) => {
            this.game.load.image(pu, 'assets/images/'+ pu +'.png');
        });
        constants.OBSTACLES.forEach((pu) => {
            this.game.load.image(pu, 'assets/images/'+ pu +'.png');
        });

    }

    create() {
        this.world = new World(this)
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
            if (this.player.getSprite().health > 0 && this.interval % constants.FRAMERATE == 0) {
                this.world.accellerate();
                this.score.update()
                this.score.add(this.world.velocity * 10)
            }

            this.checkCollisions(gameoverCallback || this.gameover);
        }
    }


    checkCollisions(gameoverCallback) {
        const game = this.game;
        const playerSprite = this.player.getSprite();
        const obstacles = this.world.getObstacles();
        const pickups = this.world.getPickups();

        obstacles.forEach((obstacle) => {
            game.physics.arcade.overlap(playerSprite, obstacle, this.collideObstacle.bind(this, gameoverCallback, playerSprite));
        });

        game.physics.arcade.overlap(playerSprite, pickups, this.collidePickup.bind(this, this.player));
    }

    playerDeath(gameoverCallback, player){
        const timer = this.game.time.create(false);
        timer.add(2000, () =>{
            gameoverCallback.call(this);
        });
        timer.start();

        player.body.angularVelocity = 360;
        player.body.collideWorldBounds = false;
    }

    collideObstacle(gameoverCallback, player) {
        if(player.invulnerability <= 0) {
            if (player.health > 1) {
                player.damage(1);
                if (player.health > 1) {
                    player.invulnerability = 60 * constants.INVULNERABILITY_TIME;
                    player.invulnerabilityType = 'hurt';
                } else {
                    this.world.velocity = 0;

                    this.playerDeath(gameoverCallback, player);
                }
            } else {
                this.playerDeath(gameoverCallback, player);
            }
        }
    }

    collidePickup(player, playerSprite, pickup) {
        // TODO: powerups

        if(pickup.pickupType === 'coin'){
            player.coins++;

            if(player.coins >= constants.COINS_FOR_NEW_LIFE){
                player.coins -= constants.COINS_FOR_NEW_LIFE;
                playerSprite.heal(1);
            }


        }else{
            switch(pickup.pickupType){
                case 'TRSL':
                case 'VSN':
                    playerSprite.invulnerability = constants.POWERUP_INVULNERABILITY_DURATION * 60;
                    playerSprite.invulnerabilityType = 'powerup';
                    break;
                case 'ALX':
                case 'BAC':
                case 'OFCE':
                    this.world.velocity *= constants.POWERUP_SLOWDOWN;
                    break;
            }
        }

        pickup.destroy();

    }

    gameover() {

    }

    shutdown() {

    }

}

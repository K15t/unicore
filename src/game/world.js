import constants from '../constants';

export default class World {
    constructor(game) {
        this.game = game;

        this.x = 0;
        this.width = game.width;
        this.height = game.height;
        this.velocity = constants.START_VELOCITY;

        this.background = game.add.group();
        this.background.create(0, 0, 'sky');
        this.background.create(this.width, 0, 'sky')

        this.obstacles = [];
        this.pickups = [];

        game.world.bounds.height = game.height  * 0.9;
        game.world.bounds.y = game.height  * 0.1;

        game.physics.arcade.setBoundsToWorld();

        game.physics.arcade.skipQuadTree = true;


    }

    update(isPlaying) {
        this.moveBackground();
        if(isPlaying) {
            this.spawnNewWorldObjects();
            this.moveWorldObjects();
            this.despawnOldWorldObjects();
        }
    }

    moveBackground() {
        if (this.background.x < -this.width) {
            this.background.x = 0
        }
        this.background.x -= this.velocity
    }

    spawnNewWorldObjects(){
        // TODO better spawn positioning
        const spawnObstacle = !(Math.floor(Math.random() * 60 * 1));

        if(spawnObstacle){
            const yPos = 60 + Math.random() * 600;
            const newObstacle = this.game.add.sprite( this.x + 800, yPos, 'obstacle' );
            this.game.physics.arcade.enable(newObstacle);

            newObstacle.body.allowGravity = false;
            this.obstacles.push(newObstacle);
        }

        // TODO: pickups
        const spawnPickup = !(Math.floor(Math.random() * 60 * 1));

        if(spawnPickup){
            const yPos = 60 + Math.random() * 600;
            const newPickup = this.game.add.sprite( this.x + 700, yPos, 'pickup' );
            this.game.physics.arcade.enable(newPickup);
            newPickup.body.allowGravity = false;
            this.pickups.push(newPickup);
        }
    }

    moveWorldObjects() {
        const moveObject = (obj) => {
            obj.x -= this.velocity
        };
        this.obstacles.forEach(moveObject, this);
        this.pickups.forEach(moveObject, this);
    }

    despawnOldWorldObjects() {
        const aliveFilter = (obj) => ( obj.x > -100 );
        const deadFilter = (obj) => ( obj.x <= -100 );
        const killFunction = (obj) => { obj.destroy(); obj.kill() };

        this.obstacles.filter(deadFilter).forEach(killFunction);
        this.pickups.filter(deadFilter).forEach(killFunction);

        this.obstacles = this.obstacles.filter(aliveFilter);
        this.pickups = this.pickups.filter(aliveFilter);
    }

    getPickups(){
        return this.pickups;
    }

    getObstacles() {
        return this.obstacles;
    }


    accellerate() {
        this.velocity += .1
        this.x += this.velocity
    }
}

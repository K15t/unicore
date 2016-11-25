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

        this.timeSinceLastObstacle = 0;
        this.obstacleSpawner = game.height / 2;
        this.obstacleSpawnerDirection = 1;
        this.obstacleSpawnerSpeed = 1;

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
        let spawnSpeedModifier = 1;
        if(this.velocity > 4){
            spawnSpeedModifier = Math.sqrt(Math.sqrt(this.velocity));
        }
        this.timeSinceLastObstacle += ((this.game.time.elapsedMS) * spawnSpeedModifier) / 1000;
        let spawnObstacle = this.timeSinceLastObstacle > constants.SPAWN_OBSTACLES_EVERY_SEC;

        if(spawnObstacle){
            const powerupSpriteIndex = Math.floor( Math.random() * constants.OBSTACLES.length );
            const obstacleType = constants.OBSTACLES[powerupSpriteIndex];

            const yPos = this.obstacleSpawner;
            const newObstacle = this.game.add.sprite( this.x + 800, yPos, obstacleType );
            this.game.physics.arcade.enable(newObstacle);

            newObstacle.body.allowGravity = false;


            newObstacle.height = 100;
            newObstacle.width = 100;

            this.obstacles.push(newObstacle);

            this.timeSinceLastObstacle = 0;
        }

        if( this.obstacleSpawner > this.game.height ){
            this.obstacleSpawnerDirection = -1;
        }else if( this.obstacleSpawner < this.game.height * 0.1){
            this.obstacleSpawnerDirection = 1;
        }
        this.obstacleSpawner += this.obstacleSpawnerDirection * this.obstacleSpawnerSpeed;
        this.obstacleSpawnerSpeed = Math.random() * 5;

        const spawnPickup = !(Math.floor(Math.random() * 60 * constants.SPAWN_PICKUPS_EVERY_SEC * spawnSpeedModifier));

        if(spawnPickup){
            const isCoin = !!Math.floor(Math.random() * 10);

            let pickupType = 'coin';
            if(!isCoin){
                const powerupSpriteIndex = Math.floor( Math.random() * constants.POWERUPS.length );
                pickupType = constants.POWERUPS[powerupSpriteIndex];
            }

            const yPos = 60 + Math.random() * 600;
            const newPickup = this.game.add.sprite( this.x + 800, yPos, pickupType );
            this.game.physics.arcade.enable(newPickup);
            newPickup.body.allowGravity = false;

            newPickup.pickupType = pickupType;

            newPickup.height = 70;
            newPickup.width = 70;

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

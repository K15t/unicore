

export default class Highscore extends Phaser.State {

    init() {

    }

    preload() {

    }

    create() {
        super.create();

        this.isPlaying = false;

        const game = this.game;

        const startButton = game.add.button(game.world.centerX - 100, 200, 'startButton', this.gotoGameState.bind(this));
    }

    update() {
        // go to different state with this.state.start()
        // this.state.start('game');
    }

    shutdown() {

    }

}

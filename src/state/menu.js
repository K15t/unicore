export default class Menu extends Phaser.State {

    init() {
        console.log('init main state');
    }

    preload() {

    }

    create() {
        const game = this.game;

        const startButton = game.add.button(game.world.centerX - 100, 200, 'startButton', this.gotoGameState.bind(this));
        const highscoreButton = game.add.button(game.world.centerX - 100, 400, 'highscoreButton', this.gotoHigscoreState.bind(this), 0, 1, 2);
    }

    update() {
        // go to different state with this.state.start()
        //this.state.start('game');
    }

    shutdown() {

    }


    gotoGameState() {
        this.state.start('game');
    }

    gotoHigscoreState() {
        this.state.start('highscore');
    }

}
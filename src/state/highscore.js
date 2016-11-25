import BaseState from './base';

export default class Highscore extends BaseState {

    init() {

    }

    preload() {

    }

    create() {
        super.create();

        this.isPlaying = false;
        this.score.getScores()

        const game = this.game;

        const startButton = game.add.button(game.world.centerX - 100, 200, 'startButton', ()=>{this.state.start('game')});
    }

    update() {
        super.update()
        // go to different state with this.state.start()
        // this.state.start('game');
    }

    shutdown() {

    }

}

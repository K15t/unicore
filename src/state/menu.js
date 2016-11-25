//export const SCORE = new Score()

import BaseState from './base';

export default class Menu extends BaseState {

    init() {
        console.log('init main state');
    }


    create() {
        super.create();

        this.isPlaying = false;

        const game = this.game;

        const buttonTextStyle = {
            fill: '#FFFFFF',
                font: '30px Bungee',
        };

        const startButton = game.add.button(game.world.centerX - 100, 200, 'startButton', this.gotoGameState.bind(this));
        const startButtonText = game.add.text(game.world.centerX - 30, 220, 'Lift off',buttonTextStyle);
        const highscoreButton = game.add.button(game.world.centerX - 100, 400, 'highscoreButton', this.gotoHigscoreState.bind(this), 0, 1, 2);
        const highscoreButtonText = game.add.text(game.world.centerX - 50, 420, 'Highscores', buttonTextStyle);
    }



    gotoGameState() {
        this.state.start('game');
    }

    gotoHigscoreState() {
        this.state.start('highscore');
    }

}

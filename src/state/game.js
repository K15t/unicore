import World from '../game/world'
import Score from '../game/score'
import Player from '../game/player';

import BaseState from './base';

import constants from '../constants';

export default class Game extends BaseState {

    init(score) {
        this.interval = 0;
        if (score) {
            this.highScore = score
        }

    }

    update() {
        super.update(this.gameover);
    }

    create() {
        super.create();
        this.score.highScore = this.highScore
        console.log(this.highScore);

        this.isPlaying = true;
    }

    gameover() {
        this.state.start('highscore', true, false, this.score.score)

        console.log("GAMEOVER");
    }

    shutdown() {

    }

}

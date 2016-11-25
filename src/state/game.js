import World from '../game/world'
import Score from '../game/score'
import Player from '../game/player';

import BaseState from './base';

import constants from '../constants';

export default class Game extends BaseState {

    init(score) {
        this.interval = 0;
        this.highScore = score
    }

    update() {
        super.update(this.gameover);
    }

    create() {
        super.create();
        if (this.highScore) {
            this.score.highScore = this.highScore
        }
        this.isPlaying = true;
    }

    gameover() {
        this.state.start('highscore', true, false, this.score.score)

        console.log("GAMEOVER");
    }

    shutdown() {

    }

}

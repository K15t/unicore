import World from '../game/world'
import Score from '../game/score'
import Player from '../game/player';

import BaseState from './base';

import constants from '../constants';

export default class Game extends BaseState {

    init() {
        this.interval = 0;

    }

    update() {
        super.update(this.gameover);
    }

    create() {
        super.create();

        this.isPlaying = true;
    }

    gameover() {
        this.state.start('highscore')

        console.log("GAMEOVER");
    }

    shutdown() {

    }

}

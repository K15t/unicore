import World from '../game/world'
import Score from '../game/score'
import Player from '../game/player';

import BaseState from './base';

import constants from '../constants';

export default class Game extends BaseState {

    init() {
        this.interval = 0;

    }


    create() {
        super.create();

        this.isPlaying = true;
        setTimeout(()=>{
            this.state.start('highscore')
        }, 2000)
    }

    gameover() {
        this.state.start('highscore')

        console.log("GAMEOVER");
    }

    shutdown() {

    }

}

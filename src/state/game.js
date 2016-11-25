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
        if (this.highScore > this.score.getHighScore()) {
            this.score.highScore = this.highScore
        }
        this.isPlaying = true;
        this.lifeCounter = this.game.add.text(this.game.width*.1,this.game.height*.025, 'Lives: 1', {fill:'#fff', boundsAlignV:'center'})
    }

    render(){
        super.render();
        this.lifeCounter.text = 'Lives: ' + (~~(this.player.getSprite().health-1));
    }

    gameover() {
        this.state.start('highscore', true, false, this.score.score)
    }

    shutdown() {

    }

}

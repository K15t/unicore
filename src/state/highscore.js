import BaseState from './base';
import constants from '../constants'

export default class Highscore extends BaseState {

    init(score) {
        this.highScore = score.highscore
        this.id = score.id
    }

    preload() {

    }

    create() {
        super.create();

        const game = this.game;

        const buttonTextStyle = {
            fill: '#FFFFFF',
            font: '30px Bungee',
            boundsAlignV: 'middle',
            boundsAlignH: 'center'
        };

        this.startButton = game.add.button(game.world.centerX - 100, game.height*.8, 'startButton', ()=>{this.returnToStart()});
        this.startButtonText = game.add.text(game.world.centerX - 20, game.height*.825, 'Lift off!',buttonTextStyle);

        this.game.input.keyboard.addCallbacks(this.game,()=>{},(e)=>{
            if (e.key == 'Enter') {
                this.returnToStart()
            }
        })

        if (this.highScore) {
            this.score.score = this.highScore
            const localHighscore = this.score.getHighScore()
            this.score.highScore = localHighscore > this.highScore ? localHighscore : this.highScore
            this.score.update()
        }

        this.score.id = this.id
        this.score.getScores(true)

    }

    returnToStart() {
        this.started = true
        this.state.start('game', true, false, this.highScore)
    }

    update() {
        super.update()
        // go to different state with this.state.start()
        // this.state.start('game');
    }

    shutdown() {

    }

}

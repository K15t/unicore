import BaseState from './base';

export default class Highscore extends BaseState {

    init(score) {
        this.highScore = score
        console.log(score);
    }

    preload() {

    }

    create() {
        super.create();

        this.isPlaying = false;
        this.score.highScore = this.highScore
        this.score.score = this.highScore
        this.score.update()
        console.log(this.score);
        new Promise((resolve, reject)=>{
            this.score.upload(this.highScore.score, 'TEST')
            resolve()
        }).then(()=>{
            this.score.getScores()
        })

        const game = this.game;

        const startButton = game.add.button(game.world.centerX - 100, game.height*.8, 'startButton', ()=>{this.state.start('game', true, false, this.highScore)});
    }

    update() {
        super.update()
        // go to different state with this.state.start()
        // this.state.start('game');
    }

    shutdown() {

    }

}

import BaseState from './base';
import constants from '../constants'

export default class Highscore extends BaseState {

    init(score) {
        this.highScore = score
    }

    preload() {

    }

    create() {
        super.create();

        const game = this.game;
        this.notice = game.add.text(game.world.centerX - 20, game.height*.95, '',{fill:"#ffffff",font: '20px Bungee', boundsAlignV: 'middle', boundsAlignH: 'center'});

        const buttonTextStyle = {
            fill: '#FFFFFF',
            font: '30px Bungee',
            boundsAlignV: 'middle',
            boundsAlignH: 'center'
        };

        this.startButton = game.add.button(game.world.centerX - 100, game.height*.8, 'startButton', ()=>{this.returnToStart()});
        this.startButtonText = game.add.text(game.world.centerX - 20, game.height*.825, 'Lift off!',buttonTextStyle);


        this.submitted = false
        this.started = false
        this.isPlaying = false

        const keypress = game.input.keyboard.addCallbacks(game,()=>{},(e)=>{
            if (!this.submitted && this.highScore) {
                if (e.key.match(/^\w$/g) && this.name.length < constants.MAX_NAME_LENGTH) {
                    this.name += e.key.toUpperCase()
                    this.nameText.text = this.name
                }
                if (e.key == 'Backspace') {
                    this.name = this.name.substr(0,this.name.length-1)
                    this.nameText.text = this.name
                }
                if (e.key == 'Enter') {
                    this.submitted = true
                    this.startButtonText.text = 'Lift off!'
                    new Promise((resolve, reject)=>{
                        localStorage.setItem('name',this.name)
                        this.score.upload(this.highScore, this.name, resolve)
                    }).then(()=>{
                        this.score.getScores(true)
                    })
                }
            } else if (!this.started) {
                if (e.key == 'Enter') {
                    this.returnToStart()
                }
            }
        })

        if (this.highScore) {
            this.startButtonText.text = '  Submit'
            this.name = localStorage.getItem('name') || ''
            if (this.name.length < 1) {
                this.notice.text = 'Enter your name'
            }
            this.nameText = this.game.add.text(game.width*.175,game.height*.35,this.name,{fill:'#fff'})
            this.game.add.text(game.width*.075,game.height*.35,'Name',{fill:'#fff'})
            var scoreName = game.add.graphics(game.width*.175,game.height*.4)
            scoreName.beginFill(0xffffff)
            scoreName.drawRect(0,0,game.width*.1,2)
            scoreName.endFill()


            this.score.score = this.highScore
            const localHighscore = this.score.getHighScore()
            this.score.highScore = localHighscore > this.highScore ? localHighscore : this.highScore
            this.score.update()
        } else {
            this.score.getScores()
        }

    }

    returnToStart() {
        if (this.score.uploaded || !this.score.score) {
            this.started = true
            this.state.start('game', true, false, this.highScore)
        } else {
            this.notice.text = 'press [ENTER] to submit your score';
        }
    }

    update() {
        super.update()
        // go to different state with this.state.start()
        // this.state.start('game');
    }

    shutdown() {

    }

}

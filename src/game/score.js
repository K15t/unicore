import leftPad from 'left-pad'
import request from 'browser-request'
import constants from '../constants';

export default class Score {
    constructor(game) {
        this.score = 0
        this.highScore = 0
        this.game = game

        var scoreBar = game.add.graphics(0,0)
        scoreBar.beginFill(0x000000)
        scoreBar.drawRect(0,0,game.width,game.height*.1)
        scoreBar.endFill()

        this.scoreCounter = game.add.text(game.width*.5,game.height*.025, this.getScore(), {fill:'#fff', boundsAlignV:'center'})
        this.highScoreCounter = game.add.text(game.width*.1,game.height*.025, this.getHighScore(), {fill:'#fff', boundsAlignV:'center'})
    }

    add(amount) {
        this.score += parseInt(amount)
    }

    update() {
        this.scoreCounter.text = this.getScore()
        this.highScoreCounter.text = this.getHighScore()
    }

    getScore() {
        return 'SCORE - ' + leftPad(this.score, 7, 0)
    }

    getHighScore() {
        return 'HIGHSCORE - ' + leftPad(this.highScore, 7, 0)
    }

    getScores() {
        request.get(`${constants.REST_URL}?_sort=score&_order=DESC&_limit=10`, (error, response, body)=>{
            var scores = JSON.parse(body)
            var text = ''
            for (var score in scores) {
                score = scores[score]
                text += `${score.user} - ${leftPad(score.score,7,0)}\n`
            }
            this.game.add.text(this.game.width*.25,this.game.height*.3, text, {fill:'#fff', boundsAlignV:'center'})
        })
    }

    upload(score, name) {
        request.post({url:constants.REST_URL, body:`{"score":${score},"user":"${name}"}`, json:true}, (error, response, body)=>{
            console.log(body);
        })
    }
}

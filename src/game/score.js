import leftPad from 'left-pad'
import request from 'browser-request'
import constants from '../constants';

export default class Score {
    constructor(game) {
        this.score = 0
        this.highScore = this.getHighScore()
        this.game = game

        var scoreBar = game.add.graphics(0,0)
        scoreBar.beginFill(0x000000)
        scoreBar.drawRect(0,0,game.width,game.height*.1)
        scoreBar.endFill()

        this.scoreCounter = game.add.text(game.width*.7,game.height*.025, '', {fill:'#fff', boundsAlignV:'center'})
        this.highScoreCounter = game.add.text(game.width*.3,game.height*.025, '', {fill:'#fff', boundsAlignV:'center'})
        this.update()
    }

    add(amount) {
        this.score += parseInt(amount)
    }

    update() {
        this.scoreCounter.text = `SCORE - ${leftPad(this.getScore(), 7, 0)}`
        this.highScoreCounter.text = `HIGHSCORE - ${leftPad(this.highScore, 7, 0)}`
    }

    getScore() {
        return this.score
    }

    getHighScore() {
        var highscore = 0
        var localHighscore = localStorage.getItem('highscore')
        if (localHighscore) {
            highscore = localHighscore
        }
        return parseInt(highscore)
    }

    getScores() {
        request.get(`${constants.REST_URL}?_sort=score&_order=DESC&_limit=10`, (error, response, body)=>{
            var scores = JSON.parse(body)
            var text = ''
            for (var score in scores) {
                score = scores[score]
                text += `${this.trimName(score.user)} - ${leftPad(score.score,7,0)}\n`
            }
            this.game.add.text(this.game.width*.25,this.game.height*.2, text, {fill:'#fff', boundsAlignV:'center'})
        })
    }

    trimName(name) {
        return name.substr(0,constants.MAX_NAME_LENGTH)
    }

    upload(score, name, resolve) {
        if (localStorage.getItem('highscore') < score) {
            localStorage.setItem('highscore', score)
        }
        request.post({url:constants.REST_URL, body:`{"score":${score},"user":"${this.trimName(name)}"}`, json:true}, (error, response, body)=>{
            resolve()
        })
    }
}

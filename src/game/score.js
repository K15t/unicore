import leftPad from 'left-pad'
import request from 'browser-request'
import constants from '../constants';

export default class Score {
    constructor(game) {
        this.score = 0
        this.highScore = this.getHighScore()
        this.game = game
        this.id = false
        this.uploaded = false

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

    getScores(includeOwnScore = false) {
        request.get(`${constants.REST_URL}`, (error, response, body)=>{
            var scores = JSON.parse(body)
            var text = ''
            var firstScores = scores.slice(0,10)
            for (var index in firstScores) {
                var score = firstScores[index]
                text += `${leftPad(parseInt(index)+1,3,' ')}. ${this.trimName(score.name)} - ${leftPad(score.score,7,0)}\n`
            }
            if (includeOwnScore && this.id !== false) {
                var id = scores.findIndex((el,index)=>index+1==this.id)
                if (id > 10) {
                    text += `${leftPad(parseInt(id)+1,3,' ')}. ${this.trimName(scores[id].name)} - ${leftPad(this.score,7,0)}\n`
                }
            }

            this.game.add.text(this.game.width*.5,this.game.height*.12, text, {fill:'#fff', boundsAlignV:'center'})
        })
    }

    trimName(name) {
        return leftPad(name.substr(0,constants.MAX_NAME_LENGTH), 8, ' ').toUpperCase()
    }

    upload(score, name, resolve) {
        if (localStorage.getItem('highscore') < score) {
            localStorage.setItem('highscore', score)
        }
        request.post(
            {
                url:constants.REST_URL,
                body:`{"score":${score},"score_name":"${name.substr(0,constants.MAX_NAME_LENGTH).toUpperCase()}"}`,
                method: 'POST',
                json:true
            }, (error, response, body) => {
                this.id = body.id
                this.uploaded = true
                resolve()
            }
        )
    }
}

import leftPad from 'left-pad'
import request from 'browser-request'
import constants from '../constants';

export default class Score {
    constructor(game) {
        this.score = 0
        this.game = game

        var scoreBar = game.add.graphics(0,0)
        scoreBar.beginFill(0x000000)
        scoreBar.drawRect(0,0,game.width,game.height*.1)
        scoreBar.endFill()

        this.scoreCounter = game.add.text(game.width*.5,game.height*.025, this.getScore(), {fill:'#fff', boundsAlignV:'center'})
    }

    add(amount) {
        this.score += parseInt(amount)
    }

    update() {
        this.scoreCounter.text = this.getScore()
    }

    getScore() {
        return 'SCORE - ' + leftPad(this.score, 10, 0)
    }

    getScores() {
        this.game.add.text()
        request.get(`${constants.REST_URL}?_sort=score&_order=DESC&_limit=10`, (error, response, body)=>{
            console.log(body);
        })
    }

    upload() {

    }
}

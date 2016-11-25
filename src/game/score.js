import leftPad from 'left-pad'

export default class Score {
    constructor(game) {
        this.score = 0
        this.game = game

        var scoreBar = game.add.graphics(0,0)
        scoreBar.beginFill(0x000000)
        scoreBar.drawRect(0,0,game.width,game.height*.1)
        scoreBar.endFill()

        this.scoreCounter = game.add.text(game.width*.5,game.height*.025, ''+this.score, {fill:'#fff', boundsAlignV:'center'})
    }

    add(amount) {
        this.score += parseInt(amount)
    }

    update() {
        this.scoreCounter.text = 'SCORE - ' + leftPad(this.score, 10, 0)
    }

    upload() {
        
    }
}

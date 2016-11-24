export default class Score {
    constructor(game) {
        this.score = 0
        this.game = game

        var scoreBar = game.add.graphics(0,0)
        scoreBar.beginFill(0x000000)
        scoreBar.drawRect(0,0,game.width,game.height*.1)
        scoreBar.endFill()

        var score = game.add.text(game.width*.5,game.height*.05, this.score)
        score.style.boundsAlignV = 'center'
    }

    add(amount) {
        this.score += amount
    }
}

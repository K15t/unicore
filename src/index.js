window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')


const gameStates = require('./state').default;


const game = new Phaser.Game(800, 600, Phaser.CANVAS, 'unicore', { preload: preload, create: create, update: update, render: render });


window.WebFontConfig = {
    active: function() { },

    google: {
        families: ['Bungee']
    }

};


function preload() {
    //game.stage.backgroundColor = '#007236';
    game.load.image('startButton', 'assets/images/startButton.png');
    game.load.image('highscoreButton', 'assets/images/highscoreButton.png');

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}






function create() {
    // create objects

    // add game states
    for(let stateName in gameStates){
        game.state.add(stateName, gameStates[stateName]);
    }
    game.state.start('menu');

    // TODO create world objects (player, obstacles, etc..)
}




function update() {

}

function render() {

}

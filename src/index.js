window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
window.Phaser = require('phaser/build/custom/phaser-split')

import './style/main.less'

const gameStates = require('./state').default;
const constants = require('./constants');

const game = new Phaser.Game(
    constants.CANVASWIDTH,  // width
    constants.CANVASHEIGHT,  // height
    Phaser.CANVAS,  // renderer
    '',  // parent
    { preload: preload, create: create, update: update, render: render } // state
);

window.game = game

window.WebFontConfig = {
    active: function() {},

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
}

function update() {

}

function render() {

}

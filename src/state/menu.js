
export default class Menu extends Phaser.State {

    init() {
        console.log('init main state');
    }

    preload() {

    }

    create() {

    }

    update() {
        // go to different state with this.state.start()
        this.state.start('game');
    }

    shutdown() {

    }

}

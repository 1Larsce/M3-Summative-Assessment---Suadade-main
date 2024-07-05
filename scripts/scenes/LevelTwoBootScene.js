export default class LevelTwoBootScene extends Phaser.Scene {
    constructor() {
        super('LevelTwoBootScene');
    }

    preload() {
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;


        this.logo = this.add.image(centerX, centerY + -100, 'Sigil').setOrigin(0.5, 0.5);
        this.logo.setScale(1);

        // Loading text
        this.loadingText = this.add.bitmapText(centerX, centerY + 220, 'font', 'Loading..........', 20).setOrigin(0.5, 0.5);


        //Fun fact
        const funFactText = this.add.bitmapText(centerX, centerY + 100, 'font', 'Level 2- Great Hall', 30).setOrigin(0.5, 0.5);

        //Next scene
        this.time.delayedCall(5000, () => {
            this.scene.start('gameSceneLevel2');
        });
    }
}
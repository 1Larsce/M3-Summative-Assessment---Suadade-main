export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

       // Click start for bypassing audio bug
       this.time.delayedCall(1000, () => {
   
        const startText = this.add.bitmapText(centerX, centerY + -10, 'font', 'Click to Start', 50).setOrigin(0.5, 0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
    });
    }
}

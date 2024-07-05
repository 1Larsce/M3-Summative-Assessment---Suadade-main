export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("MainMenuScene");
    }

    preload() {
        this.load.image('background', './assets/Image/Background/mainMenuBG.png');
        this.load.image('startButton', './assets/Image/Buttons/startButton.png');
        this.load.image('creditButton', './assets/Image/Buttons/creditsButton.png');
        this.load.image('quitButton', './assets/Image/Buttons/quitButton.png');

    }

    create() {
        // Add background image
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);


        // Load and play background music
        // this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true, volume: 1 });
        // if (!this.backgroundMusic.isPlaying && !this.sound.mute) {
        //     this.backgroundMusic.play();
        // }
    
        // // Add sound status text
        // this.soundStatusText = this.add.text(20, 20, 'Sound: On', { font: '24px Arial', fill: '#ffffff' });
        
        // // Add mute/unmute button
        // this.muteButton = this.add.text(this.cameras.main.width - 150, 20, 'Mute', { font: '24px Arial', fill: '#ffffff' });
        // this.muteButton.setInteractive();
        // this.muteButton.on('pointerdown', () => {
        //     this.toggleSound();
        // });
    
        // Add Start button
        const startButton = this.add.image(this.cameras.main.width / 1.2, 490, 'startButton') // Start off-screen to the left
        startButton.setOrigin(0.5);
        startButton.setInteractive();
        startButton.setScale(0.4);
        startButton.on('pointerdown', () => {
            this.scene.start('TutorialBootScene');
            // this.backgroundMusic.stop();

        });
 
        // Add Credit button
        const creditButton = this.add.image(this.cameras.main.width / 1.2, 640, 'creditButton'); // Start off-screen to the right
        creditButton.setOrigin(0.5);
        creditButton.setInteractive();
        creditButton.setScale(0.4);
        creditButton.on('pointerdown', () => {
            if (!this.scene.isActive('creditScene')) {
                this.scene.stop('titleScene');
                this.scene.start('creditScene');
                // this.backgroundMusic.stop();
            }
        });
    
        // Add Quit button
        const quitButton = this.add.image(this.cameras.main.width / 1.2, 790, 'quitButton'); // Start off-screen at the bottom
        quitButton.setOrigin(0.5);
        quitButton.setInteractive();
        quitButton.setScale(0.4);
        quitButton.on('pointerdown', () => {
            if (window.confirm("Are you sure you want to quit?")) {
                window.close();
            }
            // this.backgroundMusic.stop();
        });

        
        // Get reference to the game scene instance
        this.gameScene = this.scene.get('gameLevel1');
    }

    // toggleSound() {
    //     if (this.sound.mute) {
    //         this.sound.setMute(false);
    //         this.soundStatusText.setText('Sound: On');
    //     } else {
    //         this.sound.setMute(true);
    //         this.soundStatusText.setText('Sound: Off');
    //     }
    // }
}
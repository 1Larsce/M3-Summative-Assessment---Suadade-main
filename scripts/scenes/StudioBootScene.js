export default class StudioBootScene extends Phaser.Scene {
    constructor() {
        super('StudioBootScene');
    }

    preload() {
        // Load assets like background images, buttons, etc.
        this.load.image('background', './assets/Image/Background/mainMenuBG.png');
        this.load.image('startButton', './assets/Image/Buttons/startButton.png');
        this.load.image('creditButton', './assets/Image/Buttons/creditsButton.png');
        this.load.image('quitButton', './assets/Image/Buttons/quitButton.png');
        this.load.image('ghost', './assets/Spritesheets/Enemy/ghost.png'); 

        //TileSets
        this.load.image('tiles1', './assets/TileMaps/Tutorial/Tileset1.png');
        this.load.image('tiles2', './assets/TileMaps/Level1/Tileset2.png');
        this.load.image('tiles3', './assets/TileMaps/Level2/Tileset3.png');

        //TileMaps
        this.load.tilemapTiledJSON('Tutorial', './assets/TileMaps/Tutorial/TutorialMap.json');
        this.load.tilemapTiledJSON('Level1', './assets/TileMaps/Level1/Level1Map.json'); 
        this.load.tilemapTiledJSON('Level2', './assets/TileMaps/Level2/Level2Map.json');   
        this.load.image('wKey', './assets/Image/Background/E.png');
        
        // this.load.spritesheet('player', './assets/Spritesheet/run.png', {  frameWidth: 16, frameHeight: 16}); 


        //load spritesheet
        this.load.spritesheet('player', './assets/Spritesheets/character.png', {  frameWidth: 16, frameHeight: 32});
        // this.load.spritesheet('coin', './assets/images/spritesheet/coin.png', {  frameWidth: 16, frameHeight: 16});
        // this.load.spritesheet('chest', './assets/images/spritesheet/chest.gif', {  frameWidth: 42, frameHeight: 32});
          
        
        //   // Load audio
        //   this.load.audio('backgroundMusic', './assets/audio/BGMusic/MainMenuBGM.mp3');
        //   this.load.audio('CrystalBGM', './assets/audio/BGMusic/Crystal-BGM.mp3');
        //   this.load.audio('IslandBG', './assets/audio/BGMusic/Island-BG.mp3');
        //   this.load.audio('CaveBG', './assets/audio/BGMusic/Cave-BG.mp3');
        //   this.load.audio('jump1', './assets/audio/sound-effect/jump1.wav');
        //   this.load.audio('jump2', './assets/audio/sound-effect/jump2.wav');
        //   this.load.audio('jump3', './assets/audio/sound-effect/jump3.wav');
        //   this.load.audio('jump4', './assets/audio/sound-effect/jump4.wav');
        //   this.load.audio('jump5', './assets/audio/sound-effect/jump5.wav');
        //   this.load.audio('jump6', './assets/audio/sound-effect/jump6.wav');
        //   this.load.audio('chestPick', './assets/audio/sound-effect/chestpick.mp3');
        //   this.load.audio('pick', './assets/audio/sound-effect/pick.wav');
        //   this.load.audio('die', './assets/audio/sound-effect/death.wav');


        //Logo
        this.load.image('logo', '../assets/Image/logo/StudioImage.png');
        this.load.image('Sigil', '../assets/Image/logo/Sigil.png');

        //Font
        this.load.bitmapFont('font', './assets/fonts/thick_8x8.png', '../assets/fonts/thick_8x8.xml');
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        this.logo = this.add.image(centerX, centerY + -60, 'logo').setOrigin(0.5, 0.5);
        this.logo.setScale(1.2);
        this.logo.setAlpha(0);  

        // Fade in logo
    this.tweens.add({
        targets: this.logo,
        alpha: { from: 0, to: 1 },
        duration: 3500,
        ease: 'Linear',
        onComplete: () => {
            // Fade out 
            this.tweens.add({
                targets: this.logo,
                alpha: { from: 1, to: 0 },
                duration: 3500,
                ease: 'Linear'
            });
        }
    });
    
        // Next scene
        this.time.delayedCall(7000, () => { //7000
             this.scene.start('BootScene');
        });
    }
}
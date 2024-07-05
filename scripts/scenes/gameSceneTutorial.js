export default class gameSceneTutorial extends Phaser.Scene {
    constructor() {
        super("gameSceneTutorial");
    }

    preload() {
        
        this.load.image('wKey', './assets/Image/Background/E.png');
        this.load.image('ghost', './assets/Spritesheets/Enemy/ghost.png'); 
    }

    create() {
        // world bounds 
        this.cameras.main.setBounds(0, 0, 1570, 890);
        this.cameras.main.setBackgroundColor('#bcdeff');

        // Tilemap
        const map = this.make.tilemap({ key: "Tutorial" });
        const tileset = map.addTilesetImage("Tileset1", 'tiles1');

        // Layers
        const ground = map.createLayer('Ground', tileset, 0, 0);
        const collision = map.createLayer('Collision', tileset, 0, 0);
        this.barClosed = map.createLayer('Bar-Tome', tileset, 0, 0);
        this.tome = map.createLayer('Tome', tileset, 0, 0);
        const doorOpen = map.createLayer('Finish-Line', tileset, 0, 0);
        this.doorClose = map.createLayer('Door-Closed', tileset, 0, 0);
        this.leverUnpulled = map.createLayer('Lever-Unpulled', tileset, 0, 0);
        this.leverPulled = map.createLayer('Lever-Pulled', tileset, 0, 0);
        this.key = map.createLayer('Key', tileset, 0, 0);
        this.trapsOff = map.createLayer('Traps-Off', tileset, 0, 0);
        this.trapsOn = map.createLayer('Traps-On', tileset, 0, 0);
        const background = map.createLayer('Background', tileset, 0, 0);

        // Player and enable physics
        this.player = this.physics.add.sprite(300, 150, 'player');
        this.player.setScale(.76);

        // Ghost and enable physics
        this.ghost = this.physics.add.sprite(500, 150, 'ghost'); 
        this.ghost.setScale(.76);
        this.ghost.setCollideWorldBounds(true); 

        // Movement Keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // scale ratio 
        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        const scaleX = 1580 / mapWidth;
        const scaleY = 900 / mapHeight;

        //Scale 
        ground.setScale(scaleX, scaleY);
        collision.setScale(scaleX, scaleY);
        this.barClosed.setScale(scaleX, scaleY);
        this.tome.setScale(scaleX, scaleY);
        doorOpen.setScale(scaleX, scaleY);
        this.doorClose.setScale(scaleX, scaleY);
        this.leverUnpulled.setScale(scaleX, scaleY);
        this.leverPulled.setScale(scaleX, scaleY);
        this.key.setScale(scaleX, scaleY);
        this.trapsOff.setScale(scaleX, scaleY);
        this.trapsOn.setScale(scaleX, scaleY);
        background.setScale(scaleX, scaleY);

        // Make the 'Lever-Pulled' layer invisible
        this.leverPulled.setVisible(false);
        this.trapsOff.setVisible(true);

        // Camera on map
        const scaledMapWidth = mapWidth * scaleX;
        const scaledMapHeight = mapHeight * scaleY;

        const screenWidth = 1580;
        const screenHeight = 900;

        this.cameras.main.setSize(screenWidth, screenHeight);
        this.cameras.main.centerOn(scaledMapWidth / 2, scaledMapHeight / 2);

        // Camera follow the player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1); // set to 3.5

        // Collision
        collision.setCollisionByExclusion([-1]);
        this.doorClose.setCollisionByExclusion([-1]);
        this.barClosed.setCollisionByExclusion([-1]);
        this.trapsOn.setCollisionByExclusion([-1]);
        this.leverUnpulled.setCollisionByExclusion([-1]);
        this.tome.setCollisionByExclusion([-1]);
        this.key.setCollisionByExclusion([-1]);
        doorOpen.setCollisionByExclusion([-1]);

        // Enable Collision
        this.physics.add.collider(this.player, collision);
        this.physics.add.collider(this.player, this.doorClose);
        this.physics.add.collider(this.player, this.barClosed);
        this.physics.add.collider(this.player, this.trapsOn, this.resetPlayerPosition, null, this);
        this.physics.add.collider(this.player, this.leverUnpulled, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.tome, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.key, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, doorOpen, this.endOfTutorial, null, this);
        this.physics.add.collider(this.player, this.ghost, this.resetPlayerPosition, null, this);

        // Create interaction image and hide it initially
        this.interactionImage = this.add.image(0, 0, 'wKey').setVisible(false).setDepth(1);
        this.interactionType = null;
    }

    resetPlayerPosition(player, tile) {
        this.player.setPosition(300, 150);
    }

    showInteractionImage(player, tile) {
        this.interactionImage.setPosition(this.player.x, this.player.y - 50);
        this.interactionImage.setVisible(true);

        if (tile.layer.name === 'Lever-Unpulled') {
            this.interactionType = 'lever';
        } else if (tile.layer.name === 'Tome') {
            this.interactionType = 'tome';
        } else if (tile.layer.name === 'Key') {
            this.interactionType = 'key';
        }
    }

    pullLever() {
        this.leverUnpulled.setVisible(false);
        this.leverPulled.setVisible(true);
        this.trapsOn.setVisible(false);
        this.trapsOn.setCollisionByExclusion([]);
        this.interactionImage.setVisible(false);
    }

    getTome() {
        this.tome.setVisible(false);
        this.barClosed.setVisible(false);
        this.barClosed.setCollisionByExclusion([]);
        this.tome.setCollisionByExclusion([]);
        this.interactionImage.setVisible(false);
    }

    getKey() {
        this.doorClose.setVisible(false);
        this.key.setVisible(false);
        this.doorClose.setCollisionByExclusion([]);
        this.key.setCollisionByExclusion([]);
        this.interactionImage.setVisible(false);
    }

    endOfTutorial(player, tile) {
        this.scene.start('LevelOneBootScene');
    }

    update() {
        const playerSpeed = 300;

        this.player.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-playerSpeed);
            // this.player.anims.play('walk_left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(playerSpeed);
            // this.player.anims.play('walk_right', true);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-playerSpeed);
            // this.player.anims.play('walk_up', true);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(playerSpeed);
            // this.player.anims.play('walk_down', true);
        }

        // Idle animation
        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.player.anims.stop();
        }

        // Check for interaction key press
        if (this.interactionImage.visible && Phaser.Input.Keyboard.JustDown(this.eKey)) {
            if (this.interactionType === 'lever') {
                this.pullLever();
            } else if (this.interactionType === 'tome') {
                this.getTome();
            } else if (this.interactionType === 'key') {
                this.getKey();
            }
        }

        // Ghost follow Kore
        this.physics.moveToObject(this.ghost, this.player, 20);
    }
}

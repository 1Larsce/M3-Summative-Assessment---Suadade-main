
//----------------GHOOOOOOOOOOOOOOOOOOOOOST-----------------------------//

export default class gameSceneLevel1 extends Phaser.Scene {
    constructor() {
        super("gameSceneLevel1");
    }

    preload() {
        // Load assets here if needed
        this.load.image('eKey', './assets/Image/Background/E.png');
        this.load.image('ghost', './assets/Spritesheets/Enemy/ghost.png'); // Load the ghost image
    }

    create() {
        // Set the world bounds 
        this.cameras.main.setBounds(0, 0, 1580, 900);
        this.cameras.main.setBackgroundColor('#141414');

        // Tilemap
        const mapOne = this.make.tilemap({ key: "Level1" });
        const tilesetTwo = mapOne.addTilesetImage("Tileset2", 'tiles2');

        // Layers 
        const blacklayer = mapOne.createLayer('black', tilesetTwo, 0, 0);
        const brokenWoodenFloor = mapOne.createLayer('BrokenWoodenFloor', tilesetTwo, 0, 0);
        const groundLayer = mapOne.createLayer('ground', tilesetTwo, 0, 0);
        const collisionLayer = mapOne.createLayer('collision', tilesetTwo, 0, 0);
        this.fenceClosed = mapOne.createLayer('Fence-Closed', tilesetTwo, 0, 0);
        this.endLayer = mapOne.createLayer('StairsToNextLevel', tilesetTwo, 0, 0);
        
        this.leverPulledLayer = mapOne.createLayer('lever-Pulled', tilesetTwo, 0, 0);
        this.leverUnpulledLayer = mapOne.createLayer('lever-Unpulled', tilesetTwo, 0, 0);
        this.leverPulledInnerSpike = mapOne.createLayer('leverPulledInnerSpike', tilesetTwo, 0, 0);
        this.leverPulledOuterSpike = mapOne.createLayer('leverPulledOuterSpike', tilesetTwo, 0, 0);
        this.leverUnpulledOuterSpike = mapOne.createLayer('leverUnpulledOuterSpike', tilesetTwo, 0, 0);
        this.leverUnpulledInnerSpike = mapOne.createLayer('leverUnpulledInnerSpike', tilesetTwo, 0, 0);
        
        this.trapOff = mapOne.createLayer('Trap-Off', tilesetTwo, 0, 0);
        this.trapOnOuter = mapOne.createLayer('Trap-On-Outer', tilesetTwo, 0, 0);
        this.trapOnInner = mapOne.createLayer('Trap-On-Inner', tilesetTwo, 0, 0);
        this.Close = mapOne.createLayer('Closed', tilesetTwo, 0, 0);
        this.key = mapOne.createLayer('Key', tilesetTwo, 0, 0);
        this.fakeKeyLayer = mapOne.createLayer('Fake-Key', tilesetTwo, 0, 0); 
        const backgroundLayer = mapOne.createLayer('background', tilesetTwo, 0, 0);

        // Scale ratio 
        const mapWidth = mapOne.widthInPixels;
        const mapHeight = mapOne.heightInPixels;

        const scaleX = 1580 / mapWidth;
        const scaleY = 900 / mapHeight;

        // Layer Scale
        brokenWoodenFloor.setScale(scaleX, scaleY);
        groundLayer.setScale(scaleX, scaleY);
        collisionLayer.setScale(scaleX, scaleY);
        this.fenceClosed.setScale(scaleX, scaleY);
        this.endLayer.setScale(scaleX, scaleY);
        
        this.leverPulledLayer.setScale(scaleX, scaleY);
        this.leverUnpulledLayer.setScale(scaleX, scaleY);
        this.leverPulledInnerSpike.setScale(scaleX, scaleY);
        this.leverPulledOuterSpike.setScale(scaleX, scaleY);
        this.leverUnpulledOuterSpike.setScale(scaleX, scaleY);
        this.leverUnpulledInnerSpike.setScale(scaleX, scaleY);
        
        this.trapOff.setScale(scaleX, scaleY);
        this.trapOnOuter.setScale(scaleX, scaleY);
        this.trapOnInner.setScale(scaleX, scaleY);
        this.Close.setScale(scaleX, scaleY);
        this.key.setScale(scaleX, scaleY);
        this.fakeKeyLayer.setScale(scaleX, scaleY);
        backgroundLayer.setScale(scaleX, scaleY);

        // Initial Levers
        this.leverPulledLayer.setVisible(false);
        this.leverPulledOuterSpike.setVisible(false);
        this.leverPulledInnerSpike.setVisible(false);
        this.trapOff.setVisible(true);

        // Center Cam
        const scaledMapWidth = mapWidth * scaleX;
        const scaledMapHeight = mapHeight * scaleY;
        const screenWidth = 1580; 
        const screenHeight = 900; 

        // Camera size
        this.cameras.main.setSize(screenWidth, screenHeight);
        this.cameras.main.centerOn(scaledMapWidth / 2, scaledMapHeight / 2);

        // Character
        this.player = this.physics.add.sprite(105, 820, 'player');
        this.player.setScale(.76);

        // Ghost and enable physics
        this.ghost1 = this.physics.add.sprite(400, 820, 'ghost');
        this.ghost2 = this.physics.add.sprite(700, 820, 'ghost');
        this.ghost1.setScale(.76);
        this.ghost2.setScale(.76);
        this.ghost1.setCollideWorldBounds(true);
        this.ghost2.setCollideWorldBounds(true);
            
        // Movement Keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // camera follow 
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1);

        // Collision
        collisionLayer.setCollisionByExclusion([-1]);
        brokenWoodenFloor.setCollisionByExclusion([-1]);
        this.leverUnpulledLayer.setCollisionByExclusion([-1]);
        this.leverUnpulledOuterSpike.setCollisionByExclusion([-1]);
        this.leverUnpulledInnerSpike.setCollisionByExclusion([-1]);
        this.fenceClosed.setCollisionByExclusion([-1]);
        this.Close.setCollisionByExclusion([-1]);   
        this.fakeKeyLayer.setCollisionByExclusion([-1]);
        this.key.setCollisionByExclusion([-1]);
        this.endLayer.setCollisionByExclusion([-1]); 

        // Enable Collision
        this.physics.add.collider(this.player, collisionLayer);
        this.physics.add.collider(this.player, brokenWoodenFloor, this.resetPlayerPosition, null, this); 
        this.physics.add.collider(this.player, this.leverUnpulledLayer, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.leverUnpulledOuterSpike, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.leverUnpulledInnerSpike, this.showInteractionImage, null, this);
        this.physics.add.collider(this.player, this.fenceClosed);
        this.physics.add.collider(this.player, this.Close);
        this.physics.add.collider(this.player, this.endLayer, this.transitionToNextLevel, null, this); 
        this.physics.add.collider(this.player, this.fakeKeyLayer, this.resetPlayerPosition, null, this); 
        this.physics.add.collider(this.player, this.key, this.disableClosedLayer, null, this); 
        this.physics.add.collider(this.player, this.ghost1, this.resetPlayerPosition, null, this);
        this.physics.add.collider(this.player, this.ghost2, this.resetPlayerPosition, null, this);

        // Create interaction hide it initially
        this.interactionImage = this.add.image(0, 0, 'eKey').setVisible(false).setDepth(1);
        this.interactionType = null;
    }

    resetPlayerPosition(player, tile) {
        this.player.setPosition(105, 820);
    }

    showInteractionImage(player, tile) {
        this.interactionImage.setPosition(this.player.x, this.player.y - 50);
        this.interactionImage.setVisible(true);

        if (tile.layer.name === 'lever-Unpulled') {
            this.interactionType = 'lever';
        } else if (tile.layer.name === 'leverUnpulledOuterSpike') {
            this.interactionType = 'outerSpike';
        } else if (tile.layer.name === 'leverUnpulledInnerSpike') {
            this.interactionType = 'innerSpike';
        }
    }

    pullLeverOne() {
        this.leverPulledLayer.setVisible(true);
        this.leverUnpulledLayer.setVisible(false);
        this.fenceClosed.setVisible(false);
        this.fenceClosed.setCollisionByExclusion([]); 
        this.interactionImage.setVisible(false);
    }

    triggerOuterSpike() {
        this.leverPulledOuterSpike.setVisible(true);
        this.leverUnpulledOuterSpike.setVisible(false);
        this.trapOnOuter.setVisible(false);
        this.interactionImage.setVisible(false);
    }

    triggerInnerSpike() {
        this.leverPulledInnerSpike.setVisible(true);
        this.leverUnpulledInnerSpike.setVisible(false);
        this.trapOnInner.setVisible(false);
        this.interactionImage.setVisible(false);
    }

    disableClosedLayer(player, tile) {
        this.Close.setVisible(false);
        this.Close.setCollisionByExclusion([]); 
        this.key.setVisible(false);
        this.key.setCollisionByExclusion([]); 
    }

    transitionToNextLevel(player, tile) {
        this.scene.start('LevelTwoBootScene');
    }

    update() {
        const playerSpeed = 300;
        this.player.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-playerSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(playerSpeed);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-playerSpeed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(playerSpeed);
        }

        // Idle animation
        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.player.anims.stop();
        }

        // Check for interaction key press
        if (this.interactionImage.visible && Phaser.Input.Keyboard.JustDown(this.eKey)) {
            if (this.interactionType === 'lever') {
                this.pullLeverOne();
            } else if (this.interactionType === 'outerSpike') {
                this.triggerOuterSpike();
            } else if (this.interactionType === 'innerSpike') {
                this.triggerInnerSpike();
            }
        }

        // Make the ghosts follow Kore
        this.physics.moveToObject(this.ghost1, this.player, 20);
        this.physics.moveToObject(this.ghost2, this.player, 20);
    }
}

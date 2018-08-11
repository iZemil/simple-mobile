import config from '../gameConfig';

class StartGame extends Phaser.Scene {
    constructor () {
        super({ key: 'StartGame' });
    }

    preload () {
        
    }

    create () {
        this.input.manager.enabled = true;

        // Text
        const helpText = this.add.text(
            null, null,
            'Preloader\n\nPress to continue', {
                fontSize: '25px',
                padding: { x: 20, y: 15 },
                backgroundColor: '#000000',
                fill: '#ffffff',
            }
        );
        
        helpText.x = (config.width - helpText.width) / 2;
        helpText.y = (config.height - helpText.height) / 2;
        helpText.setScrollFactor(0);

        this.input.once('pointerdown', () => {
            this.scene.start('PlayGame');

        });
    }

}

export default StartGame;
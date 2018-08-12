import config from '../gameConfig';

class StartGame extends Phaser.Scene {

    constructor () {
        super({ key: 'EndGame' });
    }

    preload () {
        
    }

    create () {
        // Text
        const helpText = this.add.text(
            null, null,
            'End Game', {
                fontSize: '35px',
                padding: { x: 20, y: 15 },
                backgroundColor: '#000000',
                fill: '#ffffff'
            }
        );
        helpText.x = (config.width - helpText.width) / 2;
        helpText.y = (config.height - helpText.height) / 2;
        helpText.setScrollFactor(0);

        this.input.manager.enabled = true;

        this.input.once('pointerdown', () => {
            this.scene.start('PlayGame');

        });
    }
}

export default StartGame;
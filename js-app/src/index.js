import Phaser from 'phaser';
import gameConfig from './gameConfig';

window.onload = function() {
    const game = new Phaser.Game(gameConfig);

    window.focus();
}
import Phaser from 'phaser';
import StartGame from './scenes/StartGame';
import PlayGame from './scenes/PlayGame';
import EndGame from './scenes/EndGame';

const gameConfig = {
    thpe: Phaser.CANVAS,
    width: 600,
    height: 600,
    backgroundColor: 0x87cefa,
    scene: [PlayGame]
};

export default gameConfig;
import Phaser from 'phaser';
import StartGame from './scenes/StartGame';
import PlayGame from './scenes/PlayGame';
import EndGame from './scenes/EndGame';

const gameConfig = {
    type: Phaser.Auto,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x87cefa,
    scene: [PlayGame]
};

export default gameConfig;
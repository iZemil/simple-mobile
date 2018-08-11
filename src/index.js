import Phaser from 'phaser';
import gameConfig from './gameConfig';

var game;

window.onload = function() {
    game = new Phaser.Game(gameConfig);

    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}
 
// pure javascript to scale the game
function resize() {
    const canvas = document.querySelector("canvas");
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = game.config.width / game.config.height;

    if(windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
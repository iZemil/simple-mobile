import Phaser from 'phaser';
import gameConfig from '../gameConfig';

const gameOptions = {
    hexagonWidth: 70,
    hexagonHeight: 80,
    gridSizeX: 5,
    gridSizeY: 14
};

export default class playGame extends Phaser.Scene{
    constructor() {
        super("PlayGame");
    }

    preload(){
        this.load.image("hexagon", "assets/hexagon.png");
        this.load.spritesheet("marker", "assets/marker.png",  {
            frameWidth: 56,
            frameHeight: 64
        });
    }

    create() {
        this.playerMove = true;
        this.playerCol = 2;
        this.playerRow = 0;
        this.hexagonPool = [];
        this.hexagonGroup = this.add.group();

        for(var i = 0; i < gameOptions.gridSizeY; i +=1) {
            this.addHexagonRow(i);
        }

        this.marker = this.add.sprite(gameConfig.width / 2, 6, "marker");
        this.bezierGraphics = this.add.graphics();

        this.input.on("pointerdown", function(e) {
            if(this.playerMove) {
                if(e.x < (gameConfig.width / 2) && (this.playerCol > 0 || (this.playerRow % 2 == 1))){
                    this.playerCol -= (1 - this.playerRow % 2);
                    this.playerRow +=1;
                    this.marker.setFrame(0);
                    this.movePlayer(-1);
                }

                if(e.x >= (gameConfig.width / 2) &&  this.playerCol < gameOptions.gridSizeX - 1) {
                    this.playerCol += (this.playerRow % 2);
                    this.playerRow +=1;
                    this.marker.setFrame(1);
                    this.movePlayer(1);
                }
            }
        }, this);
    }

    update() {
        if(this.marker.y > 60) {
            var distance = (this.marker.y - 6) / -25;
            Phaser.Actions.IncY(this.hexagonGroup.getChildren(), distance);
            this.marker.y += distance;
            this.bezierGraphics.y += distance;
        }

        this.hexagonGroup.children.iterate(function(hexagon) {
            if(hexagon.y < -gameOptions.hexagonHeight){
                hexagon.y += gameOptions.hexagonHeight * (gameOptions.gridSizeY * 3 / 4);
            }
        });
    }

    addHexagonRow(i) {
        const offset = (gameConfig.width - gameOptions.gridSizeX * gameOptions.hexagonWidth) / 2;

        for(var j = 0; j < gameOptions.gridSizeX - i % 2; j +=1){
            const hexagonX = gameOptions.hexagonWidth * j + (gameOptions.hexagonWidth / 2) * (i % 2) + offset;
            const hexagonY = gameOptions.hexagonHeight * i / 4 * 3;
            const hexagon = this.add.sprite(hexagonX, hexagonY, "hexagon");

            hexagon.setOrigin(0, 0);

            this.hexagonGroup.add(hexagon);
        }
    }

    movePlayer(delta) {
        const stepX = gameOptions.hexagonWidth / 2 * delta;
        const stepY = gameOptions.hexagonHeight / 4 * 3;

        this.playerMove = false;

        const startPoint = new Phaser.Math.Vector2(this.marker.x, this.marker.y);
        const endPoint = new Phaser.Math.Vector2(this.marker.x + stepX, this.marker.y + stepY);
        const controlPoint1 = new Phaser.Math.Vector2(this.marker.x + stepX, this.marker.y + stepY / 2);
        const controlPoint2 = new Phaser.Math.Vector2(this.marker.x + stepX, this.marker.y + stepY / 2);

        this.bezierCurve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint);
        this.bezierGraphics.y = 0;
        this.bezierGraphics.clear();
        this.bezierGraphics.lineStyle(4, 0xffffff);
        this.bezierCurve.draw(this.bezierGraphics);

        const tweenValue = {
            value: 0,
            previousValue: 0
        }

        this.tweens.add({
            targets: tweenValue,
            value: 1,
            duration: 200,
            callbackScope: this,
            onComplete: function(){
                this.playerMove = true;
            },
            onUpdate: function(tween, target) {
                const position = this.bezierCurve.getPoint(target.value);
                const prevPosition = this.bezierCurve.getPoint(target.previousValue);
                const step = target.value - target.previousValue;
                
                this.marker.x += position.x - prevPosition.x;
                this.marker.y += position.y - prevPosition.y;
                target.previousValue = target.value;
            }
        });
    }
}
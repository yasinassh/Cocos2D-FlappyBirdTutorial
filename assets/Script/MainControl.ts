import AudioSourceControl, { SoundType } from './AudioSourceControl';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

export enum GameStatus {
    Game_Ready = 0, // Ready state
    Game_Playing,   // Game Playing
    Game_Over       // Game Over
}

@ccclass
export default class MainControl extends cc.Component {

    @property(cc.Sprite)
    spBg: cc.Sprite[] = [null, null];

    @property(cc.Prefab)
    pipePrefab: cc.Prefab = null;
    pipe: cc.Node[] = [null, null, null]
    spGameOver: cc.Sprite = null;

    // Start button
    btnStart: cc.Button = null;
    // Game state
    gameStatus: GameStatus = GameStatus.Game_Ready;

    @property(cc.Label)
    labelScore: cc.Label = null;
    // record score
    gameScore: number = 0;

    // add audio source
    @property(AudioSourceControl)
    audioSourceControl: AudioSourceControl = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // open collision system
        var collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = false;
        // open debug draw when you debug the game
        // do not forget to close when you ship the game
        collisionManager.enabledDebugDraw = true;
        // find the GameOver node, and set active property to false
        this.spGameOver = this.node.getChildByName("GameOver").getComponent(cc.Sprite);
        this.spGameOver.node.active = false;
        // find the start button
        this.btnStart = this.node.getChildByName("BtnStart").getComponent(cc.Button);
        // register clicked callback
        this.btnStart.node.on(cc.Node.EventType.TOUCH_END, this.touchStartBtn, this);
    }

    start () {
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i] = cc.instantiate(this.pipePrefab);
            this.node.getChildByName("Pipe").addChild(this.pipe[i]);
            
            this.pipe[i].x = 170 + 200 * i;
            var minY = -120;
            var maxY = 120;
            this.pipe[i].y = minY + Math.random() * (maxY - minY);
        }
    }

    update (dt: number) {
        // if game status is not playing, stop calculate and return
        if (this.gameStatus !== GameStatus.Game_Playing) {
            return;
        }

        // move the background node
        for (let i = 0; i < this.spBg.length; i++) {
            this.spBg[i].node.x -= 1.0;
            if (this.spBg[i].node.x <= -280) {
                this.spBg[i].node.x = 288;
            }
        }

        // move pipes
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i].x -= 1.0;
            if (this.pipe[i].x <= -170) {
                this.pipe[i].x = 430;

                var minY = -120;
                var maxY = 120;
                this.pipe[i].y = minY + Math.random() * (maxY - minY);
            }
        }
    }

    gameOver() {
        this.spGameOver.node.active = true;
        // when game is over, show the start button
        this.btnStart.node.active = true;
        // change the game status to Game_Over
        this.gameStatus = GameStatus.Game_Over;
        // play game over sound
        this.audioSourceControl.playSound(SoundType.E_Sound_Die);
    }

    touchStartBtn() {
        // hide start button
        this.btnStart.node.active = false;
        // set the gae status to playing
        this.gameStatus = GameStatus.Game_Playing;

        // hide game over node
        this.spGameOver.node.active = false;
        //reset position of all the pipes
        for (let i = 0; i < this.pipe.length; i++) {
            this.pipe[i].x = 170 + 200 * i;
            var minY = -120;
            var maxY = 120;
            this.pipe[i].y = minY + Math.random() * (maxY - minY);
        }

        // reset angle and position of bird
        var bird = this.node.getChildByName("Bird");
        bird.y = 0;
        bird.x = 0;
        bird.rotation = 0;

        // reset score when restart game
        this.gameScore = 0;
        this.labelScore.string = this.gameScore.toString();
    }
}

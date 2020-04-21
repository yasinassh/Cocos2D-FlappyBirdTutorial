// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // Speed of bird
    speed: number = 0;

    onLoad() {
        cc.Canvas.instance.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt: number) {
        this.speed -= 0.05
        this.node.y += this.speed

        var angle = -(this.speed/2) * 30;
        if (angle >= 30) {
            angle = 30;
        }
        this.node.rotation = angle;
    }

    onTouchStart(event: cc.Event.EventTouch) {
        this.speed = 2;
    }
}

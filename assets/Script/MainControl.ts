// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    spBg: cc.Sprite[] = [null, null];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt: number) {
        // move the background node
        for (let i = 0; i < this.spBg.length; i++) {
            this.spBg[i].node.x -= 1.0;
            if (this.spBg[i].node.x <= -288) {
                this.spBg[i].node.x = 288;
            }
        }
    }
}

const store = require("../store");
const {
    EVENT_DEAD,
    EVENT_BULLET_SHOOT,
} = require("../event");

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function(){
        cc.director.resume();
        
        window.GlobalEvent = new cc.EventTarget();

        GlobalEvent.on(EVENT_DEAD, () => {
            this.endTime = new Date();

            const node = cc.find("Canvas/dead");

            const bulletCount = this.bulletCount;
            const aliveSecond = (this.endTime - this.startTime) / 1000;

            const deadText = node.getComponent("dead-text");
            deadText.setBulletCount(bulletCount);
            deadText.setAliveSecond(aliveSecond);

            store.bulletCount = bulletCount;
            store.aliveSecond = aliveSecond;

            node.active = true;
        });

        this.startTime = new Date();
        this.bulletCount = 0;

        GlobalEvent.on(EVENT_BULLET_SHOOT, () => {
            this.bulletCount++;
        });
    }
});
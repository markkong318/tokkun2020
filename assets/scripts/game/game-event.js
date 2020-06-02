const {
    EVENT_DEAD,
    EVENT_BULLET_SHOOT,
} = require("../event");

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function(){
        window.GlobalEvent = new cc.EventTarget();

        GlobalEvent.on(EVENT_DEAD, () => {
            this.endTime = new Date();

            const node = cc.find("Canvas/dead");

            const deadText = node.getComponent("dead-text");
            deadText.setBulletCount(this.bulletCount);
            deadText.setAliveSecond((this.endTime - this.startTime) / 1000);

            node.active = true;
        });

        this.startTime = new Date();
        this.bulletCount = 0;

        GlobalEvent.on(EVENT_BULLET_SHOOT, () => {
            this.bulletCount++;
        });
    }
});
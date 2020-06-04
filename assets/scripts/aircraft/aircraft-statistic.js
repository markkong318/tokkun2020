const store = require("../store");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start: function() {
        this.x = this.node.x;
        this.y = this.node.y;

        this.moveSecond = 0;
        this.greatCount = 0;

        GlobalEvent.on(GlobalEvent.EVENT_AIRCRAFT_GREAT, () => {
            this.greatCount++;
        });

        GlobalEvent.on(GlobalEvent.EVENT_AIRCRAFT_DEAD, () => {
            this.endAliveTime = new Date();

            const node = cc.find("Canvas/dead");

            const bulletCount = this.bulletCount;
            const aliveSecond = (this.endAliveTime - this.startAliveTime) / 1000;
            const moveSecond = this.moveSecond;
            const greatRate = (this.greatCount / aliveSecond) * 100;

            const deadText = node.getComponent("dead-text");
            deadText.setBulletCount(bulletCount);
            deadText.setAliveSecond(aliveSecond);
            deadText.setMoveSecond(moveSecond);
            deadText.setGreatRate(greatRate);

            store.bulletCount = bulletCount;
            store.aliveSecond = aliveSecond;

            node.active = true;
        });

        this.startAliveTime = new Date();
        this.bulletCount = 0;

        GlobalEvent.on(GlobalEvent.EVENT_BULLET_SHOOT, () => {
            this.bulletCount++;
        });
    },

    update: function(dt) {
        if (this.x === this.node.x && this.y === this.node.y) {
            return;
        }

        this.moveSecond += dt;
    },
});
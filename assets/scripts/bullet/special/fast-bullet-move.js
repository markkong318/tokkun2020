const {
    EVENT_BULLET_SHOOT,
} = require("../../event");

const VELOCITY = 4;
const INIT_DELAY = 3;
const DELAY = 0;
const TARGET_WIDTH_OFFSET = 10;
const TARGET_HEIGHT_OFFSET = 10;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start: function () {
        this.alive = false;
        this.velocity = VELOCITY;

        const delay = Math.random() * DELAY + INIT_DELAY;

        this.scheduleOnce(() => {
            this.initPosition();
            this.initDelta();
            this.alive = true;
        }, delay)
    },

    update: function() {
        // if (!this.alive) {
        //     return;
        // }

        const size = cc.view.getDesignResolutionSize();

        this.node.x += this.dx * this.velocity;
        this.node.y += this.dy * this.velocity;

        if (this.node.x > size.width / 2 ||
            this.node.x < -size.width / 2 ||
            this.node.y > size.height / 2 ||
            this.node.y < - size.height / 2
        ) {
            // this.alive = false;
            this.node.destroy();
        }
    },

    initPosition: function() {
        let point;

        const size = cc.view.getDesignResolutionSize();

        const line = Math.floor(Math.random() * 4);

        switch (line) {
            case 0:
                point = cc.v2(Math.floor(Math.random() * (size.width + 1)), 0);
                break;
            case 1:
                point = cc.v2(0, Math.floor(Math.random() * (size.height + 1)));
                break;
            case 2:
                point = cc.v2(size.width, Math.floor(Math.random() * (size.height + 1)));
                break;
            case 3:
                point = cc.v2(Math.floor(Math.random() * (size.width + 1)), size.height);
                break;
        }

        this.node.x = point.x - size.width / 2;
        this.node.y = point.y - size.height / 2;

        GlobalEvent.emit(EVENT_BULLET_SHOOT);
    },

    initDelta: function() {
        const aircraft = cc.find("Canvas/aircraft");

        const targetX = this.node.x + (Math.floor(TARGET_WIDTH_OFFSET * Math.random())) - TARGET_WIDTH_OFFSET / 2;
        const targetY = this.node.y + (Math.floor(TARGET_HEIGHT_OFFSET * Math.random())) - TARGET_HEIGHT_OFFSET / 2;

        const start = cc.v2(targetX, targetY);
        const end = cc.v2(aircraft.x, aircraft.y);

        const vector = end.sub(start);
        const distance = vector.mag();

        this.dx = vector.x / distance;
        this.dy = vector.y / distance;
    },
});
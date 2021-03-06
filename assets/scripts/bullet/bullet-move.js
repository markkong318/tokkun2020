const VELOCITY = 2;
const INIT_DELAY = 0;
const DELAY = 10;
const TARGET_WIDTH_OFFSET = 100;
const TARGET_HEIGHT_OFFSET = 100;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start: function () {
        this.velocity = VELOCITY;

        const delay = Math.random() * DELAY + INIT_DELAY;

        this.scheduleOnce(() => {
            this.initPosition();
            this.initDelta();
        }, delay)
    },

    update: function() {
        const size = cc.view.getDesignResolutionSize();

        this.node.x += this.dx * this.velocity;
        this.node.y += this.dy * this.velocity;

        if (this.node.x > size.width / 2 ||
            this.node.x < -size.width / 2 ||
            this.node.y > size.height / 2 ||
            this.node.y < - size.height / 2
        ) {
            this.initPosition();
            this.initDelta();
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


        GlobalEvent.emit(GlobalEvent.EVENT_BULLET_SHOOT);
    },

    initDelta: function() {
        const aircraft = cc.find("Canvas/aircraft");

        const targetX = aircraft.x + (Math.floor(TARGET_WIDTH_OFFSET * Math.random())) - TARGET_WIDTH_OFFSET / 2;
        const targetY = aircraft.y + (Math.floor(TARGET_HEIGHT_OFFSET * Math.random())) - TARGET_HEIGHT_OFFSET / 2;

        const start = cc.v2(this.node.x, this.node.y);
        const end = cc.v2(targetX, targetY);

        const vector = end.sub(start);
        const distance = vector.mag();

        this.dx = vector.x / distance;
        this.dy = vector.y / distance;
    },
});
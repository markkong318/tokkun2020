const VELOCITY = 3;
const INIT_DELAY = 0;
const DELAY = 0;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start: function () {
        this.velocity = VELOCITY;

        const delay = Math.random() * DELAY + INIT_DELAY;

        this.scheduleOnce(() => {
            this.initPosition();

            this.initP0();
            this.initP1();
            this.initP2();

            this.initDt();
        }, delay);
    },

    update: function() {
        this.next();

        this.node.x = this.nextX;
        this.node.y = this.nextY;

        const size = cc.view.getDesignResolutionSize();

        if (this.node.x > size.width / 2 ||
            this.node.x < -size.width / 2 ||
            this.node.y > size.height / 2 ||
            this.node.y < - size.height / 2
        ) {
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

        GlobalEvent.emit(GlobalEvent.EVENT_BULLET_SHOOT);
    },

    initP0: function() {
        this.p0 = cc.v2(this.node.x, this.node.y);
    },

    initP1: function() {
        const aircraft = cc.find("Canvas/aircraft");
        this.p1 = cc.v2(aircraft.x, aircraft.y);
    },

    initP2: function(){
        const size = cc.view.getDesignResolutionSize();
        this.p2 = cc.v2(Math.floor(Math.random() * (size.width + 1)), Math.floor(Math.random() * (size.height + 1)));
    },

    initDt: function() {
        const start = this.p0;
        const middle = this.p1;
        const end = this.p2;

        const distance = middle.sub(start).mag() + end.sub(middle).mag();

        this.dt = 1 / distance * VELOCITY;
        this.t = 0;
    },
    
    next: function() {
        if (!this.dt || !this.p0 || !this.p1 || !this.p2) {
            return;
        }

        this.t += this.dt;

        this.nextX = Math.pow((1 - this.t), 2) * this.p0.x + 2 * (1 - this.t) * this.t * this.p1.x + Math.pow(this.t, 2) * this.p2.x;
        this.nextY = Math.pow((1 - this.t), 2) * this.p0.y + 2 * (1 - this.t) * this.t *  this.p1.y + Math.pow(this.t, 2) * this.p2.y;
    },
});
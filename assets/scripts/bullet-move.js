const VELOCITY = 1;
const DELAY = 10000;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start: function () {
        this.velocity = VELOCITY;

        const delay = Math.random() * DELAY;

        setTimeout(() => {
            this.initPosition();
            this.initDelta();
        }, delay);
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
    },

    initDelta: function() {
        const aircraft = cc.find("Canvas/aircraft");

        const start = cc.v2(this.node.x, this.node.y);
        const end = cc.v2(aircraft.x, aircraft.y);

        const vector = end.sub(start);
        const distance = vector.mag();

        this.dx = vector.x / distance;
        this.dy = vector.y / distance;
    }

});
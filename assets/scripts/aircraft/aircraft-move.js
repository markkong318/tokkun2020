const { EVENT_DEAD } = require("../event");

const INTERVAL = 7;

cc.Class({
    extends: cc.Component,

    properties: {
        frames: [cc.SpriteFrame],
        collisionNodes: [cc.Node],
    },

    start: function () {
        if (!this.frames.length) {
            return;
        }

        this.interval = INTERVAL;

        this.colliders = [];
        for (let i = 0; i < this.collisionNodes.length; i++) {
            this.colliders.push(this.collisionNodes[i].getComponent(cc.PolygonCollider))
        }

        const idx = Math.floor(this.frames.length / 2);

        this.sprite = this.node.getComponent(cc.Sprite);
        this.sprite.spriteFrame = this.frames[idx];

        this.collider = this.node.getComponent(cc.PolygonCollider);
        this.collider.points = this.colliders[idx].points;

        this.counter = Math.ceil(idx) * this.interval;
        this.target = this.counter;
    },

    update: function () {
        if (this.counter == this.target) {
            return;
        }

        if (this.target > this.counter) {
            this.counter++;
        } else if (this.target < this.counter) {
            this.counter--;
        }

        const idx = Math.floor(this.counter / this.interval);
        this.sprite.spriteFrame = this.frames[idx];
        this.collider.points = this.colliders[idx].points;
    },

    toLeft: function() {
        this.target = 0;
    },

    toRight: function() {
        this.target = (this.frames.length - 1) * this.interval;

    },

    toCenter: function() {
        this.target = Math.floor(this.frames.length / 2) * this.interval;
    },

    onCollisionEnter: function (other, self) {
        cc.director.pause();
        GlobalEvent.emit(EVENT_DEAD);
    }
});
const INTERVAL = 7;

cc.Class({
    extends: cc.Component,

    properties: {
        frames: [cc.SpriteFrame],
        collision: cc.Node,
    },

    start: function () {
        if (!this.frames.length) {
            return;
        }

        this.interval = INTERVAL;

        const idx = Math.floor(this.frames.length / 2);

        this.sprite = this.node.getComponent(cc.Sprite);
        this.sprite.spriteFrame = this.frames[idx];

        this.aircraftCollision = this.collision.getComponent("aircraft-collision");
        this.aircraftCollision.setIdx(idx);

        this.counter = Math.ceil(idx) * this.interval;
        this.target = this.counter;

        this.toCenter();
    },

    update: function (dt) {
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

        this.aircraftCollision.setIdx(idx);
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

});
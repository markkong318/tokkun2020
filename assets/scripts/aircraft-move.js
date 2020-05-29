const INTERVAL = 7;

cc.Class({
    extends: cc.Component,

    properties: {
        frames: [cc.SpriteFrame],
    },

    start: function () {
        if (!this.frames.length) {
            return;
        }

        this.interval = INTERVAL;

        this.sprite = this.node.getComponent(cc.Sprite);
        this.sprite.spriteFrame = this.frames[Math.floor(this.frames.length / 2)];

        this.counter = Math.ceil(this.frames.length / 2) * this.interval;
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

        this.sprite.spriteFrame = this.frames[Math.floor(this.counter / this.interval)];
    },

    toLeft: function() {
        this.target = 0;
    },

    toRight: function() {
        this.target = (this.frames.length - 1) * this.interval;

    },

    toCenter: function() {
        this.target = Math.floor(this.frames.length / 2) * this.interval;
    }
});
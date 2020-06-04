cc.Class({
    extends: cc.Component,

    properties: {
        aliveSecond: cc.Node,
        moveSecond:cc.Node,
        bulletCount: cc.Node,
        greatRate: cc.Node,
    },

    setAliveSecond: function (second) {
        const label = this.aliveSecond.getComponent(cc.Label);
        label.string = `生存時間　${second.toFixed(3)}秒`;
    },

    setMoveSecond: function(second) {
        const label = this.moveSecond.getComponent(cc.Label);
        label.string = `移動時間　${second.toFixed(3)}秒`;
    },

    setBulletCount: function (count) {
        const label = this.bulletCount.getComponent(cc.Label);
        label.string = `弾数　${count}発`;
    },

    setGreatRate: function (rate) {
        const label = this.greatRate.getComponent(cc.Label);
        label.string = `絶妙率　${rate.toFixed(2)}%`;
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        aliveSecond: cc.Node,
        bulletCount: cc.Node,
    },

    setAliveSecond: function (second) {
        const label = this.aliveSecond.getComponent(cc.Label);
        label.string = `生存時間　${second}秒`;
    },

    setBulletCount: function (count) {
        const label = this.bulletCount.getComponent(cc.Label);
        label.string = `弾数　${count}発`;
    },
});
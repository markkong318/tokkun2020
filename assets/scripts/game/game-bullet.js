cc.Class({
    extends: cc.Component,

    properties: {
        bullet: cc.Node,
        fastBullet: cc.Node,
    },

    onLoad: function () {
        this.count = 200;

        const canvas = cc.find("Canvas");

        this.bullets = [];
        for (let i = 0; i < this.count; i++) {
            const node = cc.instantiate(this.bullet);
            node.active = true;
            node.parent = canvas;

            this.bullets.push(node);
        }
    },

    stop: function() {
        for (let i = 0; i < this.bullets.length; i++) {
            const node = this.bullets[i];

            const bulletMove = node.getComponent("bullet-move");
            bulletMove.stop();
        }
    }
});
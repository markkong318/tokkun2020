cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function () {
        this.count = 200;

        const canvas = cc.find("Canvas");
        const bullet = cc.find("Canvas/bullet");

        this.bullets = [];
        for (let i = 0; i < this.count; i++) {
            const node = cc.instantiate(bullet);
            node.parent = canvas;

            this.bullets.push(node);
        }
    },

    pause: function() {

    }
});
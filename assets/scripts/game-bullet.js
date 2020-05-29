cc.Class({
    extends: cc.Component,

    properties: {},

    start: function () {
        this.count = 200;

        const canvasNode = cc.find("Canvas");
        const bulletNode = cc.find("Canvas/bullet");
        const scene = cc.director.getScene();

        this.bullets = [];
        for (let i = 0; i < this.count; i++) {
            const bullet = cc.instantiate(bulletNode);
            bullet.parent = canvasNode;

            this.bullets.push(bullet);
        }
    },

    pause: function() {

    }
});
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function () {
        const size = cc.view.getDesignResolutionSize();

        const x = Math.floor(size.width * Math.random()) - size.width / 2;
        const y = Math.floor(size.height * Math.random()) - size.height / 2;

        this.velocity = 1 * Math.random();

        this.node.x = x;
        this.node.y = y;
    },

    update: function() {
        const size = cc.view.getDesignResolutionSize();

        this.node.y -= this.velocity;

        if (this.node.y < -(size.height / 2)){
            this.node.y = size.height / 2;
        }
    }
});
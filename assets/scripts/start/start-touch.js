cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function() {
        cc.director.preloadScene("play");
        cc.director.preloadScene("eval");

        this.node.on(cc.Node.EventType.TOUCH_END, function(e)  {
            cc.director.loadScene("play");
        });
    }
});
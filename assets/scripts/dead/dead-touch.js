cc.Class({
    extends: cc.Component,

    properties: {
    },

    start: function() {
        this.node.on(cc.Node.EventType.TOUCH_END, function(e)  {
            cc.director.loadScene("eval");
        });
    }
});
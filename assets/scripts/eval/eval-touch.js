cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function() {
        console.log("sssss")
        this.node.on(cc.Node.EventType.TOUCH_END, function(e)  {
            console.log("tttttttt")
            cc.director.loadScene("start");
        });
    }
});
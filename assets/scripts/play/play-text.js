const {
    EVENT_UPDATE_PLAY_TIP,
} = require("../event");

cc.Class({
    extends: cc.Component,

    properties: {
        tip: cc.Node,
    },

    onLoad: function() {
        GlobalEvent.on(EVENT_UPDATE_PLAY_TIP, (e) => {
            const label = this.tip.getComponent(cc.Label);

            console.log(e);

            label.string = e.text;

            this.scheduleOnce(() => {
                label.string = "";
            }, 5);
        })
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        tip: cc.Node,
        great: cc.Node,
    },

    onLoad: function() {
        GlobalEvent.on(GlobalEvent.EVENT_BULLET_SPECIAL, (e) => {
            const label = this.tip.getComponent(cc.Label);

            label.string = e.text;

            this.scheduleOnce(() => {
                label.string = "";
            }, 5);
        });

        GlobalEvent.on(GlobalEvent.EVENT_AIRCRAFT_GREAT, (e) => {
            const label = this.great.getComponent(cc.Label);

            if (label.string) {
                label.string += "!";
            } else {
                label.string = "絶妙!";
            }

            this.scheduleOnce(() => {
                label.string = "";
            }, 5);
        });
    }
});
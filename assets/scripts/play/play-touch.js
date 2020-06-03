const {
    EVENT_PLAYER_DEAD,
} = require("../event");

cc.Class({
    extends: cc.Component,

    properties: {
        aircraft: cc.Node,
    },

    start: function () {
        this.playable = true;

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e)  {
            if (!this.playable) {
                return;
            }

            const aircraftMove = this.aircraft.getComponent("aircraft-move");

            var delta = e.touch.getDelta();

            this.aircraft.x += delta.x;
            this.aircraft.y += delta.y;

            if (delta.x > 0) {
                aircraftMove.toRight();
            } else if (delta.x < 0) {
                aircraftMove.toLeft();
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function(e)  {
            if (!this.playable) {
                return;
            }

            const aircraftMove = this.aircraft.getComponent("aircraft-move");
            aircraftMove.toCenter();
        }, this);

        GlobalEvent.on(EVENT_PLAYER_DEAD, function(){
            this.playable = false;
        }, this)
    },

});
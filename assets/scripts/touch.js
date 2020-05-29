cc.Class({
    extends: cc.Component,

    properties: {
        aircraft: cc.Node,
    },

    start: function () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e)  {
            var delta = e.touch.getDelta();

            this.aircraft.x += delta.x;
            this.aircraft.y += delta.y;

            const aircraftMove = this.aircraft.getComponent("aircraft-move");
            if (delta.x > 0) {
                aircraftMove.toRight();
            } else if (delta.x < 0) {
                aircraftMove.toLeft();
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function(e)  {
            const aircraftMove = this.aircraft.getComponent("aircraft-move");
            aircraftMove.toCenter();
        }, this);
    },

});
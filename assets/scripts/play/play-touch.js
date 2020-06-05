cc.Class({
    extends: cc.Component,

    properties: {
        aircraft: cc.Node,
    },

    start: function () {
        // this.playable = true;

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e)  {
            // if (!this.playable) {
            //     return;
            // }

            const aircraftMove = this.aircraft.getComponent("aircraft-move");

            var delta = e.touch.getDelta();

            this.aircraft.x += delta.x;
            this.aircraft.y += delta.y;

            const size = cc.view.getDesignResolutionSize();

            if (this.aircraft.x < -size.width / 2) {
                this.aircraft.x = -size.width / 2;
            }

            if (this.aircraft.x > size.width / 2) {
                this.aircraft.x = size.width / 2;
            }

            if (this.aircraft.y < -size.height / 2) {
                this.aircraft.y = -size.height / 2;
            }

            if (this.aircraft.y > size.height / 2) {
                this.aircraft.y = size.height / 2;
            }

            if (delta.x > 0) {
                aircraftMove.toRight();
            } else if (delta.x < 0) {
                aircraftMove.toLeft();
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, function(e)  {
            // if (!this.playable) {
            //     return;
            // }

            const aircraftMove = this.aircraft.getComponent("aircraft-move");
            aircraftMove.toCenter();
        }, this);

        GlobalEvent.on(GlobalEvent.EVENT_AIRCRAFT_DEAD, () => {
            this.node.active = false;
        })
    },

});
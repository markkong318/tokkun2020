const {
    EVENT_AIRCRAFT_DEAD,
} = require("../event");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    start: function() {
        this.x = this.node.x;
        this.y = this.node.y;

        this.moveSecond = 0;

        GlobalEvent.on(EVENT_AIRCRAFT_DEAD, () => {
            const node = cc.find("Canvas/dead");

            const deadText = node.getComponent("dead-text");
            deadText.setMoveSecond(this.moveSecond);
        });
    },

    update: function(dt) {
        if (this.x === this.node.x && this.y === this.node.y) {
            return;
        }

        this.moveSecond += dt;
    },
});
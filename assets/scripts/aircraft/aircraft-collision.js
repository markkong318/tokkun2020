const {
    EVENT_AIRCRAFT_DEAD,
} = require("../event");

cc.Class({
    extends: cc.Component,

    properties: {
        frames: [cc.PolygonCollider],
    },

    onLoad: function () {
        this.collider = this.node.getComponent(cc.PolygonCollider);
    },

    setIdx: function(idx) {
        this.collider.points = this.frames[idx].points;
    },

    onCollisionEnter: function (other, self) {
        cc.director.pause();
        GlobalEvent.emit(EVENT_AIRCRAFT_DEAD);
    }
});
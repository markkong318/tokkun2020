cc.Class({
    extends: cc.Component,

    properties: {
    },

    start: function () {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
    }
});
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function(){
        cc.director.resume();
        
        window.GlobalEvent = new cc.EventTarget();
        GlobalEvent.EVENT_AIRCRAFT_DEAD = "EVENT_AIRCRAFT_DEAD";
        GlobalEvent.EVENT_AIRCRAFT_GREAT = "EVENT_AIRCRAFT_GREAT";
        GlobalEvent.EVENT_BULLET_SHOOT = "EVENT_BULLET_SHOOT";
        GlobalEvent.EVENT_BULLET_SPECIAL = "EVENT_BULLET_SPECIAL";
    }
});
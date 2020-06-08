const bulletRates = require("../master/bulletRates");

cc.Class({
    extends: cc.Component,

    properties: {
        fastBullet: cc.Node,
        traceBullet: cc.Node,
        fastTraceBullet: cc.Node,
    },

    onLoad: function () {
        let cooldown = 0;

        this.schedule(() => {
            if (cooldown > 0) {
                cooldown--;
                return;
            }

            let ans = Math.random() * 100;

            let bulletRate;
            for (let i = 0 ; i < bulletRates.length; i++) {
                const { rate } = bulletRates[i];

                ans -= rate;

                if (ans < 0) {
                    bulletRate = bulletRates[i];
                    break;
                }
            }

            if (!bulletRate) {
                return;
            }

            const funcName = "trigger" + bulletRate.bulletId.toLowerCase().replace(/(^\w|[-_][a-z])/g, group =>
                group
                    .toUpperCase()
                    .replace('-', '')
                    .replace('_', '')
            );

            this[funcName]();

            cooldown = 10;
        }, 1);
    },

    triggerFast: function() {
        const canvas = cc.find("Canvas");

        GlobalEvent.emit(GlobalEvent.EVENT_BULLET_SPECIAL, {text: "精密射撃"});

        for (let i = 0; i < 5; i++) {
            this.scheduleOnce(() => {
                const node = cc.instantiate(this.fastBullet);
                node.active = true;
                node.parent = canvas;
            }, 0.3 * i);
        }
    },

    triggerTrace: function() {
        const canvas = cc.find("Canvas");

        GlobalEvent.emit(GlobalEvent.EVENT_BULLET_SPECIAL, {text: "誘導弾"});

        for (let i = 0; i < 5; i++) {
            this.scheduleOnce(() => {
                const node = cc.instantiate(this.traceBullet);
                node.active = true;
                node.parent = canvas;
            }, 0.1 * i);
        }
    },

    triggerFastTrace: function() {
        const canvas = cc.find("Canvas");

        GlobalEvent.emit(GlobalEvent.EVENT_BULLET_SPECIAL, {text: "加速誘導弾"});

        for (let i = 0; i < 5; i++) {
            this.scheduleOnce(() => {
                const node = cc.instantiate(this.fastTraceBullet);
                node.active = true;
                node.parent = canvas;
            }, 0.1 * i);
        }
    }
});
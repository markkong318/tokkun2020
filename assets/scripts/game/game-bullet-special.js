const bulletRates = require("../master/bulletRates");

cc.Class({
    extends: cc.Component,

    properties: {
        fastBullet: cc.Node,
    },

    onLoad: function () {
        let cooldown = 0;

        this.schedule(() => {
            if (cooldown > 0) {
                cooldown--;
                console.log("cool down")
                return;
            }

            let ans = Math.random() * 100;

            console.log(ans);

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

            switch (bulletRate.bulletId) {
                case "fast":
                    this.triggerFast();
                    break;
            }

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
    }
});
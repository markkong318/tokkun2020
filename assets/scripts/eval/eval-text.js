const store = require("../store");
const titles = require("../master/titles");

cc.Class({
    extends: cc.Component,

    properties: {
        para1: cc.Node,
        para2: cc.Node,
        para3: cc.Node,
    },

    onLoad: function() {
        const label1 = this.para1.getComponent(cc.Label);
        const label2 = this.para2.getComponent(cc.Label);
        const label3 = this.para3.getComponent(cc.Label);

        const aliveSecond = store.aliveSecond;

        let title;
        for (let i = 0; i < titles.length; i++) {
            title = titles[i];

            if (title.time > aliveSecond) {
                break;
            }
        }

        label1.string = title.text[0];
        label2.string = title.text[1];
        label3.string = title.text[2];
    }
});
cc.Class({
    extends: cc.Component,

    properties: {
        stars: [cc.Node]
    },

    onLoad: function () {
        this.count = 50;

        const canvas = cc.find("Canvas");

        this.activeStars = [];
        for (let i = 0; i < this.count; i++) {
            const star = this.stars[Math.floor(this.stars.length * Math.random())];

            const node = cc.instantiate(star);
            node.parent = canvas;

            this.activeStars.push(node);
        }
    }
});
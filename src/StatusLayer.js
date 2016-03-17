var StatusLayer = cc.Layer.extend({

	labelCoin: null,
	labelMeter: null,
	coins: 0,

	ctor: function() {
		this._super();
		this.init();
	},
	init: function() {
		this._super();

		var winSize = cc.director.getWinSize();

		this.labelCoin = new cc.LabelTTF("Coins: 0", "Helvetica", 45);
		this.labelCoin.setPosition(cc.p(90, winSize.height - 40));
		this.labelCoin.setColor(cc.color(0,0,0));
		this.addChild(this.labelCoin);

		this.labelMeter = new cc.LabelTTF("0M", "Helvetica", 45);
		this.labelMeter.setPosition(cc.p(winSize.width - 40, winSize.height - 40));
		this.labelMeter.setColor(cc.color(255,255,255));
		this.addChild(this.labelMeter);
	}
});
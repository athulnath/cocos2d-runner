
var PlayScene = cc.Scene.extend({
	space: null,
	onEnter: function() {
		this._super();
		this.initPhysics();

		this.gameLayer = new cc.Layer();
		this.gameLayer.addChild(new BackgroundLayer(),0, 0);
		this.gameLayer.addChild(new AnimationLayer(this.space),0,1);
		this.addChild(this.gameLayer);

		this.addChild(new StatusLayer(), 0,2);

		this.scheduleUpdate();
	},
	initPhysics: function() {
		this.space = new cp.Space();
		this.space.gravity = cp.v(0, -350);

        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_groundHeight),// start point
            cp.v(4294967295, g_groundHeight),// MAX INT:4294967295
            0);
        this.space.addStaticShape(wallBottom);
	},
	update: function(dt) {
		this.space.step(dt);
	    var animationLayer = this.gameLayer.getChildByTag(1);
        var eyeX = animationLayer.getEyeX();        
        this.gameLayer.setPosition(cc.p(-eyeX,0));
	}
});
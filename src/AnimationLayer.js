var AnimationLayer = cc.Layer.extend({
	spriteSheet: null,
	runningAction: null,
	sprite: null,
	space: null,
	body: null,
	ctor: function(space) {
		this._super();
		this.space = space;
		this.init();
	},
	init: function() {
		this._super();

		//create sprite sheet
		cc.spriteFrameCache.addSpriteFrames(res.runner_plist);
		this.spriteSheet = new cc.SpriteBatchNode(res.runner);
		this.addChild(this.spriteSheet);

		//init running action
		var animFrames = [];
		for(var i = 1; i < 8; i++) {
			var spriteId = "scottpilgrim_" + i + ".png";
			var frame = cc.spriteFrameCache.getSpriteFrame(spriteId);
			animFrames.push(frame);
		}

		var animation = new cc.Animation(animFrames, 0.1);
		var runningAction = new cc.RepeatForever(new cc.Animate(animation));
		this.sprite = new cc.PhysicsSprite("#scottpilgrim_1.png");
		// this.sprite = new cc.Sprite("#scottpilgrim_1.png");
		// 
		
		// this._debugNode = new cc.PhysicsDebugNode(this.space);
		// Parallax ratio and offset
		// this.addChild(this._debugNode, 10);

		
		var contentSize = this.sprite.getContentSize();

		this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
		this.body.p = cc.p(g_runnerStartX, g_groundHeight + contentSize.height/2);
		this.body.applyImpulse(cp.v(200, 0), cp.v(0, 0));

		this.space.addBody(this.body);
		this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        this.space.addShape(this.shape);
        this.sprite.setBody(this.body);

		this.sprite.runAction(runningAction);
		this.spriteSheet.addChild(this.sprite);
	},

	getEyeX: function() {
		return this.sprite.getPositionX() - g_runnerStartX;
	}

});
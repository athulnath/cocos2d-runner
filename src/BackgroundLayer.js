var BackgroundLayer = cc.Layer.extend({
	map: null,
	map1: null,
	mapWidth: 0,
	mapIndex: 0,
	ctor: function() {
		this._super();
		this.init();
	},
	init: function() {
		this._super();
		// var winSize = cc.director.getWinSize();
		// var centerPos = cc.p(winSize.width/2, winSize.height/2);
		// var playerBG = new cc.Sprite(res.play_bg_jpg);
		// playerBG.setPosition(centerPos);
		// playerBG.setScaleX(winSize.width / playerBG.getContentSize().width * 1);
		// playerBG.setScaleY(winSize.height / playerBG.getContentSize().height * 1);
		// this.addChild(playerBG);
		// 
		
		this.map = new cc.TMXTiledMap(res.map_tmx);
		this.addChild(this.map);
		this.mapWidth = this.map.getContentSize().width;
		this.map1 = new cc.TMXTiledMap(res.map1_tmx);
		this.map1.setPosition(cc.p(this.mapWidth, 0));
		this.addChild(this.map1);

		this.scheduleUpdate();
	},
	checkAndReload: function(eyeX) {
	   	var newMapIndex = parseInt(eyeX / (this.mapWidth));
        if (this.mapIndex == newMapIndex) {
            return false;
        }
        if (0 == newMapIndex % 2) {
            // change mapSecond
            this.map1.setPositionX(this.mapWidth * (newMapIndex + 1));
        } else {
            // change mapFirst
            this.map.setPositionX(this.mapWidth * (newMapIndex + 1));
        }
        this.mapIndex = newMapIndex;
        return true;
	},
	update: function(dt) {
	    var animationLayer = this.getParent().getChildByTag(1);
        var eyeX = animationLayer.getEyeX();        
        this.checkAndReload(eyeX);
	}
});

var MenuLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
    },
    init: function() {
        this._super();
        var winSize = cc.director.getWinSize();

        var centerPos = cc.p(winSize.width/2, winSize.height/2);

        var spriteBg = new cc.Sprite(res.bg_jpg);
        spriteBg.setScaleX(winSize.width/spriteBg.getContentSize().width * 1);
        spriteBg.setScaleY(winSize.height/spriteBg.getContentSize().height * 1);
        spriteBg.setPosition(centerPos);
        this.addChild(spriteBg);

        //adding menu
        var menuItemPlay = new cc.MenuItemSprite(
                new cc.Sprite(res.play_png),
                new cc.Sprite(res.play_click_png),
                this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);
        this.addChild(menu);

    },
    onPlay: function() {
        cc.log("==onplay clicked");
        cc.director.runScene(new PlayScene());
    }

});

var MenuScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});



var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("HELLO...!!", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite();
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5
        });


        // this.sprite.runAction(new cc.MoveTo(1, cc.p(0, 0)));

        var animation = new cc.Animation();
        for(var i = 1; i <= 8; i++) {
            var frameName = "res/run/scottpilgrim_"+i+".png";
            animation.addSpriteFrameWithFile(frameName);
        }

        animation.setDelayPerUnit(1/8);
        // animation.setRestoreOriginalFrame(true);
        var action = new cc.Animate(animation);
        this.sprite.runAction(new cc.Sequence(action, action.reverse()));


        this.addChild(this.sprite, 1);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


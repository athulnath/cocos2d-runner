cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) 
        document.body.removeChild(document.getElementById("cocosLoading"));
    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MenuScene());
    }, this);
};
cc.game.run();
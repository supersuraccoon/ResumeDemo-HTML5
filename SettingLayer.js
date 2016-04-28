//
// SettingLayer class
//
var SettingLayer = function(){};

SettingLayer.prototype.onDidLoadFromCCB = function() {
	this.isShowing = false;
    // mouse
    this.rootNode.setMouseEnabled(true);
    this.rootNode.onMouseMoved = function (event) {
	    var location = event.getLocation();
	    this.controller.handleMouseMove(this.convertToNodeSpace(location));
    }
};

SettingLayer.prototype.handleMouseMove = function (location) {
    if (cc.rectContainsPoint(this.settingBg.rect(), location)) {
    	if (!this.isShowing) {
    		if (this.settingBg.numberOfRunningActions() == 0) this.settingBg.runAction(cc.Sequence.create(cc.MoveBy.create(0.5, cc.p(-80, 0)), cc.CallFunc.create(this.showOver, this.rootNode)));
       	}
    }
    else {
    	if (this.isShowing) {
    		if (this.settingBg.numberOfRunningActions() == 0) this.settingBg.runAction(cc.Sequence.create(cc.MoveBy.create(0.5, cc.p(80, 0)), cc.CallFunc.create(this.hideOver, this.rootNode)));
    	}
    }
};

SettingLayer.prototype.showOver = function () {
    this.controller.isShowing = true;
};

SettingLayer.prototype.hideOver = function () {
    this.controller.isShowing = false;
};

// Create callback for button
SettingLayer.prototype.onZHPressed = function() {
	if (GameDataManager.languageType == LANGUAGE_CHINESE) return;
	GameDataManager.languageType = LANGUAGE_CHINESE;
	this.rootNode.getParent().controller.updateCCBElements();
};

SettingLayer.prototype.onJAPressed = function() {
	if (GameDataManager.languageType == LANGUAGE_JAPANESE) return;
	GameDataManager.languageType = LANGUAGE_JAPANESE;
	this.rootNode.getParent().controller.updateCCBElements();
};

SettingLayer.prototype.onENPressed = function() {
	if (GameDataManager.languageType == LANGUAGE_ENGLISH) return;
	GameDataManager.languageType = LANGUAGE_ENGLISH;
	this.rootNode.getParent().controller.updateCCBElements();
};

SettingLayer.prototype.onBackPressed = function() {
	this.rootNode.setVisible(false);
	var scene = cc.BuilderReader.loadAsScene("MainScene.ccbi");
    cc.Director.getInstance().replaceScene(cc.TransitionPageTurn.create(1.0, scene, true));
};

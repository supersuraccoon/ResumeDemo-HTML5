//
// Cocos2dScene class
//
var Cocos2dScene = function(){};

Cocos2dScene.prototype.onDidLoadFromCCB = function() {
	GameDataManager.cocos2dChecked = true;

	var winSize = cc.Director.getInstance().getWinSize();
 	this.currentDetailIndex = 1;
	this.dateArray = new Array(
		"2.2011",
		"3.2011",
		"5.2011",
		"12.2012",
		"3.2013",
		"4.2013",
		"5.2013",
		"6.2013",
		"2.2011\n~\n7.2013"
	);
	
    var timelineLayerV = TimelineLayer.createTimeline(this, new cc.Size(100, winSize.height * 2 / 3), this.dateArray, TIMELINE_VERTICAL, TIMELINE_LABEL_RIGHT);
    timelineLayerV.setPosition(cc.p(50, 100));
    this.rootNode.addChild(timelineLayerV, 999, 999);
      
    // setting
    this.settingLayer = cc.BuilderReader.load("SettingLayer.ccbi");
	this.settingLayer.setPosition(cc.p(winSize.width - 20, winSize.height / 2 - this.settingLayer.getContentSize().height / 2));
	this.rootNode.addChild(this.settingLayer, 999);
	
	for(var i = 1; i < this.dateArray.length; i++) {
		var ccLayer = this.rootNode.getChildByTag(i + 1);
		ccLayer.setVisible(false);
	}
	
	this.updateCCBElements();
};

Cocos2dScene.prototype.spinStart = function(timeSpotTag) {
	var ccLayerOld = this.rootNode.getChildByTag(this.currentDetailIndex);
	ccLayerOld.setVisible(false);
	this.currentDetailIndex = timeSpotTag;
	this.w.setString(MultiLanguageUtil.getLocalizatedStringForKey("c_" + this.currentDetailIndex));
	var ccLayer = this.rootNode.getChildByTag(timeSpotTag);
	ccLayer.setVisible(true);
};

Cocos2dScene.prototype.updateCCBElements = function() {
	this.cocos2dLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_COCOS2D_TITLE));
	this.p.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_COCOS2D_P));
	this.w.setString(MultiLanguageUtil.getLocalizatedStringForKey("c_" + this.currentDetailIndex));
};


Cocos2dScene.prototype.spinOver = function(timeSpotTag) {
};

Cocos2dScene.prototype.timeSpotTouched = function(timeSpotTag) {
};

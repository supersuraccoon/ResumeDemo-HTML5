//
// WorkingScene class
//
var WorkingScene = function(){};

WorkingScene.prototype.onDidLoadFromCCB = function() {
	GameDataManager.workingChecked = true;
 	var winSize = cc.Director.getInstance().getWinSize();
 	
 	this.currentWorkingDetailIndex = 1;
 	this.currentWorkingPhase = 1;
	this.dateArray = new Array(
		"7.2009\n    ~\n8.2009",
		"8.2009\n    ~\n11.2009",
		"12.2010",
		"2.2010\n    ~\n3.2010",
		"4.2010\n    ~\n5.2010",
		"5.2010\n    ~\n11.2010",
		
		"11.2010\n    ~\n2.2011",
		"3.2011\n    ~\n5.2011",
		
		"5.2011\n    ~\n9.2011",
		"9.2011\n    ~\n11.2011",
		"11.2011\n    ~\n10.2012",
		"12.2012",
		"10.2012\n    ~\nNow"
	);
	
    var timelineLayerV = TimelineLayer.createTimeline(this, new cc.Size(100, winSize.height * 2 / 3), this.dateArray, TIMELINE_VERTICAL, TIMELINE_LABEL_RIGHT);
    timelineLayerV.setPosition(cc.p(50, 100));
    this.rootNode.addChild(timelineLayerV, 999, 999);
    
    // mouse
    var winSize = cc.Director.getInstance().getWinSize();
    this.settingLayer = cc.BuilderReader.load("SettingLayer.ccbi");
	this.settingLayer.setPosition(cc.p(winSize.width - 20, winSize.height / 2 - this.settingLayer.getContentSize().height / 2));
	this.rootNode.addChild(this.settingLayer, 999);
	
	this.updateCCBElements();
};

WorkingScene.prototype.updateCCBElements = function() {
	this.workLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_WORK_TITLE2));
	this.p.setString(MultiLanguageUtil.getLocalizatedStringForKey("p_" + this.currentWorkingPhase));
	this.exp.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_WORKING_EXP));
	this.detail.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_WORKING_DETAIL));
	this.skills.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_WORKING_SKILLS));
	
	this.w1.setString(MultiLanguageUtil.getLocalizatedStringForKey("w_" + this.currentWorkingDetailIndex + "_1"));
	this.w2.setString(MultiLanguageUtil.getLocalizatedStringForKey("w_" + this.currentWorkingDetailIndex + "_2"));
	this.w3.setString(MultiLanguageUtil.getLocalizatedStringForKey("w_" + this.currentWorkingDetailIndex + "_3"));
};

// Create callback for button
WorkingScene.prototype.onBackPressed = function() {
	var scene = cc.BuilderReader.loadAsScene("MainScene.ccbi");
    cc.Director.getInstance().replaceScene(cc.TransitionPageTurn.create(1.0, scene, true));
};

WorkingScene.prototype.spinStart = function(timeSpotTag) {
	if (timeSpotTag > 6) timeSpotTag ++;
	this.currentWorkingDetailIndex = timeSpotTag;
	this.w1.setString(MultiLanguageUtil.getLocalizatedStringForKey("w_" + this.currentWorkingDetailIndex + "_1"));
	this.w2.setString(MultiLanguageUtil.getLocalizatedStringForKey("w_" + this.currentWorkingDetailIndex + "_2"));
	this.w3.setString(MultiLanguageUtil.getLocalizatedStringForKey("w_" + this.currentWorkingDetailIndex + "_3"));
	
	if (this.currentWorkingPhase != 1 && timeSpotTag < 8) {
		this.currentWorkingPhase = 1;
		this.p.setString(MultiLanguageUtil.getLocalizatedStringForKey("p_" + this.currentWorkingPhase));
	}
	if (this.currentWorkingPhase != 2 && timeSpotTag >= 8 && timeSpotTag < 10) {
		this.currentWorkingPhase = 2;
		this.p.setString(MultiLanguageUtil.getLocalizatedStringForKey("p_" + this.currentWorkingPhase));
	}
	if (this.currentWorkingPhase != 3 && timeSpotTag >= 10) {
		this.currentWorkingPhase = 3;
		this.p.setString(MultiLanguageUtil.getLocalizatedStringForKey("p_" + this.currentWorkingPhase));
	}
};
WorkingScene.prototype.spinOver = function(timeSpotTag) {
};
WorkingScene.prototype.timeSpotTouched = function(timeSpotTag) {
};

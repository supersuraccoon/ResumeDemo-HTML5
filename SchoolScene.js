//
// SchoolScene class
//
var SchoolScene = function(){};

SchoolScene.prototype.onDidLoadFromCCB = function() {
	GameDataManager.shoolChecked = true;
    // mouse
    this.rootNode.setMouseEnabled(true);
    this.rootNode.onMouseMoved = function (event) {
	    var location = event.getLocation();
	    this.controller.handleMouseMove(location);
    }
    
    var winSize = cc.Director.getInstance().getWinSize();
    this.settingLayer = cc.BuilderReader.load("SettingLayer.ccbi");
	this.settingLayer.setPosition(cc.p(winSize.width - 20, winSize.height / 2 - this.settingLayer.getContentSize().height / 2));
	this.rootNode.addChild(this.settingLayer, 999);
	
	this.mfcLayer = cc.BuilderReader.load("MFCLayer.ccbi");
	this.mfcLayer.setPosition(cc.p(winSize.width / 2 - this.mfcLayer.getContentSize().width / 2, 0));
	this.mfcLayer.setVisible(false);
	this.rootNode.addChild(this.mfcLayer, 999);
	
	this.updateCCBElements();
};

SchoolScene.prototype.updateCCBElements = function() {
	this.schoolLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_SCHOOL_TITLE));
	this.languageLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_TITLE_1));
	this.researchLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_TITLE_2));
	this.contestLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_TITLE_3));
	this.s1.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_1));
	this.s2.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_2));
	this.s3.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_3));
	this.s4.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_4));
	this.s5.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_5));
	this.s6.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_6));
	this.s7.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_7));
	this.s8.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SCHOOL_8));
};

// hover
SchoolScene.prototype.handleMouseMove = function (location) {
    var targetObjectArray = new Array(this.s1, this.s2, this.s3, this.s4, this.s5, this.s6, this.s7, this.s8);
    for (var i = 0; i < targetObjectArray.length; i++) {
        var targetObject = targetObjectArray[i];
        if (cc.rectContainsPoint(targetObject.rect(), location)) {
        	if (targetObject.getOpacity() != 255) {
        		targetObject.setOpacity(255);
        		if (i == 3) this.mfcLayer.setVisible(true);
        	}
        }
        else {
            if (targetObject.getOpacity() == 255) {
        		targetObject.setOpacity(50);
        	}
        }
    }
};


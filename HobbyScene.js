//
// HobbyScene class
//
var HobbyScene = function(){};

HobbyScene.prototype.onDidLoadFromCCB = function() {
	GameDataManager.hobbyChecked = true;

    var winSize = cc.Director.getInstance().getWinSize();
    
    this.settingLayer = cc.BuilderReader.load("SettingLayer.ccbi");
	this.settingLayer.setPosition(cc.p(winSize.width - 20, winSize.height / 2 - this.settingLayer.getContentSize().height / 2));
	this.rootNode.addChild(this.settingLayer, 999);

	this.currentHobby = 1;
	this.hobbyArray = new Array(this.hobby1, this.hobby2, this.hobby3, this.hobby4);
	this.hobbyLayerArray = new Array(this.hobbyLayer1, this.hobbyLayer2, this.hobbyLayer3, this.hobbyLayer4);
	
	this.hobby1.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.TintBy.create(3, -125, -255, -125),cc.TintBy.create(3, 125, 255, 125))));
	
	this.updateCCBElements();
};

HobbyScene.prototype.updateCCBElements = function() {
	this.hobbyLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_HOBBY_TITLE));
	this.hobby1.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_HOBBY_MUSIC));
	this.hobby2.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_HOBBY_READING));
	this.hobby3.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_HOBBY_SPORTS));
	this.hobby4.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_HOBBY_OTHERS));
	
	var hobbyLayer = this.hobbyLayerArray[this.currentHobby - 1];
	var hobbyContent = hobbyLayer.getChildByTag(99);
	hobbyContent.setString(MultiLanguageUtil.getLocalizatedStringForKey("hobbys_" + this.currentHobby));
};

HobbyScene.prototype.updateContents = function(h) {
	this.hobbyLayerArray[this.currentHobby - 1].setVisible(false);
	this.hobbyArray[this.currentHobby - 1].stopAllActions();
	this.hobbyArray[this.currentHobby - 1].setColor(cc.RED);
	this.currentHobby = h;
	this.hobbyLayerArray[this.currentHobby - 1].setVisible(true);
	this.hobbyArray[this.currentHobby - 1].runAction(cc.RepeatForever.create(cc.Sequence.create(cc.TintBy.create(3, -125, -255, -125),cc.TintBy.create(3, 125, 255, 125))));
	
	var hobbyLayer = this.hobbyLayerArray[this.currentHobby - 1];
	var hobbyContent = hobbyLayer.getChildByTag(99);
	hobbyContent.setString(MultiLanguageUtil.getLocalizatedStringForKey("hobbys_" + this.currentHobby));
};

HobbyScene.prototype.onMusicPressed = function() {
	if (this.currentHobby == 1) return;
	this.updateContents(1);
};

HobbyScene.prototype.onReadingPressed = function() {
	if (this.currentHobby == 2) return;
	this.updateContents(2);
};

HobbyScene.prototype.onSportsPressed = function() {
	if (this.currentHobby == 3) return;
	this.updateContents(3);
};

HobbyScene.prototype.onOthersPressed = function() {
	if (this.currentHobby == 4) return;
	this.updateContents(4);
};

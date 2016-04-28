//
// MainScene class
//

cc.Node.prototype.rect = function() {
    return cc.rect (this.getPositionX() - this._contentSize.width * this._scaleX / 2,
    				this.getPositionY() - this._contentSize.height * this._scaleY / 2,
    				this._contentSize.width * this._scaleX,
    				this._contentSize.height * this._scaleY);
};

var MainScene = function() {};

MainScene.prototype.onDidLoadFromCCB = function() {
	// 
	this.prosTTF = CircleLabelTTF.create("", MultiLanguageUtil.getLocalizatedStringForKey(STRING_PROS), 90, 180, 75);
	this.prosTTF.setPosition(this.plusSprite.getPosition());
    this.rootNode.addChild(this.prosTTF, 1);
	this.consTTF = CircleLabelTTF.create("", MultiLanguageUtil.getLocalizatedStringForKey(STRING_CONS), 90, 180, 250);
	this.consTTF.setPosition(this.minusSprite.getPosition());
    this.rootNode.addChild(this.consTTF, 1);
    // mouse
    this.rootNode.setMouseEnabled(true);
    this.rootNode.onMouseMoved = function (event) {
	    var location = event.getLocation();
	    this.controller.handleMouseMove(location);
    }
    // touch
   	this.rootNode.setTouchEnabled(true);
    this.rootNode.onTouchesBegan = function (touches, event) {
    	var touchLocation = touches[0].getLocation();
        this.controller.handleTouch(touchLocation);
    }
    
    var winSize = cc.Director.getInstance().getWinSize();
    this.settingLayer = cc.BuilderReader.load("SettingLayer.ccbi");
	this.settingLayer.setPosition(cc.p(winSize.width - 20, winSize.height / 2 - this.settingLayer.getContentSize().height / 2));
	this.rootNode.addChild(this.settingLayer, 999);
	
	this.nameLabel.runAction(cc.RepeatForever.create(cc.Sequence.create(
                        cc.TintBy.create(5, -255, -255, -255),
                        cc.TintBy.create(5, 255, 255, 255))));
	this.titleLabel.runAction(cc.RepeatForever.create(cc.Sequence.create(
              			cc.TintBy.create(5, -255, -255, -255),
                        cc.TintBy.create(5, 255, 255, 255))));
    this.selfEvaluationLayer = cc.BuilderReader.load("SelfEvaluationLayer.ccbi");
    this.selfEvaluationLayer.setPosition(cc.p(this.raccoon.getPositionX(), this.raccoon.getPositionY() + 100));
    this.selfEvaluationLayer.setVisible(false);
    this.rootNode.addChild(this.selfEvaluationLayer, 999);
    
    
    if (GameDataManager.shoolChecked && GameDataManager.workingChecked && GameDataManager.cocos2dChecked && GameDataManager.hobbyChecked) {
		this.angleSprite.setVisible(true);
		this.evilSprite.setVisible(true);
		this.plusSprite.setVisible(true);
		this.minusSprite.setVisible(true);
	}
	else {
		this.angleSprite.setVisible(false);
		this.evilSprite.setVisible(false);
		this.plusSprite.setVisible(false);
		this.minusSprite.setVisible(false);
	}
	
	if (GameDataManager.angleChecked && GameDataManager.evilChecked) {
		this.raccoon.setVisible(true);
		this.raccoon.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.ScaleTo.create(1.0, 2.0), cc.ScaleTo.create(1.0, 1.0))));
	}
	else {
		this.raccoon.setVisible(false);
	}
    
	this.updateCCBElements();
};

MainScene.prototype.updateCCBElements = function() {
	this.nameLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_NAME));
	this.titleLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_TITLE));
	
	this.schoolLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_SCHOOL_TITLE));
	this.workLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_WORK_TITLE));
	this.cocos2dLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_COCOS2D_TITLE));
	this.hobbyLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_HOBBY_TITLE));
	
	this.schoolIntroLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_SCHOOL_INTRO));
	this.workIntroLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_WORK_INTRO));
	this.cocos2dIntroLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_COCOS2D_INTRO));
	this.hobbyIntroLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_HOBBY_INTRO));
	
	this.contactLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_CONTACT));
	this.websiteLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_WEBSITE));
	this.emailLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_EMAIL));
	this.qqLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_QQ));
	this.websiteDetailLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_WEBSITE_DETAIL));
	this.emailDetailLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_EMAIL_DETAIL));
	this.qqDetailLabel.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_MAIN_QQ_DETAIL));
	
	this.prosTTF.setStrings(MultiLanguageUtil.getLocalizatedStringForKey(STRING_PROS));
	this.consTTF.setStrings(MultiLanguageUtil.getLocalizatedStringForKey(STRING_CONS));
	
	this.selfEvaluationLayer.controller.updateCCBElements();
};

// Create callback for button
MainScene.prototype.onSchoolLifePressed = function() {
	var scene = cc.BuilderReader.loadAsScene("SchoolScene.ccbi");
    cc.Director.getInstance().replaceScene(cc.TransitionPageTurn.create(1.0, scene, false));
};

MainScene.prototype.onWorkingPressed = function() {
	var scene = cc.BuilderReader.loadAsScene("WorkingScene.ccbi");
    cc.Director.getInstance().replaceScene(cc.TransitionPageTurn.create(1.0, scene, false));
};

MainScene.prototype.onCocos2dPressed = function() {
	var scene = cc.BuilderReader.loadAsScene("Cocos2dScene.ccbi");
    cc.Director.getInstance().replaceScene(cc.TransitionPageTurn.create(1.0, scene, false));
};

MainScene.prototype.onHobbyPressed = function() {
	var scene = cc.BuilderReader.loadAsScene("HobbyScene.ccbi");
    cc.Director.getInstance().replaceScene(cc.TransitionPageTurn.create(1.0, scene, false));
};

// hover
MainScene.prototype.handleMouseMove = function (location) {
    var winSize = cc.Director.getInstance().getWinSize();
    // title
    var titleObjectArray = new Array(this.schoolLabel, this.workLabel, this.cocos2dLabel, this.hobbyLabel);
    var menuObjectArray = new Array(this.schoolMenu, this.workingMenu, this.cocos2dMenu, this.hobbyMenu);
    for (var i = 0; i < titleObjectArray.length; i++) {
        var titleObject = titleObjectArray[i];
        var menuObject = menuObjectArray[i];
        if (cc.rectContainsPoint(titleObject.rect(), location)) {
        	if (menuObject.numberOfRunningActions() == 0) {
        		titleObject.setScale(1.1);
        		menuObject.runAction(cc.RepeatForever.create(cc.RotateBy.create(1, 3600)));
        	}
        }
        else {
            titleObject.setScale(1.0);      	
            menuObject.stopAllActions();
            menuObject.setRotation(0);
        }
    }
    // flower
    if (cc.rectContainsPoint(this.contactCircleSprite.rect(), location)) {
    	if (this.flowerSprite.numberOfRunningActions() == 0) {
        	this.flowerSprite.setScale(1.1);
        	this.flowerSprite.runAction(cc.RepeatForever.create(cc.RotateBy.create(1, 360)));
        	this.contactCircleSprite.runAction(cc.RepeatForever.create(
                    cc.Sequence.create(
                        cc.TintBy.create(1, -125, -255, -125),
                        cc.TintBy.create(1, 125, 255, 125))));
       	}
    }
    else {      	
    	this.flowerSprite.setScale(1.0);
        this.flowerSprite.stopAllActions();
        this.flowerSprite.setRotation(0);
        this.contactCircleSprite.stopAllActions();
        this.contactCircleSprite.setColor(cc.white());
    }

    // plus
    if (this.plusSprite.isVisible() && cc.rectContainsPoint(this.angleSprite.rect(), location)) {
    	if (this.plusSprite.numberOfRunningActions() == 0) {
			if (!GameDataManager.angleChecked) {
				GameDataManager.angleChecked = true;
				if (GameDataManager.evilChecked) {
					this.raccoon.setVisible(true);
					this.raccoon.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.ScaleTo.create(1.0, 2.0), cc.ScaleTo.create(1.0, 1.0))));
				}
			}
        	this.plusSprite.runAction(cc.RepeatForever.create(cc.RotateBy.create(1, 3600)));
        	this.angleSprite.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.ScaleTo.create(1.0, 1.5), cc.ScaleTo.create(1.0, 1.0))));
        	this.prosTTF.expandTTF();
        	this.schoolIntroLabel.setOpacity(50);
        	this.cocos2dIntroLabel.setOpacity(50);
       	}
    }
    else {
    	if (this.plusSprite.numberOfRunningActions() != 0) {
    		this.prosTTF.shrinkTTF();
    		this.schoolIntroLabel.setOpacity(255);
        	this.cocos2dIntroLabel.setOpacity(255);
	        this.plusSprite.stopAllActions();
        	this.plusSprite.setRotation(0);
        	this.angleSprite.stopAllActions();
        	this.angleSprite.setScale(1.0);
    	}
    }
    // minus
    if (this.evilSprite.isVisible() && cc.rectContainsPoint(this.evilSprite.rect(), location)) {
    	if (this.minusSprite.numberOfRunningActions() == 0) {
			if (!GameDataManager.evilChecked) {
				GameDataManager.evilChecked = true;
				if (GameDataManager.angleChecked) {
					this.raccoon.setVisible(true);
					this.raccoon.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.ScaleTo.create(1.0, 2.0), cc.ScaleTo.create(1.0, 1.0))));
				}
			}
    		this.consTTF.expandTTF();
    		this.workIntroLabel.setOpacity(50);
        	this.hobbyIntroLabel.setOpacity(50);
        	this.minusSprite.runAction(cc.RepeatForever.create(cc.RotateBy.create(1, 3600)));
        	this.evilSprite.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.ScaleTo.create(1.0, 1.5), cc.ScaleTo.create(1.0, 1.0))));
       	}
    }
    else {
    	if (this.minusSprite.numberOfRunningActions() != 0) {
    	   	this.consTTF.shrinkTTF();
    		this.workIntroLabel.setOpacity(255);
        	this.hobbyIntroLabel.setOpacity(255);
	        this.minusSprite.stopAllActions();
	        this.minusSprite.setRotation(0);
	        this.evilSprite.stopAllActions();
        	this.evilSprite.setScale(1.0);
    	}
    } 
    // raccoon
    if (this.raccoon.isVisible() && cc.rectContainsPoint(this.raccoon.rect(), location)) {
    	this.selfEvaluationLayer.setVisible(true);
    }    
    else {
    	this.selfEvaluationLayer.setVisible(false);
    }
};

MainScene.prototype.handleTouch = function (location) {
	if (cc.rectContainsPoint(this.websiteDetailLabel.rect(), location)) {
    	window.open("http://www.supersuraccoon-cocos2d.com");
    } 	
    if (cc.rectContainsPoint(this.emailDetailLabel.rect(), location)) {
    	window.open("mailto:supersuraccoon@gmail.com");
    }  
};

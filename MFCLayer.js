//
// MFCLayer class
//
var MFCLayer = function(){};

MFCLayer.prototype.onDidLoadFromCCB = function() {
	// mouse
	this.currentMFC = 0;
    this.rootNode.setMouseEnabled(true);
    this.rootNode.onMouseMoved = function (event) {
    	if (!this.isVisible()) return;
	    var location = event.getLocation();
	    this.controller.handleMouseMove(this.convertToNodeSpace(location));
    }
    // touch
   	this.rootNode.setTouchEnabled(true);
    this.rootNode.onTouchesBegan = function (touches, event) {
    	if (!this.isVisible()) return;
    	var touchLocation = touches[0].getLocation();
        this.controller.handleTouch(touchLocation);
    }
    this.updateCCBElements();
};

MFCLayer.prototype.updateCCBElements = function () {
};

// hover
MFCLayer.prototype.handleMouseMove = function (location) {
    var winSize = cc.Director.getInstance().getWinSize();
    // title
    var children = this.rootNode.getChildren();
    for (var i = 0; i < children.length; i++) {
        var spriteObject = children[i];
        if (spriteObject.getTag() <= 0) continue;
        if (cc.Rect.CCRectContainsPoint(spriteObject.rect(), location)) {
   			if (spriteObject.getTag() != this.currentMFC) {
   				this.currentMFC = spriteObject.getTag();
   				
   				this.rootNode.removeChildByTag(999);
   				this.rootNode.removeChildByTag(888);
   				var mfcSprite = cc.Sprite.create("mfc/" + this.currentMFC + ".png");
   				mfcSprite.setPosition(this.rootNode.convertToNodeSpace(cc.p(winSize.width / 2, winSize.height / 2)));
   				this.rootNode.addChild(mfcSprite, 999, 999);
   				
   				var mfcLabel = cc.LabelTTF.create(MultiLanguageUtil.getLocalizatedStringForKey("mfc_" + this.currentMFC), "Arial", 40);
   				mfcLabel.setPosition(cc.p(mfcSprite.getPositionX(), 200));
   				mfcLabel.setColor(cc.BLACK);
   				this.rootNode.addChild(mfcLabel, 888, 888);
   				return;
   			}
   			else {
   				return;	
   			}
        }
    }
    this.currentMFC = 0;
    this.rootNode.removeChildByTag(999);
   	this.rootNode.removeChildByTag(888);
};

MFCLayer.prototype.handleTouch = function (location) {
	this.rootNode.setVisible(false);
};


// DotSprite 
var DotSprite = cc.Sprite.extend({
    init:function (dotWidth, dotSize, dotSegments) {
		if (this._super()) {
			this._dotSize = dotSize;
            this._dotWidth = dotWidth;
            this._dotSegments = dotSegments;
		    bRet = true;
		}
		return bRet;
    },
    rect:function () {
        return new cc.Rect(this.getPositionX() - this._dotSize / 2, this.getPositionY() - this._dotSize / 2, this._dotSize, this._dotSize);
    },
    draw:function () {
        cc.drawingUtil.setLineWidth(this._dotWidth);
        cc.drawingUtil.setDrawColor4B(this.getColor().r, this.getColor().g, this.getColor().b, this.getOpacity());
        cc.drawingUtil.drawCircle(cc.PointZero(), this._dotSize, 0, this._dotSegments, false);
        cc.drawingUtil.setLineWidth(1);
    }
});
DotSprite.createDot = function (dotWidth, dotSize, dotSegments) {
    var dot = new DotSprite();
    if (dot && dot.init(dotWidth, dotSize, dotSegments)) return dot;
    return null;
};

//LineSprite
var LineSprite = cc.Sprite.extend({
    init:function (lineWidth, startPosition, endPosition) {
		if (this._super()) {
			this._lineWidth = lineWidth;
			this._startPosition = startPosition;
			this._endPosition = endPosition;
		    bRet = true;
		}
		return bRet;
    },
    draw:function () {
        cc.drawingUtil.setLineWidth(this._lineWidth);
        cc.drawingUtil.setDrawColor4B(this.getColor().r, this.getColor().g, this.getColor().b, this.getOpacity());
        cc.drawingUtil.drawLine(this._startPosition, this._endPosition);
        cc.drawingUtil.setLineWidth(1.0);
    }
});
LineSprite.createLine = function (lineWidth, startPosition, endPosition) {
    var line = new LineSprite();
    if (line && line.init(lineWidth, startPosition, endPosition)) return line;
    return null;
};

// TimelineLayer config
var TIMELINE_VERTICAL = 1;
var TIMELINE_HORIZONTAL = 2;

var TIMELINE_LABEL_UP = 1;
var TIMELINE_LABEL_DOWN = 2;
var TIMELINE_LABEL_LEFT = 3;
var TIMELINE_LABEL_RIGHT = 4;

var TIMELINE_LINE_WIDTH = 3;
var TIMELINE_LINE_COLOR = cc.WHITE;

var TIMELINE_SPOT_WIDTH = 10;
var TIMELINE_SPOT_SEGMENT = 80;

var TIMELINE_SPOT_SIZE_NORMAL = 10;
var TIMELINE_SPOT_SIZE_HOVER = 20;
var TIMELINE_SPOT_SIZE_SELECTED = 10;

var TIMELINE_SPOT_COLOR_NORMAL = cc.WHITE;
var TIMELINE_SPOT_COLOR_HOVER = cc.YELLOW;
var TIMELINE_SPOT_COLOR_SELECTED = cc.RED;

var TIMELINE_SPOT_LABEL_NAME = "Verdana-Bold";
var TIMELINE_SPOT_LABEL_PADDING = 30;
var TIMELINE_SPOT_LABEL_INTERVAL = 120;

var TIMELINE_SPOT_LABEL_COLOR_NORMAL = cc.WHITE;
var TIMELINE_SPOT_LABEL_COLOR_HOVER = cc.YELLOW;
var TIMELINE_SPOT_LABEL_COLOR_SELECTED = cc.RED;

var TIMELINE_SPOT_LABEL_SIZE_NORMAL = 16;
var TIMELINE_SPOT_LABEL_SIZE_HOVER = 20;
var TIMELINE_SPOT_LABEL_SIZE_SELECTED = 20;

var TIMELINE_SPOT_SPIN_TIME = 1.0;

// TimelineLayer
var TimelineLayer = cc.Layer.extend({
	_delegate:null,
	_timelineDirection:null,
	_labelDirection:null,
	_timeSpotDateArray:null,
	_timeSpotSpriteArray:null,
	_lineSprite:null,
    _currentSpotTag:0,
    init:function (delegate, timelineSize, timeSpotArray, timelineDirection, labelDirection) {
    	var bRet = false;
        if (this._super()) {
			this._timelineSize = timelineSize;
			this.setContentSize(timelineSize);
			this._spinOver = true;
        	// enable touch
        	this.setTouchEnabled(true);
			this.setMouseEnabled(true);
	        if( 'keyboard' in sys.capabilities ) {
	            this.setKeyboardEnabled(true);
	        } 
	        else {
	            cc.log("KEYBOARD Not supported");
	        }
        	// init args
        	this._delegate = delegate;
        	this._timelineDirection = timelineDirection;
        	this._labelDirection = labelDirection;
			this._timeSpotDateArray = timeSpotArray;
            this._timeSpotSpriteArray = new Array();
            // create ui
		    this.createTimeline();
			this.createTimeSpot();
            // select first spot
            this.handleTimeSpotTouched(this._lineSprite.getChildByTag(1));
		    // return
		    bRet = true;
		}
		return bRet;
    },
   	onKeyUp:function(key) {
        if (this._timelineDirection == TIMELINE_VERTICAL) {
        	if (key == 38) this.handleTimeSpotTouched(this._lineSprite.getChildByTag(this._currentSpotTag + 1));
        	if (key == 40) this.handleTimeSpotTouched(this._lineSprite.getChildByTag(this._currentSpotTag - 1));
        }
        else {
            if (key == 37) this.handleTimeSpotTouched(this._lineSprite.getChildByTag(this._currentSpotTag + 1));
        	if (key == 39) this.handleTimeSpotTouched(this._lineSprite.getChildByTag(this._currentSpotTag - 1));
        }
    },
    createTimeline:function () {
		// draw line
		if (this._lineSprite == null) {
			var startPosition = cc.PointZero();
			var endPosition = (this._timelineDirection == TIMELINE_VERTICAL) ? cc.p(0, this._timelineSize.height) : cc.p(this._timelineSize.width, 0);
			this._lineSprite = LineSprite.createLine(TIMELINE_LINE_WIDTH, startPosition, endPosition);
			this.addChild(this._lineSprite);
			this._lineSprite.setColor(TIMELINE_LINE_COLOR);
		}
    },
	createTimeSpot:function () {
		for (var i = 0; i < this._timeSpotDateArray.length; i ++) {
			// add spot
			var spotDate = this._timeSpotDateArray[i];
			var spotSprite = DotSprite.createDot(TIMELINE_SPOT_WIDTH, TIMELINE_SPOT_SIZE_NORMAL, TIMELINE_SPOT_SEGMENT);
            if (this._timelineDirection == TIMELINE_HORIZONTAL) {
                spotSprite.setPosition(cc.p(this._timelineSize.width / 2 + i * TIMELINE_SPOT_LABEL_INTERVAL, 0));
            }
            else {
                spotSprite.setPosition(cc.p(0, this._timelineSize.height / 2 + i * TIMELINE_SPOT_LABEL_INTERVAL));
            }
            spotSprite.setColor(TIMELINE_SPOT_COLOR_NORMAL);
			this._lineSprite.addChild(spotSprite, 1, i + 1);
			this._timeSpotSpriteArray.push(spotSprite);
			// add time label
			var timeLabel = cc.LabelTTF.create(spotDate, TIMELINE_SPOT_LABEL_NAME, TIMELINE_SPOT_LABEL_SIZE_NORMAL);
			var timeLabelPosition = cc.PointZero();
			if (this._labelDirection == TIMELINE_LABEL_UP) timeLabelPosition = cc.p(0, spotSprite.getPositionY() + TIMELINE_SPOT_LABEL_PADDING);
			if (this._labelDirection == TIMELINE_LABEL_DOWN) timeLabelPosition = cc.p(0, spotSprite.getPositionY() - TIMELINE_SPOT_LABEL_PADDING);
			if (this._labelDirection == TIMELINE_LABEL_LEFT) timeLabelPosition = cc.p(spotSprite.getPositionX() - TIMELINE_SPOT_LABEL_PADDING, 0);
			if (this._labelDirection == TIMELINE_LABEL_RIGHT) timeLabelPosition = cc.p(spotSprite.getPositionX() + TIMELINE_SPOT_LABEL_PADDING, 0);
			timeLabel.setPosition(timeLabelPosition);
			timeLabel.setColor(TIMELINE_SPOT_LABEL_COLOR_NORMAL);
            if (this._timelineDirection == TIMELINE_VERTICAL) {
                if (this._labelDirection == TIMELINE_LABEL_LEFT) timeLabel.setAnchorPoint(cc.p(1, 0.5));
                if (this._labelDirection == TIMELINE_LABEL_RIGHT) timeLabel.setAnchorPoint(cc.p(0, 0.5));

            }
            spotSprite.addChild(timeLabel, 1, 1);
            if (this._timelineDirection == TIMELINE_HORIZONTAL) {
                if (spotSprite.getPositionX() >= this._timelineSize.width) {
                    timeLabel.setOpacity(0);
                    spotSprite.setOpacity(0);
                }
            }
            else {
                if (spotSprite.getPositionY() >= this._timelineSize.height) {
                    timeLabel.setOpacity(0);
                    spotSprite.setOpacity(0);
                }
            }
		}
    },
    // handle touch
	onMouseMoved:function (event) {
	    var touchLocation = event.getLocation();
        touchLocation = this._lineSprite.convertToNodeSpace(touchLocation);
		for (var i = 0; i < this._timeSpotSpriteArray.length; i ++) {
			var spotSprite = this._timeSpotSpriteArray[i];
            var spotRect = spotSprite.rect();
            var spotRectInflate = new cc.Rect(spotRect.x - 5, spotRect.y - 5, spotRect.width + 10, spotRect.height + 10);
			if (spotSprite.getOpacity() != 0 && spotSprite.getTag() != this._currentSpotTag) {
				if (cc.rectContainsPoint(spotRectInflate, touchLocation)) {
					// hover
                    spotSprite.setColor(TIMELINE_SPOT_COLOR_HOVER);
                    var labelSprite = spotSprite.getChildByTag(1);
                    labelSprite.setColor(TIMELINE_SPOT_LABEL_COLOR_HOVER);
                    labelSprite.setFontSize(TIMELINE_SPOT_LABEL_SIZE_HOVER);
				}
				else {
					// restore
                    spotSprite.setColor(TIMELINE_SPOT_COLOR_NORMAL);
                    var labelSprite = spotSprite.getChildByTag(1);
                    labelSprite.setColor(TIMELINE_SPOT_LABEL_COLOR_NORMAL);
                    labelSprite.setFontSize(TIMELINE_SPOT_LABEL_SIZE_NORMAL);

				}
			}
		}
    },
    onTouchesBegan:function (touches, event) {
    	var touchLocation = touches[0].getLocation();
        touchLocation = this._lineSprite.convertToNodeSpace(touchLocation);
        var spotSprite = this.spotFromTouch(touchLocation);
		if (spotSprite != null) {
            this.handleTimeSpotTouched(spotSprite);
        }
    },
    spinTimeSpot:function (targetSprite) {
    	this._spinOver = false;
        if (this._delegate) this._delegate.spinStart(this._currentSpotTag);
		var deltaPosition = cc.PointZero();
        var targetPosition = cc.PointZero();
        if (this._timelineDirection == TIMELINE_HORIZONTAL) {
            deltaPosition = targetSprite.getPositionX() - this._timelineSize.width / 2;
            targetPosition = cc.p(-deltaPosition, 0);
        }
        else {
            deltaPosition = targetSprite.getPositionY() - this._timelineSize.height / 2;
            targetPosition = cc.p(0, -deltaPosition);
        }
		for (var i = 0; i < this._timeSpotSpriteArray.length; i ++) {
			var spotSprite = this._timeSpotSpriteArray[i];
            var labelSprite = spotSprite.getChildByTag(1);

            if (this._timelineDirection == TIMELINE_HORIZONTAL && spotSprite.getPositionX() > 0 && spotSprite.getPositionX() - deltaPosition < 0 ||
                this._timelineDirection == TIMELINE_HORIZONTAL && spotSprite.getPositionX() < this._timelineSize.width && spotSprite.getPositionX() - deltaPosition > this._timelineSize.width ||
                this._timelineDirection == TIMELINE_VERTICAL && spotSprite.getPositionY() > 0 && spotSprite.getPositionY() - deltaPosition < 0 ||
                this._timelineDirection == TIMELINE_VERTICAL && spotSprite.getPositionY() < this._timelineSize.height && spotSprite.getPositionY() - deltaPosition > this._timelineSize.height) {
                spotSprite.runAction(cc.FadeOut.create(TIMELINE_SPOT_SPIN_TIME / 2));
                labelSprite.runAction(cc.FadeOut.create(TIMELINE_SPOT_SPIN_TIME / 2));
                spotSprite.runAction(cc.Sequence.create(
                        cc.MoveBy.create(TIMELINE_SPOT_SPIN_TIME, targetPosition),
                        cc.DelayTime.create(0.5),
                        cc.CallFunc.create(this.spinOver, this)));
            }
			else if (this._timelineDirection == TIMELINE_HORIZONTAL && spotSprite.getPositionX() > this._timelineSize.width && spotSprite.getPositionX() - deltaPosition < this._timelineSize.width ||
                     this._timelineDirection == TIMELINE_HORIZONTAL && spotSprite.getPositionX() < 0 && spotSprite.getPositionX() - deltaPosition > 0 ||
                     this._timelineDirection == TIMELINE_VERTICAL && spotSprite.getPositionY() > this._timelineSize.height && spotSprite.getPositionY() - deltaPosition < this._timelineSize.height ||
                     this._timelineDirection == TIMELINE_VERTICAL && spotSprite.getPositionY() < 0 && spotSprite.getPositionY() - deltaPosition > 0) {
                spotSprite.runAction(cc.FadeIn.create(TIMELINE_SPOT_SPIN_TIME / 2));
                labelSprite.runAction(cc.FadeIn.create(TIMELINE_SPOT_SPIN_TIME / 2));
                spotSprite.runAction(cc.Sequence.create(
                        cc.MoveBy.create(TIMELINE_SPOT_SPIN_TIME, targetPosition),
                        cc.DelayTime.create(0.5),
                        cc.CallFunc.create(this.spinOver, this)));
			}
			else {
                spotSprite.runAction(cc.Sequence.create(
                    cc.MoveBy.create(TIMELINE_SPOT_SPIN_TIME, targetPosition),
                    cc.DelayTime.create(0.5),
                    cc.CallFunc.create(this.spinOver, this)));
            }
		}
	},
	spinOver:function (sender) {
		this._spinOver = true;
		if (this._delegate) this._delegate.spinOver(this._currentSpotTag);
    },
    handleTimeSpotTouched:function (spotSprite) {
        if (!spotSprite || this._currentSpotTag == spotSprite.getTag() || !this._spinOver) return;
        // pre spot
        var oldSpotSprite = this._lineSprite.getChildByTag(this._currentSpotTag);
        if (oldSpotSprite) {
            oldSpotSprite.setColor(TIMELINE_SPOT_COLOR_NORMAL);
            var labelSprite = oldSpotSprite.getChildByTag(1);
            labelSprite.setColor(TIMELINE_SPOT_LABEL_COLOR_NORMAL);
            labelSprite.setFontSize(TIMELINE_SPOT_LABEL_SIZE_NORMAL);
        }
        this._currentSpotTag = spotSprite.getTag();
        // current spot
        spotSprite.setColor(TIMELINE_SPOT_COLOR_SELECTED);
        var labelSprite = spotSprite.getChildByTag(1);
        labelSprite.setColor(TIMELINE_SPOT_LABEL_COLOR_SELECTED);
        labelSprite.setFontSize(TIMELINE_SPOT_LABEL_SIZE_SELECTED);
        // spin spot
        this.spinTimeSpot(spotSprite);
    },
    spotFromTouch:function (touchLocation) {
		for (var i = 0; i < this._timeSpotSpriteArray.length; i ++) {
			var spotSprite = this._timeSpotSpriteArray[i];
            var spotRect = spotSprite.rect();
            var spotRectInflate = new cc.Rect(spotRect.x - 5, spotRect.y - 5, spotRect.width + 10, spotRect.height + 10);
			if (spotSprite.getOpacity() != 0 && cc.rectContainsPoint(spotRectInflate, touchLocation)) return spotSprite;
		}	
		return null;
    }
});

TimelineLayer.createTimeline = function (delegate, timelineSize, timeSpotArray, timelineDirection, labelDirection) {
    var timelineLayer = new TimelineLayer();
    if (timelineLayer && timelineLayer.init(delegate, timelineSize, timeSpotArray, timelineDirection, labelDirection)) return timelineLayer;
    return null;
};

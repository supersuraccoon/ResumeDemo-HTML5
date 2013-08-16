//
// MFCLayer class
//
var SelfEvaluationLayer = function(){};

SelfEvaluationLayer.prototype.onDidLoadFromCCB = function() {
	this.updateCCBElements();
};

SelfEvaluationLayer.prototype.updateCCBElements = function () {
	this.s.setString(MultiLanguageUtil.getLocalizatedStringForKey(STRING_SELF_EVALUATION));
	
	if (GameDataManager.languageType == LANGUAGE_CHINESE) {
		this.bg.setScaleX(0.45);
		this.bg.setScaleY(0.3);
	}
	if (GameDataManager.languageType == LANGUAGE_ENGLISH) {
		this.bg.setScaleX(0.5);
		this.bg.setScaleY(0.4);
	}
	if (GameDataManager.languageType == LANGUAGE_JAPANESE) {
		this.bg.setScaleX(0.4);
		this.bg.setScaleY(0.45);
	}
};
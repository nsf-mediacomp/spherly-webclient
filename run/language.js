//Note, this changes all the static UI text based on language
//But things like the hover messages and dialogs are dynamically populated, and
//so the references for them for Blockly.Msg are in runblockly.js
SpheroManager.UpdateLanguageMessages = function(){
	$("#openProjectButton").html(Blockly.Msg.OPEN_PROJECT);
	
	$("#saveProjectButton").html(Blockly.Msg.SAVE_PROJECT);
	
	$("#calibrateButton").html(Blockly.Msg.CALIBRATE);
};
SpheroManager.run = function() {
	$("#runButton").html("&nbsp;Reset Program ");
	$("#runButton")[0].onclick = function(){tryTo(SpheroManager.resetProgram);}

	var message = $(document.createElement('div')).html("Sphero is not connected.");
	var button = $(document.createElement('div')).attr('id', 'dialogButton').html("OK");
	button.on('click', function(e){ Utils.closeDialog(); });
	if (SpheroManager.sphero == null || !SpheroManager.sphero.isConnected) {
		SpheroManager.alertMessage("Not Connected", message, button);
		return;
	}

	SpheroManager.sphero.clearEventHandlers();
	SpheroManager.evalCode();
	SpheroManager.sphero.clearAllCommands();
	SpheroManager.sphero.begin_execute();
};
	
SpheroManager.evalCode = function(){
	Blockly.mainWorkspace.traceOn(true);
	//Add this to prevent infinite loop crashing :D!!!
	window.loopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.loopTrap <= 0) throw "Infinity";\n';
	
	var jscode = Blockly.JavaScript.workspaceToCode();
	console.log(jscode);
	try {
		eval(jscode);
	}
	catch (e) {
		if (e !== "Infinity"){
			var e = $(document.createTextNode(e));
			console.log(jscode);
			SpheroManager.alertMessage("Error", e, button);
		}
	}
}

SpheroManager.resetProgram = function(){
	$("#runButton").html("&#9654; Run Program");
	$("#runButton")[0].onclick = function(){tryTo(SpheroManager.run);}
	SpheroManager.sphero.clearEventHandlers();
	SpheroManager.sphero.clearAllCommands();
	Blockly.mainWorkspace.traceOn(false);
}

SpheroManager.stop = function(){
	SpheroManager.evalCode();
	SpheroManager.sphero.stopProgram();
}
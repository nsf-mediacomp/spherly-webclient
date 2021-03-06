SpheroManager.reset_program_text = false;

SpheroManager.run = function() {
	$("#runButton").html("&nbsp; "+Blockly.Msg.RESET_PROGRAM);
	$("#runButton")[0].onclick = function(){tryTo(SpheroManager.resetProgram);}
	SpheroManager.reset_program_text = true;

	var message = $(document.createElement('div')).html(Blockly.Msg.NOT_CONNECTED_MESSAGE);
	var button = $(document.createElement('div')).attr('id', 'dialogButton').html(Blockly.Msg.OK);
	button.on('click', function(e){ Utils.closeDialog(); });
	if (SpheroManager.sphero == null || !SpheroManager.sphero.isConnected) {
		SpheroManager.alertMessage(Blockly.Msg.NOT_CONNECTED, message, button);
		return;
	}

	SpheroManager.sphero.clearEventHandlers();
	SpheroManager.evalCode();
	for (var i = 0; i < SpheroManager.sphero_array.length; i++){
		var sphero = SpheroManager.sphero_array[i];		
		sphero.clearAllCommands();
		sphero.begin_execute();
	}
};
	
SpheroManager.evalCode = function(){
	var init_sphero_vars = "";
	for (var i = 0; i < SpheroManager.sphero_array.length; i++){
		Blockly.JavaScript.addReservedWords('Sphero' + i);
		init_sphero_vars += "var sphero"+i+" = SpheroManager.sphero_array[" + i + "];\n";
	}
	
	Blockly.mainWorkspace.traceOn(true);
	//Add this to prevent infinite loop crashing :D!!!
	window.loopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.loopTrap <= 0) throw "Infinity";\n';
	
	var jscode = init_sphero_vars + 
				 Blockly.JavaScript.workspaceToCode();
	console.log(jscode);
	try {
		eval(jscode);
	}
	catch (e) {
		if (e !== "Infinity"){
			var e = $(document.createTextNode(e));
			console.log(jscode);
			var button = $(document.createElement('div')).attr('id', 'dialogButton').html(Blockly.Msg.OK);
			button.on('click', function(e){ Utils.closeDialog(); });
			SpheroManager.alertMessage(Blockly.Msg.ERROR, e, button);
		}
	}
}

SpheroManager.resetProgram = function(){
	SpheroManager.reset_program_text = false;
	$("#runButton").html("&#9654;"+Blockly.Msg.RUN_PROGRAM);
	$("#runButton")[0].onclick = function(){tryTo(SpheroManager.run);}
	SpheroManager.sphero.clearEventHandlers();
	SpheroManager.sphero.clearAllCommands();
	Blockly.mainWorkspace.traceOn(false);
}

SpheroManager.stop = function(){
	SpheroManager.evalCode();
	SpheroManager.sphero.stopProgram();
}
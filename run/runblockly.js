sphero = null;
var url = "ws://localhost:8080/sphero";
var offX;
var offY;

SpheroManager.spheroRun;
SpheroManager.spheroCollide;

function SpheroManager(){};

window.onload = function(){
	window.connection = new SpheroConnection(url);
	sphero = new Sphero();

	BlocklyApps.LANG = 'en';
	BlocklyApps.LANGUAGES = ["en"];
	BlocklyApps.init();
	
	Blockly.JavaScript.addReservedWords("sphero");
	Blockly.JavaScript.addReservedWords('SpheroManager');
	
	var defaultXml = 
		'<xml>' +
		'	<block type="sphero_run" x="260" y="70"></block>' +
		'	<block type="sphero_collision" x="260" y="280"></block>' +
		'</xml>';
	SpheroManager.loadBlocks(defaultXml);
	
	$("#closeDialogButton").on("click", Utils.closeDialog);
	/*$("#codeButton").on("click", function(){
		var generated_code = Blockly.JavaScript.workspaceToCode();
			generated_code = getRidOfNakedCode(generated_code);
			generated_code += "if (pixly_run) pixly_run();\n";
		$("#dialogBody").html("<pre>" + generated_code + "</pre>");
		
		$("#titleText").html("Generated JavaScript Code");
		$("#dialog").css("display", "block");
	});*/
	
	$("#dialogTitle").on('mousedown', function(e){
		document.getElementsByTagName("html")[0].style.cursor = "default";
		document.getElementsByTagName("body")[0].style.cursor = "default";
	
		var div = $('#dialog');
		offY= e.clientY-parseInt(div.offset().top);
		offX= e.clientX-parseInt(div.offset().left);
		window.addEventListener('mousemove', Utils.divMove, true);
		
	});
	$("#dialogTitle").on('mouseup', function(e){
		document.getElementsByTagName("html")[0].style.cursor = "";
		document.getElementsByTagName("body")[0].style.cursor = "";
		window.removeEventListener('mousemove', Utils.divMove, true);
	});
}

SpheroManager.openProject = function(){
	var message = $(document.createElement("div"));
	message.append(document.createTextNode("Select XML File containing your project"));
		message.append(document.createElement("br"));
	message.css("margin-top", "-8px");
	var fileinput = $(document.createElement("input"));

	fileinput.attr('type', "file");
	fileinput.attr('accept', "text/plain, text/xml");
	fileinput.on('change', function(e){
		console.log(fileinput);
		var file = fileinput[0].files[0];
		var reader = new FileReader();
		reader.onload = function(e){
			textarea.html(reader.result);
		}
		reader.readAsText(file);
	});
	message.append(fileinput);
		message.append(document.createElement("br"));
	var textarea = $(document.createElement('textarea'));
	textarea.attr('id', 'dialog_block_xml');
	textarea.css("width", "98%").css("height", "54%").css("margin-top", "5px");
	
	message.append(textarea);
	
	
	var button = $(document.createElement('div'));
	button.html("Load Project");
	button.attr('id', 'dialogButton');
	button.click(SpheroManager.LoadProjectButton);
	button.width(150);
	
	SpheroManager.alertMessage("Open Project", message, button);
}
SpheroManager.LoadProjectButton = function(e){
	var xml = $("#dialog_block_xml").text();
	Blockly.mainWorkspace.clear();
	SpheroManager.loadBlocks(xml);
	Utils.closeDialog();
}

SpheroManager.saveProject = function(){
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	xml = Blockly.Xml.domToPrettyText(xml);
	
	var message = $(document.createElement("div"));
	message.append(document.createTextNode("Filename: "));
	var filename = $(document.createElement("input"));
	filename.attr("type", "text");
	filename.attr("id", "filename_filename");
	filename.val("SpheroProject.xml");
	message.append(filename);
		message.append(document.createElement("br"));
	var textarea = $(document.createElement('textarea'));
	textarea.attr('id', 'dialog_block_xml');
	textarea.css("width", "98%").css("height", "56%").css("margin-top", "5px");
	textarea.html(xml);
	message.append(textarea);
	
	var button = $(document.createElement('div'));
	button.html("Save Project");
	button.attr('id', 'dialogButton');
	button.click(SpheroManager.SaveProjectButton);
	button.width(150);
	
	SpheroManager.alertMessage("Save Project / Download Blocks", message, button);
}
SpheroManager.SaveProjectButton = function(e){
	Utils.createDownloadLink("#export", $("#dialog_block_xml").text(), $("#filename_filename").val());
	$("#export")[0].click();
	Utils.closeDialog();
}

SpheroManager.alertMessage = function(title, message, button){
	$("#titleText").html(title);
	$("#dialogBody").html('');
	$("#dialogBody").append(message);
	$("#dialogBody").append(document.createElement('br'));
	$("#dialogBody").append(button);
	$("#dialog").css("display", "block");
	$("#dialog").width(500);
	$("#dialog").height(300);
	
	//TODO (not good with two button?)
	window.onkeydown = function(e){
		if(!$("input,textarea").is(":focus")){
			if (e.keyCode === 13){
				$("#dialogButton").click();
			}
		}
	}
}

function tryTo(foo){
	if (window.connection.isConnected){
		foo();
	}else{
		window.connection.tryToConnect(foo);
	}
}

SpheroManager.connect = function() {
	var spheroAddress = $("#spheroAddress").val();

	var message = $(document.createElement('div')).attr('id', 'tableWrapper');
	message.html("attempting connection with sphero<br/>at address: "+spheroAddress);
	
	var button = $(document.createElement('div')).attr('id', 'dialogButton');
	button.on('click', function(e){
		Utils.closeDialog();
		$("#selectButton").attr('disabled', false);
		$("#connectButton").attr('disabled', false);
		sphero.cancelConnection();
	}).html("Cancel");
	SpheroManager.alertMessage("Connecting", message, button);

	$("#selectButton").attr("disabled", true);
	$("#connectButton").attr("disabled", true);
	sphero.connect(spheroAddress, 'sphero', function(is_connected, already_connected){
		button = $(document.createElement('div')).attr('id', 'dialogButton');
		button.on('click', function(e){ Utils.closeDialog(); });
		button.html("OK");
		if (!is_connected) {
			message = $(document.createElement('div')).html("Unable to connect<br/><br/>Perhaps the sphero is off, or already connected to something else?<br/><br/>If not, try connecting again!");
			
			SpheroManager.alertMessage("Not Connected", message, button);
			$("#selectButton").attr("disabled", false);
			$("#connectButton").attr("disabled", false);
			return;
		}
		
		message = $(document.createElement("div")).html("Connection to Sphero was successful.");
		sphero.connectionReset();
		$("#selectButton").attr("disabled", true);
		$("#connectButton").attr("disabled", true);
		$("#disconnectButton").attr("disabled", false);
		//$("#spheroHeading").attr("disabled", false);
		$("#runButton").attr("disabled", false);
		$("#stopButton").attr("disabled", false);
		$("#sleepButton").attr("disabled", false);
		
		SpheroManager.alertMessage("Connected", message, button);
	});
}

var setAddress = null;

SpheroManager.selectSphero = function() {
	SpheroManager.listDevices();
}

SpheroManager.listDevices = function(){
	var message = $(document.createElement('div')).attr('id', 'tableWrapper').html("searching for devices");
	var button = $(document.createElement('div')).attr('id', 'dialogButton').html("Cancel");
	button.on('click', function(e){
		Utils.closeDialog();
		$("#selectButton").attr('disabled', false);
		$("#connectButton").attr('disabled', false);
		sphero.cancelListSpheros();
	});
	SpheroManager.alertMessage("Select Address", message, button);

	var addressBox = $("#spheroAddress")[0];
	var tableWrapper = $("#tableWrapper")[0];
	
	$("#selectButton").attr("disabled", true);
	$("#connectButton").attr("disabled", true);
	sphero.listSpheros(function(devices){
		devices = JSON.parse(devices);
		setAddress = function(address){
			addressBox.value = address;
			Utils.closeDialog();
		}
		var tableStr = "<table>";
		for (var i = 0; i < devices.length; i++){
			tableStr += "<tr><td><a href='#' onclick='setAddress("+'"'+devices[i]["address"]+'"'+");'>"+devices[i]["name"]+"</href></td><td>"+devices[i]["address"]+"</td></tr>";
		}
		tableStr += "</table>";
		message.html(devices.length.toString()+" devices found: <br />"+tableStr);
		
		button = $(document.createElement('div')).attr('id', 'dialogButton').html("Cancel");
		button.on('click', function(e){
			Utils.closeDialog();
		});
		
		SpheroManager.alertMessage("Select Address", message, button);
		
		$("#selectButton")[0].disabled = false;
		$("#connectButton")[0].disabled = false;
	});
}

SpheroManager.disconnect = function() {
	sphero.disconnect();
	$("#selectButton")[0].disabled = false;
	$("#connectButton")[0].disabled = false;
	$("#disconnectButton")[0].disabled = true;
	//$("#spheroHeading")[0].disabled = true;
	$("#runButton")[0].disabled = true;
	$("#stopButton")[0].disabled = true;
	$("#sleepButton")[0].disabled = true;
}

SpheroManager.sleep = function(){
	sphero.sleep();
	$("#selectButton")[0].disabled = false;
	$("#connectButton")[0].disabled = false;
	$("#disconnectButton")[0].disabled = true;
	//$("#spheroHeading")[0].disabled = true;
	$("#runButton")[0].disabled = true;
	$("#stopButton")[0].disabled = true;
	$("#sleepButton")[0].disabled = true;
}

SpheroManager.lastHeading = 0;
SpheroManager.setHeading = function(val) {
	var prevHeading = lastHeading;
	lastHeading = val;
	val = Math.abs(val - prevHeading);
	sphero.setHeading(parseInt(val*20));
	console.log("set heading: " + val);
}

SpheroManager.loadBlocks = function(defaultXml){
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch(e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

//TODO THIS IS PROBABLY UNSAFE
SpheroManager.getRidOfNakedCode = function(jscode){
	var lines = jscode.split("\n");
	var f_depth = 0;
	var is_in_function = false;
	for (var i = 0; i < lines.length; i++){
		if (lines[i].indexOf("//") == 0) continue;
		
		if (lines[i].match(/function(\s+[a-zA-Z0-9_\$]*)?\([^\)]*\)/)){
			is_in_function = true;
		}
		
		if (lines[i].indexOf("{") >= 0 && is_in_function)
			f_depth++;
		else if (lines[i].indexOf("}") >= 0 && f_depth > 0){
			f_depth--;
			if (f_depth == 0) is_in_function = false;
		}
		else if (!is_in_function && f_depth <= 0 && lines[i].replace(/\s/g,'') !== "" && !(lines[i].match(/\s*var/) && !lines[i].match(/\s*for/))){
			lines[i] = "//" + lines[i];
		}
	}
	return lines.join("\n");
}

//TODO:: FIX CRASH WHILE TRUE (going to have to execute blocks in sequence
//instead of evaluating everything :(?
//this will I guess be good practice for the debugging 
SpheroManager.run = function() {
	var message = $(document.createElement('div')).html("Sphero is not connected.");
	var button = $(document.createElement('div')).attr('id', 'dialogButton').html("OK");
	button.on('click', function(e){ Utils.closeDialog(); });
	if (sphero == null || !sphero.isConnected) {
		SpheroManager.alertMessage("Not Connected", message, button);
		return;
	}
	SpheroManager.spheroCollide = undefined;
	SpheroManager.spheroRun = undefined;

	var jscode = Blockly.JavaScript.workspaceToCode();
	
	/*THIS IS KIND OF HACKY AND NASTY*/
	jscode = SpheroManager.getRidOfNakedCode(jscode);
	jscode += "if (SpheroManager.spheroCollide) SpheroManager.spheroCollide();\n";
	jscode += "else sphero.disableCollisionDetection();\n";
	jscode += "if (SpheroManager.spheroRun) SpheroManager.spheroRun();\n";
	//console.log(jscode);
	
	Blockly.mainWorkspace.traceOn(true);
	//Add this to prevent infinite loop crashing :D!!!
	window.loopTrap = 1000;
	Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.loopTrap <= 0) throw "Infinity";\n';
	
	sphero.clearAllCommands();
	try {
		eval(jscode);
	}
	catch (e) {
		if (e !== "Infinity"){
			var e = $(document.createTextNode(e));
			SpheroManager.alertMessage("Error", e, button);
		}
	}
	sphero.begin_execute();
}

SpheroManager.stop = function(){
	sphero.clearAllCommands();
	Blockly.mainWorkspace.traceOn(false);
}

/**************************************UTILS**********************************/
function Utils(){};

Utils.divMove = function(e){
	var div = $("#dialog");
	div.css("position", "absolute");
	div.css("top", (e.clientY-offY) + 'px');
	div.css("left", (e.clientX-offX) + 'px');
}

Utils.closeDialog = function(){
	$("#dialog").css("display", "none");
}

//http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
Utils.componentToHex = function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

Utils.rgbToHex = function(r, g, b){
    return "#" + Utils.componentToHex(r) + Utils.componentToHex(g) + Utils.componentToHex(b);
}

Utils.hexToRgb = function(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

Utils.hsvToHex = function(h, s, v){
	var c = Utils.HSVtoRGB(h, s, v);
	return Utils.rgbToHex(c.r, c.g, c.b);
}

//http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
Utils.HSVtoRGB = function(h, s, v) {
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}

//http://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
Utils.createDownloadLink = function(anchorSelector, str, fileName){
	if(window.navigator.msSaveOrOpenBlob) {
		var fileData = [str];
		blobObject = new Blob(fileData);
		$(anchorSelector).click(function(){
			window.navigator.msSaveOrOpenBlob(blobObject, fileName);
		});
	} else {
		var url = "data:text/plain;charset=utf-8," + encodeURIComponent(str);
		$(anchorSelector).attr("download", fileName);               
		$(anchorSelector).attr("href", url);
	}
}
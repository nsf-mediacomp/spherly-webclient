'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');

//SPHERO UI MESSAGES
Blockly.Msg.OPEN_PROJECT = "Open Project";
Blockly.Msg.SELECT_XML_FILE = "Select XML File: ";
Blockly.Msg.CHOOSE_EXAMPLE = "Or choose example project: ";
Blockly.Msg.LOAD_PROJECT = "Load Project";
Blockly.Msg.EXAMPLE_ABOUT_FACE = "About Face";
Blockly.Msg.EXAMPLE_ABOUT_FACE_COLLISION = "About Face (Collision)";
Blockly.Msg.EXAMPLE_COLOR_CYCLE = "Color Cycle";
Blockly.Msg.EXAMPLE_ROLL_SQUARE = "Roll in a Square";
Blockly.Msg.EXAMPLE_ROLL_SQUARE_SPIRAL = "Roll in a Square (Spiral)";

Blockly.Msg.SAVE_PROJECT = "Save Project";
Blockly.Msg.SAVE_PROJECT_DOWNLOAD_BLOCKS = "Save Project / Download Blocks";
Blockly.Msg.FILENAME = "Filename: ";
Blockly.Msg.SPHEROPROJECT_XML = "SpheroProject.xml";

Blockly.Msg.ATTEMPTING_CONNECTION = function(spheroAddress){
	return "attempting connection with sphero<br/>at address: "+spheroAddress;
};
Blockly.Msg.CONNECTION_FAILED = "Unable to connect<br/><br/>Perhaps the sphero is off, or already connected to something else?<br/><br/>If not, try connecting again!";
Blockly.Msg.NOT_CONNECTED = "Not Connected";
Blockly.Msg.CONNECTION_SUCCESSFUL = "Connection to Sphero was successful.";
Blockly.Msg.CONNECTED = "Connected";

Blockly.Msg.SEARCHING_FOR_DEVICES = "searching for devices";
Blockly.Msg.CANCEL = "Cancel";
Blockly.Msg.OK = "OK";
Blockly.Msg.SELECT_ADDRESS = "Select Address";

// SPHERO BLOCK MESSAGES
Blockly.Msg.SPHERO_GOSPHERO_URL = "http://www.gosphero.com";
Blockly.Msg.SPHERO_API_HELPURL = 'http://orbotixinc.github.io/Sphero-Docs/docs/sphero-api/bootloader-and-sphero.html';
Blockly.Msg.SPHERO_WAIT_HELPURL = 'http://www.w3schools.com/jsref/met_win_setinterval.asp';

Blockly.Msg.SPHERO_RUN_TITLE = "When Run Button clicked";
Blockly.Msg.SPHERO_RUN_TOOLTIP = "The block that contains what code to execute when the run button is pressed.";
Blockly.Msg.SPHERO_EVENT_COLLISION = "When Sphero runs into something";
Blockly.Msg.SPHERO_EVENT_STOP = "When Stop Button clicked";
Blockly.Msg.SPHERO_EVENT_END = "When Sphero program finishes";
Blockly.Msg.SPHERO_EVENT_TOOLTIP = "Blocks here will be run when the specified event occurs.";

Blockly.Msg.SPHERO_COLLISION_HELPURL = "http://orbotixinc.github.io/Sphero-Docs/docs/collision-detection/index.html";
Blockly.Msg.SPHERO_COLLISION_TITLE = "When Sphero runs into something";
Blockly.Msg.SPHERO_COLLISION_TOOLTIP = "The block that contains what code to execute when the sphero collides with something.";
Blockly.Msg.SPHERO_SETRGB_TITLE = "change sphero colour to";
Blockly.Msg.SPHERO_SETRGB_TOOLTIP = "Change Sphero's LED to the specified color.";
Blockly.Msg.SPHERO_ROLL_TITLE = 'sphero roll in direction';
Blockly.Msg.SPHERO_ROLL_TOOLTIP = "Tell the Sphero to roll in a given direction. The direction is a degree position from 0 to 359 degrees, and is relative to the last calibrated direction (controlled by the robot, not by the TURN command).";
Blockly.Msg.SPHERO_ROLLFORWARD_TITLE = 'sphero roll forward';
Blockly.Msg.SPHERO_ROLLFORWARD_TOOLTIP = "Tell the Sphero to roll forward. It will roll in the direction of its most recently set direction, at its most recently set speed. Default speed is 200 cm/s";
Blockly.Msg.SPHERO_TURN_TITLE = 'sphero turn';
Blockly.Msg.SPHERO_TURN_DEGREES = "degrees";
Blockly.Msg.SPHERO_TURN_TOOLTIP = "Turn the Sphero a certain number of degrees (0 to 360). Sphero will remember previous turn commands, and so each turn is relative to it's current facing. For example: turning 180 degrees and then turning 180 degrees afterwords will make the Sphero be facing the same direction from before.";
Blockly.Msg.SPHERO_SETSTABILIZATION_TITLE = 'sphero stabilize';
Blockly.Msg.SPHERO_SETSTABILIZATION_TOOLTIP = 'Tell the sphero to either enable or disable stabilization. Enabled by default. When disabled, sphero will not try to stabilize itself and will not be able to accept roll or turn commands as a result.';
Blockly.Msg.SPHERO_SETSPEED_TITLE = 'sphero set speed';
Blockly.Msg.SPHERO_SETSPEED_TOOLTIP = "Set the speed of Sphero as a percentage. Minimum speed is 0% and maximum speed is 100%";
Blockly.Msg.SPHERO_STOP_TITLE = 'sphero stop rolling';
Blockly.Msg.SPHERO_STOP_TOOLTIP = "Stop the sphero from rolling forward.";
Blockly.Msg.SPHERO_WAIT_TITLE = "wait";
Blockly.Msg.SPHERO_WAIT_SECONDS = "seconds";
Blockly.Msg.SPHERO_WAIT_TOOLTIP = "Pause for the specified amount of seconds before executing the next block command.";
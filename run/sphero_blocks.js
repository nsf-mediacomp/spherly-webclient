'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.JavaScript');

Blockly.Blocks['sphero_run'] = {
  /**
   * Block to set the code that will run with the run button is pressed
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.SPHERO_GOSPHERO_URL);
    this.setColour(210);
    this.appendDummyInput()
        .appendField(Blockly.Msg.SPHERO_RUN_TITLE);
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip(Blockly.Msg.SPHERO_RUN_TOOLTIP);
	this.setDeletable(false);
  }
};

Blockly.JavaScript['sphero_run'] = function(block) {
  // ONly run the code that is inside this block when run button is pressed (like a main)
  var do_branch = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = 'SpheroManager.spheroRun = function(){\n' + 
      do_branch +
	  '  \n}\n';
  return code;
};

Blockly.Blocks['sphero_collision'] = {
  /**
   * Block to set the code that will run with the run button is pressed
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.SPHERO_GOSPHERO_URL);
    this.setColour(210);
    this.appendDummyInput()
        .appendField(Blockly.Msg.SPHERO_COLLISION_TITLE);
    this.appendStatementInput('DO')
        .appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
    this.setPreviousStatement(false);
    this.setNextStatement(false);
    this.setTooltip(Blockly.Msg.SPHERO_COLLISION_TOOLTIP);
	this.setDeletable(false);
  }
};

Blockly.JavaScript['sphero_collision'] = function(block) {
  // ONly run the code that is inside this block when sphero detects collision
  var do_branch = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = 'SpheroManager.spheroCollide = function(){' +
	  'sphero.setCollisionDetection(true, function(){\n' + 
      do_branch +
	  '});}\n';
  return code;
};

Blockly.Blocks['sphero_set_rgb'] = {
	init: function() {
		this.setHelpUrl(Blockly.Msg.SPHERO_API_HELPURL);
		this.setColour(0);			
		this.appendValueInput("COLOUR")
			.appendField(Blockly.Msg.SPHERO_SETRGB_TITLE)
			.setCheck("Colour")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip(Blockly.Msg.SPHERO_SETRGB_TOOLTIP);
	}
};

Blockly.JavaScript['sphero_set_rgb'] = function(block) {
	var hex = Blockly.JavaScript.valueToCode(block, 'COLOUR', Blockly.JavaScript.ORDER_NONE) || '#ffffff';
	var code = "sphero.setRGB(" + hex + ", "+ block.id +");\n";
	return code;
}

Blockly.Blocks['sphero_roll'] = {
	init: function() {
		this.setHelpUrl(Blockly.Msg.SPHERO_API_HELPURL);
		this.setColour(0);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendValueInput("HEADING")
			.appendField(Blockly.Msg.SPHERO_ROLL_TITLE)
			.setCheck("Number")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.setTooltip(Blockly.Msg.SPHERO_ROLL_TOOLTIP);
	}
}

Blockly.JavaScript['sphero_roll'] = function(block){
	var heading = Blockly.JavaScript.valueToCode(block, 'HEADING', Blockly.JavaScript.ORDER_NONE);
	var code = "sphero.roll("+heading+", "+ block.id +");\n";
	return code;
}

Blockly.Blocks['sphero_rollForward'] = {
	init: function() {
		this.setHelpUrl(Blockly.Msg.SPHERO_API_HELPURL);
		this.setColour(0);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput().appendField(Blockly.Msg.SPHERO_ROLLFORWARD_TITLE);
		this.setTooltip(Blockly.Msg.SPHERO_ROLLFORWARD_TOOLTIP);
	}
}

Blockly.JavaScript['sphero_rollForward'] = function(block) {
	var code = "sphero.rollForward("+ block.id +");\n";
	return code;
}

Blockly.Blocks['sphero_turn'] = {
	init: function() {
		this.setHelpUrl(Blockly.Msg.SPHERO_API_HELPURL);
		this.setColour(0);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput().appendField(Blockly.Msg.SPHERO_TURN_TITLE);
		this.appendValueInput('DIRECTION').setCheck("Number");
		this.appendDummyInput().appendField(Blockly.Msg.SPHERO_TURN_DEGREES);
		this.setInputsInline(true);
		this.setTooltip(Blockly.Msg.SPHERO_TURN_TOOLTIP);
	}
}

Blockly.JavaScript['sphero_turn'] = function(block) {
	var direction = Blockly.JavaScript.valueToCode(block, 'DIRECTION', Blockly.JavaScript.ORDER_NONE);
	var code = "sphero.turn("+direction+", "+ block.id +");\n";
	return code;
}

Blockly.Blocks['sphero_set_stabilization'] = {
	init: function() {
		this.setHelpUrl(Blockly.Msg.SPHERO_API_HELPURL);
		this.setColour(0);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput().appendField(Blockly.Msg.SPHERO_SETSTABILIZATION_TITLE);
		this.appendValueInput('FLAG').setCheck("Boolean");
		this.setInputsInline(true);
		this.setTooltip(Blockly.Msg.SPHERO_SETSTABILIZATION_TOOLTIP);
	}
}

Blockly.JavaScript['sphero_set_stabilization'] = function(block) {
	var flag = Blockly.JavaScript.valueToCode(block, 'FLAG', Blockly.JavaScript.ORDER_NONE);
	var code = "sphero.setStabilization("+flag+", "+ block.id +");\n";
	return code;
}

Blockly.Blocks['sphero_set_speed'] = {
	init: function() {
		this.setHelpUrl(Blockly.Msg.SPHERO_API_HELPURL);
		this.setColour(0);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput().appendField(Blockly.Msg.SPHERO_SETSPEED_TITLE);
		this.appendValueInput('SPEED').setCheck("Number");
		this.appendDummyInput().appendField("%");
		this.setInputsInline(true);
		this.setTooltip(Blockly.Msg.SPHERO_SETSPEED_TOOLTIP);
	}
}

Blockly.JavaScript['sphero_set_speed'] = function(block) {
	var speed = Blockly.JavaScript.valueToCode(block, 'SPEED', Blockly.JavaScript.ORDER_NONE);
	var code = "sphero.setSpeed("+speed+", "+ block.id +");\n";
	return code;
}

Blockly.Blocks['sphero_stop'] = {
	init: function() {
		this.setHelpUrl(Blockly.Msg.SPHERO_API_HELPURL);
		this.setColour(0);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendDummyInput().appendField(Blockly.Msg.SPHERO_STOP_TITLE);
		this.setTooltip(Blockly.Msg.SPHERO_STOP_TOOLTIP);
	}
}

Blockly.JavaScript['sphero_stop'] = function(block) {
	var code = "sphero.stop("+ block.id +");\n";
	return code;
}

Blockly.Blocks['sphero_wait'] = {
	init: function() {
		this.setHelpUrl(Blockly.Msg.SPHERO_WAIT_HELPURL);
		this.setColour(0);
		this.appendValueInput("TIME")
			.appendField(Blockly.Msg.SPHERO_WAIT_TITLE)
			.setCheck("Number")
			.setAlign(Blockly.ALIGN_CENTRE);
		this.appendDummyInput().appendField(Blockly.Msg.SPHERO_WAIT_SECONDS);
			
		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip(Blockly.Msg.SPHERO_WAIT_TOOLTIP);
	}
}

Blockly.JavaScript['sphero_wait'] = function(block) {
	var seconds = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_NONE);
	var code = "sphero.wait(" + seconds+", "+ block.id +");\n";
	/*var code = "var e = new Date().getTime() + ("+seconds+" * 1000);\n while (new Date().getTime() <= e) {}\n";*/
	return code;
}

Blockly.Blocks['colour_hsv'] = {
  /**
   * Block for composing a colour from HSV components.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.COLOUR_HSV_HELPURL);
    this.setColour(20);
    this.appendValueInput('HUE')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_HSV_TITLE)
        .appendField(Blockly.Msg.COLOUR_HSV_HUE);
    this.appendValueInput('SATURATION')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_HSV_SATURATION);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.COLOUR_HSV_VALUE);
    this.setOutput(true, 'Colour');
    this.setTooltip(Blockly.Msg.COLOUR_HSV_TOOLTIP);
  }
};

Blockly.JavaScript['colour_hsv'] = function(block) {
  // Compose a colour from RGB components expressed as percentages.
  var hue = Blockly.JavaScript.valueToCode(block, 'HUE',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var saturation = Blockly.JavaScript.valueToCode(block, 'SATURATION',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_COMMA) || 0;
  var functionName = Blockly.JavaScript.provideFunction_(
      'colour_hsv',
      [ 'function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
          '(h, s, v) {',
        '  h = Math.max(Math.min(Number(h), 100), 0) / 100.0;',
        '  s = Math.max(Math.min(Number(s), 100), 0) / 100.0;',
        '  v = Math.max(Math.min(Number(v), 100), 0) / 100.0;',
		'  var c = Utils.HSVtoRGB(h, s, v);',
        '  c.r = (\'0\' + (Math.round(c.r) || 0).toString(16)).slice(-2);',
        '  c.g = (\'0\' + (Math.round(c.g) || 0).toString(16)).slice(-2);',
        '  c.b = (\'0\' + (Math.round(c.b) || 0).toString(16)).slice(-2);',
        '  return \'#\' + c.r + c.g + c.b;',
        '}']);
  var code = functionName + '(' + hue + ', ' + saturation + ', ' + value + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
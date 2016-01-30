#! /usr/bin/env node

const COMMAND_NAME = 'alarm-notify';
var exec = require('child_process').exec;

var allowedMinutesArgs = ["min", "minutes"];
var allowedMessageArgs = ["msg", "message"];

// Get Args
var args = process.argv.slice(2);
var minutes, message;
for(key in args){
	var arg = args[key]
	arg = arg.replace("-","");
	input = arg.split("=");
	if(allowedMinutesArgs.indexOf(input[0]) > -1){
		minutes = input[1]
	}

	if(allowedMessageArgs.indexOf(input[0]) > -1){
		message = input[1]
	}
}

function printExampleUsage(){
	console.log("Example Usage:");
	console.log(COMMAND_NAME + " -min=5 -msg=\"Time Over\"");
	console.log(COMMAND_NAME + " -minutes=5 -message=\"Time Over\"");
}

if(!minutes){
	console.error("Error! No minutes Provided.");
	printExampleUsage();
	process.exit();
}

if(!message){
	console.error("Error! No Message Provided.");
	printExampleUsage();
	process.exit();
}

minutes = minutes * 60;
var command = "(sleep " + minutes + "; notify-send \"" + message + "\") &";
exec(command);

// +++ HOW TO USE THIS PROGRAM +++

// Go to your command prompt/terminal and type: 
// >> npm install -g jasmine

// To run the test suite, enter this in the command prompt/terminal: 
// >> jasmine spec/SoccerSpec.js

// To use the program itself, enter this in the command prompt/terminal: 
// >> node SoccerBuilder.js
// and follow the prompts. Be sure to enter the input file's 
// path as it is in relation to SoccerBuilder.js. 

var fs = require('fs');
var read = require('fs').readFileSync;
var SoccerLeague = require('./SoccerLogic.js');

// get process.stdin as the standard input object.
var standard_input = process.stdin;

// set input character encoding.
standard_input.setEncoding('utf-8');

// prompt user to input data in console.
console.log("Please enter exact path to file you wish to read: ");

// when user input data and click enter key.
standard_input.on('data', function (data) {

    // user input exit.
    if(data === 'exit\n'){
        // program exit.
        console.log("Ranking complete, exiting now!");
        process.exit();
    } else {
    	// remove the newline from the user input
    	data = data.slice(0,-1);
        var fileContents = read(data, 'utf8');
		var soccerteams = new SoccerLeague();
		var step1 = soccerteams.separateInputIntoArray(fileContents);
		var step2 = soccerteams.createTeams(step1);
		var step3 = soccerteams.distributeScores(step2[0], step2[1]);
		var step4 = soccerteams.sortingScores(step3);
		console.log(soccerteams.scoresToString(step4));
		console.log('\n Type "exit" and press enter to exit the program.');
    }
});
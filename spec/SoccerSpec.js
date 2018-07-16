var SoccerLeague = require('../SoccerLogic.js');
var fileContents = 
`Lions 3, Snakes 3
Tarantulas 1, FC Awesome 0
Lions 1, FC Awesome 1
Tarantulas 3, Snakes 1
Lions 4, Grouches 0
`;

var expectedOutput = 
`1. Tarantulas, 6 pts, GD: 3
2. Lions, 5 pts, GD: 4
3. FC Awesome, 1 pt, GD: -1
4. Snakes, 1 pt, GD: -2
5. Grouches, 0 pts, GD: -4`;

describe('soccerSuite', function() {

	var soccer; 

	beforeEach(function() {
	    soccer = new SoccerLeague();
	});


	it('should manipulate the string from input file into an array', function() {
		 
		expect(soccer.separateInputIntoArray(fileContents)).toEqual([ [ 'Lions 3', 'Snakes 3' ],
		  [ 'Tarantulas 1', 'FC Awesome 0' ],
		  [ 'Lions 1', 'FC Awesome 1' ],
		  [ 'Tarantulas 3', 'Snakes 1' ],
		  [ 'Lions 4', 'Grouches 0' ] ]);
	});

	it('should split the teams into two separate arrays', function() {
		var separateInputIntoArrayResults = [ [ 'Lions 3', 'Snakes 3' ],
		  [ 'Tarantulas 1', 'FC Awesome 0' ],
		  [ 'Lions 1', 'FC Awesome 1' ],
		  [ 'Tarantulas 3', 'Snakes 1' ],
		  [ 'Lions 4', 'Grouches 0' ] ];

		expect(JSON.stringify(soccer.createTeams(separateInputIntoArrayResults))).toEqual(JSON.stringify([ [ { team: 'Lions ', score: 3 },
		    { team: 'Tarantulas ', score: 1 },
		    { team: 'Lions ', score: 1 },
		    { team: 'Tarantulas ', score: 3 },
		    { team: 'Lions ', score: 4 } ],
		  [ { team: 'Snakes ', score: 3 },
		    { team: 'FC Awesome ', score: 0 },
		    { team: 'FC Awesome ', score: 1 },
		    { team: 'Snakes ', score: 1 },
		    { team: 'Grouches ', score: 0 } ] ]));
	});

	it('should compare the opposing teams in the arrays returned from createTeams() and distributes points accordingly', function() {
		var teamsArray1 = [ { team: 'Lions ', score: 3 },
		    { team: 'Tarantulas ', score: 1 },
		    { team: 'Lions ', score: 1 },
		    { team: 'Tarantulas ', score: 3 },
		    { team: 'Lions ', score: 4 } ],
		 	teamsArray2 = [ { team: 'Snakes ', score: 3 },
		    { team: 'FC Awesome ', score: 0 },
		    { team: 'FC Awesome ', score: 1 },
		    { team: 'Snakes ', score: 1 },
		    { team: 'Grouches ', score: 0 } ];
		expect(JSON.stringify(soccer.distributeScores(teamsArray1, teamsArray2))).toEqual(JSON.stringify({ 'Lions ': {'score': 5, 'gd': 4},
		  'Tarantulas ': {'score': 6, 'gd': 3},
		  'Snakes ': {'score': 1, 'gd': -2},
		  'FC Awesome ': {'score': 1, 'gd': -1},
		  'Grouches ': {'score': 0, 'gd': -4} }));
	});

	it('should sort the scores into descending order in an array', function() {
		var resultsObject = { 'Lions ': {'score': 5, 'gd': 4},
		  'Tarantulas ': {'score': 6, 'gd': 3},
		  'Snakes ': {'score': 1, 'gd': -2},
		  'FC Awesome ': {'score': 1, 'gd': -1},
		  'Grouches ': {'score': 0, 'gd': -4} }

		expect(soccer.sortingScores(resultsObject)).toEqual([ [ 'Tarantulas ', 6, 3 ],
		  [ 'Lions ', 5, 4 ],
		  [ 'FC Awesome ', 1, -1 ],
		  [ 'Snakes ', 1, -2 ],
		  [ 'Grouches ', 0, -4 ] ]);
	});

	it('should list teams and scores in descending order, if there is a tie, sort into alphabetical order and skip the next number on the list', function() {
		var sortedResults = 
		[ [ 'Tarantulas ', 6, 3 ],
		  [ 'Lions ', 5, 4 ],
		  [ 'FC Awesome ', 1, -1 ],
		  [ 'Snakes ', 1, -2 ],
		  [ 'Grouches ', 0, -4 ] ];
		expect(soccer.scoresToString(sortedResults)).toEqual(expectedOutput);
	});
});
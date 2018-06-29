var SoccerLeague = function() {
	var sortedTeams = [];
	var teamList1 = [];
	var teamList2 = [];
	var results = {}; 
	var sortable = [];

	// regex variables
	var re = /\d+/;
	var letters = /[a-zA-Z\s]+/g; 

	// +++ step one for input parsing +++
	// removes any empty indices after splitting at \n characters
	// and returns an array with data 
	this.separateInputIntoArray = function(contents) {
		contents = contents.split('\n');
		for (var i = 0; i < contents.length; i++) {
			if (contents[i] === '') {
				contents.splice(i, 1);
			};
		};
		for (var i = 0; i < contents.length; i++) {
			sortedTeams.push(contents[i].split(', '));
		};
		return sortedTeams;
	};

	// +++ step two +++
	// splits opposing teams for each game into two separate arrays 
	this.createTeams = function(sortedTeamsArray) {
		for (var i = 0; i < sortedTeamsArray.length; i++) {
			teamList1.push({team: sortedTeamsArray[i][0].match(letters)[0], score: parseInt(sortedTeamsArray[i][0].match(re)[0])});
			teamList2.push({team: sortedTeamsArray[i][1].match(letters)[0], score: parseInt(sortedTeamsArray[i][1].match(re)[0])});
		};
		return [teamList1, teamList2];
	};

	// +++ step three +++
	// compares the opposing teams in the arrays returned from createTeams() 
	// and distributes points accordingly
	this.distributeScores = function(teamList1, teamList2) {
		for (var i = 0; i < teamList1.length; i++) {
			if (teamList1[i].score === teamList2[i].score) {
				// add 1 point to each team's score
				if (results[teamList1[i].team]) {
					results[teamList1[i].team] += 1;
				} else {
					results[teamList1[i].team] = 1;
				};
				if (results[teamList2[i].team]) {
					results[teamList2[i].team] += 1;
				} else {
					results[teamList2[i].team] = 1;
				};
			} else if (teamList1[i].score > teamList2[i].score) {
				// add 3 points to the winning team's score, none to the losing
				if (results[teamList1[i].team]) {
					results[teamList1[i].team] += 3;
				} else {
					results[teamList1[i].team] = 3;
				};
				if (!results[teamList2[i].team]) {
					results[teamList2[i].team] = 0; 
				};
			} else if (teamList1[i].score < teamList2[i].score) {
				// add 3 points to the winning team's score, none to the losing
				if (results[teamList2[i].team]) {
					results[teamList2[i].team] += 3;
				} else {
					results[teamList2[i].team] = 3;
				};
				if (!results[teamList1[i].team]) {
					results[teamList1[i].team] = 0; 
				};
			};
		};
		return results;
	};

	// +++ step four +++
	// sorts the scores into descending order in an array
	this.sortingScores = function(resultsObject) {
		for (var team in resultsObject) {
			sortable.push([team, resultsObject[team]]);
		};

		sortable.sort(function(a, b) {
		    return b[1] - a[1];
		});
		return sortable;
	};

	// +++ step five +++
	// final string manipulation 
	this.scoresToString = function(sortedResults) {
		// need to list in descending order, if there is a tie, sort into alphabetical order
		// and skip the next number on the list 
		let map = sortedResults.reduce((accumulator, element) => {
			if(accumulator.length === 0) {
		  	accumulator.push({rank: 0, team: element[0], score: element[1]});
		 } else {
		  	const lastElem = accumulator[accumulator.length - 1]; 
		    const nextRank = (lastElem.score == element[1]) ? lastElem.rank : accumulator.length;
		  	accumulator.push({rank: nextRank, team: element[0], score: element[1]});
		  }
	  	return accumulator;
		}, []);
		var output = [];

		map.forEach((elem, i) => {
			const line = elem.rank+1 + ".) " + elem.team.slice(0, -1) + ", " + elem.score + ((elem.score !== 1) ? " pts" : " pt") ;
			output.push(line);
		});

		for (var i = 0; i < output.length-1; i++) {
	      if (output[i].charAt(0) === output[i+1].charAt(0)) {
	        if (output[i].charAt(4) > output[i+1].charAt(4)) {
	          let temp = '';
	          temp = output[i];
	          output[i] = output[i+1];
	          output[i+1] = temp;
	        }
	      }
	    };
	    output = output.join('\n')
		return output;
	};
};

module.exports = SoccerLeague;
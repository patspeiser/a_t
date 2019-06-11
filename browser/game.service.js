angular.module('app')
.factory('GameService', function($http){
	let config = {
		url: 'https://opentdb.com/api.php',
		method: 'GET',
		params: {
			amount: 10
		}
	}

	function shuffle(array){
		var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
		}
		return array;
	}

	function shuffleAnswerBank(question){
		this.question = question;
		//shuffle answers using fisher yates shuffle SO https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/31054543
		this.shuffledAnswers = shuffle(this.question.incorrect_answers);
		//get a random index for our correct answer yet to be added
		this.correctIndex = Math.floor(Math.random() * this.shuffledAnswers.length+1);
		//add correct answer to shuffled answer bank
		this.shuffledAnswers.splice(this.correctIndex, 0, this.question.correct_answer)
		this.answers = {
			correct: this.correctIndex,
			answers: this.shuffledAnswers
		};
		return this.answers;
	}

	function formatQuestionBank(questionBank){
		this.questionBank = questionBank.results;
		if(!questionBank) 
			return;
		
		this.formatted = [];
		for(let i = 0; i < this.questionBank.length; i++){
			this.question = this.questionBank[i];
			this.question['formatted_answers'] = shuffleAnswerBank(this.question);
			this.formatted.push(this.question);
		}	
		return this.formatted;
	}

	let getQuestions = function(){
		return $http(config).then( (results)=>{
			questions = results.data;
			formatted = formatQuestionBank(questions);
			angular.copy(formatted, this.questions);
			return this.questions;
		})	
	}

	return {
		questions: [],
		getQuestions: getQuestions
	};
});
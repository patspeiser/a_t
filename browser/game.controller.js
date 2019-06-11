angular.module('app')
	.controller('GameCtrl', function($scope, GameService){
		let getActiveQuestion = function(){
			return $scope.questions.shift();
		}

		let cycleQuestion = function(){
			$scope.activeQuestion = getActiveQuestion();
		}

		GameService.getQuestions().then( (questions)=>{
			$scope.questions = questions;
			$scope.activeQuestion = getActiveQuestion();			
			$scope.guess = function(index){
				if(index === $scope.activeQuestion.formatted_answers.correct){
					cycleQuestion()
					console.log('YOU ARE RIGHT YOU BASTARD!');
				} else {
					cycleQuestion()
					console.log('LOL WRONG!');
				}	
			};
		});
	});
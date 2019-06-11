angular.module('app', ['ui.router']);

angular.module('app')
.run(function($state){
	$state.go('game');
});

angular.module('app')
.config(function($stateProvider){
	$stateProvider
	.state('game', {
		url: '/',
		templateUrl: '/game.html',
		controller: 'GameCtrl'
	})
});
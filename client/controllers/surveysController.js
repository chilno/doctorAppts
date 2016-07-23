myApp.controller('surveysController', function($scope, $routeParams, $location, $window, surveysFactory){
	console.log('I am able to load my indexController along with my index partial');
	$scope.newSurvey = {};
	// d.a({name: 'req.body.test', status: 'working'}, function(d){
	// 	console.log(d);
	// })

	// surveysFactory.getsurveys(function(data){
	// 	console.log('this is data in indexController get mognooses', data);
	// 	$scope.surveys = data;
	// })

	surveysFactory.getUser(function(data){
		console.log('this is data in indexController get mognooses', data);
		$scope.user = data;
		console.log('got user', $scope.user)
	})

	surveysFactory.getPolls(function(data){
		console.log('polls back from db in ctrl', data);
		$scope.surveys = data;
	})

	surveysFactory.getPoll($routeParams, function(data){
		console.log($routeParams);
		console.log("One poll back", data);
		$scope.poll = data;
	})

	$scope.createUser = function(){
		console.log('createCustomer indexController', $scope.newUser);
		surveysFactory.addUser($scope.newUser, function(data){
			console.log('back with newCustomer in ctrl', data)
			$scope.user = data;
			$scope.newUser ='';
			$location.path('/dashboard');
		})
	}

	$scope.deleteUser = function(){
		surveysFactory.deleteUser(function(data){
			console.log('user deleted ===>', data);
		})
	}

	$scope.createPoll = function(){
		// console.log('new suvey', $scope.newSurvey);
		$scope.newSurvey.name = $scope.user.name;
		$scope.newSurvey.count1 = 0;
		$scope.newSurvey.count2 = 0;
		$scope.newSurvey.count3 = 0;
		$scope.newSurvey.count4 = 0;
		console.log('new new survey',$scope);
		surveysFactory.addSurvey($scope.newSurvey, function(data){
			console.log("successfully got back added seurvey in ctrl", data);
			$location.path('/dashboard');
		})
	}

	$scope.deleteSurvey = function(survey){
		var deleteSurvey = $window.confirm('Are you sure you wanna delete '+survey.question+'?');
		if(deleteSurvey){
			surveysFactory.deleteSurvey(survey, function(data){
				console.log(data);
				// $location.path('/customers');
			})
		}
	}

	$scope.voteUp = function(count_key){
		if(count_key == 'count4'){
			console.log(count_key);
			$scope.poll.count4 ++;
		}else if(count_key == 'count3'){
			$scope.poll.count3 ++;
		}else if(count_key == 'count2'){
			$scope.poll.count2 ++;
		}else{
			$scope.poll.count1 ++;
		}
		surveysFactory.voteUp( $routeParams, $scope.poll, function(data){
			console.log(data);
		})
	}
})
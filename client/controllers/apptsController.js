myApp.controller('surveysController', function($scope, $routeParams, $location, $window, apptsFactory){
	console.log('I am able to load my indexController along with my index partial');
	$scope.newAppt = {};

	apptsFactory.getUser(function(data){
		console.log(name);
		console.log('this is data in newController get mognooses', data);
		$scope.user = data;
		console.log('got user', $scope.user.name)
	})

	if($scope.user.name == undefined || $scope.user.name == ""){
		apptsFactory.setUser(function(data){
			console.log(name);
			console.log('this is data in indexController set mognooses', data);
			$scope.user = data;
			console.log('got user', $scope.user)
		})
	}

	apptsFactory.getAppts(function(data){

		console.log('appts back from db in ctrl', data);
		$scope.appts = data;
	})

	$scope.deleteUser = function(){
		$scope.user.name = ''
		apptsFactory.deleteUser(function(data){
			console.log('user deleted ===>', data);
			apptsFactory.setUser(function(data){
			$scope.user = data;
		})
		})
	}

	$scope.deleteAppt = function(appt){
		var timestamp = new Date(appt.date).getTime();
		console.log((timestamp-Date.now())/3600000);
		if((timestamp-Date.now())/3600000 > 24){
			var deleteAppt = $window.confirm('Are you sure you wanna cancel your appointment '+appt.name+'?');
			if(deleteAppt){
				apptsFactory.deleteAppt(appt, function(data){
					console.log(data);
				})
			}
		}else{
			$scope.error = "Sorry, You can't cancel this appointment!!"
		}
	}
})
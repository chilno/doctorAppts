myApp.controller('newController', function($scope, apptsFactory, $location){
	$scope.newAppt = {};
	
	apptsFactory.getUser(function(data){
		console.log(name);
		console.log('this is data in newController get mognooses', data);
		$scope.user = data;
		console.log('got user', $scope.user)
	})


	$scope.createAppt = function(){
		console.log('new appt', $scope.newAppt);
		$scope.newAppt.name = $scope.user.name;
		console.log($scope.newAppt.time);
		if($scope.newAppt.date>Date.now()){
			apptsFactory.addAppt($scope.newAppt, function(data){
			console.log("successfully got back added seurvey in ctrl", data);
			if(data.errors || data.error){
				$scope.errors = data.errors;
				$scope.error = data.error
			}else{
				$location.path('/');
			}
			
		})
		}else{
			$scope.error = "Date must be future";
		}


	}
})
myApp.factory('apptsFactory', function($http){
	var factory = {};
	var user = {};
	var appts = [];
	var survey;

	factory.setUser = function(callback){
		user.name = prompt("Please enter your name");
		callback(user);
	}

	factory.getUser = function(callback){
		callback(user);
	}

	factory.getPolls = function(callback){
		$http.get('/surveys').then(function(data){
			console.log('made it back from db in factory', data.data);
			surveys = data.data
			callback(surveys);
		})
	}

	factory.getPoll = function(poll_id, callback){
		for (var i = 0; i < surveys.length; i++) {
			console.log(surveys[i]);
			if(surveys[i]._id == poll_id.id){
				console.log('found it', surveys[i]);
				survey = surveys[i];
				break;
			}
		}
		console.log('this is the new survey',survey);
		callback(survey)
	}

	// factory.addUser = function(data, callback){
	// 	user = data;
	// 	console.log('our user is', user);
	// 	callback(user.name);
	// }

	factory.deleteUser = function(callback){
		user = '';
		callback(user);
	}

	factory.addAppt = function(data, callback){
		console.log('made it to my appts factory', data);
		$http.post('/appts', data).then(function(data){
			console.log(data);
			if(data.data.errors || data.data.error){
				console.log('err',data);
				callback(data.data);
			}else{
				console.log('made it back from backend this is our new survey', data);
				appts.push(data.data);
				console.log('back in factory this is new surveys', appts);
				callback(appts);
			}
		})
	}

	factory.getAppts = function(callback){
		console.log('made it to appts factory get appts');
		$http.get('/appts').then(function(data){
			console.log('made it back from backend this all appts', data);
			appts = data.data;
			console.log('back in factory this is get surveys', appts);
			callback(appts);
		})
	}

	factory.deleteAppt = function(appt, cb){
		$http.delete('/appts/'+appt._id).then(function(data){
			console.log(data.data);
			for(i=0; i<appts.length; i++){
				if(appts[i]._id == data.data){
					appts.splice(i, 1);
					break;
				}
			};
			cb(appts);
		})
	}

	factory.voteUp = function(survey_id, whole_survey, cb){
		$http.post('/surveys/'+survey._id, whole_survey ).then(function(data){
			console.log('back grom vote db', data.data);
			cb(data.data);
		})
	}
	return factory;
})
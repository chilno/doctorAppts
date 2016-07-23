myApp.factory('surveysFactory', function($http){
	var factory = {};
	var user = '';
	var surveys = [];
	var survey;
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

	factory.addUser = function(data, callback){
		user = data;
		console.log('our user is', user);
		callback(user.name);
	}

	factory.deleteUser = function(callback){
		user = '';
		callback(user);
	}

	factory.addSurvey = function(data, callback){
		console.log('made it to my surveys factory', data);
		$http.post('/surveys', data).then(function(data){
			console.log('made it back from backend this is our new survey', data);
			surveys.push(data.data);
			console.log('back in factory this is new surveys', surveys);
			callback(surveys);
		})
	}

	factory.getsurveys = function(callback){
		console.log('made it to surveys factory get surveys');
		$http.get('/surveys').then(function(data){
			console.log('made it back from backend this all mongoose', data);
			surveys = data.data;
			console.log('back in factory this is get surveys', surveys);
			callback(surveys);
		})
	}

	factory.deleteSurvey = function(survey, cb){
		$http.delete('/surveys/'+survey._id).then(function(data){
			console.log(data.data);
			for(i=0; i<surveys.length; i++){
				if(surveys[i]._id == data.data){
					surveys.splice(i, 1);
					break;
				}
			};
			cb(surveys);
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
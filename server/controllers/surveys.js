var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');

module.exports = (function(){
	return{
		createSurvey: function(req, res){
			var survey = new Survey(req.body);
			survey.save(function(err, result){
				if(err){
					console.log(err);
					console.log('error creating a new customer');
				} else {
					console.log('this is our new Survey',result);
					res.json(result);
				}
			})
		},

		getSurveys: function(req, res){
			Survey.find({}, function(err, surveys){
				if(err){
					console.log('error getting surveys');
				}else{
					res.json(surveys);
				}
			})
		},

		deleteSurvey: function(req, res){
			Survey.remove({_id: req.params.id}, function(err, result){
				if(err){
					console.log('Oooooo problem removing survey');
				}else{
					console.log('this is ou result', result);
					res.json(req.params.id);
				}
			})
		},

		updateSurveyCt: function(req, res){
			console.log('my params',req.body.count_key);
			var key = req.body.count_key
			Survey.findOneAndUpdate({'_id': req.params.id}, req.body, {new: true}, function(err, result){
				if(err){
					console.log('Oooooo problem incrementing count survey');
				}else{
					console.log('this is ou result', result);
					res.json(result);
				}
			})
		}
	}
})();
var mongoose = require('mongoose');
var Appt = mongoose.model('Appt');

module.exports = (function(){
	return{
		createAppt: function(req, res){
			// var theCount = 0;
			Appt.find({'date': req.body.date}).count({}, function(err, count){
				if(count<3){
					var appt = new Appt(req.body);
					appt.save(function(err, result){
						if(err){
							console.log(err);
							console.log('error creating a new customer');
							res.json(err);
						} else {
							console.log('this is our new Appt',result);
							res.json(result);
						}
					})
				}else{
					res.json({error: "Max appts for this day reached!"})
				}
			});
		},

		getAppts: function(req, res){
			Appt.find({}, function(err, appts){
				if(err){
					console.log('error getting Appts');
				}else{
					res.json(appts);
				}
			})
		},

		deleteAppt: function(req, res){
			Appt.remove({_id: req.params.id}, function(err, result){
				if(err){
					console.log('Oooooo problem removing Appt');
				}else{
					console.log('this is ou result', result);
					res.json(req.params.id);
				}
			})
		},

		updateApptCt: function(req, res){
			console.log('my params',req.body.count_key);
			var key = req.body.count_key
			Appt.findOneAndUpdate({'_id': req.params.id}, req.body, {new: true}, function(err, result){
				if(err){
					console.log('Oooooo problem incrementing count Appt');
				}else{
					console.log('this is ou result', result);
					res.json(result);
				}
			})
		}
	}
})();
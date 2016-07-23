var surveys = require('./../controllers/surveys.js');

module.exports = function(app){
	// app.post('/dummies/:test', function(req, res){
		
	// 	// I'm testing the info that I'm getting from my dummy Factory
	// 	// I console.log the body and the params just to make sure that it's
	// 	// going through 

	app.post('/surveys', function(req, res){
		console.log('made it to my /surveys post route');
		surveys.createSurvey(req, res);

	})
	app.get('/surveys', function(req, res){
		console.log(' made it to my /surveys get route');
		surveys.getSurveys(req, res);
	})

	app.delete('/surveys/:id', function(req, res){
		console.log('made it to my /mongoose/:id get route');
		surveys.deleteSurvey(req, res);
	})

	app.post('/surveys/:id', function(req, res){
		console.log('made it to my /surveys/:id post route');
		surveys.updateSurveyCt(req, res);
	})

	// app.post('/product', function(req, res){
	// 	console.log('made it to my /products post route');
	// 	products.createProduct(req, res);
	// })
}


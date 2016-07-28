var appts = require('./../controllers/appts.js');

module.exports = function(app){
	// app.post('/dummies/:test', function(req, res){
		
	// 	// I'm testing the info that I'm getting from my dummy Factory
	// 	// I console.log the body and the params just to make sure that it's
	// 	// going through 

	app.post('/appts', function(req, res){
		console.log('made it to my /appts post route');
		appts.createAppt(req, res);

	})
	app.get('/appts', function(req, res){
		console.log(' made it to my /surveys get route');
		appts.getAppts(req, res);
	})

	app.delete('/appts/:id', function(req, res){
		console.log('made it to my /appts/:id del route');
		appts.deleteAppt(req, res);
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


var mongoose = require('mongoose');

var SurveySchema = new mongoose.Schema({
	name: String,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    count1: Number,
    count2: Number,
    count3: Number,
    count4: Number

},{timestamps: true});

mongoose.model('Survey', SurveySchema);
// Validations
SurveySchema.path('name').required(true, 'Name cannot be blank');
SurveySchema.path('question').required(true, 'Name cannot be blank');
SurveySchema.path('option1').required(true, 'Name cannot be blank');
SurveySchema.path('option2').required(true, 'Name cannot be blank');
SurveySchema.path('option3').required(true, 'Name cannot be blank');
SurveySchema.path('option4').required(true, 'Name cannot be blank');
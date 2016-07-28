var mongoose = require('mongoose');

var ApptSchema = new mongoose.Schema({
	name: String,
    date: Date,
    time: Date,
    complain: String

},{timestamps: true});

mongoose.model('Appt', ApptSchema);
// Validations
ApptSchema.path('name').required(true, 'Name cannot be blank');
ApptSchema.path('date').required(true, 'Date cannot be blank');
ApptSchema.path('time').required(true, 'Time must be between 8:00 AM and 5:00 PM');
ApptSchema.path('complain').required(true, 'Name cannot be blank');

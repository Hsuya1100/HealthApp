var mongoose = require('mongoose');

var timings = mongoose.Schema({
    open  : Number,
    close : Number,
});

var doctor = new mongoose.Schema({
	name         : String,
	image        : String,
	hospital 	 : 
    {
        id:{
		   type : mongoose.Schema.Types.ObjectId,
		   ref  : "Hospital"
	    },
		name    : String
    },
	degree       : String,
	experience   : String,
	speciality   : String,
	dayAvailable : [String],
	timing       : timings,
	building     : String,
	floor        : String,
	room   		 : Number,
	contact 	 : Number,
	rating		 : Number
});
var doctor     = mongoose.model("Doctor",doctor);
module.exports = doctor;
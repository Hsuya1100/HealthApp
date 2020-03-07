var mongoose = require('mongoose');

var department = new mongoose.Schema({
	name         : String,
	image        : String,
	building     : String,
	floor        : String,
    hod          : 
    {
        id:{
		   type : mongoose.Schema.Types.ObjectId,
		   ref  : "Doctor"
	    },
		name : String
    },
    doctors: 
	[
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : "Doctor"	
		}
	]
});
var department = mongoose.model("Department",department);
module.exports = department;
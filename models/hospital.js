var mongoose = require('mongoose');

var availibility = mongoose.Schema({
    available : Number,
    total     : Number,
});

var hospital = new mongoose.Schema({
	name         : String,
	address      : String,
	city         : String,
	state        : String,
	contact      : Number,
	image        : String,
	departments	 : 
	{	
		"Eye": [
					{
						type:mongoose.Schema.Types.ObjectId,
						ref:"Doctor"	
					}
			   ],
		"Ear-Nose-Throat": [
								{
									type:mongoose.Schema.Types.ObjectId,
									ref:"Doctor"	
								}
		  	         	   ],
		"Heart": [
			          {
						type:mongoose.Schema.Types.ObjectId,
						ref:"Doctor"	
			          }
			    ],
		"Lungs": [
				    {
						type:mongoose.Schema.Types.ObjectId,
						ref:"Doctor"	
				    }
			     ],
		"Digestive-System": [
				   				{
									type:mongoose.Schema.Types.ObjectId,
									ref:"Doctor"	
				   				}
			                ],
		"Female-Specific": [
								{
							    	type:mongoose.Schema.Types.ObjectId,
									ref:"Doctor"	
			                    }
							],
		"Skin": [
					{
						type:mongoose.Schema.Types.ObjectId,
						ref:"Doctor"	
					}
		   		],
		"Kidney": [
					{
						type:mongoose.Schema.Types.ObjectId,
						ref:"Doctor"	
					}
		 		 ],
		"Sexual-Disease": [
							{
								type:mongoose.Schema.Types.ObjectId,
								ref:"Doctor"	
							}
	        			  ],
	    "Blood": [
		  			{
		   			  	type:mongoose.Schema.Types.ObjectId,
					    ref:"Doctor"	
		 			 }
         	     ],
        "Bones": [
	      			 {
		     			  type:mongoose.Schema.Types.ObjectId,
		     			  ref:"Doctor"	
	       			 }
		 	     ],
		"Muscles": [
					  {
						  type:mongoose.Schema.Types.ObjectId,
						  ref:"Doctor"	
			         }
	  			   ],
	    "Nervous-System": [
		  					{
								type:mongoose.Schema.Types.ObjectId,
								ref:"Doctor"	
							}
						],
	    "Diabetes-&-Metabolism": [
									{
							    		type:mongoose.Schema.Types.ObjectId,
		  								ref:"Doctor"	
									}
								],
		
	},
	diagnosis	 		 : [String],
	blood        		 : [String],
	beds_current	     : Number,
	beds_total	         : Number,
	ventilator_current	 : Number,
	ventilator_total	 : Number,
	emergency_current	 : Number,
	emergency_total	 	 : Number,
	ambulance_current    : Number,
	ambulance_total    	 : Number,
	rating		 		 : Number
});
var hospital   = mongoose.model("Hospital",hospital);
module.exports = hospital;
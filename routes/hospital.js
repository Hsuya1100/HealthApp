var express           = require('express');
var bodyParser = require('body-parser');
var router            = express.Router({mergeParams: true});;
session = require('express-session');

// var methodOverride = require("method-override");
// var flash=require('connect-flash');
// router.use(flash());
// router.use(methodOverride("_method"));

// ======================================================
// HOSPITAL SCHEMA
var Hospital = require('../models/hospital.js');
var Doctor   = require('../models/doctor.js');

// ======================================================
// console.log("PRINTG HODPITALS");
// // Hospital.find({},function(err,data){
// // 	if(err)
// // 	console.log(err);
// // 	else
// // 	console.log(data);
// // });

// LIST
router.get("/list",function(req,res){
	console.log("hospital listing Page");	
	var hospitals;
	if(typeof(req.session) !== "undefined")
		hospitals = req.session.hospital;
	else{
		console.log("User redirected to search hospitals");
		redirect("/search/hospital");
	}
	console.log("Sending hospitals data to list page");
	res.render("./hospital/list.ejs",{hospitals:hospitals});
});

// INFO
router.get("/id=:id",function(req,res){
    console.log("hospital info Page");	
	console.log("id fo hospital"+req.params.id);
	const id = req.params.id;
	Hospital.findById(id, function(err,data){
		if(err)
			console.log(err);
		else{
			console.log("Redirecting to info page of"+data.name);
			res.render("./hospital/info.ejs",{data:data});
		}
	});	
	
});

// DEPARMENTS
router.get("/id=:id/departments",function(req,res){
    console.log("hospital deparment Page");	
	// console.log("id fo hospital"+req.params.id);
	Hospital.findById(req.params.id, function(err, data){
		if(err)
			console.log(err);
		else{
			console.log("Redirecting to info page of"+data.name);
			res.render("./hospital/departments.ejs",{hospital:data});
		}
	});	
	
});
// DEPARTMENT DOCTORS LIST
router.get("/id=:id/departments=:dept/doctors",function(req,res){
    console.log("hospital deparment Page");	
	// console.log("id fo hospital"+req.params.id);
	Doctor.find({}, function(err, data){
		if(err)
			console.log(err);
		else{
			// console.log("Redirecting to info page of"+data.name);
			res.render("./hospital/doctors.ejs",{id:req.params.id, department:req.params.dept,doctors:data});
		}
	});	
	// see upppercase lowercase 
});
//hospital/id=<%=id%>/department=EYE/doctors/edit
// DEPARTMENT DOCTOR ADD
router.get("/id=:id/departments=:dept/doctors/edit",function(req,res){
	Hospital.findById(req.params.id, function(err, data){
		if(err)
			console.log(err);
		else{
			console.log("Redirecting to info page of"+data.name);
			res.render("./doctor/new.ejs",{id:req.params.id, dep:req.params.dept,department:req.params.dept,data:data});
			// res.render("./doctors/new.ejs",{id:req.params.id,dep:req.params.dept, department:data.departments});
		}
	});	
});
router.post("/id=:id/departments=:dept/doctors/edit",function(req,res){
var doctor = {
	name                :req.body.name, 
	city                :req.body.city, 
	state               :req.body.state, 
	contact      	    :req.body.contact, 
	image        	    :req.body.url, 
	department        	:req.body.department, 
	hospital        	:req.body.hospital, 
	};
	Doctor.create(doctor, function(err, data){
		if(err)
			console.log(err);
		else{
			console.log("ADDED Docotr");
			res.redirect("/hospital/id="+req.params.id+"/departments="+req.params.dept+"/doctors");
		}
	});	

});


// ABOUT
router.get("/id=:id/about",function(req,res){
    console.log("hospital ABOUT Page");	
	// console.log("id fo hospital"+req.params.id);
	Hospital.findById(id, function(err,data){
		if(err)
			console.log(err);
		else{
			console.log("Redirecting to info page of"+data.name);
			res.render("./hospital/about.ejs",{hospital:data});
		}
	});	
	
});

// NEW HOSPITAL GET
router.get("/new",function(req,res){
	console.log("reached adding new hospital");
	res.render("./hospital/new.ejs");
});

// NEW HOSPITAL POST 
router.post("/new",function(req,res){
	console.log("reached POSTINF new hospital");
	var ids;
	function find(id){
	}
	// res.redirect("./hospital/id="+ids);

	var data  = {
		name                :req.body.name, 
		city                :req.body.city, 
		state               :req.body.state, 
		contact      	    :req.body.contact, 
		image        	    :req.body.url, 
		};
	Hospital.create(data, function(err, data){
		if(err)
			console.log(err);
		else{
			ids ="/hospital/id="+data._id;
			console.log("ADDED DATA"+ids);
		}
	});	
	res.redirect("/search");
});



// EDIT HOSPITAL
router.get("/id=:id/edit",function(req,res){
	console.log("READED EDITING");
	Hospital.findById(req.params.id,function(err,data){
	if(err)
		console.log(err);
	else
		console.log("DATA IS "+data);
		res.render("./hospital/edit.ejs",{hospital_id:req.params.id, hospital:data});	
	});
});

router.post("/id=:id",function(req,res){
	console.log("reached PUT EDIT");
	var blood=[];
	bloodobj = req.body.blood;
	if(bloodobj === undefined)
		blood = [];
	else if(bloodobj !== undefined && bloodobj.length == 1){
		console.log(bloodobj);
		blood=bloodobj;
	}
	else if(bloodobj !== undefined )
	{
		// console.log(bloodobj[1] );
		for(i=0;i<bloodobj.length;i++){
			blood.push(bloodobj[i]);
		}
	}
console.log(blood);
	var id=req.body.id;
	var name=req.body.name;
	var url=req.body.url;
	var city=req.body.city;
	var state=req.body.state;
	var beds_total=req.body.beds_total;
	var beds_current=req.body.beds_current;
	var ventilator_total=req.body.ventilator_total;
	var ventilator_current=req.body.ventilator_current;
	var emergency_total=req.body.emergency_total;
	var emergency_current=req.body.emergency_current;
	console.log(typeof(blood));
	var new_object={
		name :name  ,
		url :url  ,
		city :city  ,
		state :state  ,
		beds_total :beds_total  ,
		blood:blood,
		beds_current :beds_current  ,
		ventilator_total :ventilator_total  ,
		ventilator_current :ventilator_current  ,
		emergency_total :emergency_total  ,
		emergency_current :emergency_current  
		};
		console.log(req.params.id);
		console.log(new_object);
	Hospital.updateOne({_id:req.params.id},new_object,function(err,data){
		if(err)
			console.log("Couldnt Create data in DB");
		else
			console.log("FOUND PUT ID"+data.name+" "+new_object.name);
		});
		res.redirect("/hospital/id="+req.params.id);
	});
// // DEPARTMENT OF HOSPITAL
// router.get("/id=:id/department",function(req,res){
// 	console.log("reached adding new hospital");
// 	res.render("./hospital/department.ejs");
// });

// EDIT HOSPITAL

// //MIDDLE HOSPITAL REDIRECT
// router.get("/middle=:name",function(req,res){
// 	console.log("reached MIDDLE");
// 	Hospital.find({name:req.params.name}, function(err,data){
// 		if(err)
// 			console.log(err);
// 		else{
// 			data={n :"LL",k:"hh"};
// 			console.log("Redirecting to info page of"+req.params.name+"ID ="+data.n);
// 			console.log("========================\n");
// 			// data.forEach(element => {
// 			// 	console.log(element);
// 			// });

// 			// console.log("Redirecting to info page of"+req.params.name+"ID ="+data.name);
// 			// console.log("Redirecting to info page of"+req.params.name+"ID ="+data.contact);
// 			// console.log("Redirecting to info page of"+req.params.name+"ID ="+data._id);
// 			// res.redirect("/hospital/id="+data._id);
// 		}
// 	});	
// 	// res.redirect("/hospital/new.ejs");
// });


// CONTACT
// router.get("/:id",function(req,res){
//     console.log("hospital info Page");	
// 	// console.log("id fo hospital"+req.params.id);
// 	Hospital.findById(id, function(data){
// 		if(err)
// 			console.log(err);
// 		else{
// 			console.log("Redirecting to info page of"+data.name);
// 			res.render("./hospital/info.ejs",{hospital:data});
// 		}
// 	});	
	
// });
// =========================================================
// Exporting Router
module.exports=router;




// EXTRA
// // console.log(doctorCollection);
// // exports.showOrListUsers = function(req, res, next) {
// // 	var doctorCollection= req.app.get('doctorCollection');
// // 	console.log(doctorCollection);
// // };
// // console.log(this.showOrListUsers.doctorCollection);


// POST FOR CREATE HOSPITAL
// router.post("/",function(req,res){
//     Hospital.create(new_hospital,function(err,data){
//        if(err)
//            console.log("Couldnt Create data in DB");
//        else{
//            console.log(data);
//            res.redirect("/hospital");
        //}
    //  });
// });
// EDIT   ( subject to change )
// router.get("/edit",function(req,res){
//     console.log("search doctor Page");	
//     res.render("./edit.ejs");
// });

// Hospital.findById(req.params.id,function(err,data){
	// 	if(err)
	// 		console.log(err);
	// 	else
	// 	{
	// 		// console.log("printing details====\n "+data);
	// 		res.render("./hospital/info.ejs",{hospital_data:data, hospital_id:req.params.id});
	// 	}
	// });

	// hospitalname = "JK HOSPITAL";
	// Doctor.findById('5da0fc4c55151802e3bdc0d2', function(err, data){
		// var doc = {
		// 	name          : "DOC 4",
		// 	department    : "EYE",
		// 	degree        : "MS",
		// 	experience    : "5",
		// 	speciality    : "cornea",
		// 	dayAvailable  : ["WEDNESDAY", "THURSDAY"],
		// 	timing        : {open  : 1300, close : 1740},
		// 	building      : "BLOCK 4",
		// 	floor	      : "1",
		// 	room	      : 102,
		// 	contact       : 799889999,
		// 	rating		  : 4
		// };
		// doc.hospital={id : data._id,name:data.name};
		// // doc.hospital.name=data.name;
		// doctorCollection.insertOne(doc,function(err,read_data){
		// 	if(err)
		// 	console.log("Cannot Find in DB");
		// 	else
		// 	console.log(read_data);
		
		// });
	// 	console.log(data.name);
	// });
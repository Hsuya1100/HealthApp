var express           = require('express');
var router            = express.Router({mergeParams: true});;
var bodyParser = require('body-parser');
session = require('express-session');

// var methodOverride = require("method-override");
// var flash=require('connect-flash');
// router.use(flash());
// router.use(methodOverride("_method"));

// ======================================================
// HOSPITAL SCHEMA
var Hospital=require('../models/hospital.js');
var Doctor=require('../models/doctor.js');

// ======================================================

// Landing Page
router.get("/",function(req,res){
    console.log("search Landing Page");	
    res.render("./search/landing.ejs");
});

// Search By Hospital Page
router.get("/hospital",function(req,res){
    console.log("search Hospital Page");	
    res.render("./search/hospital.ejs");
});

//POST ON Search By Hospital Page
router.post("/hospital",function(req,res){
    var bed   = req.body.bed;
    var dept  = req.body.dept;
    var blood = req.body.blood;
    var city  = req.body.city;
    city.toUpperCase();
    console.log(bed+" "+ dept+ " "+blood+" "+city);
    console.log("POST search Hospital Page");
    Hospital.find({city:city},function(err,hospital_list){
        if(err)
            console.log(err);
        else{
            console.log(hospital_list);
            req.session.hospital = hospital_list;
            res.redirect("/hospital/list");
        }

    });	
});

// Search By DOCTOR Page
// router.get("/doctor",function(req,res){
//     console.log("search doctor Page");	
//     res.render("./search/doctor.ejs");
// });

// POST ON Search By DOCTOR Page
// router.post("/doctor",function(req,res){
//     console.log("POST search doctor Page");	
//     res.redirect("./doctor/list");
// });

// Search By BLOOD Page
router.get("/doctor",function(req,res){
    console.log("search Blood Page");
    // var dept = "EYE";	
    // Doctor.find({}, function(err, data){
	// 	if(err)
	// 		console.log(err);
	// 	else{
	// 		// console.log("Redirecting to info page of"+data.name);
	// 		res.render("./hospital/doctors.ejs",{ department:dept,doctors:data});
	// 	}
    // });	
    res.redirect("/search/hospital");
});

// POST ON Search By doctor Page
router.post("/doctor",function(req,res){
    console.log("search Blood Page");	
    res.redirect("./doctor/list");
});

// =========================================================
// Exporting Router
module.exports=router;
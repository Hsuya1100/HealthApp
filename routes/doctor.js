var express           = require('express');
var router            = express.Router({mergeParams: true});
var bodyParser = require('body-parser');
session = require('express-session');

// var methodOverride = require("method-override");
// var flash=require('connect-flash');
// router.use(flash());
// router.use(methodOverride("_method"));

// ======================================================
// SCHEMA
var Hospital = require('../models/hospital.js');
var Doctor   = require('../models/doctor.js');

// ======================================================
// LIST
router.get("/list",function(req,res){
	
    console.log("doctor listing Page");	
    res.render("./doctor/list.ejs");
});

// INFO
router.get("/:id",function(req,res){
    console.log("doctor info Page");	
    res.render("./doctor/info.ejs");
// Doctor.findById(req.params.id,function(err,data){
	// 	if(err)
	// 		console.log(err);
	// 	else
	// 	{
	// 		// console.log("printing details====\n "+data);
	// 		res.render("./doctor/info.ejs",{doctor_data:data, doctor_id:req.params.id});
	// 	}
	// });
});

// EDIT   ( subject to change )
router.get("/edit",function(req,res){
    console.log("search doctor Page");	
    res.render("./edit.ejs");
});

// =========================================================

// Exporting Router
module.exports=router;
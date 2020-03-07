const express  = require('express')
const app      = express()
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
session = require('express-session');

// var flash      = require('connect-flash');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/HealthApp", { useNewUrlParser: true, useUnifiedTopology: true  },function(err,db){
	if(err)
		console.log(err);
	else
		console.log("Connected to DB");
});
// ==================
// SESSIONS
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
// ========================================================

// HOSPITAL SCHEMA
// var Hospital=require('./models/hospital.js');
var Hospital = require('./models/hospital.js');
var Doctor   = require('./models/doctor.js');
// ========================================================

// ROUTES
var searchRoutes   = require('./routes/search.js');
var hospitalRoutes = require('./routes/hospital.js');
var doctorRoutes   = require('./routes/doctor.js');

// ========================================================
// STATIC FILE
app.use(express.static(__dirname + "/public"));

// ROOT
app.get('/', function(req, res){ 
	console.log("ROOT REACHED");
	
// ============================================

		res.render("cover.ejs");

});

//REFACTORED ROUTES
app.use("/search"  , searchRoutes);
app.use("/hospital", hospitalRoutes);
app.use("/doctor"  , doctorRoutes);

// ========================================================
// SERVER INFO
const port = 27018;
const host = '127.0.0.1';
app.listen(port,host,function(){
	console.log("Server On !!");
});



// EXTRAS

// var mongoUtil = require( 'database');
// mongoUtil.connectToServer( function( err, client ) {
// 	// if (err) console.log(err);
// console.log("Connected to DB");
//   } );

//   var db = mongoUtil.getDb();
//   console.log(db[0]+" "+db[1]);
//   console.log(mongoUtil.connectToServer);
// ========================================================
var hospitalCollection = "";
// var doctorCollection="";
var departmentCollection="";
// DATABASE CONNECTION
// const MongoClient = require('mongodb').MongoClient;
// const uri         = "mongodb+srv://admin:admin@cluster0-jtupl.gcp.mongodb.net/admin?retryWrites=true&w=majority";
// const client      = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// var collection="";
// client.connect(err => {
// 	if(err)
// 		console.log(err);
// 	else{
// 		hospitalCollection   = client.db("Hospital").collection("Hospital");
// 		departmentCollection = client.db("Hospital").collection("Department");
// 		doctorCollection     = client.db("Hospital").collection("Doctor");

// 	}
// });



// app.set('doctorCollection', doctorCollection);
// ========================================================
// app.use(function(req,res,next){
// 	// return hospitalCollection;
// 	res.locals.doctorCollection=doctorCollection;
// 	next();
// });
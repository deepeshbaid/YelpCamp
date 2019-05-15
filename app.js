var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose=require("mongoose");
var Campground= require("./models/campground");
var Comment=require("./models/comment");
var methodOverride=require("method-override");
var seedDB=require("./seeds");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var commentRoutes=require("./routes/comments");
var campgroundsRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index");
var flash=require("connect-flash");

var User =require("./models/user");
app.locals.moment = require('moment');
var url=process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
// seedDB();
// //mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://deepesh:password1@ds115442.mlab.com:15442/yelpcamp");
mongoose.connect(url);

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(flash());

app.use(require("express-session")({
    secret:"kuch bhi",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser=req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundsRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});
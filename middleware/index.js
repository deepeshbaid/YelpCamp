var Campground=require("../models/campground");
var Comment=require("../models/comment")

var middlewareObj={};

middlewareObj.checkCampgroundownership=function(req,res,next){
     if(req.isAuthenticated()){
        
        
         Campground.findById(req.params.id,function(err,foundCampground){
        if(err || !foundCampground)
        {
            req.flash("error","Campground not found");
            res.render("back");
        }else
        {
            if(foundCampground.author.id.equals(req.user._id)){
                
                next();     
            }
                
            else{
                req.flash("error","You dont have permission to do that");
                res.redirect("back");
            }
        }
        
    });
    }else{
        req.flash("error","You need to be logged in first");
        res.redirect("back");
        
    }
    
};

middlewareObj.checkCommentOwnership=function checkCommentOwnership(req,res,next){
     if(req.isAuthenticated()){
        
        
         Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err || !foundComment)
        {
            req.flash("error","Comment not found");
            res.render("back");
        }else
        {
            if(foundComment.author.id.equals(req.user._id)){
                next();     
            }
                
            else{
                req.flash("error","You dont have permission to do that");
                res.redirect("back");
            }
        }
        
    });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
        
    }
    
};

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated())
    {
        return next();
    }
    
    req.flash("error", "You need to be logged in to do that");
    
    res.redirect("/login");
    
}
// adding isLogged OUT function
middlewareObj.isLoggedOut=function(req,res,next){
    res.redirect("/login");    
}


module.exports=middlewareObj;

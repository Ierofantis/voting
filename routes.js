var express = require("express");
var User = require("./models/user");
var Form = require("./models/res");
var Reg = require("./models/register");
var router = express.Router();


router.get("/signup", function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res, next) {

   var user = {
       username: req.body.username,
       email: req.body.email,
       password: req.body.pass
       
   };
 
   Reg.create(user, function(err, newUser) {
      if(err) return next(err);
     
      return res.render('form');
   });
});




router.get("/", function(req, res, next) {
  User.find()
  .sort({ createdAt: "descending" })
  .exec(function(err, polls) {
    if (err) { return next(err); }
    res.render("index", { polls: polls });
  });
});


router.get("/form", function(req, res) {
  res.render("form");
});

router.post("/form", function(req, res, next) {

  var titles = req.body.titles;
  var option1 = req.body.option1;
  var option2 = req.body.option2;

  User.findOne({ titles: titles }, function(err, user) {


    var newUser = new User({
      titles :titles,
      option1 :option1,
      option2 :option2
    });
    newUser.save(function(err) {

 
       res.redirect('/');

   });
  });
});


router.get("/poll/:titles", function(req, res, next) {
  User.findOne({ titles: req.params.titles }, function(err, user) {
    if (err) { return next(err); }
    
    res.render("profile", { user: user });
  });
});


  router.post("/poll/:titles", function(req, res) {
    console.log('req.body',req.body);

    var titles = req.body.titles;
    var option1 = req.body.option1;
    var option2 = req.body.option2;
    var selected_option = ( option1 ) ? option1 : option2;

       User.findOne({ titles: req.params.titles }, function(err, user) {


    var newForm = new Form({
      titles :titles,
      option1 :option1,
      option2 :option2
    });

    newForm.save(function(err,results) {

       console.log("it is saved")
       res.redirect(`/poll/${titles}/results`);
       //${selected_option}
   });
  });
});

      //else{
     // opt2.save(function(err, polls) {
//
       //console.log("option2");
      // res.redirect('/poll/:titles/:polls');

      
    // });
//}
    

   router.get("/poll/:titles/results", function(req, res) {
         var titles = req.params.titles;
         var results = req.params.results;         
       

     Form.find({ titles : req.params.titles
    }, function(err, data) {
       if (err) { return next(err); }
      
       res.render("polls", { data: data});
     });
    });


//router.get("/polls", function(req, res) {

//User.find()
 // .sort({ createdAt: "descending" })
 // .exec(function(err, vote) {
 //   if (err) { return next(err); }
 //   res.render("polls", { vote: vote });
 // });
//});


module.exports = router;
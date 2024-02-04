var express = require('express');
var router = express.Router();
var {expressjwt}=require('express-jwt');
var User=require('../data/users');

var auth=expressjwt({
  secret: process.env.JSON_TOKEN_STRING || 'MY_SECRET',
  requestProperty:'payload',
  algorithms:["HS256"]
});
var authController=require('../controllers/authentication');
/* GET users listing. */
router.get('/', auth,async function(req, res, next) {
  try{
     var users=await User.find({});
     res.status(200).json(users);
  }catch(e){
    console.log(e);
    next(e);
  }

});
router.post('/register',authController.register);
router.post('/login', authController.login);
module.exports = router;

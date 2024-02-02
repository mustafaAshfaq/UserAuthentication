var express = require('express');
var router = express.Router();
var User=require('mongoose').model('User');
const authController=require('../controllers/authController');
var jwt = require('express-jwt');
var user = require('mongoose').model('User');
var auth = jwt({
    secret: process.env.JSON_TOKEN_STRING || 'MY_SECRET',
    userProperty:'payload'
});
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

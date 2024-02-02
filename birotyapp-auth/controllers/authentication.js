const User=require('mongoose').model('User');
const passport=require('passport');

module.exports.register = function (req, res,next) {
    if(!req.body.name || !req.body.email || !req.body.password) {
   next( new Error("All fields required"));
 }
  var email = req.body.email;
  var newUser = new user();
  newUser.email = email;
  newUser.name = req.body.name;
  newUser.setPassword(req.body.password);
  newUser.save((err) => {
      if (err) res.status(400).json(err);
      var token = newUser.generateWebToken();
      res.status(200);
      res.json({
          "token": token
      });
  });
};
module.exports.login = function (req, res,next) {
    if (!req.body.email || !req.body.password) {
        next(new Error("All fields required")); 
    }
    passport.authenticate('local', function (err, user, info) {
        if (err)
            res.status(404).json(err);
        if (!user)
            res.status(400).json(info)
        else {
            let token = user.generateWebToken();
            res.status(200);
            res.json({
                "token": token
            });
        }

    })(req,res,next);
};
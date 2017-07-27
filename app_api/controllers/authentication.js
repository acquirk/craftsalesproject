var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.usersGrab = function (req, res) {
        User.find({}, {
            "email": 1,
            "firstName": 1,
            "lastName": 1,
            "admin": 1
        }, function (err, data) {
            if (err)
                res.send(err);
            else {
                res.json(data);
            }
        });


};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.lastName = req.body.lastName;
  user.firstName = req.body.firstName;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.permissions = function(req, res, id, type) {
    
    User.findById({ id }, function (err, user){
      if (type) {
      user.admin = 0;
      }
      else { user.admin = 1; }
      user.save(function (err) {
        res.status(200).send();
    });
});
};
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Customer = mongoose.model('Customer');

var sendJSONresponse = function (res, status, content) {
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

module.exports.register = function (req, res) {

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

    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });

};

module.exports.login = function (req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};

module.exports.permissions = function (req, res) {

    var id = req.body.id;
    var admin = req.body.admin;

    User.findOne({
        _id: id
    }, function (err, user) {
        if (admin) {
            user.admin = 0;
        } else {
            user.admin = 1;
        }
        user.save(function (err) {
            res.status(200).send();
        });
    });
};
    
module.exports.settingsChange = function (req, res) {

    var id = req.body.id;
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    console.log(id + " " + email);

    User.findOne({
        _id: id
    }, function (err, user) {
      if (err) {
        console.log("error");
        
      } else {
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        user.save(function (err) {
            res.status(200).send();
        });
      }
    });
};

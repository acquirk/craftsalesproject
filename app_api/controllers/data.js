var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Customer = mongoose.model('Customer');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.upload = function (req, res) {

    var customer = new Customer();
    fd.append('file', file);
    $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {
            'Content-Type': undefined
        }
    });

    customer.save(function (err) {
        res.status(200);
    });
};

module.exports.register = function (req, res) {

    var customer = new Customer();

    customer.email = req.body.email;
    customer.name = req.body.name;
    customer.address.city = req.body.city;
    customer.address.street = req.body.street;
    customer.address.state = req.body.state;
    customer.address.zip = req.body.zip;
    customer.phone = req.body.phone;
    customer.customerType = req.body.customerType;
    customer.saleType = req.body.saleType;
    customer.accountManager = req.body.accountManager;
    customer.sales.productName = req.body.productName;
    customer.sales.caseCount = req.body.caseCount;
    customer.sales.bottleCount = req.body.bottleCount;

    customer.save(function (err) {
        res.status(200).send("test");
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

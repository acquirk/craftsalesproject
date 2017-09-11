var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Customer = mongoose.model('Customer');
var Comment = mongoose.model('Comment');
var Sale = mongoose.model('Sale');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.upload = function (req, res) {

    var json = eval(req.body.json);
    console.log(json);
    console.log(json.json);
    if (!json.json) {
        res.status(500).send();
    }

    var customer = new Customer();
    var sale = new Sale();
    Customer.findOne({
        name: json.json[req.body.name]
    }, function (err, customer) {
        if (customer) {
            console.log(customer);
            console.log("old");
            sale.productName = json.json[req.body.productName];
            sale.caseCount = json.json[req.body.caseCount];
            sale.bottleCount = json.json[req.body.bottleCount];
            sale.reportID = req.body.reportID;
            //set if to determine where we are getting date
            if (json.json[req.body.date] == "today") {
              sale.date = Date().now;
            }
            else if (json.json[req.body.date] === "") {
              sale.date = new Date(req.body.year + "-" + req.body.month + "-" + req.body.day + "T00:00:00.000Z");
            }
            else {
              sale.date = json.json[req.body.date];
            }
            customer.sales.push(sale);
            customer.save(function (err) {});
            res.status(200).send();
        } else {
            customer = new Customer();
            console.log(json.cust);
            console.log(customer);
            console.log("new");
            customer.email = json.json[req.body.email];
            customer.name = json.json[req.body.name];
            customer.address.city = json.json[req.body.city];
            customer.address.street = json.json[req.body.street];
            customer.address.state = json.json[req.body.state];
            customer.address.zip = json.json[req.body.zip];
            customer.phone = json.json[req.body.phone];
            customer.customerType = json.json[req.body.customerType];
            customer.saleType = json.json[req.body.saleType];
            customer.accountManager = json.json[req.body.accountManager];
            sale.productName = json.json[req.body.productName];
            sale.caseCount = json.json[req.body.caseCount];
            sale.bottleCount = json.json[req.body.bottleCount];
            sale.reportID = req.body.reportID;
            //set if to determine where we are getting date
            if (json.json[req.body.date] == "today") {
              sale.date = Date().now;
            }
            else if (json.json[req.body.date] === "") {
              sale.date = new Date(req.body.year + "-" + req.body.month + "-" + req.body.day + "T00:00:00.000Z");
              console.log("DATE:" + sale.date);
            }
            else {
              sale.date = json.json[req.body.date];
            }
            console.log(json);
            console.log(json.json[req.body.email]);
            console.log(req.body.email);
            console.log(customer);
            customer.sales.push(sale);
            customer.save(function (err) {});
            res.status(200).send();
        }
    });
};

module.exports.register = function (req, res) {

    var customer = new Customer();
    var sale = new Sale();

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
    sale.productName = req.body.productName;
    sale.caseCount = req.body.caseCount;
    sale.bottleCount = req.body.bottleCount;
    customer.sales.push(sale);
    /*
    customer.comments = [];
    */
    customer.save(function (err) {
        res.status(200).send();
    });

};

module.exports.addSale = function (req, res) {
    var sale = new Sale();

    sale.productName = req.body.productName;
    sale.caseCount = req.body.caseCount;
    sale.bottleCount = req.body.bottleCount;

    Customer.findOne({
        name: req.body.name
    }, function (err, customer) {
        customer.sales.push(sale);
        customer.save(function (err) {
            res.status(200).send();
        });
    });

};

module.exports.salesGrab = function (req, res) {
    Customer.find({}, {
        "name": 1,
        "address": 1,
        "accountManager": 1,
        "sales": 1
    }, function (err, data) {
        if (err)
            res.send(err);
        else {
            res.json(data);
        }
    });


};

module.exports.accountsGrab = function (req, res) {
    Customer.find({}, {
        "name": 1,
        "address": 1,
        "phone": 1,
        "customerType": 1,
        "saleType": 1,
        "accountManager": 1,
        "distributor": 1,
        "sales": 1
    }, function (err, data) {
        if (err)
            res.send(err);
        else {
            res.json(data);
        }
    });


};

module.exports.updateSale = function (req, res) {
  
  // This is the Settings Change function from the authentication controller!!!!! Similar but not what we want!!! Will change soon

    var id = req.body.id;
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

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
        var token = user.generateJwt();
        res.json({
                "token": token
            });
      }
    });
};

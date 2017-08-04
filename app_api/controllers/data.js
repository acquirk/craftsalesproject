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
  //console.log(json);
  
  for (var i = 0; i < json.length; i++) {
    console.log(json);
    console.log(json[i]);
    var customer = new Customer();
    var sale = new Sale();
    Customer.findOne({
        name: json[i].cust
    }, function (err, data) {
      if (data) {
         console.log(data);
        sale.productName = json[i].desc1;
        sale.caseCount = json[i].casecntt;
        sale.bottleCount = json[i].bottcnt;
        data.sales.push(sale);
        data.save(function (err) {
            res.status(200).send();
        });
      } else {
        console.log("new");
        console.log(json);
        console.log(json[i]);
        customer.email = json[i].cust;
        customer.name = json[i].cust;
        customer.address.city = json[i].city;
        customer.address.street = json[i].addres1;
        customer.address.state = json[i].state;
        customer.address.zip = json[i].zip;
        customer.phone = json[i].phone;
        customer.customerType = json[i].custype;
        customer.saleType = json[i].saletype;
        customer.accountManager = json[i].acctmgr;
        console.log(customer);
        //sale.productName = json[i].desc1;
        //sale.caseCount = json[i].casecntt;
        //sale.bottleCount = json[i].bottcnt;
        customer.sales.push(sale);
        customer.save(function (err) {
        res.status(200).send();
    });
    }});
    
    
  }
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
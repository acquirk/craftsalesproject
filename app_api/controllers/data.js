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
    console.log(json[0]);
    //console.log(json);
        var customer = new Customer();
        var sale = new Sale();
        Customer.findOne({
            name: json.cust
        }, function (err, customer) {
            if (customer) {
                console.log(customer);
                console.log("old");
                sale.productName = json.desc1;
                sale.caseCount = json.casecntt;
                sale.bottleCount = json.bottcnt;
                customer.sales.push(sale);
                customer.save(function (err) {});
                res.status(200).send();
            } else {
              customer = new Customer();
              console.log(json.cust);
              console.log(customer);
                console.log("new");
                customer.email = json.cust;
                customer.name = json.cust;
                customer.address.city = json.city;
                customer.address.street = json.addres1;
                customer.address.state = json.state;
                customer.address.zip = json.zip;
                customer.phone = json.phone;
                customer.customerType = json.custype;
                customer.saleType = json.saletype;
                customer.accountManager = json.acctmgr;
                sale.productName = json.desc1;
                sale.caseCount = json.casecntt;
                sale.bottleCount = json.bottcnt;
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

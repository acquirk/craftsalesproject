var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var commentsSchema = new mongoose.Schema({
    userID: String,
    comment: String,
    date: {
        type: Date,
        default: Date.now
    }

});

var salesSchema = new mongoose.Schema({
    productName: String,
    caseCount: Number,
    bottleCount: Number,
    date: {
        type: Date,
        default: Date.now
    },
    reportID: String
});

var customerSchema = new mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        city: String,
        street: String,
        state: String,
        zip: String
    },
    phone: Number,
    customerType: String,
    saleType: String,
    accountManager: String,
    distributor: String,
    sales: [salesSchema],
    comments: [commentsSchema]
});

mongoose.model('Comment', commentsSchema);
mongoose.model('Sale', salesSchema);
mongoose.model('Customer', customerSchema);

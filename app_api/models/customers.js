var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var customerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
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
    sales: {
        productName: String,
        caseCount: Number,
        bottleCount: Number,
        date: {
            type: Date,
            default: Date.now
        }
    },
    comments: {
        userID: String,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }
});

mongoose.model('Customer', customerSchema);

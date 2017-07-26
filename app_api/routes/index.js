var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});


var ctrlAuth = require('../controllers/authentication');
var ctrlData = require('../controllers/data');

// profile
//router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/settings');
router.post('/reports', ctrlData.register);
router.post('/addSale', ctrlData.addSale);
router.post('/accountsGrab', ctrlData.accountsGrab);

router.post('/users', ctrlAuth.usersGrab);

module.exports = router;

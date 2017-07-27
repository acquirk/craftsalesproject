var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


var ctrlAuth = require('../controllers/authentication');

// profile
//router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

router.post('/settings');
router.post('/reports');

router.post('/users', ctrlAuth.usersGrab );

router.post('/permissions', ctrlAuth.permissions );

module.exports = router;

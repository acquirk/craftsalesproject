var express = require('express');
var router = express.Router();
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', isLoggedIn, function (req, res) {
    User.find({}).exec(function(err, users) {
        if (err) throw err;
        res.send(users);
        console.log(users);
    });
});

module.exports = router;
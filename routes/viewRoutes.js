const express = require('express');
const viewController = require('../controllers/viewController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/login').get(viewController.getLoginForm);
router.route('/signup').get(viewController.getSignupForm);

router.route('/home').get(userController.protect, viewController.getHome);

router.route('/').get((req, res, next) => {
  res.redirect('/login');
});

module.exports = router;

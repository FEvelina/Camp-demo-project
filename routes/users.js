const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync')
const User = require('../models/user');
const users = require('../controllers/users');

//-------register route -------------

router.route('/register')
//getting the register page
.get( users.renderRegister)

//saving the data of the new account
.post( catchAsync(users.register ))


//-------login route -------------


router.route('/login')
//getting the login page
.get( users.renderLogin)

//passport is doing the actual authentification check, i'm flashing and redirecting 
.post( passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), users.login)


//-------logout route -------------

//logout and redirect to campgrounds page
router.get('/logout', users.logout)

    module.exports = router;
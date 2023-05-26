const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const { campgroundSchema } = require('../schemas.js')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campgrounds = require('../controllers/campgrounds');


//--------campgroung route--------
router.route('/')
    //campgrounds page
    .get(catchAsync(campgrounds.index))

    //posting the new campground
    .post(validateCampground, catchAsync(campgrounds.createCampground))


//-------new route -------------

//getting to the new campground page
router.get('/new', isLoggedIn, campgrounds.renderNewForm)


// ---------id route---------
router.route('/:id')
//showing the detaild of the campground+reviews
.get( catchAsync(campgrounds.showCampground))

//updating the existing campground with the new informations
.put( isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))

//deleting a campground
.delete( isLoggedIn, catchAsync(campgrounds.deleteCampground))



//-------other route -------------


//getting to the edit campground page
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))







module.exports = router;
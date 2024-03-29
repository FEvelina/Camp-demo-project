const express = require('express');
const router = express.Router({mergeParams: true});
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground');

const Review = require('../models/review')
const ExpressError = require('../utils/ExpressError')
const reviews = require('../controllers/reviews');



//posting a new review
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// deleting a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;

const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateHost = [
  check('location')
    .exists({ checkFalsy: true })
    // .isLength({ min: 10 })
    .withMessage('Please provide a valid address.'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a price per night in the follow format: ex: 10.00'),
  check('pic')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a picture of the home.'),
  check('title')
    .exists({ checkFalsy: true })
    // .isLength({ min: 6 })
    .withMessage('title must be 6 characters or more.'),
  check('description')
  .exists({ checkFalsy: true })
  // .isLength({ min: 25 })
  .withMessage('description must be 25 characters or more.'),
  handleValidationErrors,
];


router.post(
  '',
  validateHost,
  asyncHandler(async (req, res) => {
    console.log("hello------------------------------------")
    const { userId,location, price, pic, title, description } = req.body;
    console.log("userId:", userId)
    const host = await Booking.create({ userId,location, price, title, pic,description })
    return res.json({
      host,
    });
  }),
);

module.exports = router;

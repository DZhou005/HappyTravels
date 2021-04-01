const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')
const { updateListing } = require("../../../frontend/src/store/booking")
async function update(details) {
  const id = details.id;
  delete details.id;
  await Booking.update(
    details, {
      where: { id },
      returning: true,
      plain: true,
    }
  );
  return id;
}

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
  '/',
  singleMulterUpload("pic"),
  validateHost,
  asyncHandler(async (req, res) => {
    console.log("helloooooo", req.file)
    const { userId,location, price, title, description } = req.body;

      const pic = await singlePublicFileUpload(req.file);
      const host = await Booking.create({ userId,location, price, title, pic, description })


    return res.json({
      host,
    });
  }),
);

router.get('/:id', asyncHandler(async (req, res) => {
  console.log("it is hitting here")
  const postId = parseInt(req.params.id, 10);
  console.log("postid:---------------------", postId)
  const post = await Booking.findByPk(postId);
  return res.json(post)
}))


router.put('/:id', asyncHandler(async (req, res) => {
  console.log("it is here not there")
  const listing = await Booking.updateListing(req.body);
  return res.json(listing)
}))



module.exports = router;

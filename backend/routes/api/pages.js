const express = require('express');
const { Booking } = require('../../db/models');
const asyncHandler = require('express-async-handler');
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const pages = await Booking.findAll();
  return res.json(pages)
}));







module.exports = router;

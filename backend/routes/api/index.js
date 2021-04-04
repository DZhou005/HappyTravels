const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const hostRouter = require('./host.js');
const pagesRouter = require('./pages');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/host', hostRouter);

router.use('/pages', pagesRouter);

module.exports = router;

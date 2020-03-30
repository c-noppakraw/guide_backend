const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/', require('./authentication'));

module.exports = router;

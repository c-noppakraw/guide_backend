const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/', require('./authentication'));
router.use('/status', require('./status'));
router.use('/guide', require('./guide'));
router.use('/tours', require('./tours'));
router.use('/complain', require('./complain'));
router.use('/question', require('./question'));
router.use('/home', require('./home'));
// router.get('/', (req, res) => {
// 	res.render('index', { title: 'Express' });
// });

module.exports = router;

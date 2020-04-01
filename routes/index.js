const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/', require('./authentication'));
router.use('/guide', require('./guide'));
// router.get('/', (req, res) => {
// 	res.render('index', { title: 'Express' });
// });

module.exports = router;

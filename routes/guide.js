const express = require('express');
const router = express.Router();
const { User, Profile } = require('../models');
const uploadProfile = require('../middlewares/uploads/profile/profile');
const { validationResult } = require('express-validator');
const register_validator = require('../middlewares/validators/register/register');

router.get('/', (req, res) => {
	return res.render('index', { title: 'Guide Page' });
});

module.exports = router;
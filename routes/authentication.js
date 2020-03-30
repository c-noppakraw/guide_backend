const express = require('express');
const router = express.Router();
const { User, Profile } = require('../models');

router.get('/', (req, res) => {
	res.render('index', { title: 'Express' });
});
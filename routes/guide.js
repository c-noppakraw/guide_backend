const express = require('express');
const router = express.Router();
const { User, Profile } = require('../models');
const Op = require('sequelize').Op;
const { validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authentication');

router.get('/', authMiddleware, async (req, res) => {
	try {
		const {
			_id,
			_level,
			_username,
			_firstname_th,
			_firstname_en,
			_lastname_th,
			_lastname_en,
			_img
		} = req.user;
		if (_level == 4) {
			return res.redirect('/');
		}
		const user = await User.findAll({
			where: { [Op.and]: [{ level: 4 }] },
			include: [{ model: Profile, as: 'Profile' }]
		});
		return res.status(201).json({ data_user: user });
		// return res.render('index', { title: 'Guide Page' });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

router.get('/:guidesId', authMiddleware, async (req, res) => {
	try {
		const {
			_id,
			_level,
			_username,
			_firstname_th,
			_firstname_en,
			_lastname_th,
			_lastname_en,
			_img
		} = req.user;
		if (_level == 4) {
			return res.redirect('/');
		}
		const uuid = req.params.guidesId;
		let user = {};
		if (uuid) {
			user = await User.findOne({
				where: { [Op.and]: [ { level: 4 }, { uuid_user: uuid }] },
				include: [{ model: Profile, as: 'Profile' }]
			});
		}
		return res.status(201).json({ data_user: user });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

module.exports = router;
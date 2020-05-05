const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User, Profile } = require('../models');
const Op = require('sequelize').Op;
const { validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/authentication');
const edit_validators = require('../middlewares/validators/guide/edit');

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
			where: { [Op.and]: [{ level: 4 }, { visible: '1' }] },
			include: [{ model: Profile, as: 'Profile' }]
		});
		return res.render('./guide/list_guide', { 
			title: 'List Guide',
			data: user,
			img_profile: _img,
			id_user: _id,
            show_username: _username,
            firstname_th: _firstname_th,
            lastname_th: _lastname_th
        });
		// return res.status(201).json({ data_user: user });
		// return res.render('index', { title: 'Guide Page' });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

router.get('/list', authMiddleware, async (req, res) => {
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
			where: { [Op.and]: [{ level: 4 }, { visible: '2' }] },
			include: [{ model: Profile, as: 'Profile' }]
		});
		return res.render('./guide/confirm', { 
			title: 'Confirm Guide',
			data: user,
			img_profile: _img,
			id_user: _id,
            show_username: _username,
            firstname_th: _firstname_th,
            lastname_th: _lastname_th
        });
		// return res.status(201).json({ data_user: user });
		// return res.render('index', { title: 'Guide Page' });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

router.post('/:id_user/confirm', authMiddleware, async (req, res) => {
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
		const uuid = req.params.id_user;
		let { visible } = req.body;
		const newData = await User.update(
			{ visible: visible },
			{ where: { uuid_user: uuid } }
		)
		const newProfile = await Profile.update(
			{ user_update: _username },
			{ where: { user_uuid: uuid } }
		)
		// return res.status(201).json({ data_user: newData, data_profile: newProfile });
		return res.redirect('/guide/list');
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

router.get('/:id_user/detail', authMiddleware, async (req, res) => {
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
		const uuid = req.params.id_user;
        const user = await User.findOne({
			where: { [Op.and]: [{ uuid_user: uuid }, { visible: '2' }] },
			include: [{ model: Profile, as: 'Profile' }]
		});
		// return res.status(201).json({ data: user });
		return res.render('./guide/daetail_confirm', { 
			title: 'Confirm Guide',
			data: user,
			img_profile: _img,
			id_user: _id,
            show_username: _username,
            firstname_th: _firstname_th,
            lastname_th: _lastname_th
        });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

router.get('/:id_user/edit', authMiddleware, async (req, res) => {
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
		const uuid = req.params.id_user;
        const user = await User.findOne({
			where: { uuid_user: uuid },
			include: [{ model: Profile, as: 'Profile' }]
		});
		// return res.status(201).json({ data_user: user });
		return res.render('./guide/edit', { 
			title: 'Edit Guide',
			data: user,
			img_profile: _img,
			id_user: _id,
            show_username: _username,
            firstname_th: _firstname_th,
            lastname_th: _lastname_th
        });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

router.post('/:id_user/edit', authMiddleware, edit_validators, async (req, res) => {
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
		const uuid = req.params.id_user;
		let {
			username,
			password,
			ord_password,
			first_name_th,
			last_name_th,
			first_name_en,
			last_name_en,
			passport_no,
			passport_exp,
			visa_no,
			visa_exp,
			city,
			country,
			phone,
			email
		} = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// return res.status(400).json({ errors: errors.array() });
			const user = await User.findOne({
				where: { uuid_user: uuid },
				include: [{ model: Profile, as: 'Profile' }]
			});
			return res.render('./guide/edit', { 
				errors: errors.array(),
				data: user
			});
		}
		let password_encode = '';
		if (password) {
			const salt = await bcrypt.genSalt(10);
			password = await bcrypt.hash(password, salt);
			password_encode = password;
		} else {
			password_encode = ord_password;
		}
        const newData = await User.update(
			{ 
				username: username,
				password: password_encode,
			},
			{ where: { uuid_user: uuid } }
		);
		const newProfile = await Profile.update(
			{
				first_name_th: first_name_th,
				last_name_th: last_name_th,
				first_name_en: first_name_en,
				last_name_en: last_name_en,
				passport_no,
				passport_exp,
				visa_no: '',
				visa_exp: null,
				city,
				country,
				email,
				phone: phone,
				user_update: _username
			},
			{ where: { user_uuid: uuid } }
		)
		res.redirect('/guide/' + uuid + '/edit');
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

module.exports = router;
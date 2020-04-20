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

router.post('/:id_user/edit', authMiddleware, async (req, res) => {
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
		console.log(req.body);
        // const user = await User.findOne({
		// 	where: { uuid_user: uuid },
		// 	include: [{ model: Profile, as: 'Profile' }]
		// });
		// return res.status(201).json({ data_user: user });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User, Profile } = require('../models');
const uploadProfile = require('../middlewares/uploads/profile/profile');
const { validationResult } = require('express-validator');
const register_validator = require('../middlewares/validators/register/register');
const login_validator = require('../middlewares/validators/login/login')

router.get('/', async (req, res) => {
	return res.render('./login/login', { title: 'Login To Manage Guide Go Inter' });
});

router.post('/', login_validator, async (req, res) => {
	try {
		let {
			username,
			password
		} = req.body;
		const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// return res.status(400).json({ errors: errors.array() });
				return res.render('./login/login', { 
					errors: errors.array(),
					username
				});
			}
		const user = await User.findOne({
			where: { username }
		});
		if(!user){
			// return res.status(404).json({ errors: [{ msg: 'ไม่พบชื่อผู้ใช้' }] });
			return res.render('./login/login', { errors: [{ msg: 'ไม่พบชื่อผู้ใช้' }] });
		} else {
			const user_uuid = user.uuid_user;
			const profile = await Profile.findOne({
				where: { user_uuid }
			});

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				// return res.status(400).json({ errors: [{ msg: 'รหัสผ่านไม่ถูกต้อง' }] });
				return res.render('./login/login', { errors: [{ msg: 'รหัสผ่านไม่ถูกต้อง' }] });
			}
			const payload = {
				_id: user.uuid_user,
				_level: user.level,
				_username: user.username,
				_firstname_th: profile.firstname_th,
				_firstname_en: profile.firstname_en,
				_lastname_th: profile.lastname_th,
				_lastname_en: profile.lastname_en,
				_img: profile.img
			};
			jwt.sign(payload, `secret_key_here`, { expiresIn: 3600 * 3 }, (err, token) => {
				if (err) throw err;
				res.cookie('authToken', token, { maxAge: 3600 * 3 * 1000, httpOnly: true });
				return res.send('Login Success');
				// res.redirect('/dashboards');
			});
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

router.get('/register', (req, res) => {
	// return res.send('Register Page!');
	return res.render('index', { title: 'Register Page' });
});

router.post('/register', uploadProfile.single('profile_image'), register_validator, async (req, res) => {
	try {
		let {
			username,
			password,
			confirmPassword,
			visible,
			level,
			first_name_th,
			last_name_th,
			first_name_en,
			last_name_en,
			code,
			passport_no,
			passport_exp,
			country,
			city,
			phone,
			email,
			user_created,
			user_update
		} = req.body;
		const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
		let profileImage = '';
			if (req.file) {
				profileImage = req.file.filename;
			} else {
				profileImage = 'no-image.png';
			}
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);
		const newUser = await User.create({ 
			username, 
			password,
			visible, 
			level,
			img: profileImage
		});
		const newProfile = await Profile.create({
			first_name_th,
			last_name_th,
			first_name_en,
			last_name_en,
			passport_no,
			passport_exp,
			code,
			country,
			city,
			phone,
			email,
			user_created,
			user_update,
			ProfileUuidUser: newUser.uuid_user
		});
		return res.status(201).json({ data_user: newUser, data_profile: newProfile });
		// return res.status(201).json({ data_user: newUser });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

module.exports = router;
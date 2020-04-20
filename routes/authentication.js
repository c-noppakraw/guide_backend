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
		// const errors = validationResult(req);
		// 	if (!errors.isEmpty()) {
		// 		// return res.status(400).json({ errors: errors.array() });
		// 		return res.render('./login/login', { 
		// 			errors: errors.array(),
		// 			username
		// 		});
		// 	}
		const user = await User.findOne({
			where: { username }
		});
		if(!user){
			// return res.status(404).json({ errors: [{ msg: 'ไม่พบชื่อผู้ใช้' }] });
			return res.render('./login/login', { errors_login: [{ msg: 'ไม่พบชื่อผู้ใช้' }] });
		} else {
			const user_uuid = user.uuid_user;
			const profile = await Profile.findOne({
				where: { user_uuid }
			});
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				// return res.status(400).json({ errors: [{ msg: 'รหัสผ่านไม่ถูกต้อง' }] });
				return res.render('./login/login', { errors_login: [{ msg: 'รหัสผ่านไม่ถูกต้อง' }] });
			}
			if (user.visible == 1) {
				const payload = {
					_id: user.uuid_user,
					_level: user.level,
					_username: user.username,
					_firstname_th: profile.first_name_th,
					_firstname_en: profile.first_name_en,
					_lastname_th: profile.last_name_th,
					_lastname_en: profile.last_name_en,
					_img: user.img
				};
				jwt.sign(payload, `secret_key_here`, { expiresIn: 3600 * 3 }, (err, token) => {
					if (err) throw err;
					res.cookie('authToken', token, { maxAge: 3600 * 3 * 1000, httpOnly: true });
					// return res.send('Login Success');
					return res.redirect('/home');
				});
			} else {
				// return res.send('Wait Confirm');
				return res.redirect('/status/' + user.uuid_user);
			}
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

router.get('/register', (req, res) => {
	// return res.send('Register Page!');
	// return res.render('index', { title: 'Register Page' });
	return res.render('./register/register', { title: 'Register Guide Go Inter' });
});

router.post('/register', uploadProfile.single('profile_image'), register_validator, async (req, res) => {
	try {
		let {
			user_name,
			pass_word,
			confirm_password,
			first_name_th,
			last_name_th,
			first_name_en,
			last_name_en,
			code,
			passport_no,
			passport_exp,
			frm_country,
			frm_city,
			phone,
			frm_email,
			visa_no,
			visa_exp,
			visible,
			level,
			user_created,
			user_update
		} = req.body;
		const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// return res.status(400).json({ errors: errors.array() });
				return res.render('./register/register', { 
					errors: errors.array(),
					user_name,
					pass_word,
					confirm_password,
					first_name_th,
					last_name_th,
					first_name_en,
					last_name_en,
					code,
					passport_no,
					passport_exp,
					frm_country,
					frm_city,
					phone,
					frm_email,
					visa_no,
					visa_exp
				});
			}
		let profileImage = '';
			if (req.file) {
				profileImage = req.file.filename;
			} else {
				profileImage = 'no-image.png';
			}
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(pass_word, salt);
		const newUser = await User.create({ 
			username: user_name, 
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
			country: frm_country,
			city: frm_city,
			phone,
			visa_no,
			visa_exp,
			email: frm_email,
			user_created,
			user_update,
			ProfileUuidUser: newUser.uuid_user
		});
		// return res.status(201).json({ data_user: newUser, data_profile: newProfile });
		return res.render('./login/login', {
			alerts: [{ status: 'success', msg: 'สมัครสมาชิกเรียบร้อย' }]
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

module.exports = router;
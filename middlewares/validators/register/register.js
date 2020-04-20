const { check } = require('express-validator');
const { User, Profile } = require('../../../models');

const validator = [
    check('user_name')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณาระบุชื่อผู้ใช้')
		.custom(user_name => {
			return User.findOne({ where: { username: user_name } }).then(user => {
				if (user) {
					return Promise.reject('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว');
				}
			});
        }),
    check('pass_word')
		.isLength({ min: 8, max: 8 })
		.withMessage('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
	check('confirm_password')
		.custom((value, { req }) => value === req.body.pass_word)
        .withMessage('รหัสผ่านไม่ตรงกันกรุณาระบุรหัสผ่านใหม่อีกครั้ง'),
    check('visible')
        .not()
        .isEmpty()
        .trim()
        .withMessage('กรุณากรอก สถานะ'),
    check('level')
        .not()
        .isEmpty()
        .trim()
        .withMessage('กรุณากรอก สิทธิ์'),
	check('first_name_th')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณากรอก ชื่อภาษาไทย'),
	check('last_name_th')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณากรอก สกุลภาษาไทย'),
	check('first_name_en')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณากรอก ชื่อภาษาอังกฤษ'),
	check('last_name_en')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณากรอก สกุลภาษาอังกฤษ'),
	check('code')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณากรอก รหัสประจำตัวไกด์')
		.custom(code => {
			return Profile.findOne({ where: { code } }).then(profile => {
				if (profile) {
					return Promise.reject('รหัส รหัสประจำตัวไกด์ นี้ถูกใช้งานแล้ว');
				}
			});
        }),
    check('passport_no')
		.isLength({ min: 7, max: 7 })
		.withMessage('เลขที่หนังสือเดินทางไม่ถูกต้อง')
		.custom(passport_no => {
			return Profile.findOne({ where: { passport_no } }).then(profile => {
				if (profile) {
					return Promise.reject('รหัส Passport นี้ถูกใช้งานแล้ว');
				}
			});
        }),
    check('passport_exp')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก วันหมดอายุ passport'),
    check('frm_country')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก ประเทศ'),
    check('frm_city')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก เมือง'),
    check('phone')
        .isNumeric()
        .isLength({ min: 10, max: 10 })
		.withMessage('กรุณากรอก เบอร์ติดต่อ')
		.custom(phone => {
			return Profile.findOne({ where: { phone } }).then(profile => {
				if (profile) {
					return Promise.reject('เบอร์ติดต่อนี้ถูกใช้งานแล้ว');
				}
			});
		}),
	check('frm_email')
		.isEmail()
		.withMessage('กรุณากรอก อีเมล')
		.custom(frm_email => {
			return Profile.findOne({ where: { email:frm_email } }).then(profile => {
				if (profile) {
					return Promise.reject('E-mail นี้ถูกใช้งานแล้ว');
				}
			});
		})
];

module.exports = validator;
const { check } = require('express-validator');
const { User, Profile } = require('../../../models');

const validator = [
    check('username')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณาระบุชื่อผู้ใช้')
		.custom(username => {
			return User.findOne({ where: { username } }).then(user => {
				if (user) {
					return Promise.reject('ชื่อผู้ใช้นี้ถูกใช้งานแล้ว');
				}
			});
        }),
    check('password')
		.isLength({ min: 8, max: 8 })
		.withMessage('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
	check('confirmPassword')
		.custom((value, { req }) => value === req.body.password)
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
    check('country')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก ประเทศ'),
    check('city')
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
	check('email')
		.isEmail()
		.withMessage('กรุณากรอก อีเมล')
		.custom(email => {
			return Profile.findOne({ where: { email } }).then(profile => {
				if (profile) {
					return Promise.reject('E-mail นี้ถูกใช้งานแล้ว');
				}
			});
		})
];

module.exports = validator;
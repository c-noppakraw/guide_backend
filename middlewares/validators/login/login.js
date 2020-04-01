const { check } = require('express-validator');

const validator = [
	check('username')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณาระบุชื่อผู้ใช้'),
	check('password')
		.not()
		.isEmpty()
		.isLength({ min: 8, max: 8 })
		.withMessage('รหัสผ่านต้องมีความยาว 8 ตัวอักษร')
];

module.exports = validator;
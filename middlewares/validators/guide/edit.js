const { check } = require('express-validator');

const validator = [
    check('password')
		.isLength({ min: 8, max: 8 })
		.withMessage('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
	check('re_password')
		.custom((value, { req }) => value === req.body.password)
        .withMessage('รหัสผ่านไม่ตรงกัน')
];

module.exports = validator;
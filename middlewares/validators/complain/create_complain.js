const { check } = require('express-validator');

const validator = [
	check('date_start')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณากรอก วันเริ่มต้น'),
	check('date_end')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก วันสิ้นสุด')
];

module.exports = validator;
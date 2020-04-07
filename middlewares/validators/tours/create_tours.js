const { check } = require('express-validator');

const validator = [
    check('title')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณากรอก ชื่อทัวร์'),
    check('city')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก เมือง'),
    check('country')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก ประเทศ'),
    check('airlines')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก สายการบิน'),
    check('code_tour_group')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณากรอก รหัสทัวร์'),
	check('date_start')
		.not()
		.isEmpty()
		.trim()
		.withMessage('กรุณากรอก วันเดินทาง'),
	check('date_end')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก วันกลับจากเดินทาง'),
    check('num_people')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณากรอก จำนวนลูกทัวร์'),
];

module.exports = validator;
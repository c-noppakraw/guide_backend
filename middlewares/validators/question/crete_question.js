const { check } = require('express-validator');

const validator = [
    check('question')
		.not()
		.isEmpty()
		.trim()
        .withMessage('กรุณาระบุ คำถาม')
];

module.exports = validator;
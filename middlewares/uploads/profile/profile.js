const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'storages/profile_image');
	},
	filename: (req, file, cb) => {
		let filetype = '';
		if (file.mimetype === 'image/png') {
			filetype = 'png';
		}
		if (file.mimetype === 'image/jpeg') {
			filetype = 'jpg';
		}
		cb(null, Math.round(Math.random() * 1000000000000).toString() + Date.now() + '.' + filetype);
	}
});

module.exports = multer({ storage });

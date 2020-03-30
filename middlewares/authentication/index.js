const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
	const token = req.cookies.authToken;
	if (!token) {
		// return res.status(401).json({ errors: [{ msg: 'ไม่พบ cookies' }] });
		return res.redirect('/');
	}
	try {
		const decoded = await jwt.verify(token, `secret_key_here`);
		req.user = decoded;
		next();
	} catch (err) {
		// return res.status(401).json({ errors: [{ msg: 'cookies ไม่ถูกต้อง' }] });
		return res.redirect('/');
	}
};

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authentication');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const {
            _id,
            _level,
            _username,
            _firstname_th,
            _firstname_en,
            _lastname_th,
            _lastname_en,
            _img
        } = req.user;
        if (_level == 4) {
            // return res.redirect('/');
            return res.send('Ok');
        }
        return res.render('./home/home', { 
            title: 'Welcome To Manage Guide Go Inter',
            img_profile: _img,
            show_username: _username,
            firstname_th: _firstname_th,
            lastname_th: _lastname_th
        });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

module.exports = router;
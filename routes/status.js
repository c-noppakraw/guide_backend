const express = require('express');
const { Profile } = require('../models');
const router = express.Router();

router.get('/:id_user', async (req, res) => {
    const id = req.params.id_user
    const list_user = await Profile.findOne({
        attributes: ['code', 'first_name_th', 'last_name_th', 'first_name_en', 'last_name_en', 'createdAt'],
        where: { user_uuid: id }
    });
	return res.render('./wait_confirm/wait_confirm', { title: 'Check Status Confirm', data: list_user });
});

module.exports = router;
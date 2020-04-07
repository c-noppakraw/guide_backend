const express = require('express');
const router = express.Router();
const { Tourgroups, Complain } = require('../models');
const Op = require('sequelize').Op;
const { validationResult } = require('express-validator');
const create_tour = require('../middlewares/validators/tours/create_tours');
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
            const tours = await Tourgroups.findAll({
                where: { user_uuid: _id } 
            });
            return res.status(201).json({ data_tours: tours });
        }
        const tours = await Tourgroups.findAll({
            include: [{ model: Complain, as: 'Complain' }]
        });
        return res.status(201).json({ data_tours: tours });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
})

router.get('/create', authMiddleware, async (req, res) => {
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
        if (_level != 4) {
            return res.redirect('/');
        }
        return res.render('index', { title: 'Create Tours Page' });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

router.post('/create', create_tour, authMiddleware, async (req, res) => {
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
        if (_level != 4) {
            return res.redirect('/');
        }
        let {
            title,
            code_tour_group,
            country,
            city,
            airlines,
            num_people,
            date_start,
            date_end
        } = req.body;
        const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
            }
        const new_tour = await Tourgroups.create({
            title,
            code_tour_group,
            country,
            city,
            airlines,
            num_people,
            date_start,
            date_end,
            user_created: _username,
            user_update: _username,
            UserUuidUser: _id
        });
        return res.status(201).json({ data_tour: new_tour });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

module.exports = router;
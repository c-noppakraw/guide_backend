const express = require('express');
const router = express.Router();
const { Complain, questions, Tourgroups } = require('../models');
const Op = require('sequelize').Op;
const { validationResult } = require('express-validator');
const create_complain = require('../middlewares/validators/complain/create_complain');
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
        return res.render('index', { title: 'Complain Page' });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

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
        if (_level == 4) {
            return res.redirect('/');
        }
        return res.render('index', { title: 'Create Complain Page' });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

router.post('/create', authMiddleware, create_complain, async (req, res) => {
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
            return res.redirect('/');
        }
        let {
            date_start,
            date_end,
            tour_id
        } = req.body;
        const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
            }
        const new_complain = await Complain.create({
            visible: '1',
            date_start,
            date_end,
            user_created: _username,
            user_update: _username,
            UserUuidUser: _id,
            TourgroupUuidTour: tour_id
        });
        return res.status(201).json({ data_complain: new_complain });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

router.get('/:tour_id/:code_tour', async (req, res) => {
	try {
        const id = req.params.tour_id;
        status_complain = await Complain.findOne({ 
            attributes: ['visible', 'date_start', 'date_end'],
            where: { tour_uuid: id } 
        });
        if(status_complain){
            const status = status_complain.visible;
            const date_start = status_complain.date_start;
            const date_end = status_complain.date_end;
            const start = new Date(date_start).toISOString().replace(/T/, ' ').replace(/\..+/, '');
            const end = new Date(date_end).toISOString().replace(/T/, ' ').replace(/\..+/, '');
            const date_ob = new Date();
            const date_now = new Date(date_ob).toISOString().replace(/T/, ' ').replace(/\..+/, '') 
            if(start <= date_now && end >= date_now){
                const list_questions = await questions.findAll({
                    attributes: ['uuid_questions', 'question'],
                    where: { visible: '1' }
                });
                const list_tourgroups = await Tourgroups.findOne({
                    attributes: ['uuid_tour', 'title', 'code_tour_group'],
                    where: { uuid_tour: id }
                });
                return res.status(201).json({ data_questions: list_questions, data_tourgroups: list_tourgroups });
            } else {
                return res.render('index', { title: 'link has expired.' });
            }
        } else {
            return res.render('index', { title: '404 Not found' });
        }
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

module.exports = router;
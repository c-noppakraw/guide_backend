const express = require('express');
const router = express.Router();
const { questions } = require('../models');
const Op = require('sequelize').Op;
const authMiddleware = require('../middlewares/authentication');
const { validationResult } = require('express-validator');
const crete_question = require('../middlewares/validators/question/crete_question');

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
            return res.redirect('/');
        }
        const new_questions = await questions.findAll();
        return res.status(201).json({ data_questions: new_questions });
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
        return res.render('index', { title: 'Create Question Page' });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

router.post('/create', authMiddleware, crete_question, async (req, res) => {
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
        let { question } = req.body;
        const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
            }
        const new_question = await questions.create({
            question,
            user_created: _username,
            user_update: _username,
            UserUuidUser: _id
        });
        return res.status(201).json({ data_question: new_question });
    } catch (err) {
        console.log(err);
		return res.status(500).json(err);
    }
});

module.exports = router;
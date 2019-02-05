const Student = require('../models/StudentModel');
const HttpStatus = require('http-status-codes');
const Helpers = require('../Helpers/helper');
const bcrypt = require('bcryptjs');
const joi = require('joi');

module.exports = {
    async CreateStudent(req, res) {
        console.log(req.body);
        const schema = joi.object().keys({
            fullname: joi.string().min(5).max(20).required(),
            enrollment: joi.string().min(1).max(20).required(),
            class: joi.string().required(),
            phone: joi.number().positive().integer().required(),
            address: joi.string().min(5).max(30).required()
        });

        const { error, value } = joi.validate(req.body, schema);

        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        const enrollment = await Student.findOne({ enrollment: req.body.enrollment });
        if (enrollment) {
            return res.status(HttpStatus.CONFLICT).json({ message: 'Enrollment already exist.' })
        }

        // if no error than hash the password
        return bcrypt.hash('123456', 10, (error, hash) => {
            if (error) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error hashing password' });
            }
            const body = {
                fullname: Helpers.firstUpper(req.body.fullname),
                enrollment: Helpers.lowerCase(req.body.enrollment),
                class: req.body.class,
                phone: req.body.phone,
                address: req.body.address,
                password: hash
            };

            Student.create(body).then(user => {
                res.status(HttpStatus.CREATED).json({ message: 'Student created successfully.', user });
            }).catch(err => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured (creating student)' })
            });
        });
    },




    LoginUser(req, res) {
        console.log(req.body);
        res.send('login')
    }
}
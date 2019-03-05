const Httpstatus = require('http-status-codes');
const Admin = require('../models/AdminModel');
const Helpers = require('../Helpers/helper');
const bcrypt = require('bcryptjs');
const dbConfig = require('../dbConfig/config');
const joi = require('joi');
const jwt = require('jsonwebtoken');

module.exports = {
    // Create Admin
    CreateAdmin(req, res) {
        console.log(req.body);
        const schema = joi.object().keys({
            fullname: joi.string().min(5).max(25).required(),
            username: joi.string().min(4).max(20).required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).required(),
            address: joi.string().min(5).max(25),
            phone: joi.string().min(10).max(10).required()
        });

        const { error, value } = joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(Httpstatus.BAD_REQUEST).json({ message: error.details })
        }

        // // check username if already exist
        const Username = Admin.findOne({ username: Helpers.firstUpper(req.body.username) });
        if (Username) {
            return res.status(Httpstatus.CONFLICT).json({ message: 'Username Already Exist.' })
        }

        // check if phone no. already exist
        const Phone = Admin.findOne({ phone: req.body.phone });
        if (Phone) {
            return res.status(Httpstatus.CONFLICT).json({ message: 'Phone no. already exist.' });
        }

        // check if email already exist;
        const Email = Admin.findOne({ email: req.body.email });
        if (Email) {
            return res.status(Httpstatus.CONFLICT).json({ message: 'Email already exist' });
        }

        return bcrypt.hash(req.body.password, 10, (error, hash) => {
            if (error) {
                return res.status(Httpstatus.BAD_REQUEST).json({ message: 'Error hashing password' });
            }

            // if password hashed successfully..
            console.log(hash);
            const body = {
                fullname: req.body.fullname,
                username: Helpers.firstUpper(req.body.username),
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                address: req.body.address
            }

            Admin.create(body).then(admin => {
                return res.status(Httpstatus.OK).json({ message: 'Admin Created Successfully...' });
            }).catch(err => {
                return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Error saving data' })
            });
        });
    },

    // Login Admin
    async AdminLogin(req, res) {
        console.log(res.body);
        const schema = joi.object().keys({
            username: joi.string().min(4).max(25).required(),
            password: joi.string().min(6).max(20).required()
        });
        const { error, value } = joi.validate(req.body, schema);
        if (error && error.details) {
            return res.status(Httpstatus.BAD_REQUEST).json({ msg: error.details })
        }

        await Admin.findOne({ username: Helpers.firstUpper(req.body.username) }).then(user => {
            if (!user) {
                return res.status(Httpstatus.NOT_FOUND).json({ message: 'Invalid Username' })
            }

            return bcrypt.compare(req.body.password, user.password).then(result => {
                if (!result) {
                    return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Incorrect password' });
                }

                const token = jwt.sign({ data: user }, dbConfig.secret, {
                    expiresIn: '10000'
                });
                res.cookie('auth', token);
                return res.status(Httpstatus.OK).json({ message: 'Login Successful', user, token });
            });
        })
            .catch(err => {
                return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured' })
            });
    }
}
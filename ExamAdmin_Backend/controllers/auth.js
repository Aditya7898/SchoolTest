const Student = require('../models/StudentModel');
const HttpStatus = require('http-status-codes');
const Helpers = require('../Helpers/helper');
const bcrypt = require('bcryptjs');
const joi = require('joi');

module.exports = {
    LoginUser(req, res) {
        console.log(req.body);
    }
}
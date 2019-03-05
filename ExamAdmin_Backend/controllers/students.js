const Student = require('../models/StudentModel');
const HttpStatus = require('http-status-codes');
const Batch = require('../models/BatchModel');
const Helpers = require('../Helpers/helper');
const bcrypt = require('bcryptjs');
const joi = require('joi');

const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer');

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    }
});
var upload = multer({ storage: store }).single('file');

module.exports = {
    // Create Sudent
    async CreateStudent(req, res) {
        console.log(req.body);
        const schema = joi.object().keys({
            fullname: joi.string().min(5).max(20).required(),
            enrollment: joi.string().min(1).max(20).required(),
            class: joi.string().required(),
            phone: joi.number().positive().integer().required(),
            address: joi.string().min(5).max(30).required(),
            batch: joi.object().required()
        });

        const { error, value } = joi.validate(req.body, schema);

        if (error && error.details) {
            console.log(error.details);
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
            // if (req.body.batch) {
            const body = {
                fullname: Helpers.firstUpper(req.body.fullname),
                enrollment: Helpers.lowerCase(req.body.enrollment),
                class: req.body.class,
                phone: req.body.phone,
                address: req.body.address,
                password: hash,
                batchName: req.body.batch.name ? req.body.batch.name : '',
                batchId: req.body.batch.batchId ? req.body.batch.batchId : ''
            };

            Student.create(body).then(student => {
                console.log(student);
                if (student) {
                    Batch.findOneAndUpdate(
                        {
                            batchId: req.body.batch.batchId
                        },
                        {
                            $push: {
                                students: { studentId: student._id }
                            }
                        }).then(result => {
                            console.log("result", result);
                            return res.status(HttpStatus.CREATED).json({ message: 'Student created successfully.', student });
                        }).catch(err => {
                            console.log("error", err);
                        });
                }
            })
                .catch(err => {
                    console.log(err);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error Occured (creating student)' })
                });
        });
    },

    // Get All Students
    GetAllStudents(req, res) {
        Student.find({}).then(students => {
            return res.status(HttpStatus.OK).json({ message: 'List of All students', students })
        }).catch(err => {
            return res.status(HttpStatus.err).json({ message: err })
        });
    },

    // Get Students By class 
    GetStudentByClass(req, res) {
        // console.log(req.params.SearchClass);
        Student.find({ class: req.params.SearchClass }).then(students => {
            return res.status(HttpStatus.OK).json({ message: 'students by class', students });
        }).catch(err => {
            return res.status(HttpStatus.err).json({ message: err })
        });
    },

    // Get Student By Enrollment
    GetStudentByEnrollment(req, res) {
        console.log(req.params.enrollment);
        Student.findOne({ enrollment: Helpers.lowerCase(req.params.enrollment) }).then(student => {
            return res.status(HttpStatus.OK).json({ message: 'Student found ', student });
        }).catch(err => {
            return res.status(HttpStatus.err.json({ message: err }));
        });
    },

    // Upload Bulk Students
    UploadBulkStudents(req, res) {
        upload(req, res, function (err) {
            console.log('req', req.body);
            if (err) {
                return res.status(501).json({ error: err });
            }

            console.log('Not error');

            csv.fromPath(req.file.path, { headers: true })
                .on("data", function (data) {

                    // remove spaces from property value in case it does have
                    for (var key in data) {
                        data[key] = data[key].trim();
                    }

                    var newStudent = new Student({
                        fullname: Helpers.firstUpper(data['fullname']),
                        enrollment: data['enrollment'],
                        phone: data['phone'],
                        class: data['class'],
                        address: data['address']
                    });

                    Student.findOne({ enrollment: newStudent.enrollment }).then(result => {
                        if (!result) {
                            newStudent.save().then(resp => {
                                console.log('Data saving resp:' + resp);
                            }).catch(err => {
                                console.log('error in saving data' + err);
                            });
                        }
                    });
                })
                .on("error", function (error) {
                    console.log("There is an error in processing: " + error);
                })
                .on("end", function () {
                    fs.unlinkSync(req.file.path);
                    console.log("done");
                });
            // -----------------------
            return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
        });
        console.log('4th');
    }
}
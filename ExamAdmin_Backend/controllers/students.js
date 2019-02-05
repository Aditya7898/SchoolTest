const Student = require('../models/StudentModel');
const httpstatus = require('http-status-codes');
module.exports = {

    // Get All Students
    GetAllStudents(req, res) {
        Student.find({}).then(students => {
            return res.status(httpstatus.OK).json({ message: 'List of All students', students })
        }).catch(err => {
            return res.status(httpstatus.err).json({ message: err })
        });
    },

    // Get Students By class 
    GetStudentByClass(req, res) {
        // console.log(req.params.SearchClass);
        Student.find({ class: req.params.SearchClass }).then(students => {
            return res.status(httpstatus.OK).json({ message: 'students by class', students });
        }).catch(err => {
            return res.status(httpstatus.err).json({ message: err })
        });
    }
}
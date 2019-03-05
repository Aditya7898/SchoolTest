const StudentCtrl = require('../controllers/students');
const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModel');
const Helpers = require('../Helpers/helper');


router.post('/register', StudentCtrl.CreateStudent);
router.get('/students', StudentCtrl.GetAllStudents);
router.get('/students/:SearchClass', StudentCtrl.GetStudentByClass);
router.get('/student/:enrollment', StudentCtrl.GetStudentByEnrollment);
router.post('/students/upload', StudentCtrl.UploadBulkStudents);
module.exports = router;

const StudentCtrl = require('../controllers/students');
const express = require('express');
const router = express.Router();

router.get('/students', StudentCtrl.GetAllStudents);
router.get('/students/:SearchClass', StudentCtrl.GetStudentByClass);

module.exports = router;

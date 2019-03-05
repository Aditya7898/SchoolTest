const express = require('express');
const router = express.Router();
const AdminCtrl = require('../controllers/admin');

router.post('/admin/register', AdminCtrl.CreateAdmin);
router.post('/admin/login', AdminCtrl.AdminLogin);
module.exports = router;
const express = require('express');
const router = express.Router();
const TestCtrl = require('../controllers/test');

router.post('/create/test', TestCtrl.CreateTest);

module.exports = router;
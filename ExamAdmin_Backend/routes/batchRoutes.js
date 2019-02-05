const express = require('express');
const router = express.Router();
const httpstatus = require('http-status-codes');
const BatchCtrl = require('../controllers/batch');

router.post('/createbatch', BatchCtrl.CreateBatch);

module.exports = router;
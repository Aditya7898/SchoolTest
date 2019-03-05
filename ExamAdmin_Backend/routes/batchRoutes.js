const express = require('express');
const router = express.Router();
const BatchCtrl = require('../controllers/batch');

router.post('/assignbatch', BatchCtrl.AssignBatch);
router.post('/createbatch', BatchCtrl.CreateNewBatch);
router.get('/getallbatches', BatchCtrl.GetAllBatches);
router.get('/getValidBatches', BatchCtrl.GetValidBatches)
router.get('/getstudentsbybatch/:batchId', BatchCtrl.GetStudentsByBatch);
router.delete('/deletebatch/:batchId', BatchCtrl.DeleteBatch);

router.post('/assignbatchtest', BatchCtrl.AssignBatchTest);
module.exports = router;
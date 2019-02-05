const httpstatus = require('http-status-codes');
const Batch = require('../models/BatchModel');
const Student = require('../models/StudentModel');
const _ = require('lodash');

module.exports = {
    async CreateBatch(req, res) {
        const batch = await Batch.findOne({ name: req.body.batchName });
        if (batch) {
            // console.log("batch " + batch);
            return res.status(httpstatus.CONFLICT).json({ message: 'Batch name already exist' })
        }

        const body = {
            name: req.body.batchName,
        }

        await Batch.create(body).then(response => {
            _.forEach(req.body.students, function (student) {
                Batch.findOneAndUpdate(
                    {
                        name: req.body.batchName
                    },
                    {
                        $push: {
                            students: {
                                studentId: student._id,
                                studentName: student.fullname,
                                enrollment: student.enrollment,
                                class: student.class,
                                phone: student.phone
                            }
                        },
                        $inc: { countStudent: 1 }
                    }

                ).then(resp => {
                    Student.findOneAndUpdate({ enrollment: student.enrollment }, { batch: req.body.batchName })
                        .then(result => {
                            console.log("result 1", result);
                        }).catch(err => {
                            console.log("catch error 2", err);
                            return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong.' })
                        });

                }).catch(err => {
                    console.log('cath error 3- ', err)
                    return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Error in adding student to batch ' })
                });
            });
            return res.status(httpstatus.OK).json({ message: 'Batch Created' })
        }).catch(err => console.log('Create Error ->>>', err))
    }
}
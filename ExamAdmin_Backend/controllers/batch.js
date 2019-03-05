const Httpstatus = require('http-status-codes');
const Batch = require('../models/BatchModel');
var mongoose = require('mongoose');
const Student = require('../models/StudentModel');
const Helpers = require('../Helpers/helper');
const _ = require('lodash');
const moment = require('moment');

module.exports = {

    // Creating new batch
    async CreateNewBatch(req, res) {
        console.log(req.body);
        const batch = await Batch.findOne({ batchName: Helpers.firstUpper(req.body.batchName) });
        if (batch) {
            return res.status(Httpstatus.CONFLICT).json({ message: 'Batch name already exist' })
        }

        const body = {
            batchName: Helpers.firstUpper(req.body.batchName),
            batchId: Helpers.firstUpper(req.body.batchName) + moment(Date.now()).format("DDMMYYYY"),
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            allotedTo: req.body.allotedTo
        }
        console.log(body);

        await Batch.create(body).then(result => {
            return res.status(Httpstatus.OK).json({ message: 'Batch Created', result });
        }).catch(err => {
            return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Error in batch creating.', err });
        });
    },


    // Assign Batch to students
    async AssignBatch(req, res) {
        const thisBatch = await Batch.findOne({ batchId: req.body.batch.batchId });
        if (thisBatch) {
            const newStudents = [];
            _.forEach(req.body.students, (student) => {
                newStudents.push(mongoose.Types.ObjectId(student._id));
            });
            _.forEach(newStudents, (studentId) => {
                Batch.findOneAndUpdate(
                    {
                        batchId: req.body.batch.batchId
                    },
                    {
                        $push: {
                            students: {
                                "studentId": studentId
                            }
                        }
                    }
                ).then(result => {
                    Student.findOneAndUpdate(
                        {
                            _id: mongoose.Types.ObjectId(studentId)
                        },
                        {
                            $set: {
                                batchName: req.body.batch.batchName,
                                batchId: req.body.batch.batchId
                            }
                        })
                        .then(result => {
                        }).catch(err => {
                            return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong.' })
                        });

                }).catch(err => {
                    return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: err });
                });
            });
            return res.status(Httpstatus.OK).json({ message: 'Batch Assigned..' });
        }
    },

    // Delete Batch if not contains any student
    async DeleteBatch(req, res) {
        console.log(req.params.batchId);
        await Batch.findOne({ batchId: req.params.batchId }).then(batch => {
            // console.log(batch);
            if (batch.students.length > 0) {
                return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Please delete all the students of batch before deleting batch.' })
            }
            Batch.deleteOne({ batchId: batch.batchId }).then(result => {
                console.log(result);
                return res.status(Httpstatus.OK).json({ message: 'Batch Delete Successfully..' });
            }).catch(err => {
                return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: err });
            });
        }).catch(err => {
            return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: err });
        });
    },

    // Get All Batches
    GetAllBatches(req, res) {
        Batch.find({}).then(batches => {
            return res.status(Httpstatus.OK).json({ message: 'All the batches are: ', batches });
        }).catch(err => {
            return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: err });
        });
    },

    // Get Batches that r running or that are yet to start
    GetValidBatches(req, res) {

        Batch.find({}).then(batches => {
            const ValidBatches = _.filter(batches, function (batch) {
                if (batch.endDate > Date.now()) {
                    // console.log(batch.endDate + "**" + Date.now())
                    return batch;
                }
            });
            console.log("Valid Batches =========================== ", ValidBatches);
            return res.status(Httpstatus.OK).json({ message: 'Valid batches...', ValidBatches });
        }).catch(err => {
            console.log(err);
            return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: "There is an error", err });
        })
    },


    // Get Students by batch
    async GetStudentsByBatch(req, res) {
        const AllStudentsOfBatch = [];
        await Batch.findOne({ batchId: req.params.batchId }).then(batch => {
            batch.students.forEach(student => {
                Student.findById({ _id: mongoose.Types.ObjectId(student.studentId) }).then(studentResp => {
                    AllStudentsOfBatch.push(studentResp);
                    console.log("========================", AllStudentsOfBatch);
                }).catch(err => console.log(err));
            });
            return res.status(Httpstatus.OK).json({ message: `Students of ${req.params.batchId} batch are: `, AllStudentsOfBatch });

        }).catch(err => {
            console.log(err);
            return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: err })
        });
    },




    // Assign Batch TEST
    async AssignBatchTest(req, res) {
        console.log(req.body);
    }

}




















// 
// async AssignBatch(req, res) {
//     const thisBatch = await Batch.findOne({ batchId: req.body.batch.batchId });
//     if (thisBatch) {
//         console.log("First pass");
//         const newStudents = [];

//         _.forEach(req.body.students, (student) => {
//             newStudents.push(mongoose.Types.ObjectId(student._id));
//         });
//         console.log("Second Pass", newStudents);
//         Batch.findOneAndUpdate(
//             {
//                 batchId: req.body.batch.batchId
//             },
//             {
//                 $addToSet: {
//                     students: {
//                         "studentId": newStudents
//                     }
//                 }
//             }
//         ).then(result => {
//             console.log("third ", result);
//             _.forEach(req.body.students, (student) => {
//                 Student.findOneAndUpdate(
//                     {
//                         _id: mongoose.Types.ObjectId(student._id)
//                     },
//                     {
//                         $set: {
//                             batchName: req.body.batch.batchName,
//                             batchId: req.body.batch.batchId
//                         }
//                     })
//                     .then(result => {
//                         console.log("result 1", result);
//                     }).catch(err => {
//                         console.log("catch error 2", err);
//                         return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong.' })
//                     });
//             });

//             return res.status(Httpstatus.OK).json({ message: 'Batch Assigned..' });
//         }).catch(err => {
//             console.log(err);
//             return res.status(Httpstatus.INTERNAL_SERVER_ERROR).json({ message: err });
//         })
//     }
// },
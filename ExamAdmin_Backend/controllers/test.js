const httpstatus = require('http-status-codes');
const Test = require('../models/TestModel');
const Helpers = require('../Helpers/helper');
const moment = require('moment');
const _ = require('lodash');

module.exports = {
    async CreateTest(req, res) {
        console.log(req.body);

        const test = new Test();
        test.testName = Helpers.firstUpper(req.body.data.testName),
            test.testId = Helpers.firstUpper(req.body.data.testName) + moment(Date.now()).format("DDMMYYYY"),
            test.totalMarks = req.body.data.totalMarks,
            test.passingMarks = req.body.data.passingMarks,
            test.testDescription = req.body.data.testDescription,
            test.startDate = req.body.data.startDate,
            test.endDate = req.body.data.endDate,
            test.testDuration = req.body.data.testDuration,
            _.forEach(req.body.questions, (q_id) => {
                test.questions.push(q_id);
            });

        await test.save().then((result) => {
            console.log(result);
            return res.status(httpstatus.OK).json({ message: 'Test created successfully..' })
        }).catch(err => {
            console.log(err);
            return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({ message: err });
        });
    }
}
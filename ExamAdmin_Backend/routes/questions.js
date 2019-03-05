const express = require('express');
const router = express.Router();
const fs = require('fs');
const csv = require('fast-csv');
const multer = require('multer');
const Helpers = require('../Helpers/helper');
const httpstatus = require('http-status-codes');
const Question = require('../models/QuestionsModel');

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.originalname);
    }
});

var upload = multer({ storage: store }).single('file');


//---------------- UPLOAD QUESTIONS --------------
router.post('/upload', function (req, res, next) {
    console.log('first');
    upload(req, res, function (err) {
        console.log("req", req.body);
        if (err) {
            return res.status(501).json({ error: err });
        }
        console.log('3rd');
        console.log(req.file.originalname, req.file.uploadname)
        //do all database record saving activity-----
        csv.fromPath(req.file.path, { headers: true })
            .on("data", function (data) {
                //Removes spaces from property value in-case it does have
                for (var key in data) {
                    data[key] = data[key].trim();
                }

                var newQuestion = new Question({
                    question: data['question'],
                    option1: data['option1'],
                    option2: data['option2'],
                    option3: data['option3'],
                    option4: data['option4'],
                    correctAns: data['correctAns'],
                    category: Helpers.firstUpper(data['category']),
                    weightage: data['weightage']
                });

                newQuestion.save().then(resp => {
                    console.log('data saving resp: ' + resp);
                }).catch(err => {
                    console.log('error in saving data to db' + err);
                })
            })
            .on("error", function (error) {
                console.log("There is an error in processing: " + error);
            })
            .on("end", function () {
                fs.unlinkSync(req.file.path);
                console.log("done");
            });


        // -------------------------------------------
        return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });
    });
    console.log('4th');
});

// --------------------- FETCH QUESTIONS ----------------
router.get('/fetch/questions/:category', (req, res) => {
    console.log(req.params.category);

    Question.find({ category: req.params.category }).then(result => {
        return res.status(httpstatus.OK).json({ message: 'All Questions', result });
    }).catch(err => {
        return res.status(httpstatus.error).json({ message: 'something went wrong', err });
    })
})
module.exports = router;
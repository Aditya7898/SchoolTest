const mongoose = require('mongoose');
const Admin = require('./AdminModel');
const Question = require('./QuestionsModel');

const TestSchema = mongoose.Schema({
    testName: { type: String },
    testId: { type: String },
    totalMarks: { type: Number },
    passingMarks: { type: Number },
    testDescription: { type: String },
    testDuration: { type: Number, default: 90 },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date, default: new Date(+new Date() + 1 * 24 * 60 * 60 * 1000) },
    questions: [
        {
            question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }
        }
    ],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

module.exports = mongoose.model('Test', TestSchema);
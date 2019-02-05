const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    question: { type: String },
    option1: { type: String },
    option2: { type: String },
    option3: { type: String },
    option4: { type: String },
    correctAns: { type: String },
    category: { type: String },
    weightage: { type: Number }
});

module.exports = mongoose.model('Question', QuestionSchema);
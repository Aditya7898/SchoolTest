const mongoose = require('mongoose');

const BatchSchema = mongoose.Schema({
    batchName: { type: String },
    batchId: { type: String },
    allotedTo: { type: String },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date, default: new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    countStudent: { type: Number, default: 0 },
    students: [
        {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
        }
    ]
});

module.exports = mongoose.model('Batch', BatchSchema);
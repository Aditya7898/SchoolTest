const mongoose = require('mongoose');

const BatchSchema = mongoose.Schema({
    name: { type: String },
    students: [
        {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
            studentName: { type: String },
            enrollment: { type: String },
            class: { type: String },
            phone: { type: Number }
        }
    ],
    countStudent: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

module.exports = mongoose.model('Batch', BatchSchema);
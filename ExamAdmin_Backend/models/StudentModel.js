const mongoose = require('mongoose');

// create Schema
const StudentSchema = mongoose.Schema({
    fullname: { type: String },
    enrollment: { type: String },
    phone: { type: Number },
    batchName: { type: String, default: '' },
    batchId: { type: String, default: '' },
    class: { type: String },
    address: { type: String },
    password: { type: String },
    dateCreated: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

module.exports = mongoose.model('Student', StudentSchema);
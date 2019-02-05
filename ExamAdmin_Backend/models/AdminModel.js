const mongoose = require('mongoose');

// create Schema
const AdminSchema = mongoose.Schema({
    fullname: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    role: { type: String, default: 'admin' }
});

module.exports = mongoose.model('Admin', AdminSchema);
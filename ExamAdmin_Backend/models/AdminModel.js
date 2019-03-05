const mongoose = require('mongoose');

// create Schema
const AdminSchema = mongoose.Schema({
    fullname: { type: String },
    username: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    password: { type: String },
    role: { type: String, default: 'Admin' }
});

module.exports = mongoose.model('Admin', AdminSchema);
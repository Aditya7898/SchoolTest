const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./dbConfig/config');
const cookieParser = require('cookie-parser');

const Port = '3000';

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.use(cors());
app.use(cookieParser());
// req body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// db connection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, { useNewUrlParser: true });

// routes
const auth = require('./routes/authRoutes');
const student = require('./routes/students');
const batch = require('./routes/batchRoutes');
const admin = require('./routes/adminRoutes');
const question = require('./routes/questions');
const test = require('./routes/testRoute');

// app.use('/api/onlinetest', auth);
app.use('/api/onlinetest', student);
app.use('/api/onlinetest', batch);
app.use('/api/onlinetest', question);
app.use('/api/onlinetest', test);
app.use('/api/onlinetest', admin);

app.listen(Port, () => {
    console.log('server is running on port 3000')
});

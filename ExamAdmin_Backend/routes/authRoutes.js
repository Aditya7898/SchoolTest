const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/auth');

router.get('/test', (req, res) => {
    res.json({ msg: 'route works' });
});

router.post('/register', AuthCtrl.CreateStudent);
router.post('/login', AuthCtrl.LoginUser);

module.exports = router;
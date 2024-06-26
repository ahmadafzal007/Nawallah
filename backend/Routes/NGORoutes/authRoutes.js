const express = require('express');
const admin  = require('firebase-admin');
const db = require('../../Db/firebaseAdmin');
const router = express.Router();
const {registerNgo,verifyNgo} = require('../../Controllers/authController');




router.post('/register', registerNgo);
router.post('/login',verifyNgo );


module.exports = router;
const express = require('express');
const admin  = require('firebase-admin');
const db = require('../../Db/firebaseAdmin');
const router = express.Router();
const authRoues = require('./authRoutes');


router.use('/auth', authRoues);

// Define a restaurant objec


module.exports = router;
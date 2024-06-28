const express = require('express');
const admin  = require('firebase-admin');
const db = require('../../Db/firebaseAdmin');
const router = express.Router();
const authRoutes = require('./authRoutes')

// Define a restaurant objec

router.use('/auth', authRoutes);

module.exports = router;
const restaurantRoutes = require('./RestaurantRoutes');
const ngoRoutes = require('./NGORoutes');
const express = require('express');
const admin = require('firebase-admin');
const adminRoutes = require('./AdminRoutes')
const db = require('../Db/firebaseAdmin');
const router = express.Router();


router.use('/restaurant', restaurantRoutes);
router.use('/ngo', ngoRoutes);
router.use('/admin',adminRoutes)

module.exports = router;




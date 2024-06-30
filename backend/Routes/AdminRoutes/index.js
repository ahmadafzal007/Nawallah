const express = require('express');

const router = express.Router();

const {getTotalDonations, getTotalOrders, sendMail} = require('../../Controllers/adminController');
const authRoutes = require('./authRoutes');

router.use('/auth', authRoutes);
router.get('/getTotalDonations', getTotalDonations);
router.get('/getTotalOrders', getTotalOrders);
router.post('/sendMail',sendMail);



module.exports = router;
const express = require('express');
const admin  = require('firebase-admin');
const db = require('../../Db/firebaseAdmin');
const router = express.Router();
const authRoutes = require('./authRoutes')
const ngoRoutes = require('./ngoRoutes')
const {AcceptDonation,
     getAcceptedDonations,
    getAllDonations

} = require('../../Controllers/NgoController');

// Define a restaurant objec

router.use('/auth', authRoutes);

router.post('/acceptDonation', AcceptDonation);
router.get('/getAcceptedDonations', getAcceptedDonations);
router.get('/getAllDonations', getAllDonations);


module.exports = router;
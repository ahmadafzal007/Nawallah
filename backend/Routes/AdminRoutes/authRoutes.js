const express = require('express');
const admin  = require('firebase-admin');
const db = require('../../Db/firebaseAdmin');
const router = express.Router();
const {registerRestaurant,loginRestaurant} = require('../../Controllers/authController');




router.post('/register', registerRestaurant);
router.post('/login', loginRestaurant);

// authorize restaurant
// router.post('/authorize',authorizeRestaurant)


module.exports = router;
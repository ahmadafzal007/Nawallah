const db = require('../Db/firebaseAdmin'); // Import Firestore instance
const admin = require('firebase-admin');

const ngoService = {
    createNgo : async (ngo) => {
        try {
            const result = await admin.firestore().collection('ngos_pending').add(ngo);
            return result;
        } catch (error) {
            return error;
        }
    },
    
    verifyToken: async (idToken) => {
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            throw new Error('Error verifying token: ' + error.message);
        }
    },

    emailExists: async (email) => {
        console.log('Checking email: ' + email);
        try {
          // Check in restaurantAdmins collection
          const ngoSnapshotAdmins = await db.collection('ngos').where('email', '==', email).get();
          console.log('Email exists in ngos: ', ngoSnapshotAdmins.size > 0);
          if (ngoSnapshotAdmins.size > 0) {
            return true;
          }
    
          // Check in restaurants_pending collection
          const ngoSnapshotPending = await db.collection('ngos_pending').where('email', '==', email).get();
          console.log('Email exists in ngos_pending: ', ngoSnapshotPending.size > 0);
          return ngoSnapshotPending.size > 0;
        } catch (error) {
          console.log('Error checking email: ' + error);
          throw new Error('Error checking email: ' + error.message);
        }
      }
    
}

module.exports = ngoService;
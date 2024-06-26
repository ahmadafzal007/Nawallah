const admin = require('../Db/firebaseAdmin');

const ngoService = {
    createNgo : async (ngo) => {
        try {
            const result = await admin.firestore().collection('ngos').add(ngo);
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
        try {
            const ngoSnapshot = await admin.firestore().collection('ngos').where('email', '==', email).get();
            return !ngoSnapshot.empty;
        } catch (error) {
            throw new Error('Error checking email: ' + error.message);
        }
    }
    
}

module.exports = ngoService;
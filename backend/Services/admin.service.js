const admin = require('../Db/firebaseAdmin');

const adminService = {
    authorizeRestaurant: async (restaurantId) => {
        try {
            // Get the restaurant from the pending collection
            const restaurantRef = admin.firestore().collection('restaurants_pending').doc(restaurantId);
            const restaurantDoc = await restaurantRef.get();
            if (!restaurantDoc.exists) {
                throw new Error('Restaurant not found in pending collection');
            }
            const restaurantData = restaurantDoc.data();

            // Add to the authorized restaurants collection
            const result = await admin.firestore().collection('restaurants').add({
                ...restaurantData,
                authorized: true
            });

            // Delete from the pending collection
            await restaurantRef.delete();

            return { restaurantId, authorized: true, newId: result.id };
        } catch (error) {
            throw new Error('Error authorizing restaurant: ' + error.message);
        }
    },

    authorizeNgo: async (ngoId) => {
        try {
            // Similar logic for NGOs if needed
        } catch (error) {
            throw new Error('Error authorizing NGO: ' + error.message);
        }
    }
}

module.exports = adminService;

const db = require('../Db/firebaseAdmin'); // Import Firestore instance
const admin = require('firebase-admin');

const RestaurantService = {
  createRestaurant: async (restaurant) => {
    try {
      // Convert location string to GeoPoint
      const [latitude, longitude] = restaurant.location.split(', ').map(coord => parseFloat(coord));
      restaurant.location = new admin.firestore.GeoPoint(latitude, longitude);

      // Add the restaurant to the 'restaurants_pending' collection using db
      const result = await db.collection('restaurants_pending').add(restaurant);
      console.log("Restaurant created:", result.id);
      return result.id;
    } catch (error) {
      throw new Error('Error creating restaurant: ' + error.message);
    }
  },

  emailExists: async (email) => {
    console.log('Checking email: ' + email);
    try {
      // Check in restaurantAdmins collection
      const restaurantSnapshotAdmins = await db.collection('restaurantAdmins').where('email', '==', email).get();
      console.log('Email exists in restaurantAdmins: ', restaurantSnapshotAdmins.size > 0);
      if (restaurantSnapshotAdmins.size > 0) {
        return true;
      }

      // Check in restaurants_pending collection
      const restaurantSnapshotPending = await db.collection('restaurants_pending').where('email', '==', email).get();
      console.log('Email exists in restaurants_pending: ', restaurantSnapshotPending.size > 0);
      return restaurantSnapshotPending.size > 0;
    } catch (error) {
      console.log('Error checking email: ' + error);
      throw new Error('Error checking email: ' + error.message);
    }
  }
}

module.exports = RestaurantService;

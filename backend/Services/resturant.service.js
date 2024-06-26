const admin = require('../Db/firebaseAdmin')

const RestaurantService = {
    async  addRestaurant(restaurant) {
        try {
          const restaurantRef = admin.firestore().collection('restaurantAdmins').doc();
          await restaurantRef.set(restaurant);
          return restaurantRef.id;
        } catch (error) {
          throw new Error('Error adding restaurant: ' + error.message);
        }
      }

      ,
      async emailExists(email) {
        try {
          const restaurantSnapshot = await admin.firestore().collection('restaurantAdmins').where('email', '==', email).get();
          return !restaurantSnapshot.empty;
        } catch (error) {
          throw new Error('Error checking email: ' + error.message);
        }
      }
      
};

module.exports = RestaurantService;
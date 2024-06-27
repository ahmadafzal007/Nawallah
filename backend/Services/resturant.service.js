const admin = require('../Db/firebaseAdmin')

const RestaurantService = {
  createRestaurant: async (restaurant) => {
    try {
        const result = await admin.firestore().collection('restaurants_pending').add(restaurant);
        return result;
    } catch (error) {
        throw new Error('Error creating restaurant: ' + error.message);
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
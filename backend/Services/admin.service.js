const db = require('../Db/firebaseAdmin'); // Import Firestore instance
const admin = require('firebase-admin');

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
    },

    getTotalDonations: async() => {
        let TotalDonations = 0;
        try {
          // Query Firestore to check if the email exists in the 'ngos' collection
          const ngoSnapshot = await db.collection('ngos').get();
    
          if (ngoSnapshot.empty) {
            console.log('No matching NGO found for email:', email);
            throw new Error('No matching NGO found.');
          }
          console.log("NGO found ", ngoSnapshot.size)
          for (let i = 0 ; i <  ngoSnapshot.size ; i++) {
            const id = ngoSnapshot.docs[i].id;
            const ngoDocRef = db.collection('ngos').doc(id);
            const acceptedDonationsSnapshot = await ngoDocRef.collection('acceptedDonations').get();
            // console.log("NGO donations ", acceptedDonationsSnapshot.size)
            TotalDonations += acceptedDonationsSnapshot.size;

          }

            return { success: true, message: 'Total Donations fetched successfully.',TotalDonations:TotalDonations };

        } catch (error) {
            console.log(error)
                return { success: false, message: 'Error verifying NGO: ' };
            }


      },

    getTotalOrders: async()=>{
        // get total orders from restaurantAdmins collection in which there is a subcollecton of orders
        let TotalOrders = 0;
        let TotalPrice = 0;
        let Orders = [];
        try {
          // Query Firestore to check if the email exists in the 'ngos' collection
          const restaurantSnapshot = await db.collection('restaurantAdmins').get();
    
          if (restaurantSnapshot.empty) {
            console.log('No matching Restaurant found for email:');
            throw new Error('No matching Restaurant found.');
          }
          console.log("Restaurant found ", restaurantSnapshot.size)
          for (let i = 0 ; i <  restaurantSnapshot.size ; i++) {
            const id = restaurantSnapshot.docs[i].id;
            const restaurantDocRef = db.collection('restaurantAdmins').doc(id);
            const ordersSnapshot = await restaurantDocRef.collection('orders').get();

            for (let j = 0 ; j < ordersSnapshot.size ; j++) {
              const orderDoc = ordersSnapshot.docs[j];
              const orderData = orderDoc.data();
              Orders.push(orderData);
              TotalPrice += orderData.totalPrice;
            }
            // console.log("NGO donations ", acceptedDonationsSnapshot.size)
            TotalOrders += ordersSnapshot.size;
           

          }
        

            return { success: true, message: 'Total Orders fetched successfully.',TotalOrders,TotalPrice,"orders":Orders };

        } catch (error) {
            console.log(error)
                return { success: false, message: 'Error verifying NGO: ' };
        }
    },

    
}

module.exports = adminService;

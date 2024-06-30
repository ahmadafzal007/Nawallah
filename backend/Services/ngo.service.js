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
    
    verifyNgo: async (email,password) => {
      try {
        // Query Firestore to check if the email and password combination exists in the 'ngos' collection
        const ngoSnapshot = await db.collection('ngos')
            .where('email', '==', email)
            .where('password', '==', password)
            .get();

        if (ngoSnapshot.size === 0) {
            throw new Error('No matching NGO found.');
        }

        const data = ( ngoSnapshot._docs()[0].data());
        return { success: true, message: 'NGO verified successfully.',ngo:{
          "name": data.name,
          "email": data.email,
          "logo":data.logoImage
        } };

    } catch (error) {
      console.log(error)
        return { success: false, message: 'Error verifying NGO: ' };
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
      },

      acceptDonation: async (email, donationId) => {
        try {
          console.log("Starting acceptDonation process...");
    
          // Query Firestore to check if the email exists in the 'ngos' collection
          const ngoSnapshot = await db.collection('ngos')
            .where('email', '==', email)
            .get();
    
          if (ngoSnapshot.empty) {
            console.log('No matching NGO found for email:', email);
            throw new Error('No matching NGO found.');
          }
    
          // Log to check if the correct donation ID is being used
          console.log("Donation ID:", donationId);
    
          // Fetch donation document
          const donationRef = db.collection('donations').doc(donationId);
          const donation = await donationRef.get();
    
          // Log to check if the document is fetched correctly
          console.log("Donation exists:", donation.exists);
    
          if (!donation.exists) {
            console.log('Donation not found with ID:', donationId);
            throw new Error('Donation not found.');
          }
    
          // Log to check the fetched donation data
          console.log("Donation Data:", donation.data());
    
          // Get NGO document by ID
          const ngoDocId = ngoSnapshot.docs[0].id;
          const ngoDocRef = db.collection('ngos').doc(ngoDocId);
    
          const donationData = donation.data();
    
          // Store donation in a subcollection 'acceptedDonations' in NGO document
          await ngoDocRef.collection('acceptedDonations').add(donationData);
          console.log('Donation added to acceptedDonations subcollection.');
    
          // Delete donation from donations collection
          await donationRef.delete();
          console.log('Donation deleted from donations collection.');
    
          return { success: true, message: 'Donation accepted successfully.' };
        } catch (error) {
          console.error('Error accepting donation:', error);
          return { success: false, message: 'Error accepting donation: ' + error.message };
        }
      },


      getAcceptedDonations: async(email) => {
        try {
          // Query Firestore to check if the email exists in the 'ngos' collection
          const ngoSnapshot = await db.collection('ngos')
            .where('email', '==', email)
            .get();
    
          if (ngoSnapshot.empty) {
            console.log('No matching NGO found for email:', email);
            throw new Error('No matching NGO found.');
          }
    
          // Get NGO document by ID
          const ngoDocId = ngoSnapshot.docs[0].id;
          const ngoDocRef = db.collection('ngos').doc(ngoDocId);
    
          console.log("ngo ref " , ngoDocRef)
          // Fetch acceptedDonations subcollection
          const acceptedDonationsSnapshot = await ngoDocRef.collection('acceptedDonations').get();
    
            
          if (acceptedDonationsSnapshot.empty) {
            console.log('No accepted donations found for NGO:', email);
            return { success: true, message: 'No accepted donations found for NGO.' };
          }
    
          const acceptedDonations = [];
          acceptedDonationsSnapshot.forEach((doc) => {
            acceptedDonations.push({
              ...doc.data(),
               date : (new Date(doc.data().timestamp._seconds * 1000)).toString()
            });
          });
    
          return { success: true, message: 'Accepted donations fetched successfully.', acceptedDonations };
        } catch (error) {
          console.error('Error fetching accepted donations:', error);
          return { success: false, message: 'Error fetching accepted donations: ' + error.message };
        }
      },

      getAllDonations: async()=>{
        try {
          const donationsSnapshot = await db.collection('donations').get();
    
          if (donationsSnapshot.empty) {
            console.log('No donations found.');
            return { success: true, message: 'No donations found.' };
          }
    
          const donations = [];
          donationsSnapshot.forEach((doc) => {
            donations.push({
              ...doc.data(),
              id: doc.id,
              date : (new Date(doc.data().timestamp._seconds * 1000)).toString()
            });
          });
    
          return { success: true, message: 'Donations fetched successfully.', donations };
        } catch (error) {
          console.error('Error fetching donations:', error);
          return { success: false, message: 'Error fetching donations: ' + error.message };
        }
      }
   

    
    
}

module.exports = ngoService;
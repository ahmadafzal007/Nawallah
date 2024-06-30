const db = require('../Db/firebaseAdmin'); // Import Firestore instance
const admin = require('firebase-admin');
const transporter = require('../Utils/mailConfig');

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

          
          sendMail: async (name, email, subject, message) => {
            console.log(process.env.PASSWORD);
            try {
                const mailOptions = {
                    from: process.env.EMAIL, // sender address
                    to: process.env.EMAIL, // list of receivers
                    subject: subject, // Subject line
                    html: `
                        <html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4CAF50;
      padding: 10px;
      text-align: center;
      color: white;
      border-radius: 10px 10px 0 0;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content h3 {
      color: #4CAF50;
    }
    .content ul {
      list-style-type: none;
      padding: 0;
    }
    .content ul li {
      margin: 10px 0;
      padding: 10px;
      background-color: #f9f9f9;
      border-radius: 5px;
      border: 1px solid #eeeeee;
    }
    .footer {
      text-align: center;
      padding: 10px;
      color: #777777;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Request</h2>
    </div>
    <div class="content">
      <p>You have a new contact request.</p>
      <h3>Contact Details</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Subject:</strong> ${subject}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
    </div>
    <div class="footer">
      <p>This email was sent from your website's contact form.</p>
    </div>
  </div>
</body>
</html>

                    `
                };
    
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent: ', info.response);
                return {
                    success: true,
                    message: 'Thanks for contacting us. We will get back to you shortly'
                };
            } catch (error) {
                console.log(error);
                return {
                    success: false,
                    message: 'Something went wrong. Try again later'
                };
            }

    
}
}

module.exports = adminService;

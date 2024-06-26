const express = require('express');
const admin  = require('firebase-admin');
const NawallaRoutes = require('./Routes/index');

const app = express();

const db = require('./Db/firebaseAdmin');

app.use('/api',NawallaRoutes)
// Define a restaurant object
const restaurant = {
  name: 'Fakhar pizza',
  location: new admin.firestore.GeoPoint(31.5826, 74.3276),
  email:"rest1@gmail.com",
  password:"123456",
  address: '123 Main St, San Francisco, CA',
  phone: '123-456-7890',
  category:"Fast food",
  description: 'Best pizza in town',
  logo: 'http://example.com/image.jpg',
  openingHours: '10:00 - 22:00',
  menu: [
    {
        name: 'Pizza Margherita',
        description: 'Classic pizza with tomato sauce, mozzarella, and basil',
        price: 10.99,
        image: 'http://example.com/pizza.jpg',
        isDeliveryAvailable: true,
        isDonationAvailable: false,
        discount:10,
        },{
        name: 'Pizza Pepperoni',
        description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
        price: 12.99,
        image: 'http://example.com/pizza.jpg',
        isDeliveryAvailable: true,
        isDonationAvailable: false,
        discount:0,
        },{
        }
  ]
};

const oder = {

}

// Add the restaurant to Firestore
// db.collection('restaurantAdmins').add(restaurant)
//   .then((docRef) => {
//     console.log('Restaurant added with ID:', docRef.id);
//   })
//   .catch((error) => {
//     console.error('Error adding restaurant:', error);
//   });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

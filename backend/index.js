const express = require('express');
const admin  = require('firebase-admin');
const NawallaRoutes = require('./Routes/index');
const cors = require('cors');
const app = express();


app.use(cors())
app.use(express.json());
const db = require('./Db/firebaseAdmin');


app.get('/', (req, res) => {
  res.send('Hello World');
})
app.use('/api',NawallaRoutes)


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

//Import routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//Route
app.get('/', (req, res) => {
    res.send('We are on home!!');
});

//Connect to database
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    () => console.log('connected to DB!')
);

// Listen to porst 3000.
app.listen(3000);
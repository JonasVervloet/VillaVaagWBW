const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Import routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/posts', postsRoute);
app.use('/user', authRoute)

//Route
app.get('/', (req, res) => {
    res.send('We are on home!!');
});

//Connect to database
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true }, 
    () => console.log('Connected to DB!')
);

// Listen to porst 3000.
app.listen(process.env.PORT, () => console.log('Server up and running!'));
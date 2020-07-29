const express = require('express');

const app = express();


//Route
app.get('/', (req, res) => {
    res.send('We are on home!!');
})

// Listen to porst 3000.
app.listen(3000);
const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validations/auth_validation')

router.post('/register', async (req, res) => {
    // Validate request body
    const {error} = registerValidation.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if email doesn't already exists
    const emailExists = await User.findOne({
        email: req.body.email
    });
    if (emailExists) {
        return res.status(400).send('Email already exists!');
    }

    // Create user
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    // Save user to database
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
const router = require('express').Router();
const bcrypt = require('bcryptjs');
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

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });

    // Save user to database
    try {
        const savedUser = await user.save();
        res.send({
            user: user._id
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    // Validate request body
    const {error} = loginValidation.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if email doesn't already exists
    const user = await User.findOne({
        email: req.body.email
    });
    if (! user) {
        return res.status(400).send('Invalid eamil or password!');
    }

    // Check if email is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (! validPass) {
        return res.status(400).send('Invalid email or password!')
    }
    res.send('Succes!')
})

module.exports = router;
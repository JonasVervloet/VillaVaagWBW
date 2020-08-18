const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validations/auth_validation')

router.post('/register', async (req, res) => {
    const {error} = registerValidation.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
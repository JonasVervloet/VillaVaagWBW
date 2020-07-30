const router = require('express').Router();
const Post = require('../models/Post');


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts); 
    } catch (err) {
        res.status(400).send(err);
    }
});


router.post('/', async (req, res) => {
    console.log(req.body);
    var post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;
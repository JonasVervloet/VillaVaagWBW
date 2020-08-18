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

router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
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
});

router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({
            _id: req.params.postId
        });
        res.json(removedPost);
    } catch (err) {
        res.status(400).send(err)
    }
})

router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            {
                _id: req.params.postId
            }, 
            {
                $set: {
                    title: req.body.title
                }
            }
        );
        res.json(updatedPost);
    } catch (err) {
        req.status(400).send(err);
    }
})

module.exports = router;
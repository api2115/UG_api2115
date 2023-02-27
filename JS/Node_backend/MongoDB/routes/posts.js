const express = require('express');
const router = express.Router({mergeParams: true});
const Post = require('../models/Post');
const User = require('../models/User')


router.get('/', async (req, res) => {
    const posts = await Post.find()
    res.send(posts)
});

router.get('/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id })
    res.send(post)
});

router.post('/:userId', async (req, res) => {
    const new_post={...req.body,author:req.params.userId}
    Post.create(new_post).then((result)=>{
        User.findOne({_id:req.params.userId})
            .then((result2)=>{
                User.findOneAndUpdate({_id:req.params.userId},{posts:[...result2.posts,result._id]}).then(res.send(result))
            })

    }).catch((error)=>{
        res.status(400);
        res.end();
    });
});

router.delete('/:id', async (req, res) => {
    try{
        await Post.deleteOne({_id:req.params.id})
            .then((result)=>{
                User.findOne({_id:req.params.idUser})
                    .then((result2)=>{
                        User.findOneAndUpdate({_id:req.params.idUser}, {posts:result2.posts.filter(el=>el._id!=req.params.id)}).then(res.send(result))
                    })
            })
    } catch{
        res.status(404)
        res.send({error:"User doesn't exist"})
    }
});


module.exports = router;

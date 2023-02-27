const Post = require('../models/Post');
const express = require('express');
const router = express.Router({mergeParams: true});

router.get('/summary',async(req,res)=>{
    Post.aggregate([
        {
            $group: {
                _id: null,
                average: {$avg: "$responses"},
                sum: {$sum: "$responses"},
                min: {$min: "$responses"},
                max: {$max: "$responses"},
            },
        },
        {
            $project:{
                _id: 0
            }
        }
    ]).then((result)=>{
        res.send(result)
    }).catch((error)=>{
        console.log(error)
        res.status(400).end()
    })
})

module.exports = router;
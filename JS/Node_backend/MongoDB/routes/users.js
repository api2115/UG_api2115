const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const posts = await User.find()
    res.send(posts)
});

router.post('/', async (req, res) => {
    User.create(req.body).then((result)=>{
        res.send(result);
    }).catch((error)=>{
        res.status(400);
        res.end();
    });
});

router.get('/:idUser', async (req, res) => {
    const post = await User.findOne({ _id: req.params.idUser })
    res.send(post)
});

router.put('/:idUser', async (req, res) => {
    User.findOneAndUpdate({_id: req.params.idUser}, req.body, {runValidators: true, overwrite: true, new: true}).then((result)=>{
        res.send(result);
    }).catch(()=>{
        res.status(400);
        res.end();
    });
});

router.delete('/:idUser', async (req, res) => {
    try{
        await User.deleteOne({_id:req.params.idUser})
            .then((result)=>{
                Post.find({"author":req.params.idUser})
                    .then((result2)=>{
                        Post.deleteMany({"author":req.params.idUser}).then(res.send(result))
                    })
            })
    } catch{
        res.status(404)
        res.send({error:"User doesn't exist"})
    }
});

router.patch('/:idUser', async (req, res) => {
    User.findOneAndUpdate({"_id":req.params.idUser},req.body,{new:true})
        .then((response)=>{
            if(!response){
                res.status(404).end()
            }
            else{
                res.send(response)
            }
        })
        .catch(()=>res.status(400).end)
});

router.get('/registration-raport',async(req,res)=>{
    const dateForm=req.query.date
    User.aggregate([
        {
            $group:{
                _id:{$substr:["$registrationDate",0,10]},
                count:{$sum:1}
            }
        },
        {
            $match:{
                _id:{
                    $gte:dateForm
                }
            }
        },
        {
            $project:{
                _id:0,
                date:"$_id",
                count:1
            }
        }
    ])
        .then((result)=>res.send(result))
        .catch(()=>res.status(400).end())
})

module.exports = router;

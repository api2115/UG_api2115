const express = require('express');
const router = express.Router();
const client = require('../config/redisClient');


const uQ = "user-queue"


router.get('/', async (req, res) => {
    try{
        const result = await client.lrange(uQ,0,-1)
        res.send(result)
    }catch (err){
        console.log(err)
    }
});

router.post('/', async (req, res) => {
    try{
        const result = await client.rpush(uQ,req.body.name)
        res.end()
    }catch(err){
        console.log(err)
        res.end()
    }
});

router.get('/:range', async (req, res) => {
    try{
        const result = await client.lrange(uQ,0,req.params.range-1)
        res.send(result)
    }catch (err){
        console.log(err)
    }
});


router.delete('/', async (req, res) => {
  try{
      const result = await client.lpop(uQ)
      res.send(result)
  }catch (err){
      console.log(err)
      res.end()
  }
});

module.exports = router;

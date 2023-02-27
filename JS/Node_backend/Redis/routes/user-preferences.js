const express = require('express');
const router = express.Router({mergeParams: true});
const client = require('../config/redisClient');

const uP="user-preferences"

router.get('/', async (req, res) => {
  try{
    const result = await client.keys(uP+"*")
    res.send(result)
  }catch (err){
    console.log(err)
  }
});

router.get('/:key', async (req, res) => {
  const key = req.params.key
  try{
    const result = await client.get(uP+":"+key)
    res.send(result)
  }catch(err){
    console.log(err)
    res.end()
  }
});

router.post('/', async (req, res) => {
  const {EX}=req.body
  try{
    if (EX==undefined){
      const result = await client.set(uP+":"+req.body.key,JSON.stringify(req.body.value))
      res.send(result)
    }else{
      const result = await client.set(uP+":"+req.body.key,JSON.stringify(req.body.value),"EX",EX)
      res.send(result)
    }
  }catch(err){
    console.log(err)
    res.end()
  }
});

router.put('/:key', async (req, res) => {
  const {EX}=req.body
  try{
    if (EX==undefined){
      const result = await client.set(uP+":"+req.params.key,JSON.stringify(req.body.value))
      res.send(result)
    }else{
      const result = await client.set(uP+":"+req.params.key,JSON.stringify(req.body.value),"EX",EX)
      res.send(result)
    }
  }catch(err){
    console.log(err)
    res.end()
  }
});

router.delete('/:key', async (req, res) => {
  const key = req.params.key;
  try{
    const result = await client.del(uP+":"+req.params.key)
  }catch(err){
    console.log(err)
    res.end()
  }
});


module.exports = router;
var express = require('express');
var router = express.Router();
const keycloak = require('../config/keycloak-config.js').getKeycloak();

let restaurants = [{id:1,name:"burgerplace",menu:[{name:"burger1",price:20},{name:"burger2",price:30},{name:"frytki",price:10}]},
    {id:2,name:"kebabplace",menu:[{name:"kebab1",price:15},{name:"kebab2",price:20},{name:"frytki",price:8}]}]
let basket = []

router.get('/restaurants', function(req, res){
    res.send(restaurants);
});

router.post('/restaurants', keycloak.protect('admin'), function(req, res){
    const restaurant = req.body
    restaurants.push(restaurant)
    res.send(restaurants)
});

router.get('/restaurants/:id', function(req, res){
    if(req.params.id<=restaurants.length) {
        res.send(restaurants[req.params.id - 1])
    }else {
        res.status(400)
        res.send({error:"Restaurant doesn't exist"})
    }
});

router.delete('/restaurants/:id', keycloak.protect('admin'),function(req, res){
    if(req.params.id<=restaurants.length) {
        restaurants.splice(req.params.id-1,1)
        res.send(restaurants)
    }else {
        res.status(400)
        res.send({error:"Restaurant doesn't exist"})
    }
});

router.get('/basket', keycloak.protect('user'), function(req, res){
    res.send(basket);
});

router.post('/basket', keycloak.protect('user'), function(req, res){
    const product = req.body
    basket.push(product)
    res.send(basket)
});

router.delete('/basket/:client/:id', keycloak.protect('user'),function(req, res){
    if(req.params.id<=basket.length) {
        basket.splice(req.params.id,1)
    }else {
        res.status(400)
        res.send({error:"item doesn't exist"})
    }
});

router.delete('/basket/:client', keycloak.protect('user'),function(req, res){
    const newBasket =basket.filter((el)=>el.client!==req.params.client)
    basket=newBasket
    res.send(basket)
})


module.exports = router;
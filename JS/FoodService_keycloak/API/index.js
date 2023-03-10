var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express();
app.use(cors())

const keycloak = require('./config/keycloak-config.js').initKeycloak();
app.use(keycloak.middleware());

app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))


const testController = require('./controller/test-controller.js');
app.use('/test', testController);

app.get('/', function(req, res){
    res.send("Server is up!");
});

app.listen(3000);
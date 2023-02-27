var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

const keycloakConfig = {
    "realm": "Project-Realm",
    "auth-server-url": "http://localhost:8080/",
    "ssl-required": "external",
    "resource": "nodejs-microservice",
    "verify-token-audience": true,
    "credentials": {
        "secret": "lj7BMPON181eYMAHqkdyWS9OQyelRhqr"
    },
    "use-resource-role-mappings": true,
    "confidential-port": 0
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};
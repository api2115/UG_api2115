import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "Project-Realm",
    clientId: "react-app",
});

export default keycloak;
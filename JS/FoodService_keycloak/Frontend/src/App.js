import React from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Homepage";
import Secured from "./pages/Securedpage";
import PrivateRoute from "./helpers/PrivateRoute";
import Restaurant from "./pages/Restaurant";

function App() {



    return (
        <div>
            <ReactKeycloakProvider authClient={keycloak}>
                <Nav />
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/restaurant/:id" element={<Restaurant/>} />
                        <Route
                            path="/basket"
                            element={
                                <PrivateRoute>
                                    <Secured />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ReactKeycloakProvider>
        </div>
    );
}

export default App;
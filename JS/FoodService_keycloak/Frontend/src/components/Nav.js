import React from "react";
import { useKeycloak } from "@react-keycloak/web";

const Nav = () => {
    const { keycloak, initialized } = useKeycloak();

    return (
        <div>
            <div >
                <section >
                    <nav >
                        <div >
                            <h1>
                                Food
                            </h1>
                            <ul>
                                <li>
                                    <a href="/">
                                        List
                                    </a>
                                </li>
                                <li>
                                    <a href="/basket">
                                        Basket
                                    </a>
                                </li>
                            </ul>
                            <div >
                                <div >
                                    {!keycloak.authenticated && (
                                        <button
                                            type="button"
                                            onClick={() => keycloak.login()}
                                        >
                                            Login
                                        </button>
                                    )}

                                    {!!keycloak.authenticated && (
                                        <button
                                            type="button"
                                            onClick={() => keycloak.logout()}
                                        >
                                            Logout ({keycloak.tokenParsed.preferred_username})
                                            {/*+keycloak.tokenParsed.realm_access.roles*/}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </section>
            </div>
        </div>
    );
};

export default Nav;
import React from "react"
import {Link} from "react-router-dom";

export default function Nav(){
    return(
        <>
            <nav>
                <Link to="/">
                    <h3 className="logo">Filmoteka</h3>
                </Link>
                <ul className="przyciski">
                    <Link to="/ulubione">
                        <li>Ulubione</li>
                    </Link>
                </ul>
            </nav>
        </>
    )
}
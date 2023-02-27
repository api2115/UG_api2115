import React from "react";
import {Link} from "react-router-dom";
import "../app.scss"

export default function Nav(){
    return(
        <nav>
            <h3>Filmoteka</h3>
            <ul>
                <Link to="/persons"><li>Osoby</li></Link>
                <Link to="/movies"><li>Filmy</li></Link>
            </ul>
        </nav>
    )
}
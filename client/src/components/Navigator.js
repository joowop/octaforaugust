import React from "react";
import { Link } from "react-router-dom";


function Navigation(){
    return (

        <nav>
            <ul>
                <li>
                    <Link to="/"> Sophia </Link>
                </li>
                <li>
                    <Link to="/librarian"> 사서 메뉴</Link>
                </li>
                <li>
                    <Link to="/libraryUser"> 이용자 메뉴</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;
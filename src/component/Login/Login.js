import React from "react";
import '../../css/Login/Login.css';
import LoginContext from './LoginContext';
import Logo from "../Logo.png";

function Login() {
    return(
        <div id="login">
            <div id="logo"
                 style={{ width: "195px", height: "32.5px", position: "absolute", left: "5px" }}>
                <img src={Logo} alt="" style={{ width: "100%", height: "100%" }}/>
            </div>
            <div id="login_card">
                <LoginContext/>
            </div>
        </div>
    )
}

export default Login;
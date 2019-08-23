import React from 'react';
import '../../css/Register/Register.css';
import RegisterContext from './RegisterContext';
import Logo from "../Logo.png";

function Register() {
    return (
        <div id="register">
            <div id="logo"
                 style={{ width: "195px", height: "32.5px", position: "absolute", left: "5px" }}>
                <img src={Logo} alt="" style={{ width: "100%", height: "100%" }}/>
            </div>
            <div id="register_card">
                <div id="register_context">
                    <RegisterContext/>
                </div>
            </div>
        </div>
    )
}

export default Register;
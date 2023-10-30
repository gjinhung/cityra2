import React, { useState } from "react";
import SignupFormPage from "../SignupFormPage";
import LoginFormPage from "../LoginFormPage";

import './LogInSignUp.css';

export default function LogInSignUp() {
    const [signIn, toggle] = useState('false')

    return (
        <div className="slider_container">
            <div className='slider'>
                <div className={`signup-container-${signIn}`}>
                    <SignupFormPage />
                </div>
                <div className={`login-container-${signIn}`}>
                    <LoginFormPage />
                </div>
                <div className={`OverlayContainer-${signIn}`}>
                    <div className={`Overlay-${signIn}`}>
                        <div className={`LeftOverlayPanel-${signIn}`}>
                            <h1 className="title">Welcome Back!</h1>
                            <p className="paragraph">
                                To keep connected with us please login with your personal info
                            </p>
                            <button className="ghostButton " onClick={() => toggle('true')}>
                                Log In
                            </button>
                        </div>

                        <div className={`RightOverlayPanel-${signIn}`}>
                            <h1 className="title">Hello, Friend!</h1>
                            <div className="paragraph">
                                Enter Your personal details and start touring with us
                            </div>
                            <button className="ghostButton" onClick={() => toggle('false')}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
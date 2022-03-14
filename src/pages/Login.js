import React, { useState } from "react";
import "./Login.css";
import SignUpScreen from "./SignUp";

const Login = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="login-page">
      <div className="login-page__background">
        <img
          className="login-page__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button onClick={() => setSignIn(true)} className="login-page__button">
          Sign In
        </button>
        <div className="login-page__gradient" />
      </div>
      <div className="login-page__body">
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>
              Ready to watch? Enter your e-mail to create or restart your
              membership.
            </h3>
            <div className="login-page_input">
              <form>
                <input type="email" placeholder="E-mail Adress" />
                <button
                  onClick={() => setSignIn(true)}
                  className="login-page__get-started"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

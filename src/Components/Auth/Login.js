import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, register } from "../../Redux/userReducer";
import icon from "../../assets/IMG_4865.PNG";
import Error from '../Error/Error'

import "./Login.css";

function Login(props) {
  const [email, setUserInput] = useState("");
  const [password, setPassInput] = useState("");
  const [isRegister, setRegister] = useState(false);

  const resetInput = () => {
    setUserInput("");
    setPassInput("");
  };

  const signUpClicked = event => {
    event.preventDefault();
    resetInput();
    setRegister(!isRegister);
  };

  const cancelClicked = event => {
    event.preventDefault();

    const fadeBackground = document.getElementById("login-register");

    setTimeout(() => {
      props.history.push(props.location.state.prevPath);
    }, 100);
    resetInput();

    fadeBackground.classList.remove("fade-in");
    fadeBackground.classList.add("fade-out");
  };

  const loginClicked = event => {
    event.preventDefault();
    props.login(email, password);
  };

  const registerClicked = event => {
    event.preventDefault();
    props.register(email, password);
  };

  const userHandleChanged = event => {
    setUserInput(event.target.value);
  };

  const passHandleChanged = event => {
    setPassInput(event.target.value);
  };

  useEffect(() => {
    if (props.user.id) {
      const prevPath = props.location.state
        ? props.location.state.prevPath
        : "/";
      props.history.push(prevPath);
    }

    const fadeBackground = document.getElementById("login-register");
    const slidedownForm = document.getElementById("login-form");

    if (slidedownForm) {
      slidedownForm.style.animation = "slideDown 0.5s ease-out forwards";
      fadeBackground.classList.add("fade-in");
    }
  });

  return (
    <div className="login-register" id="login-register">
      {!isRegister ? (
        <form id="login-form" className="login-form" onSubmit={loginClicked}>
          <div className="login-form-container">
            <div className="mobile-cancel" onClick={cancelClicked}>
              <div className="mobile-cancel-line1" />
              <div className="mobile-cancel-line2" />
            </div>
            <div className="login-logo-box">
              <div className="login-logo">
                <img className="login-logo-img" src={icon} alt="" />
              </div>
            </div>

            <div className="login-containers">
              <div className="login-input-container">
                <span className="label-input-login">
                  username <strong>/</strong> email:
                </span>
                <input
                  type="textarea"
                  value={email}
                  onChange={userHandleChanged}
                  placeholder="Enter your username/email"
                />
              </div>
              <div className="login-input-container top">
                <span className="label-input-login">password:</span>
                <input
                  type="password"
                  value={password}
                  onChange={passHandleChanged}
                  placeholder="Enter your password"
                />
              </div>
              <div className="login-error">
                {/* {props.userReducer.isError ? (
                  <span>{props.userReducer.errorMessage}</span>
                ) : null} */}
              </div>
            </div>
            <div className="desktop-login-buttons">
              <button type="signup" onClick={signUpClicked}>
                Sign up
              </button>
              <button type="submit">Login</button>
            </div>
            <div className="mobile-login-buttons">
              <button type="signup" onClick={signUpClicked}>
                Sign up
              </button>
              <button type="submit">Login</button>
            </div>
          </div>
        </form>
      ) : (
        <form className="register-form" onSubmit={registerClicked}>
          <div className="register-form-container">
            <div className="mobile-cancel" onClick={cancelClicked}>
              <div className="mobile-cancel-line1" />
              <div className="mobile-cancel-line2" />
            </div>
            <div className="register-logo-box">
              <div className="register-logo">
                <img className="register-logo-img" src={icon} alt="" />
              </div>
            </div>
            <div className="register-containers">
              <div className="register-input-container">
                <span className="label-input-register">
                  username <strong>/</strong> email:
                </span>
                <input
                  type="textarea"
                  value={email}
                  onChange={userHandleChanged}
                  placeholder="Enter your username/email"
                />
              </div>
              <div className="register-input-container top">
                <span className="label-input-register">password:</span>
                <input
                  type="password"
                  value={password}
                  onChange={passHandleChanged}
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="desktop-register-buttons">
              <button type="cancel" onClick={signUpClicked}>
                Cancel
              </button>
              <button type="submit">Submit</button>
            </div>
            <div className="mobile-register-buttons">
              <button type="cancel" onClick={signUpClicked}>
                Cancel
              </button>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      )}
      <Error />
    </div>
  );
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.user
  return {
    user
  };
};

export default connect(mapStateToProps, { login, register })(Login);

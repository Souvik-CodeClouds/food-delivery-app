import React, { useState } from "react";
import "./Login.css";
import LoginImg from "../../assests/img.png";
import useInput from "../hooks/UseInput";
import { FaInstalod } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import axios from "../../axois";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState(null);
    const navigate = useNavigate();
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: InputPasswordHasError,
    valueChangeHandler: PasswordChangedHandler,
    inputBlurHandler: PasswordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredVerifyPassword,
    isValid: enteredVerifyPasswordIsValid,
    hasError: InputVerifyPasswordHasError,
    valueChangeHandler: verifyPasswordChangedHandler,
    inputBlurHandler: verifyPasswordBlurHandler,
    reset: resetVerifyPasswordInput,
  } = useInput((value) => value.trim() !== "" && value === enteredPassword);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const reg = async () => {
    const user = {
      Userid:uuidv4(),
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };
    try {
      const res = await axios.post(
        "/AuthUser/AddUser.php",
        user,
      );
      const status= res.data.status;
      if(!status){
    setErrorMessage(res.data.message);
      throw new Error(res.data.message);
      }else{
        navigate("/login");
      }
    } catch (err) {
        setError(true);
        console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      enteredPasswordIsValid &&
      enteredEmailIsValid &&
      enteredNameIsValid &&
      enteredVerifyPasswordIsValid
    ) {
      resetEmailInput();
      resetPasswordInput();
      resetNameInput();
      resetVerifyPasswordInput();
      reg();
    } 
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={LoginImg} alt="IMG" />
          </div>

          <form onSubmit={handleSubmit} className="login100-form validate-form">
            <span className="login100-form-title">Member Register</span>
           {
            error && <span className="login100-form-title">{errorMessage}</span>
           }
            <div className="wrap-input100 validate-it">
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Name"
                onBlur={nameBlurHandler}
                onChange={nameChangedHandler}
                value={enteredName}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <FaInstalod />
              </span>
            </div>
            {nameInputHasError && (
              <span className="txt1" style={{ color: "red" }}>
                Name is Required
              </span>
            )}
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                onBlur={emailBlurHandler}
                onChange={emailChangedHandler}
                value={enteredEmail}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <FaInstalod />
              </span>
            </div>
            {emailInputHasError && (
              <span className="txt1" style={{ color: "red" }}>
                Email is Required
              </span>
            )}
            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
                onBlur={PasswordBlurHandler}
                onChange={PasswordChangedHandler}
                value={enteredPassword}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <FaLock />
              </span>
            </div>
            {InputPasswordHasError && (
              <span className="txt1" style={{ color: "red" }}>
                Password is Required
              </span>
            )}
            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="passverify"
                placeholder="Password verify"
                onBlur={verifyPasswordBlurHandler}
                onChange={verifyPasswordChangedHandler}
                value={enteredVerifyPassword}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <FaLock />
              </span>
            </div>

            {InputVerifyPasswordHasError && (
              <span className="txt1" style={{ color: "red" }}>
                Password did't match
              </span>
            )}

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Register</button>
            </div>

            <div className="text-center p-t-12">
              <span className="txt1">Have an acount?</span>
              <a className="txt2" onClick={()=>navigate("/login")}>
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import React, { useContext, useState } from "react";
import "./Login.css";
import LoginImg from "../../assests/img.png";
import useInput from "../hooks/UseInput";
import { FaInstalod } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from "../../axois";
import CartContext from "../../Store/Cart-Context";
import { getItemWithExpiry, setItemWithExpiry } from "../../Helper/localStorageHelper";
import { useNavigate } from "react-router-dom";


const push = async (item,token) => {

  try {
    const res = await axios.post(
      "/Cart/AddToCart.php",
      { ...item },
      {
        headers: {
          Authorization: token
        },
      }
    );
    
  } catch (err) {
    console.log(err);
  }
};
const Login = () => {
  const ctx = useContext(CartContext);
  const [error,setError]=useState(false);
  const navigate = useNavigate();
    const [errorMessage,setErrorMessage]=useState(null);
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: InputPasswordHasError,
    valueChangeHandler: PasswordChangedHandler,
    inputBlurHandler: PasswordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: EmalInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  const login = async () => {
    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      const res = await axios.post("/AuthUser/Login.php", user);
     const status=res.data.status;
     console.log(res);
     console.log(status)
     if(!status){
      setErrorMessage(res.data.message);
      throw new Error(res.data.message);
     }else{
      setErrorMessage(res.data.message);
      setError(false);
    
      const token=res.data.jwt;
      const role=res.data.role;
      if(ctx.items.length>0 && !ctx.isLoggedIn){
      ctx.items.map((item)=>
        push(item,token)
      );
      ctx.clearCart();
      }
      setItemWithExpiry("role",role);
      setItemWithExpiry("token",token);
      setItemWithExpiry("isLoggedIn",true);
      ctx.LoggingIn(token,role);
      ctx.fetch();
      navigate("/");
     }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredPasswordIsValid && enteredEmailIsValid) {
      console.log(enteredPassword);
      console.log(enteredEmail);
      resetEmailInput();
      resetPasswordInput();
      login();
    } else {
      console.log("error");
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
            <span className="login100-form-title">Member Login</span>
            {
            error && <span className="login100-form-title">{errorMessage}</span>
           }

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
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
            {EmalInputHasError && (
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

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Login</button>
            </div>

            <div className="text-center p-t-12">
              <span className="txt1">Don't have an acount?</span>
              <a className="txt2" onClick={()=>navigate("/register")}>
                Create your Account
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

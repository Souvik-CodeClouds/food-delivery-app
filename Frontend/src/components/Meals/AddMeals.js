import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axois";
import { getItemWithExpiry } from "../../Helper/localStorageHelper";
import CartContext from "../../Store/Cart-Context";

import useInput from "../hooks/UseInput";
import classes from "./AddMeals.module.css";


const AddMeals = () => {
  const navigate = useNavigate();
  const ctx = useContext(CartContext);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: InputNameHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: InputDescriptionHasError,
    valueChangeHandler: descriptionChangedHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: InputPriceHasError,
    valueChangeHandler: priceChangedHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput((value) => value.trim() !== "");

  const add = async () => {
    const item={
      name:enteredName,
      description:enteredDescription,
      price:enteredPrice
    }

    try {
      const res = await axios.post(
        "/Meals/AddMeals.php",
        { ...item },
        {
          headers: {
            Authorization: getItemWithExpiry("token"),
          },
        }
      );
      console.log(res.data.status);

      if(res.data.status===1){
          navigate("/");
      }else{
        throw new Error(res.data.message)
      }

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };


const submitHandler=(e)=>{
  e.preventDefault();
  if(enteredNameIsValid && enteredPriceIsValid && enteredDescriptionIsValid){
    console.log(enteredName);
    console.log(enteredDescription);
    console.log(enteredPrice);
    resetDescriptionInput();
    resetNameInput();
    resetPriceInput();
    add();
  }
}

if(ctx.role==='ADMIN'){
  return (
    <div className={classes.limiter}>
      <div className={classes["container-login100"]}>
        <div className={classes["wrap-login100"]}>
          <div className={classes["login100-form-title"]}>
            <span className={classes["login100-form-title-1"]}>New FooD</span>
          </div>

          <form className={classes["login100-form"]} onSubmit={submitHandler}>
            <div>
              <div
                className={`${classes["wrap-input100"]}  ${classes["m-b-26"]}`}
              >
                <span className={classes["label-input100"]}>Food Name</span>
                <input
                  className={classes["input100"]}
                  type="text"
                  name="foodName"
                  placeholder="Enter Food Name"
                  onChange={nameChangedHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
                />
                <span className={classes["focus-input100"]}></span>
              </div>
              <div
                className={`${classes["wrap-input100"]}  ${classes["m-b-26"]}`}
              >
                <span className={classes["label-input100"]}>Description</span>
                <input
                  className={classes["input100"]}
                  type="text"
                  name="Description"
                  placeholder="Description"
                  onChange={descriptionChangedHandler}
                  onBlur={descriptionBlurHandler}
                  value={enteredDescription}
                />
                <span className={classes["focus-input100"]}></span>
              </div>
              <div
                className={`${classes["wrap-input100"]}  ${classes["m-b-26"]}`}
              >
                <span className={classes["label-input100"]}>Price</span>
                <input
                  className={classes["input100"]}
                  type="text"
                  name="Price"
                  placeholder="Enter Price"
                  onChange={priceChangedHandler}
                  onBlur={priceBlurHandler}
                  value={enteredPrice}
                />
                <span className={classes["focus-input100"]}></span>
              </div>

              <div
                className={`${classes["flex-sb-m"]} ${classes["w-full"]} ${classes["p-b-30"]}`}
              ></div>

              <div className={classes["container-login100-form-btn"]}>
                <button class={classes["login100-form-btn"]}>Add Food</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}else{

  return (
    <div className={classes.limiter}>
      <div className={classes["container-login100"]}>
        <div className={classes["wrap-login100"]}>
          <div className={classes["login100-form-title"]}>
            <span className={classes["login100-form-title-1"]}>Access Denied</span>
          </div>
        </div>
      </div>
    </div>
  );
  

}


}

export default AddMeals;

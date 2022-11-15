import React, { useRef,useState } from "react";
import Input from "./Input";
import classes from "./MealIteamForm.module.css";
const MealItemForm = (props) => {
  const [amountValid,setAmountValid]=useState(true)
  const amountInputRef=useRef();

  const submitHandler=(e)=>{
    e.preventDefault();
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = + enteredAmount;
      if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
        setAmountValid(false)
        return;
      }

      props.OnAddToCart(enteredAmountNumber);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
      ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountValid && <p>Please enter a correct amount</p>} 
    </form>
  );
};

export default MealItemForm;

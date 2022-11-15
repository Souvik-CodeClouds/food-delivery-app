import React, { useContext, useEffect,useState } from "react";
import classes from "./HeaderButton.module.css";



export const Button = (props) => {
  

 



  return (
    <button className={classes.button} onClick={props.onPress}>
      <span>{props.name}</span>
    </button>
  );
};

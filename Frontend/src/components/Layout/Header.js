import React, { useContext, useState } from "react";
import mealImg from "../../assests/meals.jpg";
import { Button } from "./Button";
import classes from "./Header.module.css";
import { HeaderButton } from "./HeaderButton";
import { useNavigate } from "react-router-dom";
import CartContext from "../../Store/Cart-Context";
export const Header = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleNavigate = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    Cartctx.logout();
    navigate("/");
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const Cartctx = useContext(CartContext);
  const { isLoggedIn, role } = Cartctx;
  console.log(role);
  return (
    <>
      <header className={classes.header}>
        <h1 onClick={() => navigate("/")}>Tomato Meals</h1>
        <HeaderButton onClick={props.onShowCart} />

      {isLoggedIn &&
        <div className={classes.dropdown}>
          <button onClick={handleOpen}>
            <p style={{ color: "white" }}>Accounts</p>
          </button>
          {open ? (
            <ul className={classes.menu}>
              {role === "ADMIN" && (
                <li className={classes["menu-item"]}>
                  <button onClick={() => {
                    navigate("/addFood");
                    handleOpen();
                  }}>Add New Food</button>
                </li>
              )}
              <li className={classes["menu-item"]}>
                <button
                  onClick={() => {
                    navigate("/order");
                    handleOpen();
                  }}
                >
                  View order
                </button>
              </li>
            </ul>
          ) : null}
        </div>
}
        {!isLoggedIn && <Button name={"Login"} onPress={handleNavigate} />}
        {isLoggedIn && <Button name={"Logout"} onPress={handleLogout} />}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} />
      </div>
    </>
  );
};

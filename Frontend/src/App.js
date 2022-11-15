import { useState } from "react";
import Cart from "./components/Cart/Cart";
import { Header } from "./components/Layout/Header";
import { Meals } from "./components/Meals/Meals";
import CartProvider from "./Store/CartProvider";
import { BrowserRouter,Route, Routes } from "react-router-dom"
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import AddMeals from "./components/Meals/AddMeals";
import Order from "./components/Order/Order";
import OrderDetail from "./components/Order/OrderDetail";

function App() {
  const [cartVisibility,setCartVisibility]=useState(false);
  const showCartHandler=()=>{
    setCartVisibility(true)
  }
  const hideCartHandler=()=>{
    setCartVisibility(false)
  }
  return (
    <BrowserRouter>
    <CartProvider>
      
      {cartVisibility && <Cart  onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Routes >
        <Route path="/" element={<Meals />} />
        <Route path="/addFood" element={<AddMeals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orderDetails/:orderId/:priceI" element={<OrderDetail />} />
        </Routes>
      </main>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;

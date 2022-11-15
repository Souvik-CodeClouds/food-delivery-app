import React from 'react'


const CartContext=React.createContext({
    items: [],
    totalAmount: 0,
    isLoggedIn:false,
    token:'',
    role:'',
    addItem:(item)=>{},
    removeItem:(id)=>{},
    clearCart:()=>{},
    LoggingIn:(tk,role)=>{},
    Loading:(it)=>{},
    logout:()=>{}
    
});

export default CartContext;

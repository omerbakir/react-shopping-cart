import React, { createContext, useState } from "react";
import './App.css';
import { Route } from "react-router-dom";


import Products from "./components/Products";
import Cart from "./components/Cart";

import { data } from "./data";

export const BookContext = createContext();

export default function App() {
    const [state, setState] = useState({
        booklist: data,
        cart: []
    });
    const addToCart = book => setState({
        ...state,
        cart: state.cart.find(cartItem => cartItem.id === book.id)
            ? state.cart.map(cartItem => cartItem.id === book.id ? {
                ...cartItem, count:
                    cartItem.count + 1
            } : cartItem)
            : [...state.cart, { ...book, count: 1 }]
    });

    const removeFromCart = id => setState({
        ...state,
        cart: state.cart.filter(cartItem => cartItem.id !== id)
    })

    const increase = id => {
        setState({
            ...state,
            cart: state.cart.map(cartItem => cartItem.id === id ? {
                ...cartItem, count:
                    cartItem.count + 1
            } : cartItem)
        })
    }
    const decrease = id => {
        setState({
            ...state,
            cart: state.cart.map(cartItem => cartItem.id === id ? {
                ...cartItem, count:
                    cartItem.count > 1 ? cartItem.count - 1 : 1
            } : cartItem)
        })
    }
    return (
        <BookContext.Provider value={{ state: state, addToCart, increase, decrease, removeFromCart }}>
            <div className="App">
                <h1>
                    Alışveriş Sepeti Yapımı
                    <img
                        src="https://avatars3.githubusercontent.com/u/60869810?v=4"
                        alt="React Dersleri"
                    />{" "}
                    React Dersleri
                </h1>
                <Route exact path="/" component={Products}/>
                <Route path="/cart" component={Cart}/>
            </div>
        </BookContext.Provider>
    );
}

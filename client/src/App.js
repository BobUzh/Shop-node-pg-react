import { Routes, Route } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router";
import React, { useContext, useEffect } from "react";

import './App.css';
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Product from "./pages/Product";
import AdminPage from "./pages/Admin";

import Header from "./components/header/Header";

import { Context } from "./index";


const App = () => {
    const {store} = useContext(Context);

    useEffect( () => {
        if (localStorage.getItem('token') && !store.isAuth) {
            async function init() {
                await store.checkAuth();
            }
            init();
        }
    }, []);

  return (
      <div className="main">
          <Header/>
          <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/login" element={store.isAuth ? <Navigate to={'/'} replace/> : <LoginPage />}/>
              <Route path="/registration" element={<RegisterPage />}/>
              <Route path="/product" element={store.isAuth ? <Product /> :  <Navigate to={'/'} replace/>}/>
              <Route path="/admin" element={<AdminPage />}/>
          </Routes>
      </div>
  );
}

export default observer(App);

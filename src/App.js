import "./App.css";

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import Login from "./component/Login";
import { getUserThunk } from "./stores/auth/authSlice";
import { auth } from "./service/firebaseAuth";
import DaumPost from "./component/DaumPost";
import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";

import MainPage from "./page/MainPage";
import ProductList from "./page/ProductList";
import MyPage_List from "./page/MyPage_List";
import Product_Detail from "./page/Product_Detail";
import MyPage from "./page/MyPage";
import Edit from "./page/Edit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        console.log(token);
        dispatch(getUserThunk(token));
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/products" element={<ProductList />}></Route>
          <Route path="/products/:id" element={<Product_Detail />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/edit" element={<Edit />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/mylist" element={<MyPage_List />}></Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;

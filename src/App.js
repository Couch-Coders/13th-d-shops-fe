import "./App.css";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { getUserThunk, logOutUserThunk } from "./stores/auth/authSlice";
import { auth } from "./service/firebaseAuth";
import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage";
import ProductList from "./page/ProductList";
import ProductDetailPage from "./page/ProductDetailPage";
import MyPage from "./page/MyPage";
import Product from "./page/Product";
import MyListPage from "./page/MyListPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        console.log(token);
        dispatch(getUserThunk(token));
      } else if (!user) {
        dispatch(logOutUserThunk());
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/products/:id" element={<ProductDetailPage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/mylist" element={<MyListPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

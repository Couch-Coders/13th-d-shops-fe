import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { googleSignIn, googleSignOut } from "../service/firebaseAuth";
import User from "./User";

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  return (
    <div className="header_right">
      <Link to="/products" className="product_list_text">
        상품목록
      </Link>
      {loading ? <div></div> : user && <User user={user} />}
      {loading ? (
        <div></div>
      ) : (
        user && (
          <button className="login_btn" onClick={googleSignOut}>
            로그아웃
          </button>
        )
      )}
      {loading ? (
        <div></div>
      ) : (
        !user && (
          <button className="login_btn" onClick={googleSignIn}>
            로그인
          </button>
        )
      )}
    </div>
  );
}

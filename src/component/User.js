import React from "react";
import { Link } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";

export default function User({ user: { imgUrl, displayName } }) {
  return (
    <div className="login_userMenu">
      <Link to="/mypage" className="edit">
        <BsFillPencilFill />
      </Link>
      <Link to="mypage" className="username">
        {displayName}
      </Link>
      <Link to="mypage">
        <img className="photoURL" src={imgUrl}></img>
      </Link>
    </div>
  );
}

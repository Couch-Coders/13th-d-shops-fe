import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
export default function Header() {
  const [inputs, setInputs] = useState({});
  const [productSearch, setProductSearch] = useState([]);

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  // const handleOnLoadProductSearch = async (e) => {
  //   e.preventDefault();

  //   const result = await ProductListService.getProductSearch(inputs.keyword);
  //   // console.log("result", result.content);

  //   setProductSearch(result.content);
  // };
  const onSubmitSearch = (e) => {
    if (e.key === "Enter") {
      let keyword = e.target.value;
      console.log(keyword);
      
      navigate(`/products/?q=${keyword}`);
    }
  };


  return (
    <div className="header">
      <Link to="/">
        <img width={200} src="/image/logo.png"></img>
      </Link>
      <div className="header_inputBox">
        <input
          name="keyword"
          value={inputs.keyword ?? ""}
          onChange={handleChange}
          onKeyPress={onSubmitSearch}
          className="header_input"
          type="text"
          placeholder="상품을 검색해 주세요"
        ></input>
        <div>
          <SearchOutlined className="Search" />
        </div>
      </div>
      <div className="header_right">
        <div className="Login_btn">
          <Navbar />
        </div>
      </div>
    </div>
  );
}

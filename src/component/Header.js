import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Navbar from "./Navbar";
import ProductListService from "../service/ProductListService";
export default function Header() {
  const [inputs, setInputs] = useState({});
  const [productSearch, setProductSearch] = useState([]);
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleOnLoadProductSearch = async (e) => {
    e.preventDefault();

    const result = await ProductListService.getProductSearch(inputs.keyword);
    // console.log("result", result.content);

    setProductSearch(result.content);
  };
  const onSubmitSearch = (e)=>{
   
    if(e.key === "Enter"){
      let keyword = e.target.value;
      console.log(keyword)

      navigate(`/products/?q=${keyword}`)
    }
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          width={200}
          src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FV8fHf%2Fbtr4PqndKIw%2F4BziaW30wr6i7g60T4z7PK%2Fimg.png"
        ></img>
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
        <div className="Search">
          <SearchOutlined />
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

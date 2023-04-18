import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MypageProductService from "../service/mypageProductService";
const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
export default function MyPageProductCard({item,setProduct,product}) {
  console.log(product)
  console.log(setProduct)
  const handleDelete = async (seq) => {
    if(window.confirm('삭제 하시겠습니까?')){
       await  MypageProductService.deleteProduct(seq)
    
    }
    setProduct(product.filter(item => item.seq !== seq))
    
  }


  // useEffect(()=>{
  //   handleDelete()
  // },[product])

    


  return (
    <>
      <div>
        <div className="myproductlist_productbox">
          <img className="my_img" src={`${PROXY}${item?.images[0]?.url}`}></img>

          <div className="myproductlist_text">
            <h3>{item?.title}</h3>
            <div className="myprocutlist_options">#{item?.options}</div>
          </div>
          <div className="mypageproductlist_product_btn">
            <Link
              to={`/product/${item?.seq}`}
              className="mypageproductlist_product"
            >
              수정하기
            </Link>
            <button
              onClick={() => handleDelete(item?.seq)}
              className="mypageproductlist_delet"
            >
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

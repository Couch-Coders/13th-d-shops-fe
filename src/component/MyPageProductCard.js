import React from "react";
import { Link } from "react-router-dom";
import MypageProductService from "../service/mypageProductService";
export default function MyPageProductCard({ item }) {
  const handleDelete = async (seq) => {
    const result = await MypageProductService.deleteProduct(seq);
    console.log(result.con);

    alert("삭제 되었습니다.");
  };

  return (
    <>
      <div>
        <div className="myproductlist_productbox">
          <img className="my_img" src={item?.images[0]?.url}></img>

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

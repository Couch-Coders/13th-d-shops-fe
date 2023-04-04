import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageNavigate from "../component/MyPageNavigate";
import MyPageProductCard from "../component/MyPageProductCard";
import MypageProductService from "../service/mypageProductService";


export default function MyListPage() {
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  
  const handleDelete = async (seq) => {
  const result = await MypageProductService.deleteProduct(seq);
    console.log(result);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await MypageProductService.getMyProduct();
      setProduct(result.content);
    };
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [handleDelete]);

  return (
    <div>
      <Row className="mypagelist_box">
        <Col lg={2}>
          <MyPageNavigate />
        </Col>
        <Col>
          <div>
            <div className="myproductlist_header_box">
              <h2> 내상품 리스트</h2>

              <button
                className="myproductlist_header_btn"
                onClick={() => {
                  navigate("/product");
                }}
              >
                글쓰기
              </button>
            </div>

            <div className="myproductlist_product_wrap">
              {product &&
                product.map((item) => {
                  return (
                    <>
                      <MyPageProductCard item={item} />
                    </>
                  );
                })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { myInfoThunk } from "../stores/myInfoSlice";
import { Container, Row, Col } from "react-bootstrap";
import ProductService from "../service/productService";
import LoadingSpinners from "../component/LoadingSpinners";
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
export default function Product_Detail() {
  const [product, setProduct] = useState();
  const [Loading,setLoading] = useState(false)
  const params = useParams();
  const dispatch = useDispatch();
  const my = useSelector((state) => state.myInfo.myInfo);

  useEffect(() => {
    dispatch(myInfoThunk());
  }, []);

  console.log(my);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const result = await ProductService.getProduct(params.id);
      console.log("result", result);
      setProduct(result);
      setLoading(false)
    
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    console.log("값이 설정됨");
    return () => {
      console.log("가 바뀌기 전..");
    };
  }, []);

  if(Loading){
    return <div>
      <LoadingSpinners/>
    </div>
  }

  return (
    <div>
      <>
        <div>
          <div className="detail_title">상품 정보</div>
        </div>
        <Container className="product_wrap">
          <Row>
            <Col lg={5}>
              <div>
                <img className="productDetail_img" src={`${product?.images[0].url}`}></img>
             
              </div>
            </Col>
            <Col lg={7}>
              <div>
                <div className="product_title">
                  <h3>{product?.title}</h3>
                  <div>#{product?.options}</div>
                </div>
                <div>
                  <div className="productdetial_event">
                    <div>배송사 : CJ대한유통</div>
                    <div style={{ color: "rgb(224, 75, 75)" }}>
                      <strong>오픈 event</strong>
                    </div>
                    <div>상품 구매시 무료배송 </div>
                    <div>이벤트 기간 : 2023-04~2023-07</div>
                  </div>
                </div>
                <div className="company_info">
                  <h6 style={{ color: "#395E97" }}>
                    {" "}
                    <strong>판매자 정보</strong>{" "}
                  </h6>
                  <div>
                    <strong>사업장 이름 </strong> : {product && product.company.name}
                  </div>
                  <div>
                    <strong>전화번호 </strong> : {product && product.company.phone}
                  </div>
                  <div>
                    <strong>이메일 </strong> : {product && product.company.email}
                  </div>
                  <div>
                    <strong>사업장 주소 </strong> :{" "}
                    {product && product.company.address.address},
                    {product && product.company.address.detail}
                  </div>
                </div>
                <div>
                  <button className="company_btn">견적 요청 하기</button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="detail_des_wrap">
                <h3 className="datail_des_title">상품 상세정보</h3>
                <div className="detail_des">
                  <div>{product?.description}</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
      )
    </div>
  );
}

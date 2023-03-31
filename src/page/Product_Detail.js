
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MypageProductService from "../service/MypageProductService";
import ProductListService from "../service/ProductListService";
import { myInfoThunk } from "../stores/myInfoSlice";
import {Container , Row,Col} from 'react-bootstrap';
import ProductService from "../service/productService";

export default function Product_Detail() {
const [product,setProduct] = useState()
const params = useParams();
const dispatch = useDispatch()
const my = useSelector((state)=> state.myInfo.myInfo)

useEffect(()=>{
  dispatch(myInfoThunk())
},[])

console.log(my)

useEffect(() => {
  const fetchData = async () => {
    const result = await ProductService.getProduct(params.id);
    console.log("result", result);
    setProduct(result)
    console.log(params.id)
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



  return <div>
      <>
      (
      <Container className="product_wrap">
        <Row>
          <Col lg={5}>
          <div>
            <img width={500} src='http://brunt.godohosting.com/gd5replace/bruntco2/data/assets/images/visuals/collectionb/brands/tradition/1000022809/1.jpg'></img>
          </div>
          </Col>
          <Col lg={7}>
          <div >
            <div className="product_title">
          <h1>{product?.title}</h1>
          <div>#{product?.options}</div>
          </div>
          <div className="company_info">
            <div>판매자 정보</div>
          <div><strong>사업장 이름 </strong> : {product?.name}</div>
          <div><strong>전화번호 </strong> : {my && my.phone}</div>
          <div><strong>이메일 </strong> : {my && my.company?.email}</div>
          <div><strong> </strong> : {my  && my.company?.address.address}</div>
          </div>
          <div>
          <button >견적 요청 하기</button>
          </div>
          </div>
          </Col>
        </Row>
        <Row>
          <Col>
          <div>
            <div>상품 상세정보</div>
            <div>{product?.description}</div>
          </div>
          </Col>
        </Row>
      </Container>
      </>
      )
  
    
  </div>;
}

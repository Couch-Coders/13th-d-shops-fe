import { Row, Col } from "antd";
import React from "react";
import MypageProductService from "../service/mypageProductService";

export default function ProductCard({ item }) {
  const handleDelete = async (seq) => {
    const result = await MypageProductService.deleteProduct(seq);
    console.log(result);
    console.log(item);
  };

  const handleText = (item) => {
    console.log(item);
  };
  return (
    <div>
      <Row>
        <Col lg={2}></Col>
        <Col lg={10}>
          <div>
            <div className="myproductlist">
              <img
                width={200}
                src="https://m.comfpro.co.kr/web/product/medium/202111/ab99bbc3f5c49160158c29d07ce660bf.jpg"
              ></img>
            </div>
            <div>
              <div>{item.title}</div>
              <div>{item.description}</div>
              <div>{item.options}</div>
              <div>{item.seq}</div>
              <button>수정하기</button>
              <button onClick={() => handleDelete(item.seq)}>삭제하기</button>
              <button onClick={() => handleText(item.seq)}>테스트</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

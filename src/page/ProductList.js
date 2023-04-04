import React, { useEffect, useState } from "react";

import { Card, List } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductListService from "../service/productListService";
const { Meta } = Card;
export default function ProductList() {
  const [query, setQuery] = useSearchParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  console.log(product);
  const handleOnLoadProduct = async (e) => {
    e.preventDefault();

    const result = await ProductListService.getProduct();
    // console.log("result", result.content);

    setProduct(result.content);
  };

  const handleOnLoadProductSearch = async (e) => {
    let searchQuery = query.get("q");
    const result = await ProductListService.getProductSearch(searchQuery);
    console.log("result", result.content);

    setProduct(result.content);
  };

  useEffect(() => {
    handleOnLoadProductSearch();
  }, [query]);

  useEffect(() => {
    // 20230327 jay 로딩시 데이터 늦게 받아오는 문제 해결

    const fetchData = async () => {
      const result = await ProductListService.getProduct();
      // console.log("result", result);
      console.log(result.content);
      setProduct(result.content);
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

  return (
    <div>
      <div className="productlist_btn_box">
        <button className="productlist_btn" onClick={handleOnLoadProduct}>
          전체상품보기
        </button>
      </div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        // dataSource={inputs.data?.content}
        dataSource={product}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              navigate(`/products/${item.seq}`);
            }}
            className="main_cardlist"
          >
            <Card
              style={{
                width: 400,
                height: 400,
              }}
              cover={
                <img height={300} alt="example" src={item?.images[0]?.url} />
              }
              actions={[]}
            >
              <Meta title={item.title} />
              <p>성남시 중원구</p>
              <Meta description={item.options} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

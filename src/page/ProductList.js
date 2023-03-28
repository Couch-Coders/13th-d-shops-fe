import React, { useEffect, useState } from "react";
import ProductListService from "../service/ProductListService";
import { Card, List } from "antd";

export default function ProductList(props) {
  const [inputs, setInputs] = useState({});
  const [product, setProduct] = useState([]);
  const [productSearch, setProductSearch] = useState([]);

  // 입력이 바뀌면
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleOnLoadProduct = async (e) => {
    e.preventDefault();

    const result = await ProductListService.getProduct();
    // console.log("result", result.content);

    setProduct(result.content);
  };

  const handleOnLoadProductSearch = async (e) => {
    e.preventDefault();

    const result = await ProductListService.getProductSearch(inputs.keyword);
    // console.log("result", result.content);

    setProductSearch(result.content);
  };

  useEffect(() => {
    // 20230327 jay 로딩시 데이터 늦게 받아오는 문제 해결
    inputs.keyword = "치즈"; // 임시데이터
    const fetchData = async () => {
      const result = await ProductListService.getProduct();
      // console.log("result", result);
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
      <div>ProductList</div>
      <button onClick={handleOnLoadProduct}>품목 불러오기</button>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        // dataSource={inputs.data?.content}
        dataSource={product}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>{item.description}</Card>
          </List.Item>
        )}
      />
      <div>ProductSearch</div>

      <div>검색어</div>
      <input
        type="text"
        name="keyword"
        value={inputs.keyword ?? ""}
        onChange={handleChange}
      ></input>

      <button onClick={handleOnLoadProductSearch}>검색 품목 불러오기</button>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        // dataSource={inputs.search?.content}
        dataSource={productSearch}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>{item.description}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}

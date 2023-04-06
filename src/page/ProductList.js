import React, { useEffect, useState } from "react";

import { Card, List } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductListService from "../service/productListService";
import LoadingSpinners from "../component/LoadingSpinners";
const { Meta } = Card;
export default function ProductList() {
  const [query, setQuery] = useSearchParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] =useState(false)
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
    setLoading(true)
    const fetchData = async () => {
      
      const result = await ProductListService.getProduct();
      // console.log("result", result);
      console.log(result.content);
      setProduct(result.content);
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
  if(loading){
   return <div>
    <LoadingSpinners/>
    </div>
  }

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
                <img className="productList_img" alt="example" src={item?.images[0]?.url} />
              }
              actions={[]}
            >
              <Meta title={item.title} />
              <p>{item.company.address.address}</p>
              <Meta description={item.options} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

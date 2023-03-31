import React, { useEffect, useState } from "react";
import ProductListService from "../service/ProductListService";
import { Card, List } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function ProductList(props) {
  const [query,setQuery] = useSearchParams()
  const [product, setProduct] = useState([]);
  const [productSearch, setProductSearch] = useState([]);
  const navigate  = useNavigate()
 
 
  const handleOnLoadProduct = async (e) => {
    e.preventDefault();

    const result = await ProductListService.getProduct();
    // console.log("result", result.content);

    setProduct(result.content);
  };

  const handleOnLoadProductSearch = async (e) => {
  
    let searchQuery = query.get('q')
    const result = await ProductListService.getProductSearch(searchQuery);
    console.log("result", result.content);

    setProduct(result.content);
  };

  useEffect(()=>{
    handleOnLoadProductSearch()
  },[query])

  useEffect(() => {
    // 20230327 jay 로딩시 데이터 늦게 받아오는 문제 해결
  
    const fetchData = async () => {
      const result = await ProductListService.getProduct();
      // console.log("result", result);
      console.log(result.content)
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
      <button onClick={handleOnLoadProduct}>전체상품보기</button>
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
          <List.Item onClick={()=>{navigate(`/products/${item.seq}` )}}>
            <Card  title={item.title}>{item.description}</Card>
          </List.Item>
        )}
      />
   
    

    
    </div>
  );
}

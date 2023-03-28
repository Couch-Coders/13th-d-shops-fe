import React, { useEffect, useState } from 'react'
import ProductCard from '../component/ProductCard';
import MypageProductService from '../service/MypageProductService';
import ProductListService from '../service/ProductListService';

export default function MyPage_List() {
  const [inputs, setInputs] = useState({});
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await MypageProductService.getMyProduct();
      // console.log("result", result);
      setProduct(result.content);
      console.log(product)
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
  const handleOnLoadProduct = async (e) => {
    e.preventDefault();

    const result = await MypageProductService.getMyProduct();
    // console.log("result", result.content);

    setProduct(result);
    console.log(product[0].seq)
    console.log(result)

  };


  return (
    <div>
      <button onClick={handleOnLoadProduct }></button>
     {product && product.map((item)=>{
      return <ProductCard item={item} product={product}/>
     })}
   
    </div>
  )
}

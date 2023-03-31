
import { Row,Col } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MypageProductService from '../service/MypageProductService';

export default function MyPage_List({item}) {
  const [product,setProduct] =useState()
  const navigate =useNavigate()
  const handleDelete = async (seq)=>{
    const result = await MypageProductService.deleteProduct(seq)
    console.log(result)

  }

  useEffect(()=>{
    const fetchData = async ()=>{
      const result = await MypageProductService.getMyProduct()
      setProduct(result.content)
    }
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  },[handleDelete])

  return (
 
    <div>
      {product && product.map((item)=>{
        return(
          <Row>
        <Col lg={2}></Col>
        <Col lg={10}>
        <div>
        <div className='myproductlist'>
        <img width={200} src='https://m.comfpro.co.kr/web/product/medium/202111/ab99bbc3f5c49160158c29d07ce660bf.jpg'></img>
        </div>
        <div>
        <div>{item?.title}</div> 
        <div>{item?.description}</div>
        <div>{item?.options}</div>
        <div>{item?.seq}</div>
        <Link to={`/product/${item?.seq}`}>수정하기</Link>
        <button onClick={()=>handleDelete(item?.seq)}>삭제하기</button>
      
        </div>
        </div>
        </Col>
      </Row>
        )
      })}

      
     
    </div>
  )
}

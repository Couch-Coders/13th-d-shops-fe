
import { Row,Col } from 'antd'
import React, { useEffect, useState } from 'react'
import MypageProductService from '../service/MypageProductService';

export default function ProductCard({item}) {

  const handleDelete = async (item)=>{
    const result = await MypageProductService.deleteProduct(item.seq)
    console.log(result)
  
  }


  return (
    <div>
      <Row>
        <Col lg={2}></Col>
        <Col lg={10}>
        <div>
        <div className='myproductlist'>
        <img width={200} src='https://m.comfpro.co.kr/web/product/medium/202111/ab99bbc3f5c49160158c29d07ce660bf.jpg'></img>
        </div>
        <div>
        <div>{item.title}</div> 
        <div>{item.description}</div>
        <div>{item.options}</div>
        <div>{item.seq}</div>
        <button>수정하기</button>
        <button onClick={handleDelete}>삭제하기</button>
        </div>
        </div>
        </Col>
      </Row>
     
    </div>
  )
}

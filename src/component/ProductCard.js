
import { Row,Col } from 'antd'
import React from 'react'

export default function ProductCard({item}) {
  console.log(item)
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
        <button>수정하기</button>
        <button>삭제하기</button>
        </div>
        </div>
        </Col>
      </Row>
     
    </div>
  )
}

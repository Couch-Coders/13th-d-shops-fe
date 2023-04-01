import React from 'react'
import { Row,Col } from 'antd'
import { Link,  useNavigate } from 'react-router-dom';
import MyPageNavigate from '../component/MyPageNavigate';
import MypageProductService from '../service/MypageProductService';
export default function MyPageProductCard({item}) {
  const navigate =useNavigate()
  const handleDelete = async (seq)=>{
    const result = await MypageProductService.deleteProduct(seq)
    console.log(result)

    alert("삭제 되었습니다.")

  }
  return (
    <>
    <div>
      
      
        <div className='myproductlist_productbox'>
        
        <img  className="my_img" src='https://m.comfpro.co.kr/web/product/medium/202111/ab99bbc3f5c49160158c29d07ce660bf.jpg'></img>
       
        <div className='myproductlist_text'>
        <h3>{item?.title}</h3> 
        <div className='myprocutlist_options'>#{item?.options}</div>
      
       
        </div>
        <div className='mypageproductlist_product_btn'>
        <Link to={`/product/${item?.seq}`} className='mypageproductlist_product'>수정하기</Link>
        <button onClick={()=>handleDelete(item?.seq)} className='mypageproductlist_delet'>삭제하기</button>
        </div>
        </div>
       
    </div>
    </>
  )
}

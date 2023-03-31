import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function MyPageNavigate() {

  return (
    <div>
      <div className='padding'>
      <div className='mypage_navigate_header'>
        <h1 className='mypage_navigate_header_name'>MY PAGE</h1>
      </div>
      <h2 className='mypage_navigate_title'>MY</h2>
      <div className='mypage_navigate'>
        <div className='mypage_text_box'><Link to='/mypage' className='mypage_text'>내정보</Link></div>
        <div><Link to='/mylist'  className='mypage_mylist_btn'>내 상품 리스트</Link></div>

      </div>
      </div>
    </div>
  )
}
